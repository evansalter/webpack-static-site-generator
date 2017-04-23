var serve = require('./serve.js')

function StaticSiteGenerator (outputPath, routes) {
    this.outputPath = outputPath
    this.routes = routes
}

StaticSiteGenerator.prototype.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
        var routeStrings = 'Routes:\n'
        this.routes.forEach(function (route) {
            routeStrings += '  - ' + route + '\n'
        })

        compilation.assets['routes.txt'] = {
            source: function () {
                return routeStrings
            },
            size: function () {
                return routeStrings.length
            }
        }

        var server = serve(this.outputPath)
        var port = server.address().port

        callback()
    }.bind(this))
}

module.exports = StaticSiteGenerator