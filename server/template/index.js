// Формирование шаблона страницы
module.exports = function() {
    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>МПОИ КП Ковалёв А.Н. СКС-18</title>
        <style>
            #chart {
                margin: 10px;
                border: 1px solid black;
            }
        </style>
    </head>
    <body>
        <h1>test</h1>

        <canvas id="chart"></canvas>

        <script src="app.js"></script>
        <script src="https://cdn.socket.io/3.1.1/socket.io.min.js"></script>
        <script>
            // Создание экземпеляра сокета
            const socket = io('http://localhost:3000/')
            // Ожидание событий по каналу "message"
            socket.on("message", text => {
                console.log(text)
                //document.body.innerHTML = text
            })
        </script>
    </body>
    </html>
    `
}