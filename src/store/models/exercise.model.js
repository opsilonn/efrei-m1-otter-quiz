/* eslint camelcase: 0 */
const PostgresStore = require('../utils/PostgresStore.js')
const HephaistosService = require('../utils/HephaistosService.js')
const debug = require('debug')('hephaistos:exercise.model.js')
const REGION_RW = 6
// const REGION_RO = 4
// const REGION_NOREAD = 0

class Exercise {
  /** @type {Number} */
  id
  /** @type {Boolean} */
  visible_to_participants
  /** @type {String} */
  title
  /** @type {String} */
  lang
  /** @type {String} */
  instructions
  /** @type {String} */
  tests
  /** @type {String[]} */
  test_names
  /** @type {String[]} */
  template_regions
  /** @type {Number[]} */
  template_regions_rw
  /** @type {Number} */
  difficulty
  /** @type {Number} */
  score
  /** @type {Date} */
  creation_date

  /**
   * TODO: pagination, reduction by category, visible/invisible...
   */
  static async getMultiple () {
    const q = {
      text: `SELECT * FROM ${Exercise.tableName}`/* ,
      values */
    }

    debug('q', q)

    const result = await PostgresStore.pool.query(q)

    return result.rows
  }

  /**
   * @param {Number} id
   * @param {String[]} [scope]
   * @returns {Promise<Exercise>}
   */
  static async findById (id, scope = null) {
    if (typeof id !== 'number') throw new Error('TypeError: id is not a number')

    const fields = scope ? scope.join(',') : '*'
    const result = await PostgresStore.pool.query({
      text: `SELECT ${fields} FROM ${Exercise.tableName} WHERE id=$1`,
      values: [id]
    })

    debug('result', result.rows[0])
    return result.rows[0]
  }

  /**
   * @param {Number} sessionId
   */
  static async deleteAllForSession (sessionId) {
    const ExerciseAttempt = require('./exercise-attempt.model.js')
    const SessionExercise = require('./session-exercise.model.js')
    await PostgresStore.pool.query({
      text: `DELETE FROM ${ExerciseAttempt.tableName} AS attempt
      USING ${SessionExercise.tableName} AS sess_exo
      WHERE sess_exo.session_id = $1
      AND attempt.exercise_id = sess_exo.exercise_id`,
      values: [sessionId]
    })
    const result = await PostgresStore.pool.query({
      text: `SELECT * FROM ${SessionExercise.tableName} AS sess_exo
      WHERE sess_exo.session_id = $1`,
      values: [sessionId]
    })
    await PostgresStore.pool.query({
      text: `DELETE FROM ${SessionExercise.tableName} AS sess_exo
      WHERE sess_exo.session_id = $1`,
      values: [sessionId]
    })
    if (result.rows.length) {
      const ids = result.rows.map(r => r.exercise_id)
      const val = ids.map((_, i) => '$' + (i + 1))
      await PostgresStore.pool.query({
        text: `DELETE FROM ${Exercise.tableName} AS exo
      WHERE exo.id IN (${val.join(', ')})`,
        values: ids
      })
    }
  }

  /**
   * @param {Number} id
   */
  static async delete (id) {
    try {
      const ExerciseAttempt = require('./exercise-attempt.model.js')
      const SessionExercise = require('./session-exercise.model.js')
      const ModuleExercise = require('./module-exercise.model.js')

      await PostgresStore.pool.query('BEGIN')
      await ExerciseAttempt.deleteAllForExercise(id)
      await SessionExercise.deleteAllForExercise(id)
      await ModuleExercise.deleteAllForExercise(id)
      await PostgresStore.pool.query({
        text: `DELETE FROM ${Exercise.tableName} WHERE id=$1`,
        values: [id]
      })
      await PostgresStore.pool.query('COMMIT')
    } catch (err) {
      await PostgresStore.pool.query('ROLLBACK')
    }
  }

