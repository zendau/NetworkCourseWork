// Действия во время рендеринга

const {ipcRenderer} = require('electron')


document.querySelector("#open")
        .addEventListener("click", (event) => {
            ipcRenderer.send('show-fileDialog')
        })


const status = document.querySelector("#status")

ipcRenderer.on("updateStatus", (event, message) => {

    status.textContent = message
    
    setTimeout(() => status.textContent = "Ожидание загрузки", 20000)
})

const toggle = document.querySelector("#toggle")
const collapse = document.querySelector("#collapse")

let statusToggle = false

toggle.addEventListener("click", (event) => {
    if (statusToggle) {
        statusToggle = false
        collapse.classList.remove("show")
    } else {
        statusToggle = true
        collapse.classList.add("show")
    }
})
