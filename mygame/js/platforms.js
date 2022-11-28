class Platform {
    constructor(ctx, x, y, width, speed) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.height = 10
        this.minimumVerticalSeparation = 30
        this.minimumHorizontalSeparation = 50

        this.img = new Image()
        this.img.src = "images/test-platform-updated.png"
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
        }

        this.speed = speed
    }

    draw() {
        if(this.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }

    move() {
        this.x -= this.speed
    }
}