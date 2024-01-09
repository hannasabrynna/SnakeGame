const canvas = document.querySelector("canvas");
const cxt = canvas.getContext("2d");

const size = 30;

const snake = [{ x: 270, y: 240 }]

let direction 
let LoopId

const drawSnake = () => {
    cxt.fillStyle = "#ddd"
    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            cxt.fillStyle = "lightblue"
        }
        cxt.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if(!direction){
        return 
    }

    const head = snake[snake.length - 1] //pega o ultimo elemento do array

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift() //remove o primeiro elemento do array
}

const drawGrid = () => {
    cxt.lineWidth = 1
    cxt.strokeStyle = "#191919"

    for (let i = 30; i <canvas.width; i+=30){
        cxt.beginPath()
        cxt.lineTo(i, 0)
        cxt.lineTo(i, 600)
        cxt.stroke()

        cxt.beginPath()
        cxt.lineTo(0, i)
        cxt.lineTo(600, i)
        cxt.stroke()
    }
}


const gameLoop = () => {
   clearInterval(LoopId)  //Limpa o loop antes de iniciar outro

    cxt.clearRect(0, 0, 600, 600)
    drawGrid()
    moveSnake()
    drawSnake()

    LoopId = setTimeout(() => {
        gameLoop()
    }, 300)
}
gameLoop()

document.addEventListener("keydown", ({key}) => {
   if (key == "ArrowRight" && direction != "left"){
    direction = "right"
   }

   if (key == "ArrowLeft" && direction != "right"){
    direction = "left"
   }

   if (key == "ArrowDown" && direction != "up"){
    direction = "down"
   }

   if (key == "ArrowUp" && direction != "down"){
    direction = "up"
   }
})