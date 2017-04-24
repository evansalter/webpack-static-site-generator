var express = require('express')
var path = require('path')

function serve (basePath) {
    var app = express()

    app.get('/static/*', function (req, res) {
        res.sendFile(path.join(basePath, req.path))
    })

    app.get('*', function (req, res) {
        res.sendFile(path.join(basePath, 'index.html'))
    })

    var port
    var server = app.listen(0, () => {
        console.log('Serving app on port ' + server.address().port)
    })

    return server
}

module.exports = serve