class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")
        this.intervalId = null
        
        this.platforms = [[], [], []]

        this.topPlatforms = []
        this.middlePlatforms = []
        this.bottomPlatforms = []
        this.gapBetweenPlatforms = Math.floor(Math.random() * (100 - 75 + 1) + 75)

        this.cat = new Cat(this.ctx, 50, 50, 50)
        this.catFalling = false

        this.bg = new Background(this.ctx, this.cat.speedY, this.cat.gravity)

        this.yarns = []
        this.score = 0
    }

    start() {
        this.draw()
    }

    draw() {
        let count = 0
        this.intervalId = setInterval(() => {
            this.clear()
            count++

            this.bg.draw()
            this.bg.move()
            
            this.drawEveryPlatform()

            if(count === 1) {
                this.cat.y = this.platforms[1][0].y - this.cat.height
            }
            
            this.cat.draw()
            this.cat.move()
            //this.checkCollisions(this.platforms)
            if(count % 5 === 0) {
                this.cat.walkingSprite()
            }

            if(count % 100 === 0) {
                this.addYarns()
            }
            this.yarns.forEach(yarn => yarn.draw())
            this.yarns.forEach(yarn => yarn.move())

            this.checkForMovingBg(this.cat, this.canvas, this.bg)
            this.checkForGameOver(this.intervalId)

            this.checkCollisionsYarn()

        }, 1000 / 60)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    checkCollisions(platform) {
        if(this.cat.isCollidingPlatform(platform)) {
            this.cat.y = platform.y - this.cat.height;
            this.cat.speedY = 0;
            this.cat.jumpingTimes = 0
        }
    }

    onclick(event) {
        this.cat.onclick(event.keyCode)
    }

    addPlatforms(typeOfPlatforms, ctx, bg) {
        let y = 0
        const gapBetweenPlatforms = Math.floor(Math.random() * (100 - 75 + 1) + 75)
        if(typeOfPlatforms === this.platforms[0]  /*this.topPlatforms*/) {
            y = Math.floor(Math.random() * (80 - 40 + 1) + 40)
        } else if(typeOfPlatforms === this.platforms[1] /*this.middlePlatforms*/) {
            y = Math.floor(Math.random() * (180 - 130 + 1) + 130)
        } else if(typeOfPlatforms === this.platforms[2] /*this.bottomPlatforms*/) {
            y = Math.floor(Math.random() * (280 - 220 + 1) + 220)
        }

        function newPlatform() {
            typeOfPlatforms.push(new Platform(
                ctx,
                typeOfPlatforms[typeOfPlatforms.length - 1].x + typeOfPlatforms[typeOfPlatforms.length - 1].width + gapBetweenPlatforms,
                y,
                Math.floor(Math.random() * (200 - 100 + 1) + 100),
                bg.speed
            ))
        }
        
        if(!typeOfPlatforms.length) {
            typeOfPlatforms.push(new Platform(
                ctx,
                Math.floor(Math.random() * (30 - 10 + 1) + 10),
                y,
                Math.floor(Math.random() * (200 - 100 + 1) + 100),
                bg.speed
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
                this.checkCollisions(platform)
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

    checkForMovingBg(cat, canvas, background) {
        if(cat.y < canvas.height / 2 && cat.speedY <= 0) {
            background.speedY = -cat.speedY
            background.gravity = cat.gravity
            background.moveVertically() 
        }
    }

    addYarns() {
        const randomPlatformFloor = Math.floor(Math.random() * this.platforms.length)
        //const randomPlatform = Math.floor(Math.random() * this.platforms[randomPlatformFloor].length)
        console.log(this.platforms, randomPlatformFloor)
        const lastPlatform = this.platforms[randomPlatformFloor][this.platforms[randomPlatformFloor].length - 1]
        const randomY = lastPlatform.y
        
        const randomX = lastPlatform.x
        const randomXWithWidth = Math.floor(Math.random() * (lastPlatform.width - 0 + 1) + 0)

        this.yarns.push(new Yarn(
            this.ctx, randomX + randomXWithWidth, randomY - 25, 25, this.bg.speed
        ))
        console.log(this.yarns)
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

    }
}