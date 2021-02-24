const {spawn} = require('child_process')

const  dataToSend = [];

module.exports = function(fileName) {
    return new Promise((res, rej) => {
        try {
            console.log()
            const python = spawn('python', [__dirname +'\\sub.py', fileName])
            python.stdout.on('data', function (data) {
                dataToSend.push(data.toString())
            })
        
            python.on('close', (code) => {
                if (code === 0) {
                    res(JSON.parse(dataToSend))
                } else {
                    throw new Error(`Python error code - ${code}`)
                }
            })
        } catch (e) {
            rej(e)
        }
    })
}




