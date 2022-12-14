class DisappearingPlatform {
    constructor(ctx, x, y, width, speed, speedY) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.height = 20
        this.speed = speed
        this.speedY = speedY

        this.img = new Image()
        this.img.src = "images/disappearing-platform.png"
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
        }

        this.hasBeenJumpedOn = false
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