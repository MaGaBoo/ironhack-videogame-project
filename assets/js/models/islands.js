class Island {
    constructor (ctx, x, y) {
        this.ctx = ctx;

        this.x = (this.ctx.canvas.width /2) - 400;
        this.y = (this.ctx.canvas.height / 2) + 300;

        this.width = 100;
        this.height = 100;

        this.vx = 1;
        

        this.img = new Image();
        this.img.src = "/assets/images/Pad_02_1.png";
        this.img.isReady = false;

        this.img.onload = () => {
            this.img.isReady = true;
        }
    }

    draw() {
        this.ctx.save();
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )

            this.ctx.restore;
        }
    }

    move() {
        this.x += this.vx;
    }
}