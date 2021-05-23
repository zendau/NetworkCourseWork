// Объекты для передачи данных и вызова диалогово окна
const {ipcMain, dialog} = require('electron')
// Класс для работы с файлами
const fs = require('fs')
// Класс для работы с путями
const path = require("path")
// Класс для реализации http запросов
const axios = require('axios')
// Подключение функции для создания дочернего процесса
const process = require("../matlab/subProcess")
// Подключение файла с настройками
const CONFIG = require("../config")
// Подключение объекта интерфейса
const win = require("../main")

ipcMain.on('show-fileDialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {
                name: "matlab file",
                extensions: ["mat"]
            }
        ]
    }).then(result => {
        if (!result.canceled) {
            const path = result.filePaths[0]
            console.log("path", result.filePaths[0])
            win.webContents.send("updateStatus", "start")
            process(path)
                .then(value => { 
                    win.webContents.send("updateStatus", "end")
                    console.log("Send from main")
                    sendData(value)

                    fileWatch(path)
                })
                .catch(err => console.log("Error: ", err))
        }
      }).catch(err => {
        console.log(err)
      })

})


// Реализация слежения за изменением файла логирования
function fileWatch(filePath) {

    console.log(`Watching for file changes on ${path.basename(filePath)}`);
    fs.watchFile(filePath, (curr, prev) => {
        console.log(`${path.basename(filePath)} file Changed`)
        fs.readFile(LogFile, "utf8", (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Send from watch")
                process(filePath)
                    .then(value => { 
                        win.webContents.send("updateStatus", "end")
                        console.log("Send from watch")
                        sendData(value)
                        
                    })
                    .catch(err => console.log("Error: ", err))
                //io.emit("message", data)
            }
    })
    })
}


function sendData(data) {
    axios
        .post(CONFIG.url, {
            data: data
        })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
        })
        .catch(error => {
            console.error(error.code)
        })
}