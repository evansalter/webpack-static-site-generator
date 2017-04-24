var path = require('path')
var fsPath = require('fs-path')

var serve = require('./serve.js')
var render = require('./render.js')

function StaticSiteGenerator (outputPath, routes) {
    this.outputPath = outputPath
    this.routes = routes
}

StaticSiteGenerator.prototype.apply = function (compiler) {
    compiler.plugin('after-emit', function (compilation) {

        var server = serve(this.outputPath)
        var port = server.address().port
        var outputFiles = render(port, this.routes)

        outputFiles.then(files => {
            for (var i = 0; i < files.length; i++) {
                var outputFilePath = path.join(this.outputPath, this.routes[i])
                var outputFileName = path.join(outputFilePath, 'index.html')
                console.log(`\nwriting ${outputFileName}`)
                fsPath.writeFile(outputFileName, files[i])
            }
            console.log('\nAll files written, closing server.')
            server.close(function () {
                console.log('server closed.')
            })
        }).catch(err => {
            setTimeout(function () {console.log(err)})
            server.close()
        })

    }.bind(this))
}

module.exports = StaticSiteGenerator