module.exports = function() {
    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Hello</h1>
        <script src="https://cdn.socket.io/3.1.1/socket.io.min.js"></script>
        <script>
            const socket = io('http://localhost:3000/');
            socket.on("message", text => {
                document.querySelector("h1").innerText = text
            })
        </script>
    </body>
    </html>
    `
}