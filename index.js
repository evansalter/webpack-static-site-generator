function StaticSiteGenerator (routes) {
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

        callback()
    }.bind(this))
}

module.exports = StaticSiteGenerator