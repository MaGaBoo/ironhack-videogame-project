const platforms_max = 1;

class Game {
    constructor(ctx) {
        this.ctx = ctx;

        this.background = new Background(ctx);
        this.player = new Player(ctx);
        this.platforms = [];

        this.intervalId = undefined;
        this.fps = 1000 / 60;
        this.platformsFramesCount = 0;
    }

    start() {

        if (!this.intervalId) {

            this.intervalId = setInterval(() => {

                if (this.platformsFramesCount < platforms_max) {
                    this.addPlatforms();
                  
                }
                this.platformsFramesCount ++;
    
                this.clear();
               
                this.move();
               
                this.draw();
    
            }, this.fps)
            
        }
        
       
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    }


    draw() {
        this.background.draw();
        this.platforms.forEach(platform => platform.draw());
        this.player.draw();
        this.player.update();
    }

    move() {
        /* this.background.move(); */
        this.player.move();

       /*  this.platforms.forEach(platform => platform.move()); */
    }

    addPlatforms() {
        const max = this.ctx.canvas.height - 300;

        const y = Math.floor(Math.random() * max);

        this.platforms.push(
            new Platform (this.ctx, 0, y)
        )
    }

    oneKeyDown(keyCode) {
        this.player.oneKeyDown(keyCode);    
    }

    oneKeyUp(keyCode) {
        this.player.oneKeyUp(keyCode);
    }
}

/* need to fix:

- platforms everywhere on the screen
- what I did with GitHub? Why there are two branches? */