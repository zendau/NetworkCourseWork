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

            body {
                background-color: #feddbe;
            }

            h1, h2 {
                text-align: center;
            }

            .section__header {
                margin: 20px 0;
            }

            #chart {
                -webkit-box-shadow: 4px 4px 11px 4px rgba(34, 60, 80, 0.2);
                -moz-box-shadow: 4px 4px 11px 4px rgba(34, 60, 80, 0.2);
                box-shadow: 4px 4px 11px 4px rgba(34, 60, 80, 0.2);
            }

            .containerGroup {
                display: flex;
            }

            .container__item {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 200px;
            }
            #toTop {
                position: fixed;
                bottom: 10px;
                right: 10px;
            }
            #number {
                max-width: 100px
            }
            .table th, .table td, .table th {
                text-align: center;
            }
            
            .form-check__checkbox {
                margin-top: 10px;
            }

            .section__container {
                margin: 0 auto;
            }

            .section__container .d-flex {
                justify-content: space-evenly;
            }
        </style>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head>
    <body>
        <div class="container d-flex flex-column">

        <h1>График <span>выхода датчиков</span></h1>

        <canvas id="chart"></canvas>
        <div class="form-check form-check__checkbox">
            <label for="check">Включить режим сглажевания графика</label>
            <input type="checkbox" checked id="check">
        </div>
        

        <h2 class="section__header">Значения</h2>

        <div class="section__container">
            <p>Перейти к значению (всего <span id="count"></span>)</p>
            <div class="form-group d-flex">
                <input id="number" class="form-control" type="number" min="0" max="255" placeholder="0">
                <button id="teleport" class="btn btn-primary">Перейти</button>
            </div>
        </div>


        <table class="table"></table>

        <div class="containerGroup"></div>
        </div>

        <button id="toTop" class="btn btn-dark">Наверх</button>
        <script src="https://cdn.socket.io/3.1.1/socket.io.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script src="./public/main.bundle.js"></script>
    </body>
    </html>
    `
}
