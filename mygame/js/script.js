window.onload = () => {
    startGame()
}

const startBtn = document.getElementById("start-btn")

function createGame() {
    startBtn.style.display = "none"
    const game = new Game("canvas")
    document.addEventListener("keydown", (event) => {
        game.onclick(event)
    })
    game.start()
}

function startGame() {
    startBtn.onclick = function() {
        createGame()
    }
}
