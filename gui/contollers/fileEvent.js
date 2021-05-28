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
            const pathFile = result.filePaths[0]
            console.log("path", result.filePaths[0])
            win.webContents.send("updateStatus", "Начата загрузка файла")
            process(pathFile)
                .then(value => { 
                    win.webContents.send("updateStatus", "Файл отправлен")
                    console.log("Send from main")
                    sendData([value, path.basename(pathFile)])
                })
                .catch(err => console.log("Error: ", err))
        }
      }).catch(err => {
        console.log(err)
      })

})

function sendData(data) {
    console.log(data)
    axios
        .post(CONFIG.url, {
            data: data[0],
            title: data[1]
        })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
        })
        .catch(error => {
            console.error(error.code)
        })
}