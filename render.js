var Nightmare = require('nightmare')

var document

function render(port, routes, elementToWaitFor) {

    var nightmare = Nightmare({
        show: false,
        webPreferences: {
            partition: 'partition-' + Math.random()
        }
    })

    var baseUrl = `http://localhost:${port}`

    var pageContents = routes.reduce(function (accumulator, route) {
        return accumulator.then(function (results) {
            var url = baseUrl + route
            return nightmare
                .goto(url)
                .wait(elementToWaitFor, 1000)
                .evaluate(function () {
                    return document.documentElement.innerHTML
                })
                .then(function (content) {
                    results.push(content)
                    return results
                })
                .catch(err => {
                    setTimeout(function () {throw err})
                })
        })
    }, Promise.resolve([]))

    return pageContents.then(function (values) {
        return nightmare.end().then(function () {
            return values
        })
    }).catch(err => {
        setTimeout(function () {console.log(`Error ${err}`)})
    })
}

module.exports = render