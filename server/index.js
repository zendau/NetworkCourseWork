// Класс для работы с файлами
const fs = require('fs')
// Реализация веб сервера
const express = require('express')
const app = express()
const http = require('http').Server(app)
// Объек сокетов
const io = require('socket.io')(http, {
    cors: {
      credentials: true
    }
})

// Подключение html шаблона
const html = require("./template/index")

app.use(express.static('template'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

// Обработка Get / 
app.get('/', (req, res) => {
    res.write(html())
    res.end()
})

app.post("/", (req, res) => {


    const reqData = req.body.data[0].replace("\n", "").replace("\r", "")
    const title = req.body.title
    console.log("req ", reqData, title)
    res.status(200)
    io.emit("message", [reqData, title])
})

// Вывод сообщение что был подключен пользователь по сокету
io.on("connection", (socket) => {
    console.log("user connect")
})


const PORT = process.env.PORT || 80

const ifaces = require('os').networkInterfaces();
    const localhost = Object.keys(ifaces).reduce((host,ifname) => {
        let iface = ifaces[ifname].find(iface => !('IPv4' !== iface.family || iface.internal !== false));
        return iface? iface.address : host;
    }, '127.0.0.1');
    http.listen(PORT, () => {
        console.log(`server started on http://${localhost}:${PORT}`)
})

