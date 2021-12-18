const BUNNIES_FRAMES = 300;
const ISLANDS_FRAMES = 240;
const FALLINGNUTS_FRAMES = 60;
const ROLLINGCOCONUTS_FRAMES = 240;

class Game {
    constructor(ctx) {
        this.ctx = ctx;

        this.background = new Background(ctx);
        this.gameOverPic = new GameOverPic(ctx);
        this.cloudsBackground = new CloudsBackground(ctx);
        this.groundBackground = new GroundBackground(ctx);
        this.player = new Player(ctx);
        this.islands = [];
        this.pets = [];
        this.fallingNuts = [];
        this.rollingCoconuts = [];

        this.intervalId = undefined;
        this.fps = 1000 / 60;
        this.petFramesCount = 0;
        this.islandFramesCount = 0;
        this.fallingNutsFramesCount = 0;
        this.rollingCoconutsFramesCount = 0;

        this.score = 0;

        this.sound = new Audio('/assets/sound/POL-macaron-island-short.wav');
        this.sound.volume = 0.3;
        
        const musicLoop = this.sound;
        if (typeof musicLoop.loop == 'boolean') {
            musicLoop.loop = true;
        } else {
            musicLoop.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }

        this.gameOverSound = new Audio ('/assets/sound/mixkit-musical-game-over-959.wav');
        this.jumpSound = new Audio ('/assets/sound/Mario_Jumping-Mike_Koenig-989896458.mp3');
        this.getBunnySound = new Audio ('/assets/sound/mixkit-video-game-retro-click-237.wav');
        this.hittedByNutSound = new Audio ('/assets/sound/hittedByNut.wav')
    }

    start() {
        

        if (!this.invervalId) {

            this.sound.play();
            this.sound.currentTime = 0;

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

                if (this.rollingCoconutsFramesCount % ROLLINGCOCONUTS_FRAMES === 0) {
                    this.addRollingCoconuts();
                    this.rollingCoconutsFramesCount = 0;
                }


                this.islandFramesCount++;
                this.petFramesCount++;
                this.fallingNutsFramesCount++;
                this.rollingCoconutsFramesCount++;

                this.clear();
                this.move();
                this.draw();

                this.checkPetCollission();
                this.checkIslandsCollision();
                this.checkNutsCollision();
                this.checkCoconutsCollision();

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
        this.rollingCoconuts.forEach(rollingCoconut => rollingCoconut.draw());
        this.drawScore();

    }

   

    move() {
      
        this.cloudsBackground.move();
        this.groundBackground.move();
        this.player.move();
        this.pets.forEach(pet => pet.move());
        this.islands.forEach(island => island.move());
        this.fallingNuts.forEach(fallingNut => fallingNut.move());
        this.rollingCoconuts.forEach(rollingCoconut => rollingCoconut.move());
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

    addRollingCoconuts() {

        const coconutPadding = 5;
        const x = this.ctx.canvas.width + 75;
        const y = this.ctx.canvas.height - 75 + coconutPadding;
       
        this.rollingCoconuts.push(

            new RollingCoconut (this.ctx, x, y),
            
        )
    }

    
    checkPetCollission() {
        const petColiding = this.pets.find(pet => this.player.collidesWithPet(pet))
        
        if (petColiding) {

            this.getBunnySound.currentTime = 0;
            this.getBunnySound.play();
            
            this.pets = this.pets.filter(pet => pet !== petColiding);
            
            this.score++
            
        }
    }
     
    checkIslandsCollision() {        
        const collisionIsland = this.islands.filter(island => this.player.collidesWithIsland(island))
        if(collisionIsland.length > 0) {
            this.player.getOnIsland(collisionIsland[0].y + 20);
            
        } else {
            this.player.getOnFloor()
        }
    }

    checkNutsCollision() {
        const collisionNut = this.fallingNuts.some(nut => this.player.collidesWithNut(nut))
        if (collisionNut) {

            this.hittedByNutSound.currentTime = 0;
            this.hittedByNutSound.play();

            this.gameOver();
        
        }
    }

    checkCoconutsCollision() {
        const collisionrollingCoconut = this.rollingCoconuts.some(rollingCoconut => this.player.collidesWithRollingCoconut(rollingCoconut));
        if (collisionrollingCoconut) {

            this.gameOver();
        
        }
    }


    gameOver() {
        clearInterval(this.intervalId);

        this.ctx.save();

          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

          this.ctx.restore();

          this.sound.pause();
          this.sound.currenTime = 0;
          this.gameOverSound.play();
          this.gameOverPic.draw();
          

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
- make player look at left when change direction (photopea para recortar sprites)
- dead player sprite when nut collision (use another sprite on player class)
- fix intro screen: logo dissapears when click on screen


💡 obtener rewards (o points) saltando x veces en las plataformas y reset a cero si caes al suelo
*/