class Cat {
    constructor(ctx, x, y, width) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width

        this.totalSpritesX = 6
        this.totalSpritesY = 1
        this.spriteX = 0
        this.spriteY = 0

        this.img = new Image()
        this.img.src = "images/normal-cat-sprite-updated.png"
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
            this.height = this.width * (this.img.height / this.totalSpritesY) / (this.img.width / this.totalSpritesX)
        }

        this.speedY = 0
        this.gravity = 0.1

        this.prevY = this.y

        this.jumpingTimes = 0
        this.isJumping = false

        this.magnetified = false
        this.starified = false

        this.spaceCat = new SpaceCat(this.ctx, this.x, this.y, 80, 3, this.speedY)
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

    move() {
        this.prevY = this.y
        this.y += this.speedY
        this.speedY += this.gravity
    }

    walkingSprite() {
        if(this.spriteX < this.totalSpritesX - 1) {
            this.spriteX++
        } else {
            this.spriteX = 0
        }
    }

    setSpaceCat() {
        this.spaceCat.draw()
        this.spaceCat.flyingSprite()
        this.spaceCat.move()
    }

    onclick(event) {
        if(event.keyCode === 32 && this.jumpingTimes < 2) {
            event.preventDefault()
            this.y -= 1
            this.speedY = -3
            this.jumpingTimes++
            this.isJumping = true
        }
        if(event.keyCode === 32 && this.starified) {
            this.spaceCat.onclick(event)
        }
    }

}