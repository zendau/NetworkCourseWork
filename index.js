const fs = require('fs')

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http)

const html = require("./template")
const LogFile = 'data.txt';

console.log(`Watching for file changes on ${LogFile}`);

app.get('/', (req, res) => {
    res.write(html())
    res.end()
})

fs.watchFile(LogFile, (curr, prev) => {
    console.log(`${LogFile} file Changed`)
    fs.readFile(LogFile, "utf8", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            io.emit("message", data)
        }
  })
})

io.on("connection", (socket) => {
    console.log("user connect")
})

http.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})
