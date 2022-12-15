class Rainbow {
    constructor(ctx, x, y, width) {
        this.ctx = ctx

        this.x = x
        this.y = y
        this.width = width

        this.img = new Image()
        this.img.src = "images/rainbow.png"
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
            this.height = this.img.height
        }

        this.prevY = this.y
        this.speedY = 0
        this.gravity = 0.1
    }

    draw() {
        if(this.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }

    isCollidingPlatform(obj) {
        if(this.y + this.height >= obj.y 
            && this.y <= obj.y + obj.height
            && this.x <= obj.x + obj.width
            && this.x + this.width >= obj.x
            && this.prevY <= obj.y - this.height - obj.speedY) {
                this.y = obj.y - this.height - 1;
                this.speedY = 0;
                this.jumpingTimes = 0;
                this.isJumping = false

                if(obj.hasBeenJumpedOn != undefined) {
                    obj.hasBeenJumpedOn = true
                }
            }
    }

    isColliding(obj) {
        return this.x < obj.x + obj.width
        && this.x + this.width > obj.x
        && this.y < obj.y + obj.width
        && this.y + this.height > obj.y
    }

    move(bgSpeed) {
        console.log(bgSpeed)
        this.x -= bgSpeed
    }

    walkingSprite() {
        if(this.spriteX < this.totalSpritesX - 1) {
            this.spriteX++
        } else {
            this.spriteX = 0
        }
    }
}