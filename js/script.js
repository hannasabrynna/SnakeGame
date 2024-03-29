const canvas = document.querySelector("canvas");
const cxt = canvas.getContext("2d");

const score = document.querySelector(".score-value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const buttonPlayAgain = document.querySelector(".btn-play");


const size = 30;
let snake = [{ x: 270, y: 240 }]

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomFoodPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomFoodColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    x: randomFoodPosition(),
    y: randomFoodPosition(),
    color: randomFoodColor()
}

const incrementScore = () => {
    score.innerText = +score.innerText + 10
}

let dead = false;
let speed = 300;
let direction;
let LoopId;

const drawSnake = () => {
    cxt.fillStyle = "#C1F2B0"
    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            cxt.fillStyle = "#65B741"
        }
        cxt.fillRect(position.x, position.y, size, size)
    })
}

const drawFood = () => {
    const { x, y, color } = food

    cxt.shadowColor = randomFoodColor()
    cxt.shadowBlur = 10
    cxt.fillStyle = randomFoodColor()
    cxt.fillRect(x, y, size, size)
    cxt.shadowBlur = 0
}

const moveSnake = () => {

    if (!direction) {
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

    for (let i = 30; i < canvas.width; i += 30) {
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

const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        incrementScore()
        snake.push(head)  //Adiciona um novo elemento (o corpo da cobrinha)

        // Gera uma nova comida com posição diferente
        let x = randomFoodPosition()
        let y = randomFoodPosition()

        //Verifica se a comida não nasceu em nenhum posição que esteja a cobrinha
        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomFoodPosition()
            y = randomFoodPosition()
        }
        food.x = x
        food.y = y
        food.color = randomFoodColor()
    }

}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (wallCollision || selfCollision) {
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined
    dead = true;

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(4px)"
}


const gameLoop = () => {
    clearInterval(LoopId)  //Limpa o loop antes de iniciar outro

    cxt.clearRect(0, 0, 600, 600)
    drawGrid()
    moveSnake()
    drawFood()
    drawSnake()
    checkEat()
    checkCollision()

    if (score.innerText <= 50) {
        speed;
    } else if (score.innerText < 100) {
        speed = 250;
    } else if (score.innerText < 200) {
        speed = 200;
    } else if (score.innerText < 300) {
        speed = 150;
    } else if (score.innerText < 400) {
        speed = 100;
    } else {
        speed = 50;
    }

    LoopId = setTimeout(() => {
        gameLoop()
    }, speed)
}
gameLoop()

document.addEventListener("keydown", ({ key }) => {

    if (dead == false) {
        if (key == "ArrowRight" && direction != "left") {
            direction = "right"
        }

        if (key == "ArrowLeft" && direction != "right") {
            direction = "left"
        }

        if (key == "ArrowDown" && direction != "up") {
            direction = "down"
        }

        if (key == "ArrowUp" && direction != "down") {
            direction = "up"
        }
    }
})

buttonPlayAgain.addEventListener("click", () => {
    dead = false;
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = [{ x: 270, y: 240 }]
})
