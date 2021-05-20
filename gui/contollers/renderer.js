// Действия во время рендеринга

const {ipcRenderer} = require('electron')



document.querySelector("#open")
        .addEventListener("click", (event) => {
            ipcRenderer.send('show-fileDialog')
        })


ipcRenderer.on("updateStatus", (event, status) => {
    console.log(status)
})