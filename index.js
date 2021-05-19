// Класс для работы с файлами
const fs = require('fs')
// Реализация веб сервера
const app = require('express')()
const http = require('http').Server(app)
// Объек сокетов
const io = require('socket.io')(http)

// Подключение html шаблона
const html = require("./template")
// Файл для логирования
const LogFile = 'data.txt'

// Файл matlab
const MATLAB_DATA = "fourData.mat"

// Подключение функции для создания дочернего процесса
const process = require("./matlab/process")
// Класс для работы с путями
const path = require("path");

// Данные полученнные с дочернего процесса
let data = null

// Асинхронное чтение файла
async function readFile() {
  await process(path.resolve(MATLAB_DATA))
    .then(value => data = value)
    .catch(err => console.log("Error: ", err))

    // Запись информации в файл логирования	
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

    // Чтение информации из файла логирования
    await fs.readFile(LogFile, "utf8", (err, data) => {
        if (err) {
            // Вывод ошибку
            console.log(err)
        } else {
            //console.log(data)
            // Отправка данных из файла логирования подключенным пользователям по сокету
            io.emit("message", data)
        }
  })
    
}

console.log(`Watching for file changes on ${LogFile}`);

// Обработка Get / 
app.get('/', (req, res) => {
    res.write(html())
    res.end()
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


// Запуск html сервера
http.listen(3000, () => {
    console.log(`Server started at http://localhost:${3000}`)
    readFile()
})
