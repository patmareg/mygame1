/*class Star {
    constructor(ctx, x, y, width, speed, speedY, type) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.speed = speed
        this.speedY = speedY
        this.type = type;
        
        this.img = new Image()
        this.img.src = `./images/${this.type}.png`
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
            this.height = this.width * this.img.height / this.img.width
        }
    }

    draw() {
        if(this.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }

    move() {
        this.x -= this.speed
    }

    moveVertically() {
        this.y += this.speedY
    }
}*/

class PowerUp {
    constructor(ctx, x, y, width, speed, speedY, type) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.speed = speed
        this.speedY = speedY
        this.type = type;
        
        this.img = new Image()
        this.img.src = `./images/${this.type}.png`
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
            this.height = this.width * this.img.height / this.img.width
        }
    }

    draw() {
        if(this.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }

    move() {
        this.x -= this.speed
    }

    moveVertically() {
        this.y += this.speedY
    }
}