class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = "/assets/images/WalkOne.png";
        this.img.isReady = false;

        this.width = 104;
        this.height = 114;

        this.x = 25;
        this.y = this.ctx.canvas.height - (this.height + 10);

        this.img.onload = () => {
            this.img.isReady = true;
        }


        this.jumping = false;
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
}