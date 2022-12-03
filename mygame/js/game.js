class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")
        this.intervalId = null
        
        this.platforms = [[], [], [], []]

        this.gapBetweenPlatforms = Math.floor(Math.random() * (100 - 75 + 1) + 75)

        this.cat = new Cat(this.ctx, 50, 50, 75)
        this.catFalling = false

        this.bg = new Background(this.ctx, 0)

        this.yarns = []
        this.score = 0
    }

    start() {
        let count = 0
        this.intervalId = setInterval(() => {
            this.clear()
            this.draw(count)
            this.move()
            this.addElements(count)
            this.checkStuff()
            //this.placeCat(count)
            count++
        })
    }
/*
    draw() {
        let count = 0
        this.intervalId = setInterval(() => {
            this.clear()
            count++

            
            this.bg.move()
            this.cat.move()
            this.moveElementsWhilstJumping(this.cat, this.canvas, this.bg, this.platforms)
            
            this.bg.draw()
            this.drawEveryPlatform()
            this.cat.draw()

            if(count === 1) {
                this.cat.y = this.platforms[2][0].y - this.cat.height
            }
            
            //this.checkCollisions(this.platforms)
            if(count % 5 === 0) {
                this.cat.walkingSprite()
            }

            if(count % 100 === 0) {
                this.addYarns()
            }
            this.yarns.forEach(yarn => yarn.draw())
            this.yarns.forEach(yarn => yarn.move())

            this.checkForGameOver(this.intervalId)

            this.checkCollisionsYarn()
            this.printScore()

        }, 1000 / 60)
    }
*/

    draw(count) {
        this.bg.draw()
        this.drawEveryPlatform()
        if(count % 10 === 0) {
            this.cat.walkingSprite()
        }
        this.cat.draw()
        this.yarns.forEach(yarn => yarn.draw())
        this.printScore()
    }

    move() {
        this.moveElementsWhilstJumping(this.cat, this.canvas, this.bg, this.platforms)
        this.bg.move()
        this.cat.move()
        this.yarns.forEach(yarn => yarn.move())
    }

    addElements(count) {
        if(count % 100 === 0) {
            this.addYarns()
        }
    }

    checkStuff() {
        this.checkForGameOver(this.intervalId)
        this.checkCollisionsYarn()
    }

    placeCat(count) {
        if(count === 0) {
            this.cat.y = this.platforms[2][0].y - this.cat.height
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    onclick(event) {
        this.cat.onclick(event.keyCode)
    }

    addPlatforms(typeOfPlatforms, ctx, bg) {
        let y = 0
        const gapBetweenPlatforms = Math.floor(Math.random() * (100 - 75 + 1) + 75)
        if(typeOfPlatforms === this.platforms[0]  /*this.topPlatforms*/) {
            //y = Math.floor(Math.random() * (180 - 130 + 1) + 130)
            y = Math.floor(Math.random() * (155 - 105 + 1) + 105)
        } else if(typeOfPlatforms === this.platforms[1] /*this.middlePlatforms*/) {
            //y = Math.floor(Math.random() * (280 - 230 + 1) + 230)
            y = Math.floor(Math.random() * (255 - 205 + 1) + 205)
        } else if(typeOfPlatforms === this.platforms[2] /*this.bottomPlatforms*/) {
            //y = Math.floor(Math.random() * (380 - 320 + 1) + 320)
            y = Math.floor(Math.random() * (355 - 305 + 1) + 305)
        } else if(typeOfPlatforms === this.platforms[3]) {
            y = Math.floor(Math.random() * (455 - 405 + 1) + 405)
        } 

        function newPlatform() {
            typeOfPlatforms.push(new Platform(
                ctx,
                typeOfPlatforms[typeOfPlatforms.length - 1].x + typeOfPlatforms[typeOfPlatforms.length - 1].width + gapBetweenPlatforms,
                y,
                Math.floor(Math.random() * (200 - 100 + 1) + 100),
                bg.speed,
                bg.speedY
            ))
        }
        
        if(!typeOfPlatforms.length) {
            typeOfPlatforms.push(new Platform(
                ctx,
                Math.floor(Math.random() * (30 - 10 + 1) + 10),
                y,
                Math.floor(Math.random() * (200 - 100 + 1) + 100),
                bg.speed,
                bg.speedY
            ))
        }
        
        if (typeOfPlatforms[typeOfPlatforms.length - 1].x + typeOfPlatforms[typeOfPlatforms.length - 1].width < ctx.canvas.width) {
            newPlatform()
        }
    }

    movePlatforms(typeOfPlatforms) {
        typeOfPlatforms.forEach(platform => platform.move())
    }

    drawPlatforms(typeOfPlatforms){
        typeOfPlatforms.forEach(platform => platform.draw())
    }


    drawEveryPlatform() {
        this.platforms.forEach((platformFloor) => {
            this.addPlatforms(platformFloor, this.ctx, this.bg)
            this.movePlatforms(platformFloor)
            this.drawPlatforms(platformFloor)
            platformFloor.forEach(platform => {
                this.cat.isCollidingPlatform(platform)
            })
        })
    }


    checkForGameOver(intervalId) {
        function gameOver() {
            clearInterval(intervalId)
        }

        if(this.cat.y + this.cat.height >= this.canvas.height) {
            gameOver()
        }
    }

    moveElementsWhilstJumping(cat, canvas, background, platforms) {
        let count = 0
        let catSpeedY = 0
        if(cat.y < canvas.height / 2 - cat.height && cat.isJumping) {
            if(count === 0) {
                catSpeedY = cat.speedY
            }
            console.log(catSpeedY)
            background.speedY = -catSpeedY
            background.moveVertically() 
            platforms.forEach(platformFloor => {
                platformFloor.forEach(platform => {
                    platform.speedY = -catSpeedY
                    platform.moveVertically()
                })
            })
            this.yarns.forEach(yarn => {
                yarn.speedY = -catSpeedY
                yarn.moveVertically()
            })
            count++
            //cat.speedY = 0
        } else {
            background.speedY = 0
            platforms.forEach(platformFloor => {
                platformFloor.forEach(platform => platform.speedY = 0)
            })
            this.yarns.forEach(yarn => yarn.speedY = 0)
        }
    }

    addYarns() {
        const randomPlatformFloor = Math.floor(Math.random() * this.platforms.length)
        //const randomPlatform = Math.floor(Math.random() * this.platforms[randomPlatformFloor].length)
        const lastPlatform = this.platforms[randomPlatformFloor][this.platforms[randomPlatformFloor].length - 1]
        const randomY = lastPlatform.y
        
        const randomX = lastPlatform.x
        const randomXWithWidth = Math.floor(Math.random() * (lastPlatform.width - 0 + 1) + 0)

        this.yarns.push(new Yarn(
            this.ctx, randomX + randomXWithWidth, randomY - 25, 25, this.bg.speed
        ))
    }

    checkCollisionsYarn() {
        this.yarns.forEach(yarn => {
            if(this.cat.isColliding(yarn)) {
                this.score++
                this.yarns.splice(this.yarns.indexOf(yarn), 1)
            }
        })
    }

    printScore() {
        this.ctx.fillStyle = "white"
        this.ctx.fontStyle = "50px Arial"
        this.ctx.fillText(`score: ${this.score}`, 20, 20)
    }

}