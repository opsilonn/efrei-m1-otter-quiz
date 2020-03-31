/** eslint camelcase: 0 */
const accessRightsDefinition = {
  exercise: {
    view: 'exercise.view',
    do: 'exercise.do'
  },
  session: {
    view: 'session.view',
    do: 'session.do'
  },
  module: {
    create: 'module.create',
    delete: 'module.delete',
    edit_admin: 'module.edit_admin',
    edit: 'module.edit',
    participate: 'module.participate',
    view: 'module.view'
  },
  exercise_attempt: {
    delete: 'exercise_attempt.delete'
  },
  user: {
    view: 'user.view',
    manage: 'user.manage',
    see_dashboard: 'user.see_dashboard'
  },
  role: {
    manage: 'role.manage',
    add_to_user: 'role.add_to_user'
  }
}

module.exports = accessRightsDefinition