  /**
   * @param {Number} id
   * @param {Number} sessionId
   * @param {Object.<('instructions'|'tests'|'solution'|'template_regions'|'template_regions_rw'|'difficulty'|'score'|'creation_date'), any>} params
   * @returns {Promise<Exercise>}
   */
  static async update (id, sessionId, params) {
    if (Object.keys(params).length === 0) return null

    const SessionExercise = require('./session-exercise.model.js')
    if (!await SessionExercise.isExerciseInSession(id, sessionId)) {
      throw new Error('Exercise is not in session')
    }

    if (params.tests && params.tests.length && params.lang) {
      const solution = params.template_regions.join('\n')
      const testResults = await HephaistosService.execute(solution, params.tests, params.lang)
      if (testResults.result) {
        params.test_names = testResults.result.tests.map(t => t.name)
      }
    }

    Exercise.sensibleDefaultRegions(params.template_regions, params.template_regions_rw)

    // filter out any non-alphanumeric parameter
    const fields = Object.keys(params)
      .filter(_ => _ !== 'id' && _ !== 'creation_date' && !_.match(/[^a-z_]/))

    const variables = fields.map((_, i) => `$${i + 1}`).join(', ')
    const values = fields.map(_ => params[_])
    const fieldNames = fields.join(',')
    values.push(id)

    // TODO: move the current entry in a _revisions table, and update the
    // current one
    const q = {
      text: `UPDATE ${Exercise.tableName} SET (${fieldNames}) = (${variables})
        WHERE id=$${values.length} RETURNING *`,
      values
    }

    debug('q', q)

    const result = await PostgresStore.pool.query(q)
    debug('result', result.rows[0])
    return result.rows[0]
  }

  /** @param {String[]} templateRegions
   *  @param {Number[]} templateRegionsRw
  */
  static sensibleDefaultRegions (templateRegions, templateRegionsRw) {
    /**
     * sensible defaults: please have at least one read+write region !
     */
    if (templateRegions && templateRegions.length === 1) {
      if (templateRegions[0].replace(/[\r\n]/g, '') === '') {
        templateRegionsRw[0] = REGION_RW
      }
      if (templateRegionsRw[0] !== REGION_RW) {
        templateRegions.push('\n')
        templateRegionsRw.push(REGION_RW)
      }
    }
  }

  /** @param {Object.<('lang'|'instructions'|'tests'|'template_regions'|'template_regions_rw'|'difficulty'|'score'|'creation_date'), any>} params */
  static async create (params) {
    if (Object.keys(params).length === 0) return null

    if (params.tests && params.tests.length && params.lang) {
      const testResults = await HephaistosService.execute('', params.tests, params.lang)
      if (testResults.result) {
        params.test_names = testResults.result.tests.map(t => t.name)
      }
    }

    Exercise.sensibleDefaultRegions(params.template_regions, params.template_regions_rw)

    // filter out any non-alphanumeric parameter
    const fields = Object.keys(params)
      .filter(_ => _ !== 'id' && !_.match(/[^a-z_]/))

    const variables = fields.map((_, i) => `$${i + 1}`).join(', ')
    const values = fields.map(_ => params[_])
    const fieldNames = fields.join(',')

    const result = await PostgresStore.pool.query({
      text: `INSERT INTO ${Exercise.tableName} (${fieldNames}) VALUES (${variables})
        RETURNING *`,
      values
    })
    debug('result', result.rows[0])
    return result.rows[0]
  }

  static toSqlTable () {
    return `
    CREATE TABLE ${Exercise.tableName} (
      id SERIAL PRIMARY KEY,
      visible_to_participants BOOLEAN,
      title TEXT,
      lang TEXT,
      instructions TEXT,
      tests TEXT,
      test_names TEXT [],
      template_regions TEXT [],
      template_regions_rw SMALLINT [], -- READ/WRITE access to students for specific
                                       -- regions, it has to be seemless
                                       -- for the exercise creator
      difficulty SMALLINT,
      score SMALLINT,
      creation_date TIMESTAMP NOT NULL
    )
    `
  }
}

/** @type {String} */
Exercise.tableName = 'exercise'

module.exports = Exercise
