const BUNNIES_FRAMES = 300;
const islands_max = 5;

class Game {
    constructor(ctx) {
        this.ctx = ctx;

        this.background = new Background(ctx);
        this.player = new Player(ctx);
        this.islands = [];
        this.pets = [
            new Pet (ctx, 250),
            new Pet (ctx, 500)
        ]

        this.intervalId = undefined;
        this.fps = 1000 / 60;
        
        this.petsFramesCount = 0;
        this.islandsFramesCount = 0;

        this.score = 0;
    }

    start() {

        if (!this.invervalId) {
            this.intervalId = setInterval(() => {
       

                if (this.islandsFramesCount < islands_max) {
                    this.addIslands();
                  
                }
                this.islandsFramesCount++;

                this.clear();
                this.move();
                this.draw();

                this.checkCollission();
                this.checkIslandsCollision();
            }, this.fps)
        }
        
       
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        const alreadySavedBunnies = this.pets.length;   

        this.pets = this.pets.filter(pet => pet.x <this.ctx.canvas.width);
        if (this.pets.length < alreadySavedBunnies) {
            this.score++
        }

    }

    drawScore() {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.font = "24px sans-serif";
        this.ctx.fillText(`Saved 🐰: ${this.score}`, 30, 700);
        this.ctx.restore();
    }


    draw() {
        this.background.draw();
        this.islands.forEach(island => island.draw());
        this.player.draw();
        this.pets.forEach(pet => pet.draw());
        this.drawScore();
    }

    move() {
        this.background.move();
        this.player.move();
        this.pets.forEach(pet => pet.move());
    }


    addIslands() {
        const max = this.ctx.canvas.height - 300;

        const y = Math.floor(Math.random() * max);

        this.islands.push(
            new Island (this.ctx, 0, y)
        )
    }

    
    checkCollission() {
        const petColiding = this.pets.some(pet => this.player.collidesWith(pet))
        
        if (petColiding) {
            
            this.pet = this.pets.filter(pet => pet === petColiding);
            
            this.score++
            
        }
    }
     
    checkIslandsCollision() {
        this.islands.forEach(island => this.player.collidesWithIsland(island));
    }

    oneKeyDown(keyCode) {
        this.player.oneKeyDown(keyCode);    
    }

    oneKeyUp(keyCode) {
        this.player.oneKeyUp(keyCode);
    }

}

/* need to check/fix:

- what I did to GitHub? Why are there two branches? 
- background infinite scroll is not perfect: there´s a line between frames.
- score counter should move with the background, need to learn how to do it.
- player not always get the bunnies, sometimes it need to go over again UPDATED now player can´t get bunnies
- how can I generate random islands without crash the game with millions of them?
- where I put "update" function? Player dissapears underground when I call it.
- AND MOST IMPORTANT RIGHT NOW: how could my Player get on the islands?

- I want bunnies everywhere on the canvas and I don´t want it behind player.
*/