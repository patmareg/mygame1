window.onload = () => {
    waitForRestart()
    prepareGame()
    startGame()
}

const startScreen = document.getElementById("start-screen")
const startBtn = document.getElementById("start-btn")

const gameScreen = document.getElementById("canvas")

const gameOverScreen = document.getElementById("game-over-screen")

const restartBtn = document.getElementById("restart-btn")

function createGame() {
    startScreen.style.display = "none"
    const game = new Game("canvas")
    game.start()
    document.addEventListener("keydown", (event) => {
        game.onclick(event)
    })

    setInterval(() => {
        if(game.gameOver) {
            // gameScreen.style.display = "none"
            gameOverScreen.style.display = "block"
            game.gameOver = true
        }
    }, 1000 / 60)
}

function prepareGame() {
    gameOverScreen.style.display = "none"
}

function startGame() {
    startBtn.onclick = function() {
        createGame()
    }
}

function waitForRestart() {
    restartBtn.addEventListener("click", () => {
        prepareGame()
    })    
}