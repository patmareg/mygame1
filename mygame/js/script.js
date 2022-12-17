window.onload = () => {
    waitForRestart()
    waitForRanking()
    // waitForPause()
    prepareGame()
    startGame()
}

const startScreen = document.getElementById("start-screen")
const startBtn = document.getElementById("start-btn")

const rulesScreen = document.getElementById("rules-screen")
const rulesBtn = document.getElementById("rules-btn")
const goBackFromRulesBtn = document.getElementById("go-back-from-rules-btn")

// const gameScreen = document.getElementById("canvas")
const gameScreen = document.getElementById("canvas-div")
const pauseBtn = document.getElementById("pause")

const gameOverScreen = document.getElementById("game-over-screen")

const restartBtn = document.getElementById("restart-btn")
const rankingBtn = document.getElementById("ranking-btn")

const form = document.getElementById("get-name-form")
const input = document.querySelector("#get-name-form input")
const formButton = document.getElementById("save-btn")

const ranking = document.getElementById("ranking")
const goBackBtn = document.getElementById("go-back-btn")

let score = 0
let game;

function createGame() {
    document.addEventListener("click", (e) => {
        console.log(e.target)
    })

    startScreen.style.display = "none"
    form.style.display = "none"

    // rainbowCanvas = new RainbowCanvas("rainbow-canvas")
  

    // rainbowCanvas.game = game
    game = new Game("canvas")
    game.start()
    document.addEventListener("keydown", (event) => {
        game.onclick(event)
    })

    let count = 0

    setInterval(() => {
        if (game.gameOver) {
            // gameScreen.style.display = "none"
            gameOverScreen.style.display = "block"
            game.gameOver = false
            score = game.score
        }
        count++
    }, 1000 / 60)
}

function prepareGame() {
    rulesScreen.style.display = "none"
    gameOverScreen.style.display = "none"
    form.style.display = "none"
    ranking.style.display = "none"
}

function startGame() {
    startBtn.onclick = function () {
        createGame()
    }
}

function waitForRestart() {
    restartBtn.addEventListener("click", () => {
        window.location.reload()
    })
}

function waitForRanking() {
    // form.submit(function(event){
    //     event.preventDefault()
    // })

    formButton.addEventListener("click", (event) => {
        event.preventDefault();
        const name = input.value;
        const score = game.score;

        if (name) {
            let currentScore = window.localStorage.getItem('score');
            if (currentScore) {
                currentScore = JSON.parse(currentScore);
                currentScore.push({ name, score });
                currentScore.sort((player1, player2) => {
                    return player2.score - player1.score
                })
                console.log(currentScore)
                let count = 0
                currentScore.forEach(player => {
                    count++
                    console.log(player)
                    if (count <= 5) {
                        document.getElementById(`place${count}`).textContent = `${player.name}: ${player.score}`
                    }
                })
                window.localStorage.setItem('score', JSON.stringify(currentScore))
                form.style.display = "none"
                ranking.style.display = "block"

            } else {
                window.localStorage.setItem('score', JSON.stringify([{ name, score }]))
                form.style.display = "none"
                ranking.style.display = "block"
                document.getElementById("place1").textContent = `${name}: ${score}`
            }
        }
    })

    const saveRanking = () => {
        form.style.display = "block"
        gameOverScreen.style.display = "none"
    }

    rankingBtn.addEventListener("click", saveRanking)

    goBackBtn.addEventListener("click", () => {
        ranking.style.display = "none"
        rankingBtn.textContent = "RANKING"
        gameOverScreen.style.display = "block"
        rankingBtn.removeEventListener("click", saveRanking)
        rankingBtn.addEventListener("click", () => {
            gameOverScreen.style.display = "none"
            ranking.style.display = "block"
        })
    })

    rulesBtn.addEventListener("click", () => {
        startScreen.style.display = "none"
        rulesScreen.style.display = "block"
    })

    goBackFromRulesBtn.addEventListener("click", () => {
        rulesScreen.style.display = "none"
        startScreen.style.display = "block"
    })

}

// function waitForPause() {
//     pauseBtn.addEventListener("click", () => {
//         console.log("slay?")
//     })
// }

// function waitForPause() {
//     pauseBtn.addEventListener("click", () => {
//         window.location.reload()
//     })
// }