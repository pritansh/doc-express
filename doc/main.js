const express = require('express'),
    app = express(),
    url = 'localhost',
    port = 9993

app.set('views', `${__dirname}/views/`)
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => response.render('pages/index', {
    api_name: require('./doc.json')['api_name'].toUpperCase()
}))

app.get('/json', (request, response) => response.send(JSON.stringify({
    models: require('./doc.json')['models'].map((model_name) => model_name['model'])
})))

app.listen(port, () => console.log(`Documentation Server running on port ${port}`))