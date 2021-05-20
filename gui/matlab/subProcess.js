// Получение метода создания дочернего процесса
const {spawn} = require('child_process')

// Массив для хранения данных
const  dataToSend = [];

module.exports = function(fileName) {
    return new Promise((res, rej) => {
        try {
            // Настройка запуска дочернего процесса
            const python = spawn('python', [__dirname +'\\sub.py', fileName])
            // Запуск дочернего процесса
            python.stdout.on('data', function (data) {
                // Сохранение данных вывода
                dataToSend.push(data.toString())
            })
        
            // Событие закрытия дочернего процесса
            python.on('close', (code) => {
                // Закрытие с кодом 0
                if (code === 0) {
                    // Возвращение полученных данных через res promise
                    res(dataToSend)
                } else {
                    // Вызов ошибки дочернего процесса
                    throw new Error(`Python error code - ${code}`)
                }
            })
        } catch (e) {
            // Вызвращения ошибки через rej promise
            rej(e)
        }
    })
}




