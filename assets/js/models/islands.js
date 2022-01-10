class Island {
    constructor (ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.width = 130;
        this.height = 70;

        this.vx = 3;
        

        this.img = new Image();
        this.img.src = "./assets/images/Pad_02_1.png";
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
        this.x -= this.vx;
    }
}