const islands_max = 1;

class Game {
    constructor(ctx) {
        this.ctx = ctx;

        this.background = new Background(ctx);
        this.player = new Player(ctx);
        this.islands = [];
        this.pet = [
            new Pet(ctx, 300),
            new Pet(ctx, 500)
        ]

        this.intervalId = undefined;
        this.fps = 1000 / 60;
        this.islandsFramesCount = 0;

        this.score = 0;
    }

    start() {

        if (!this.intervalId) {

            this.intervalId = setInterval(() => {

                if (this.islandsFramesCount < islands_max) {
                    this.addIslands();
                  
                }
                this.islandsFramesCount ++;
    
                this.clear();
               
                this.move();
               
                this.draw();

                this.checkCollission();
    
            }, this.fps)
            
        }
        
       
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    }

    drawScore() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = "24px sans-serif";
        this.ctx.fillText(`Saved 🐰: ${this.score}`, 30, 700);
    }


    draw() {
        this.background.draw();
        this.islands.forEach(island => island.draw());
        this.player.draw();
        this.player.update();
        this.pet.forEach(pet => pet.draw());
        this.drawScore();
    }

    move() {
        this.background.move();
        this.player.move();
        this.pet.forEach(pet => pet.move());

      
    }

    addIslands() {
        const max = this.ctx.canvas.height - 300;

        const y = Math.floor(Math.random() * max);

        this.islands.push(
            new Island (this.ctx, 0, y)
        )
    }

    
    checkCollission() {
        const petColiding = this.pet.find(pet => this.player.collidesWith(pet))
        
        if (petColiding) {
            
            this.pet = this.pet.filter(pet => pet !== petColiding);
            
            this.score++
            
        }
    }
    
    checkIslandCollision() {
        const isThereIsland = this.island.find(island => this.player.collidesWith(island));

        if (isThereIsland) {
           getOnIsland(island);
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

- what I did to GitHub? Why are there two branches? 
- background infinite scroll is not perfect: there´s a line between frames.
- score counter should move with the background, need to learn how to do it.
- player not always get the bunnies, sometimes it need to go over again
- how can I generate random islands without crash the game with millions of them?
- AND MOST IMPORTANT RIGHT NOW: how could my Player get on the islands?

*/