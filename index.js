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
    final_obj = {
        base_url: `http://${uri}/${port}`,
        models_directory: dir,
        models:files,
        api_name: dir_path.slice(dir_path.lastIndexOf('/') + 1)
    }
    for(key in obj)
        final_obj[key] = obj[key]
    fs.writeFileSync(`${__dirname}/doc/doc.json`, JSON.stringify(final_obj))
    hostDoc()
}

hostDoc = () => {
    bash = require('child_process').spawn('bash')
    bash.stdout.pipe(process.stdout)
    bash.stderr.pipe(process.stderr)
    bash.on('exit', (code) => console.log(`Exited with code ${code}`))
    bash.stdin.write(`cd ${__dirname} && node doc/main.js`)
    bash.stdin.end()
}

module.exports = {
    json: jsonDoc
}