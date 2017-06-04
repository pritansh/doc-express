const app = require('express')(),
    url = 'localhost',
    port = 9993

app.set('views', `${__dirname}/views/`)
app.set('view engine', 'ejs')

app.get('/', (request, response) => response.render('pages/index', {
    doc: require('./doc.json')
}))

app.listen(port, () => console.log(`Documentation Server running on port ${port}`))