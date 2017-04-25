var path = require('path')
var fsPath = require('fs-path')
var Xvfb = require('xvfb')

var serve = require('./serve.js')
var render = require('./render.js')

var xvfb = new Xvfb({silent: true})

function StaticSiteGenerator (outputPath, routes) {
    this.outputPath = outputPath
    this.routes = routes
}

StaticSiteGenerator.prototype.apply = function (compiler) {
    var self = this
    compiler.plugin('after-emit', function (compilation, done) {

        if (process.platform === 'linux'){
            console.log('\n\nAttempting to start xvfb...\n\n')
            xvfb.startSync()
            process.env['DISPLAY'] = ':99.0'
        }
        var server = serve(self.outputPath)
        var port = server.address().port
        var outputFiles = render(port, self.routes)

        outputFiles.then(files => {
            for (var i = 0; i < files.length; i++) {
                var outputFilePath = path.join(self.outputPath, self.routes[i])
                var outputFileName = path.join(outputFilePath, 'index.html')
                fsPath.writeFile(outputFileName, files[i])
            }
            server.close(function () {
                xvfb.stopSync()
                done()
            })
        }).catch(err => {
            setTimeout(function () {console.log(err)})
            server.close(function () {
                xvfb.stopSync()
                done()
            })
        })

    })
}

module.exports = StaticSiteGenerator