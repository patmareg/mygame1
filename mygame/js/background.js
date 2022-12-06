class Background {
    constructor(ctx, x, y, speedY) {
        this.ctx = ctx

        this.x = x
        this.x0 = this.x;
        this.y = y
        this.width = this.ctx.canvas.width
        this.height = this.ctx.canvas.height

        this.img = new Image()
        this.img.src = "images/background.jpg"
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
        }
        this.speed = 2
        this.speedY = speedY
       
    }

    draw() {
        if(this.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
            this.ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
            this.ctx.drawImage(this.img, this.x, this.y - this.height, this.width, this.height)
            this.ctx.drawImage(this.img, this.x + this.width, this.y - this.height, this.width, this.height)
            this.ctx.drawImage(this.img, this.x, this.y + this.height, this.width, this.height)
            this.ctx.drawImage(this.img, this.x + this.width, this.y + this.height, this.width, this.height)
        }
    }

    move() {
        this.x -= this.speed
        if(this.x <= -this.width) {
            this.x = 0
        }
    }

    moveVertically() {
        this.y += this.speedY

        if(this.y > this.height) {
            this.y = 0
        }
    }
}