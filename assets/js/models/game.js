const BUNNIES_FRAMES = 300;
const ISLANDS_FRAMES = 240;
const FALLINGNUTS_FRAMES = 60;

class Game {
    constructor(ctx) {
        this.ctx = ctx;

        this.background = new Background(ctx);
        this.cloudsBackground = new CloudsBackground(ctx);
        this.groundBackground = new GroundBackground(ctx);
        this.player = new Player(ctx);
        this.islands = [];
        this.pets = [];
        this.fallingNuts = [];

        this.intervalId = undefined;
        this.fps = 1000 / 60;
        this.petFramesCount = 0;
        this.islandFramesCount = 0;
        this.fallingNutsFramesCount = 0;

        this.score = 0;
    }

    start() {

        if (!this.invervalId) {
            this.intervalId = setInterval(() => {
       

                if (this.islandFramesCount % ISLANDS_FRAMES === 0) {
                    this.addIslands();
                    this.islandFramesCount = 0;
                  
                }

                if (this.petFramesCount % BUNNIES_FRAMES === 0) {
                    this.addPets();
                    this.petFramesCount = 0;
                }

                if (this.fallingNutsFramesCount % FALLINGNUTS_FRAMES === 0) {
                    this.addFallingNuts();
                    this.fallingNutsFramesCount = 0;
                }

                this.islandFramesCount++;
                this.petFramesCount++;
                this.fallingNutsFramesCount++;

                this.clear();
                this.move();
                this.draw();

                this.checkPetCollission();
                this.checkIslandsCollision();
                this.checkNutsCollision();

            }, this.fps)
        }     
       
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    }

    drawScore() {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.font = "36px sans-serif";
        this.ctx.fillText(`Saved 🐰: ${this.score}`, 30, 700);
        this.ctx.restore();
    }


    draw() {
        this.background.draw();
        this.cloudsBackground.draw();
        this.groundBackground.draw();
        this.islands.forEach(island => island.draw());
        this.player.draw();
        this.pets.forEach(pet => pet.draw());
        this.fallingNuts.forEach(fallingNut => fallingNut.draw());
        this.drawScore();
    }

   

    move() {
      
        this.cloudsBackground.move();
        this.groundBackground.move();
        this.player.move();
        this.pets.forEach(pet => pet.move());
        this.islands.forEach(island => island.move());
        this.fallingNuts.forEach(fallingNut => fallingNut.move());
    }

        addPets() {
        const petWidth = 75;
        const petHeight = 75;
        const petBottomPadding = 10;
        
        const x = this.ctx.canvas.width;
        const y = this.ctx.canvas.height - petHeight + petBottomPadding;
        const randomIsland = this.islands.filter(island => island.x > this.ctx.canvas.width)[Math.floor(Math.random() * this.islands.length)];
        const randomIslandXPosition = randomIsland?.x + 30;
        const randomIslandYPosition = randomIsland?.y - petHeight + petBottomPadding + 18;
        
        if(randomIsland) {
            this.pets.push(
                new Pet (this.ctx, randomIslandXPosition, randomIslandYPosition, petWidth, petHeight)
                )
            } else {
                this.pets.push(
                    new Pet (this.ctx, x, y, petWidth, petHeight)
                    )
                }
            }
        
     addIslands() {
         
                const max = 600;
                const min = 930;
                const y = Math.floor(Math.random() * (max - min + 1) + min);
        
                this.islands.push(
                    new Island (this.ctx, this.ctx.canvas.width + 50, y)
                )
            }

    addFallingNuts() {

       const maxWidth = 1910;
       const minWidth = 500;
      
        const x = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
        const y = 0;

        this.fallingNuts.push(
            new FallingNut (this.ctx, x, y)
        )
           
    }

    
    checkPetCollission() {
        const petColiding = this.pets.find(pet => this.player.collidesWithPet(pet))
        
        if (petColiding) {
            
            this.pets = this.pets.filter(pet => pet !== petColiding);
            
            this.score++
            
        }
    }
     
    checkIslandsCollision() {        
        const collisionIsland = this.islands.filter(island => this.player.collidesWithIsland(island))
        if(collisionIsland.length > 0) {
            this.player.getOnIsland(collisionIsland[0].y + 20)
        } else {
            this.player.getOnFloor()
        }
    }

    checkNutsCollision() {
        const collisionNut = this.fallingNuts.some(nut => this.player.collidesWithNut(nut))
        if (collisionNut) {

            this.gameOver();
        }
    }

    gameOver() {
        clearInterval(this.intervalId);

        this.ctx.save();

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

          this.ctx.fillStyle = 'white';
          this.ctx.textAlign = 'center'
          this.ctx.font = 'bold 132px sans-serif'
          this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)
      
          this.ctx.restore()
    }

    oneKeyDown(keyCode) {
        this.player.oneKeyDown(keyCode);    
    }

    oneKeyUp(keyCode) {
        this.player.oneKeyUp(keyCode);
    }

}

/* need to check/fix:

- fix player-nut collision 
- remake nut sprite for better appearance
- make player look at left when change direction
- dead player sprite when nut collision

- background image for intro screen
- change start button color (pantone very peri no pega por mucho que te encante)

💡 obtener rewards (o points) saltando x veces en las plataformas y reset a cero si caes al suelo
*/