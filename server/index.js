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
// Файл для логирования
//const LogFile = 'data.txt'

// Файл matlab
// const MATLAB_DATA = "fourData.mat"

// Подключение функции для создания дочернего процесса
// const process = require("./matlab/process")
// Класс для работы с путями
// const path = require("path");

// Данные полученнные с дочернего процесса
// let data = null

// Асинхронное чтение файла
// async function readFile() {
//   await process(path.resolve(MATLAB_DATA))
//     .then(value => data = value)
//     .catch(err => console.log("Error: ", err))

//     // Запись информации в файл логирования	
//     fs.writeFileSync("data.txt", "<ul class='list'>", (error) =>{
//         if(error) throw error
//     })

//     for (let i = 0; i < data[0].length; i++) {
//         fs.appendFileSync("data.txt", `<li>${data[0][i]} - ${data[1][i]}</li>`, (error) =>{
//             if(error) throw error
//         })
//     }
//     fs.appendFileSync("data.txt", "</ul>", (error) =>{
//         if(error) throw error
//     })

//     // Чтение информации из файла логирования
//     await fs.readFile(LogFile, "utf8", (err, data) => {
//         if (err) {
//             // Вывод ошибку
//             console.log(err)
//         } else {
//             //console.log(data)
//             // Отправка данных из файла логирования подключенным пользователям по сокету
//             io.emit("message", data)
//         }
//   })
    
// }

//console.log(`Watching for file changes on ${LogFile}`);

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
    console.log("req ", reqData)
    res.status(200)
    io.emit("message", reqData)
})

// Реализация слежения за изменением файла логирования
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
        console.log(`server is started on http://${localhost}:${PORT}`)
})