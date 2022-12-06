window.onload = () => {
    startGame()
}

const startScreen = document.getElementById("start-screen")
const startBtn = document.getElementById("start-btn")

function createGame() {
    startScreen.style.display = "none"
    const game = new Game("canvas")
    game.start()
    document.addEventListener("keydown", (event) => {
        game.onclick(event)
    })
}

function startGame() {
    startBtn.onclick = function() {
        createGame()
    }
}
