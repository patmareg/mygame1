window.onload = () => {
    startGame()
}

const startBtn = document.getElementById("start-btn")

function createGame() {
    startBtn.style.display = "none"
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
