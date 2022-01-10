class CounterImg {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 0;
        this.y = 1080;
        this.width = 650;
        this.height = 300;

        this.img = new Image();
        this.img.src = './assets/images/counter_turquoise.png';
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