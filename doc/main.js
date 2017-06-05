const express = require('express'),
    bodyparser = require('body-parser'),
    prismjs = require('prismjs'),
    prettyjson = require('prettyjson'),
    app = express(),
    url = 'localhost',
    port = 9993

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.set('views', `${__dirname}/views/`)
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => response.render('pages/index', {
    api_name: require('./doc.json')['api_name'].toUpperCase()
}))

app.get('/json', (request, response) => response.send(JSON.stringify({
    models: require('./doc.json')['models'].map((model_name) => model_name['model'])
})))

app.get('/model/:name', (request, response) => response.send(JSON.stringify({
    routes: require('./doc.json')['models'].filter((model_name) => model_name['model'] == request.params.name)[0].routes
})))

app.post('/syntax', (request, response) => response.send({
        html: `<code class=\"language-javascript\" style=\"width:70vw;\">${prismjs.highlight(JSON.stringify(JSON.parse(request.body.text), null, '\t'), prismjs.languages.javascript)}</code>`
}))

app.listen(port, () => console.log(`Documentation Server running on port ${port}`))