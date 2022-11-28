class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")
        this.intervalId = null

        this.bg = new Background(this.ctx)
        
        this.topPlatforms = []
        this.middlePlatforms = []
        this.bottomPlatforms = []
        this.gapBetweenPlatforms = Math.floor(Math.random() * (100 - 75 + 1) + 75)

        this.cat = new Cat(this.ctx, 50, 50, 50)
        this.catFalling = false
    }

    start() {
        this.draw()
    }

    draw() {
        let catPlacementCount = 0
        let changingSprites = 0
        this.intervalId = setInterval(() => {
            this.clear()
            
            catPlacementCount++

            this.bg.draw()
            this.bg.move()
            
            this.addTopPlatforms()
            this.drawTopPlatforms()
            this.moveTopPlatforms()
            this.addMiddlePlatforms()
            this.drawMiddlePlatforms()
            this.moveMiddlePlatforms()
            /*this.addBottomPlatforms()
            this.drawBottomPlatforms()
            this.moveBottomPlatforms()*/

            this.addPlatforms(this.bottomPlatforms, this.ctx, this.bg)
            this.drawPlatforms(this.bottomPlatforms)
            this.movePlatforms(this.bottomPlatforms)

            if(catPlacementCount === 1) {
                this.cat.y = this.middlePlatforms[0].y - this.cat.height
            }
            
            this.cat.draw()
            this.cat.move()
            this.checkCollisions()
            if(changingSprites % 5 === 0) {
                this.cat.walkingSprite()
            }

            this.checkForGameOver(this.intervalId)

            changingSprites++
        }, 1000 / 60)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    
    addTopPlatforms() {
        if(!this.topPlatforms.length) {
            this.topPlatforms.push(new Platform(
                this.ctx,
                Math.floor(Math.random() * (30 - 10 + 1) + 10),
                Math.floor(Math.random() * (80 - 40 + 1) + 40),
                Math.floor(Math.random() * (200 - 100 + 1) + 100),
                this.bg.speed
            ))
        }
        
        if (this.topPlatforms[this.topPlatforms.length - 1].x + this.topPlatforms[this.topPlatforms.length - 1].width < this.ctx.canvas.width) {
            this.newTopPlatform()
        }
    }
    
    newTopPlatform() {
        this.topPlatforms.push(new Platform(
            this.ctx,
            this.topPlatforms[this.topPlatforms.length - 1].x + this.topPlatforms[this.topPlatforms.length - 1].width + this.gapBetweenPlatforms,
            Math.floor(Math.random() * (80 - 40 + 1) + 40),
            Math.floor(Math.random() * (200 - 100 + 1) + 100),
            this.bg.speed
        ))
    }

    moveTopPlatforms() {
        this.topPlatforms.forEach(platform => platform.move())
    }

    drawTopPlatforms() {
        this.topPlatforms.forEach(platform => platform.draw())
    }

    addMiddlePlatforms() {
        if(!this.middlePlatforms.length) {
            this.middlePlatforms.push(new Platform(
                this.ctx,
                Math.floor(Math.random() * (30 - 10 + 1) + 10),
                Math.floor(Math.random() * (180 - 130 + 1) + 130),
                Math.floor(Math.random() * (200 - 100 + 1) + 100),
                this.bg.speed
            ))
        }
        
        if (this.middlePlatforms[this.middlePlatforms.length - 1].x + this.middlePlatforms[this.middlePlatforms.length - 1].width < this.ctx.canvas.width) {
            this.newMiddlePlatform()
        }
    }
    
    newMiddlePlatform() {
        this.middlePlatforms.push(new Platform(
            this.ctx,
            this.middlePlatforms[this.middlePlatforms.length - 1].x + this.middlePlatforms[this.middlePlatforms.length - 1].width + this.gapBetweenPlatforms,
            Math.floor(Math.random() * (180 - 130 + 1) + 130),
            Math.floor(Math.random() * (200 - 100 + 1) + 100),
            this.bg.speed
        ))
    }

    moveMiddlePlatforms() {
        this.middlePlatforms.forEach(platform => platform.move())
    }

    drawMiddlePlatforms() {
        this.middlePlatforms.forEach(platform => platform.draw())
    }

    /*addBottomPlatforms() {
        if(!this.bottomPlatforms.length) {
            this.bottomPlatforms.push(new Platform(
                this.ctx,
                Math.floor(Math.random() * (30 - 10 + 1) + 10),
                Math.floor(Math.random() * (280 - 230 + 1) + 230),
                Math.floor(Math.random() * (200 - 100 + 1) + 100),
                this.bg.speed
            ))
        }
        
        if (this.bottomPlatforms[this.bottomPlatforms.length - 1].x + this.bottomPlatforms[this.bottomPlatforms.length - 1].width < this.ctx.canvas.width) {
            this.newBottomPlatform()
        }
    }
    
    newBottomPlatform() {
        this.bottomPlatforms.push(new Platform(
            this.ctx,
            this.bottomPlatforms[this.bottomPlatforms.length - 1].x + this.bottomPlatforms[this.bottomPlatforms.length - 1].width + this.gapBetweenPlatforms,
            Math.floor(Math.random() * (280 - 230 + 1) + 230),
            Math.floor(Math.random() * (200 - 100 + 1) + 100),
            this.bg.speed
        ))
    }

    moveBottomPlatforms() {
        this.bottomPlatforms.forEach(platform => platform.move())
    }

    drawBottomPlatforms() {
        this.bottomPlatforms.forEach(platform => platform.draw())
    }*/

    checkCollisions() {
        const platforms = [...this.topPlatforms, ...this.middlePlatforms, ...this.bottomPlatforms]
        platforms.forEach(platform => {
            if(this.cat.isReady) {
                if(this.cat.isColliding(platform)) {
                    this.cat.y = platform.y - this.cat.height;
                    this.cat.speedY = 0;
                    this.cat.jumpingTimes = 0
                } 
            }
        })
    }

    onclick(event) {
        this.cat.onclick(event.keyCode)
    }

    // didn't work but u should try to figure it out when ur done with the rest :)
    addPlatforms(typeOfPlatforms, ctx, bg) {
        let y = 0
        const gapBetweenPlatforms = Math.floor(Math.random() * (100 - 75 + 1) + 75)
        if(typeOfPlatforms === this.topPlatforms) {
            y = Math.floor(Math.random() * (80 - 40 + 1) + 40)
            console.log("slaynt")
        } else if(typeOfPlatforms === this.middlePlatforms) {
            y = Math.floor(Math.random() * (180 - 130 + 1) + 130)
        } else if(typeOfPlatforms === this.bottomPlatforms) {
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

    checkForGameOver(intervalId) {
        function gameOver() {
            clearInterval(intervalId)
        }

        if(this.cat.y + this.cat.height >= this.canvas.height) {
            gameOver()
        }
    }
}