const fs = require('fs')

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http)

const html = require("./template")
const LogFile = 'data.txt';

const process = require("./matlab/process")
const path = require("path");

let data = null

async function readFile() {
  await process(path.resolve("myMat.mat"))
    .then(value => data = value)
    .catch(err => console.log("Error: ", err))

    	
    fs.writeFileSync("data.txt", "<ul class='list'>", (error) =>{
        if(error) throw error
    })

    for (let i = 0; i < data[0].length; i++) {
        fs.appendFileSync("data.txt", `<li>${data[0][i]} - ${data[1][i]}</li>`, (error) =>{
            if(error) throw error
        })
    }
    fs.appendFileSync("data.txt", "</ul>", (error) =>{
        if(error) throw error
    })

    await fs.readFile(LogFile, "utf8", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            io.emit("message", data)
        }
  })
    
}

console.log(`Watching for file changes on ${LogFile}`);

app.get('/', (req, res) => {
    res.write(html())
    res.end()
})

// fs.watchFile(LogFile, (curr, prev) => {
//     console.log(`${LogFile} file Changed`)
//     fs.readFile(LogFile, "utf8", (err, data) => {
//         if (err) {
//             console.log(err)
//         } else {
//             io.emit("message", data)
//         }
//   })
// })

io.on("connection", (socket) => {
    console.log("user connect")
})

http.listen(3000, () => {
    console.log(`Server started at http://localhost:${3000}`)
    readFile()
})
