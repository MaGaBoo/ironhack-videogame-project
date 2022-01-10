class FallingNut {
    constructor (ctx, x, y) {

        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.vy = 3;
        this.gravity = 0.2;

        this.width = 75;
        this.height = 75;

        this.img = new Image();
        this.img.src = './assets/images/fallingNutSprite.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        
        }

        this.horizontalFrames = 5;
        this.verticalFrames = 1;

        this.xFrame = 0;
        this.yFrame = 0;

        this.tick = 0;

    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                (this.img.width * this.xFrame) / this.horizontalFrames,
                (this.img.height * this.yFrame) / this.verticalFrames,
                this.img.width / this.horizontalFrames,
                this.img.height / this.verticalFrames,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }

        this.tick++
       
    }

    move() {

        if (this.tick % 4 === 0) {
            this.xFrame++
        }

        if (this.xFrame >= this.horizontalFrames) {
            this.xFrame = 0
        }
        
        this.vy += this.gravity;
        this.y += this.vy;

    }
   
 
}