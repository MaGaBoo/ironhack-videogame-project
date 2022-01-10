class GameOverPic {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = this.ctx.canvas.width - 1450;
        this.y = this.ctx.canvas.height / 2;
        this.width = 1000;
        this.height = 1000;

        this.img = new Image();
        this.img.src = './assets/images/gameOver pic.png';
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
                0,
                this.width,
                this.height
            )
        
    }

}

}