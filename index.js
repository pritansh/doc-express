const fs = require('fs'),
    extractComments = require('extract-comments')

var dir_path = null

jsonDoc = (path, uri, port, dir, obj={}) => {
    dir_path = path
    model_path = `${dir_path}/${dir}`
    files = fs.readdirSync(`${model_path}`)
    files = files.map((filename) => {
        data = fs.readFileSync(`${model_path}/${filename}`).toString()
        data = extractComments.block(data)
        data = data.map((value) => {
            value = value.raw
            value = value.replace(/\'/g, '"')
            value = value.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g, '')
            value = value.replace(/(\w+):/g, '"$1":')
            return JSON.parse(value)
        })
        return {
            filename: filename,
            model: filename.slice(filename.lastIndexOf('/') + 1, filename.length - 3),
            routes: data
        }
    })
    doc_path = `${dir_path}/doc`
    try {
        fs.statSync(`${doc_path}`)
    } catch(error) {
        fs.mkdirSync(`${doc_path}`)
    }
    final_obj = {
        base_url: `http://${uri}/${port}`,
        models_directory: dir,
        models:files
    }
    for(key in obj)
        final_obj[key] = obj[key]
    fs.writeFileSync(`${doc_path}/doc.json`, JSON.stringify(final_obj))
}

module.exports = jsonDoc