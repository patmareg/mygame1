class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")
        this.intervalId = null
        
        this.platforms = [[], [], [], []]

        this.gapBetweenPlatforms = Math.floor(Math.random() * (100 - 75 + 1) + 75)

        this.cat = new Cat(this.ctx, 50, 50, 65)
        this.catFalling = false

        this.bg = new Background(this.ctx, 0, 0, 0)

        this.yarns = []
        this.magnets = []
        this.lightningBolts = []
        this.stars = []

        this.powerUps = []

        this.score = 0
        this.spriteChangeFrequency = 4

        this.gameOver = false

        this.backgroundMusic = new Audio("sounds/backgroundTrack.mp3")

        this.originalBgSpeed = 2
        this.levelUpSpeed = 0.2
    }

    start() {
        this.backgroundMusic.play()
        this.backgroundMusic.loop = true
        this.backgroundMusic.volume = 0
        let count = 0
        this.intervalId = setInterval(() => {
            if(this.cat.starified === false) {
                this.clear()
                this.checkStuff()
                this.draw(count)
                this.move()
                this.addElements(count)
                this.clearPlatforms()
                //this.placeCat(count)
                count++
            } else {
                this.clear()

                this.addElements(count)

                this.bg.draw()
                this.cat.spaceCat.draw()
                this.drawPowerUps()
                this.drawLittlePowerups()

                this.bg.move()
                this.cat.spaceCat.move()
                this.powerUps.forEach(powerUp => powerUp.move())


                if(count % this.spriteChangeFrequency === 0) {
                    this.cat.spaceCat.flyingSprite()
                }

                this.checkStuff()
                this.printScore()
                
                if(count % 10000 === 0) {
                    this.cat.starified = false
                }
                count++
            }
        }, 1000 / 60)
    }

    // start() {
    //     let count = 0
    //     this.intervalId = setInterval(() => {
    //         if(this.cat.starified === false) {
    //             this.clear()
    //             this.checkStuff()
    //             this.draw(count)
    //             this.move()
    //             this.addElements(count)
    //             this.clearPlatforms()
    //             this.placeCat(count)
    //             count++
    //         } else {
    //             this.newGame = new GameWhenSpaceCat(this.ctx, this.bg.x, this.bg.y)
    //             this.newGame.start()
    //         }
    //     }, 1000 / 60)
    // }

    draw(count) {
        this.bg.draw()
        this.platforms.forEach(row => {
            row.forEach(platform => {
                platform.draw()
            })
        } )

        if(count % this.spriteChangeFrequency === 0) {
            this.cat.walkingSprite()
        }
        this.cat.draw()

        this.drawPowerUps()

        this.makePlatformsDisappear()

        this.deleteCollidingPlatforms()
     
        this.printScore()

        this.drawLittlePowerups()
    }

    move() {
        this.platforms.forEach(row => {
            row.forEach(platform => {
                platform.move()
            })
        } )
        this.moveElementsWhilstJumping(this.cat, this.canvas, this.bg, this.platforms)
        this.bg.move()
        this.cat.move()
        this.powerUps.forEach(powerUp => powerUp.move())
    }

    addElements(count) {
        this.platforms.forEach(row => {
            this.addPlatforms(row, this.ctx, this.bg, count)
        } )
        if(this.cat.starified) {
            if(count % 50 === 0) {
                this.addPowerups("yarn")
            }
        } else {
            if(count % 100 === 0) {
                this.addPowerups("yarn")
            }
        }

        if(count % 2500 === 0 && count > 500) {
            this.addPowerups("magnet")
        }
        if(count % 3000 === 0 && count > 500) {
            this.addPowerups("lightningBolt")
        }
        if(count % 4000 === 0 && count > 500) {
            this.addPowerups("star")
        }
    }

    checkStuff() {
        this.checkForGameOver()
        this.checkCollisions()
        this.checkCollisionsCatWithPlatforms()
        this.makeMagnetWork()
    }

    placeCat(count) {
        if(count === 0) {
            this.cat.y = this.platforms[2][0].y - this.cat.height
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    onclick(event) {
        this.cat.onclick(event)
    }

    addPlatforms(typeOfPlatforms, ctx, bg, count) {
        let y = 0
        let type = ""
        const gapBetweenPlatforms = Math.floor(Math.random() * (100 - 75 + 1) + 75)
        if(typeOfPlatforms === this.platforms[0]  /*this.topPlatforms*/) {
            //y = Math.floor(Math.random() * (180 - 130 + 1) + 130)
            y = Math.floor(Math.random() * (155 - 105 + 1) + 105)
        } else if(typeOfPlatforms === this.platforms[1] /*this.middlePlatforms*/) {
            //y = Math.floor(Math.random() * (280 - 230 + 1) + 230)
            y = Math.floor(Math.random() * (255 - 205 + 1) + 205)
        } else if(typeOfPlatforms === this.platforms[2] /*this.bottomPlatforms*/) {
            //y = Math.floor(Math.random() * (380 - 320 + 1) + 320)
            y = Math.floor(Math.random() * (355 - 305 + 1) + 305)
        } else if(typeOfPlatforms === this.platforms[3]) {
            y = Math.floor(Math.random() * (455 - 405 + 1) + 405)
        } 

        if(count % 10 === 0) {
            type = "disappearing"
        } else {
            type = "normal"
        }

        function newPlatform() {
            if(type === "normal") {
                typeOfPlatforms.push(new Platform(
                    ctx,
                    typeOfPlatforms[typeOfPlatforms.length - 1].x + typeOfPlatforms[typeOfPlatforms.length - 1].width + gapBetweenPlatforms,
                    y,
                    Math.floor(Math.random() * (200 - 100 + 1) + 100),
                    bg.speed,
                    bg.speedY
                ))
            } else {
                typeOfPlatforms.push(new DisappearingPlatform(
                    ctx,
                    typeOfPlatforms[typeOfPlatforms.length - 1].x + typeOfPlatforms[typeOfPlatforms.length - 1].width + gapBetweenPlatforms,
                    y,
                    Math.floor(Math.random() * (200 - 100 + 1) + 100),
                    bg.speed,
                    bg.speedY
                ))
            }
        }
        
        if(!typeOfPlatforms.length) {
            typeOfPlatforms.push(new Platform(
                ctx,
                Math.floor(Math.random() * (30 - 10 + 1) + 10),
                y,
                Math.floor(Math.random() * (200 - 100 + 1) + 100),
                bg.speed,
                bg.speedY
            ))
        }
        
        if (typeOfPlatforms[typeOfPlatforms.length - 1].x + typeOfPlatforms[typeOfPlatforms.length - 1].width < ctx.canvas.width) {
            newPlatform()
        }
    }

    clearPlatforms() {
        this.platforms.forEach(platformFloor => {
            platformFloor.forEach(platform => {
                if(platform.X + platform.width < 0) {
                    platformFloor.splice(platformFloor.indexOf(platform), 1)
                }
            })
        })
    }

    checkCollisionsCatWithPlatforms() {
        this.platforms.forEach(platformFloor => {
            platformFloor.forEach(platform => {
                this.cat.isCollidingPlatform(platform)
            })
        })
    }

    makePlatformsDisappear() {
        this.platforms.forEach(platformFloor => {
            platformFloor.forEach(platform => {
                if(platform.hasBeenJumpedOn === true) {
                    if(this.cat.isJumping) {
                        platformFloor.splice(platformFloor.indexOf(platform), 1)
                    }
                }
            })
        })
    }

    deleteCollidingPlatforms() {
        this.platforms.forEach(platformFloor => {
            platformFloor.forEach(platform => {
                this.platforms.forEach(platformFloor2 => {
                    platformFloor2.forEach(platform2 => {
                        if(
                            platform.y + platform.height >= platform2.y 
                            && platform.y <= platform2.y + platform2.height
                            && platform.x <= platform2.x + platform2.width
                            && platform.x + platform.width >= platform2.x
                            && platform != platform2
                        ) {
                            platformFloor2.splice(platformFloor2.indexOf(platform2), 1)
                        }
                    })
                })
            })
        })
    }

    executeGameOver() {
        clearInterval(this.intervalId)
        const scorePlace = document.getElementById("score")
        scorePlace.textContent = `your score was ${this.score}`
        //this.getRanking()
        this.gameOver = true
        this.backgroundMusic.pause()
    }

    checkForGameOver() {
        // function gameOver(score, document, sound) {
        //     clearInterval(intervalId)
        //     const scorePlace = document.getElementById("score")
        //     scorePlace.textContent = `your score was ${score}`
        //     this.getRanking() // doesn't work cause it's outside of the scope of this function but slay
        //     //sound.stop()
        // }

        if(this.cat.y + this.cat.height >= this.canvas.height || this.cat.spaceCat.y + this.cat.spaceCat.height >= this.canvas.height) {
           this.executeGameOver()
        }
    }

    moveElementsWhilstJumping(cat, canvas, background, platforms) {
        let count = 0
        let catSpeedY = 0
        if(cat.y < canvas.height / 2 - cat.height && cat.isJumping) {
            if(count === 0) {
                catSpeedY = cat.speedY
            }
            background.speedY = -catSpeedY
            background.moveVertically() 
            platforms.forEach(platformFloor => {
                platformFloor.forEach(platform => {
                    platform.speedY = -catSpeedY
                    platform.moveVertically()
                })
            })
            this.powerUps.forEach(powerUp => {
                powerUp.speedY = -catSpeedY
                powerUp.moveVertically()
            })
            count++
            //cat.speedY = 0
        } /*if (cat.y > canvas.height / 2 && !cat.isJumping) {
            if(count === 0) {
                catSpeedY = cat.speedY
            }
            background.speedY = -catSpeedY
            background.moveVertically() 
            platforms.forEach(platformFloor => {
                platformFloor.forEach(platform => {
                    platform.speedY = -catSpeedY
                    platform.moveVertically()
                })
            })
            this.yarns.forEach(yarn => {
                yarn.speedY = -catSpeedY
                yarn.moveVertically()
            })
            count++
        }*/ else {
            background.speedY = 0
            platforms.forEach(platformFloor => {
                platformFloor.forEach(platform => platform.speedY = 0)
            })
            this.powerUps.forEach(powerUp => powerUp.speedY = 0)
        }
    }

    addPowerups(element) {
        const randomPlatformFloor = Math.floor(Math.random() * this.platforms.length)
        //const randomPlatform = Math.floor(Math.random() * this.platforms[randomPlatformFloor].length)
        const lastPlatform = this.platforms[randomPlatformFloor][this.platforms[randomPlatformFloor].length - 1]
        const randomY = lastPlatform.y
        const randomX = lastPlatform.x
        const randomXWithWidth = Math.floor(Math.random() * (lastPlatform.width - 0 + 1) + 0)

        if(this.cat.starified === false) {
            this.powerUps.push(new PowerUp(
                this.ctx, randomX + randomXWithWidth, randomY - 25, 25, this.bg.speed, 0, element
            ));
        } else {
            this.powerUps.push(new PowerUp(
                this.ctx,
                this.canvas.width,
                Math.floor(Math.random() * ((this.canvas.width - 50) - 25 + 1) + 25),
                25,
                this.bg.speed,
                0,
                element
            ))
        }
    }

    drawPowerUps() {
        this.powerUps.forEach(powerUp => {
            if(powerUp.x + powerUp.width >= 0) {
                powerUp.draw()
            } else {
                this.powerUps.splice(this.powerUps.indexOf(powerUp), 1)
            }
        })
    }

    checkCollisions() {
        this.powerUps.forEach(powerUp => {
            if(this.cat.isColliding(powerUp) || this.cat.spaceCat.isColliding(powerUp)) {
                if(powerUp.type === "yarn") {
                    this.score++
                    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1)
                } else if(powerUp.type === "magnet") {
                    this.cat.magnetified = true
                    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1)

                    setTimeout(() => {
                        this.cat.magnetified = false
                    }, 5000)
                } else if(powerUp.type === "lightningBolt") {
                    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1)
                    this.spriteChangeFrequency = 2
                    this.bg.speed = 5
                    this.powerUps.forEach(powerUp => {
                        powerUp.speed = this.bg.speed
                    })
                    this.platforms.forEach(platformFloor => {
                        platformFloor.forEach(platform => {
                            platform.speed = this.bg.speed
                        })
                    })

                    this.cat.bolted = true

                    setTimeout(() => {
                        this.spriteChangeFrequency = 4
                        this.bg.speed = this.originalBgSpeed
                        this.platforms.forEach(platformFloor => {
                            platformFloor.forEach(platform => {
                                platform.speed = this.bg.speed
                            })
                        })
                        this.powerUps.forEach(powerUp => {
                            powerUp.speed = this.bg.speed
                        })
                        this.cat.bolted = false
                    }, 5000)
                } else if(powerUp.type === "star") {
                    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1)
                    this.cat.starified = true
                }

                /*if(this.cat.magnetified && this.cat.x === powerUp.x && powerUp.type === "yarn") {
                    this.score++
                    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1) 
                }*/
            }
        })
    }

    makeMagnetWork() {
        if(this.cat.magnetified) {
            this.powerUps.forEach(powerUp => {
                if(powerUp.type === "yarn") {
                    if(powerUp.x < this.cat.x + this.cat.width && powerUp.x + powerUp.width > this.cat.x) {
                        this.powerUps.splice(this.powerUps.indexOf(powerUp), 1)
                        this.score++
                    }
                }
            })
        }
    }

    printScore() {
        this.ctx.fillStyle = "white"
        this.ctx.font = "15px Arial"
        this.ctx.fillText(`score: ${this.score}`, 20, 20)
    }

    stopSpaceCat() {
        if(this.cat.starified) {
            setTimeout(this.cat.starified === false, 10000)
        }
    }

    drawLittlePowerups() {
        const x = this.canvas.width - 50
        const y = 25
        const width = 25
        const height = 25

        const littleMagnet = new Image
        littleMagnet.src = "images/magnet.png"

        if(this.cat.magnetified) {
            this.ctx.drawImage(littleMagnet, x, y, width, height)
        }

        const littleStar = new Image
        littleStar.src = "images/star.png"

        if(this.cat.starified) {
            this.ctx.drawImage(littleStar, x - 50, y, width, height)
        }

        const littleBolt = new Image
        littleBolt.src = "images/lightningBolt.png"

        if(this.cat.bolted) {
            this.ctx.drawImage(littleBolt, x - 100, y, width, height)
        }

    }

    // getRanking() {
    //     let scores = localStorage.getItem("scores").split(" ")
    //     const name = document.getElementById("name-input").value
    //     scores.push([name, this.score])

    //     localStorage.setItem("scores", scores)
    //     console.log(localStorage)
    // }
}