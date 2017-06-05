# doc-express
  Helps in creating documentation for express based API

## Before use
  Clone and then run
```node
npm install
```
## Example

> directory structure
```node
-app
---models
-----user.js
---main.js
```

> main.js
```node
const app = require('express')(),
    bodyparser = require('body-parser'),
    doc = require('../doc-express'), //Path to doc-express root folder
    uri = 'localhost',
    port = 8991
    
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

doc.json(__dirname, uri, port, 'models')

app.use('/', require('./models/user.js'))

app.listen(port, () => console.log(`Server running on port ${port}`))
```

> models/user.js
```node
const router = require('express').Router()

/*
    {
        desc: 'Get',
        method: 'GET',
        url: '/'
    }
*/
router.get('/', (req, res) => res.send({
    status: 200,
    message: 'OK'
}))

/*
    {
        desc: 'Post',
        method: 'POST',
        url: '/',
        body: {
            text: 'string'
        }
    }
*/
router.post('/', (req, res) => res.send({
    status: 200,
    message: 'OK',
    body: req.body.text
})

module.exports = router
```

  Run server and documentation server(localhost:9993) using
```node
node main.js
```