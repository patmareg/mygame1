class Background {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 0
        this.y = 0
        this.width = this.ctx.canvas.width
        this.height = this.ctx.canvas.height

        this.img = new Image()
        this.img.src = "images/background.jpg"
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
        }

        this.speed = 1
    }

    draw() {
        if(this.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
            this.ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
        }
    }

    move() {
        this.x -= this.speed
        if(this.x <= -this.width) {
            this.x = 0
        }
    }
}