// Размеры хэлемента
const WIDTH = 600
const HEIGHT = 200
// Внутренний отступ
const PADDING = 50
// Размеры холста
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
// Доступная область рисования с учетом внутреннего отступа
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
// Кол-во колонок
const ROWS_COUNT = 5

function chart (canvas, data) {
    
    const ctx = canvas.getContext("2d")

    // Определяем размеры элемента
    canvas.style.width = WIDTH + "px"
    canvas.style.height = HEIGHT + "px"

    // Определяем размеры холста
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT


    // Находим минимальные и максимальные значения
    const [yMin, yMax] = getMinMax(data)

    // Пропоркции по y
    const yRatio = VIEW_HEIGHT / (yMax - yMin)

    console.log(yMin, yMax)


    // Линии y axis
    ///////////////

    // определяем шаг
    const step = VIEW_HEIGHT / ROWS_COUNT
    
    // определяем шаг текстовой надписи
    const textStep = (yMax - yMin) / ROWS_COUNT

    // Начало рисования
    ctx.beginPath()

    // Стилизация текста
    ctx.font = "normal 20px Helvetica, sanc-serif"
    ctx.fillStyle = "#96a2aa"

    for (let i = 1; i <= ROWS_COUNT; i++) {
        const y = step *i

        // Перемещение кисти
        ctx.moveTo(0, y+PADDING)

        const text = Math.round(yMax - textStep * i.toString())

        // Текст на линии
        ctx.fillText(text, 5, y+PADDING-10)

        // Рисуем точку, от начала y до конца
        ctx.lineTo(DPI_WIDTH, y+PADDING)

    }

    // Соединение точек
    ctx.stroke()

    // Закрытие кисти
    ctx.closePath()

    // Стилизация кисти
    ///////////////////

    // Ширина кисти
    ctx.lineWidth = 10
    // Цвет кисти
    ctx.strokeStyle = "red"

    // Начало рисования
    ctx.beginPath()

    for (const [x, y] of data) {
        // Рисуем точку
        // DPI_HEIGHT для того что бы начало графика было слева снизу
        ctx.lineTo(x, DPI_HEIGHT - y * yRatio - PADDING)
    }

    // Соединение точек
    ctx.stroke()

    // Закрытие кисти
    ctx.closePath()
}


chart(document.getElementById("chart"), [
    [
        0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0
    ],
    [
        5, 7, 12, 20, 35, 40
    ],
    [
        8, 13, 17, 24, 37, 44
    ],
    [
        9, 14, 29, 33, 48, 59
    ],
    [
        2, 26, 74, 96, 122
    ]

])


function getMinMax(data) {


    console.log(data)

    data = data.filter((_,i) => i !== 0)

    console.log(data)

    // let yMin = 0
    // let yMax = 0

    // for (let [, y] of data) {
    //     if (yMin > y) yMin = y
    //     if (yMax < y) yMax = y
    // }

    // return [yMin, yMax]

}