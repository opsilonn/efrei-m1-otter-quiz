const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

// serves files from our fist directory which now contains out index.html file
app.use('/', serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080
app.listen(port)
