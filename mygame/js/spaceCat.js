class SpaceCat {
    constructor(ctx, x, y, width, speed, speedY) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.speed = speed
        this.speedY = speedY

        this.totalSpritesX = 4
        this.totalSpritesY = 1
        this.spriteX = 0
        this.spriteY = 0

        this.img = new Image()
        this.img.src = "images/spaceship-cat.png"
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
            this.height = this.width * (this.img.height/this.totalSpritesY) / (this.img.width/this.totalSpritesX)
        }

        this.prevY = this.y
        this.gravity = 0.1
    }

    draw() {
        if(this.isReady) {
            this.ctx.drawImage(
                this.img,
                this.img.width / this.totalSpritesX * this.spriteX,
                this.img.height / this.totalSpritesY * this.spriteY,
                this.img.width / this.totalSpritesX,
                this.img.height / this.totalSpritesY,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }

    flyingSprite() {
        if(this.spriteX < this.totalSpritesX - 1) {
            this.spriteX++
        } else {
            this.spriteX = 0
        }
    }

    isColliding(obj) {
        return this.x < obj.x + obj.width
        && this.x + this.width > obj.x
        && this.y < obj.y + obj.width
        && this.y + this.height > obj.y
    }

    move() {
        this.prevY = this.y
        this.y += this.speedY
        this.speedY += this.gravity
    }

    onclick(event) {
        if(event.keyCode === 32) {
            event.preventDefault()
            this.y -= 1
            this.speedY = -3
        }
    }
}