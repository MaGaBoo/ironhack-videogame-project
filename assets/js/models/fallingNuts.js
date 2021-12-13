class FallingNut {
    constructor (ctx, x, y) {

        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.vy = 0;
        this.speedY = 4;

        this.width = 75;
        this.height = 75;

        this.img = new Image();
        this.img.src = '/assets/images/Prop_3.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }

    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height

            )
        }
       
    }

    move() {
        
        this.y += this.speedY;

    }
 
}