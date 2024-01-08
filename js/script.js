const canvas = document.querySelector("canvas");
const cxt = canvas.getContext("2d");

const size= 30;

const snake = [
    {x: 200, y: 200 },
    {x: 230, y: 200 }
]

const drawSnake = () => {
    cxt.fillStyle = "#ddd"
    snake.forEach((position, index) =>{
        if(index == snake.length - 1){
            cxt.fillStyle = "green"
        }
        cxt.fillRect(position.x, position.y, size, size)
    })
}

drawSnake()