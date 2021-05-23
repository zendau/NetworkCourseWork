// Размеры хэлемента
const WIDTH = 800
const HEIGHT = 500
// Внутренний отступ
const PADDING = 50
// Размеры холста
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
// Доступная область рисования с учетом внутреннего отступа
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const VIEW_WIDTH = DPI_WIDTH
// Кол-во колонок
const ROWS_COUNT = 5
// степень сглаживания графика
const SMOOT = 5

// Функция для построения графика
function chart (canvas, data, SMOOT) {
    
    // Создание холста
    const ctx = canvas.getContext("2d")

    // Получение данных для построения
    const yData = data.filter((_,i) => i !== 0)
    const xData = data[0]


    // Определяем размеры элемента
    canvas.style.width = WIDTH + "px"
    canvas.style.height = HEIGHT + "px"

    // Определяем размеры холста
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT


    // Находим минимальные и максимальные значения
    const [yMin, yMax] = getMinMax(yData)

    // Пропорция по y
    const yRatio = VIEW_HEIGHT / (yMax - yMin)
    // Пропорция по x
    const xRatio = VIEW_WIDTH / ( yData[0].length - 1)

    console.log(yMin, yMax)


    // Линии "y" axis
    yAxis(ctx, yMin, yMax)
    // Линии "x" axis
    xAxis(ctx, xData, xRatio)

    
    // Перебор колонок с данными для построения
    yData.forEach(col => {
        // Определение "x" и "y"
        let coords = col.map((y,i) => {
            return [
                Math.floor(i * xRatio),
                Math.floor(DPI_HEIGHT - PADDING - y * yRatio)
            ]
        })
        console.log(coords)


        // Сглаживание графика
        for (let i = 0; i < SMOOT; i++) {
            coords = roundData(coords)
        }

        const rdmColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase()

        // Отрисовывание линии
        drawLine(ctx, coords, rdmColor)
    })
    
}

// Функция для определения максимального и минимального числа
function getMinMax(data) {

    let yMin = 0
    let yMax = 0

    // Перебор по колонкам
    data.forEach(item => {
        // Перебор колонки
        item.forEach(y => {
            if (yMin > y) yMin = y
            if (yMax < y) yMax = y
        })  
    })

    console.log("minMax",yMin, yMax)

    return [yMin, yMax]

}


// Функция для рисования линий на графике
function drawLine(ctx, coords, color) {
    // Стилизация кисти
    ///////////////////

    // Ширина кисти
    ctx.lineWidth = 2
    // Цвет кисти
    ctx.strokeStyle = color

    // Начало рисования
    ctx.beginPath()

    for (const [x, y] of coords) {
        // Рисуем точку
        // DPI_HEIGHT для того что бы начало графика было слева снизу
        //ctx.lineTo(x, DPI_HEIGHT - y * yRatio - PADDING)
        ctx.lineTo(x, y)
    }

    // Соединение точек
    ctx.stroke()

    // Закрытие кисти
    ctx.closePath()
}

// Функция для рисования "Y axis"
function yAxis(ctx, yMin, yMax) {
    // определяем шаг
    const step = VIEW_HEIGHT / ROWS_COUNT
    
    // определяем шаг текстовой надписи
    const textStep = (yMax - yMin) / ROWS_COUNT

    // Начало рисования
    ctx.beginPath()

    // Стилизация текста
    ctx.font = "normal 20px Helvetica, sanc-serif"
    ctx.fillStyle = "#96a2aa"

    // Перемещение кисти
    ctx.moveTo(0, PADDING)

    const text = yMax.toFixed(2).toString()

    // Текст на линии
    ctx.fillText(text, 5, PADDING-10)

    // Рисуем точку, от начала y до конца
    ctx.lineTo(DPI_WIDTH, PADDING-10)

    for (let i = 1; i <= ROWS_COUNT; i++) {
        const y = step *i

        // Перемещение кисти
        ctx.moveTo(0, y+PADDING)

        const text = (yMax - textStep * i).toFixed(2).toString()

        // Текст на линии
        ctx.fillText(text, 5, y+PADDING-10)

        // Рисуем точку, от начала y до конца
        ctx.lineTo(DPI_WIDTH, y+PADDING)

    }

    // Соединение точек
    ctx.stroke()

    // Закрытие кисти
    ctx.closePath()
}

