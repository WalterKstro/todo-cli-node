const { writeFileSync, existsSync, readFileSync } = require('fs')
const path = './store/db.json'

const save = (data) => {

    writeFileSync(path, JSON.stringify(data), e => {
        if (e) throw new Error('Error: in created the file')
    })

}

const read = ( ) => {
    const isFile = existsSync(path)

    if(isFile) {
        const resultBuffer = readFileSync(path)
        return JSON.parse(resultBuffer.toString('utf-8'))
    }

    return false
}



module.exports = {
    save,
    read
}