const BUNNIES_FRAMES = 180;
const CATS_FRAMES = 1200;
const ISLANDS_FRAMES = 240;
const FALLINGNUTS_FRAMES = 60;
const ROLLINGCOCONUTS_FRAMES = 240;

class Game {
    constructor(ctx) {
        this.ctx = ctx;

        this.background = new Background(ctx);
        this.gameOverPic = new GameOverPic(ctx);
        this.counterImg = new CounterImg(ctx);
        this.cloudsBackground = new CloudsBackground(ctx);
        this.groundBackground = new GroundBackground(ctx);
        this.player = new Player(ctx);
        this.islands = [];
        this.pets = [];
        this.cats = [];
        this.fallingNuts = [];
        this.rollingCoconuts = [];

        this.intervalId = undefined;
        this.fps = 1000 / 60;
        this.petFramesCount = 0;
        this.catsFramesCount = 0;
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
        this.hittedByNutSound = new Audio ('/assets/sound/hittedByNut.wav');
        this.bonusCatSound = new Audio ('/assets/sound/mixkit-angry-cartoon-kitty-meow-94.wav');
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

                if (this.catsFramesCount % CATS_FRAMES === 0) {
                    this.addCats();
                    this.catsFramesCount = 0;
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
                this.catsFramesCount++;
                this.fallingNutsFramesCount++;
                this.rollingCoconutsFramesCount++;

                this.clear();
                this.move();
                this.draw();

                this.checkPetCollission();
                this.checkIslandsCollision();
                this.checkNutsCollision();
                this.checkCoconutsCollision();
                this.checkCatCollission();

            }, this.fps)
        }     
       
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    }

    drawScore() {
        this.ctx.save();
        this.counterImg.draw();
        this.ctx.fillStyle = '#665878';
        this.ctx.font = "48px sans-serif";
        this.ctx.fillText(`Saved 🐰: ${this.score}`, 190, 165);
        

        this.ctx.restore();
    }


    draw() {
        
        this.background.draw();
        this.cloudsBackground.draw();
        this.groundBackground.draw();
        this.islands.forEach(island => island.draw());
        this.player.draw();
        this.pets.forEach(pet => pet.draw());
        this.cats.forEach(cat => cat.draw());
        this.fallingNuts.forEach(fallingNut => fallingNut.draw());
        this.rollingCoconuts.forEach(rollingCoconut => rollingCoconut.draw());
        this.drawScore();

    }

    move() {
      
        this.cloudsBackground.move();
        this.groundBackground.move();
        this.player.move();
        this.pets.forEach(pet => pet.move());
        this.cats.forEach(cat => cat.move());
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

    addCats() {

                const catWidth = 100;
                const catHeight = 100;
                const catBottomPadding = 15;
                
                const x = this.ctx.canvas.width;
                const y = this.ctx.canvas.height - catHeight + catBottomPadding;
               
               this.cats.push(
                            new Cat (this.ctx, x, y, catWidth, catHeight)
                            )
                    
                    }

                    /* ¿¿cómo poner un setTimeOut aquí?? */

        
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

    checkCatCollission() {
        const catColiding = this.cats.find(cat => this.player.collidesWithCat(cat))
        
        if (catColiding) {

            this.bonusCatSound.currentTime = 0;
            this.bonusCatSound.play();
            
            this.cats = this.cats.filter(cat => cat !== catColiding);
            
            this.player.vy = -40;
            
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
            this.gameOver === true;  
        
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

          this.ctx.font = '64px sans-serif';
          this.ctx.fillStyle = 'white';

          if (this.score === 0) {

              this.ctx.fillText(`You saved no bunnies at all!`, 600, 1000);

          } else if (this.score === 1) {

            this.ctx.fillText(`You saved ${this.score} bunny!!`, 680, 1000);

          } else {

            this.ctx.fillText(`You saved ${this.score} bunnies!!`, 680, 1000);
          }    

    }

    oneKeyDown(keyCode) {
        this.player.oneKeyDown(keyCode);    
    }

    oneKeyUp(keyCode) {
        this.player.oneKeyUp(keyCode);
    }

}

/* need to check/fix:

- fix intro screen: logo dissapears when click on screen. do something just when click start
- make score counter cuter (adding an image maybe?)


💡 obtener rewards (o points) saltando x veces en las plataformas y reset a cero si caes al suelo
*/