// Функция для рисования "X axis"
function xAxis(ctx, data, xRatio) {

    // Кол-во колонок
    const colsCount = 6
    // Шаг построения
    const step = Math.round(data.length / colsCount)

    // Начало рисования
    ctx.beginPath()

    // Построение "X axis"
    for (let i = 0; i < data.length;i += step) {

        // если первая итерация то пропустить, так как значение 0 уже отрисовано по оси Y
        if (i === 0) continue

        // Нахождение координаты x с учетом пропорции
        const x = i * xRatio
        console.log("x", x)
        // Отрисовка текста
        ctx.fillText(data[i], x, DPI_HEIGHT-5)
    }

    console.log("x1", data.length * xRatio)
    console.log("data", data[data.length-1])

    // Отрисовка текста для последней позиции массива
    ctx.fillText(data[data.length-1], VIEW_WIDTH-35, DPI_HEIGHT-5)

    // Конец рисования
    ctx.closePath()
}

// Функция для сглаживания линий на графике
function roundData(coords) {
    // Массив хранящий новые координаты
    const newCoords = []

    // Определение новых координат с помощью алгоритма "Скользящая средняя"
    for (let i = 1; i <= coords.length- 2; i+=2) {
        newCoords.push([
            coords[i][0],
             Math.floor((coords[i-1][1] + coords[i][1] + coords[i+1][1]) / 3)
            ])
    }

    // Компенсация размера графика, так как кол-во точек было уменьшино

    // Дублирование первого элемента
    newCoords.unshift([0, newCoords[0][1]])

    // Добавление средних арифметических в начале графика
    for (let i = 1; i <= 8; i++) {
        newCoords.splice(i, 0, [
            (newCoords[i-1][0]+newCoords[i][0])/2,
            (newCoords[i-1][1]+newCoords[i][1])/2
        ])
    }

    // newCoords.splice(1, 0, [(newCoords[0][0]+newCoords[1][0])/2, (newCoords[0][1]+newCoords[1][1])/2])
    // newCoords.splice(2, 0, [(newCoords[1][0]+newCoords[2][0])/2, (newCoords[1][1]+newCoords[2][1])/2])
    // newCoords.splice(3, 0, [(newCoords[2][0]+newCoords[3][0])/2, (newCoords[2][1]+newCoords[3][1])/2])
    // newCoords.splice(4, 0, [(newCoords[3][0]+newCoords[4][0])/2, (newCoords[3][1]+newCoords[4][1])/2])
    // newCoords.splice(5, 0, [(newCoords[4][0]+newCoords[5][0])/2, (newCoords[4][1]+newCoords[5][1])/2])
    // newCoords.splice(6, 0, [(newCoords[5][0]+newCoords[6][0])/2, (newCoords[5][1]+newCoords[6][1])/2])
    // newCoords.splice(7, 0, [(newCoords[6][0]+newCoords[7][0])/2, (newCoords[6][1]+newCoords[7][1])/2])
    // newCoords.splice(8, 0, [(newCoords[7][0]+newCoords[8][0])/2, (newCoords[7][1]+newCoords[8][1])/2])

    // Дублирование элементов в конце графика
    newCoords.push([newCoords[newCoords.length-1][0], newCoords[newCoords.length-1][1]])
    newCoords.push([newCoords[newCoords.length-1][0], newCoords[newCoords.length-1][1]])
    newCoords.push([newCoords[newCoords.length-1][0], newCoords[newCoords.length-1][1]])

    return newCoords
}

