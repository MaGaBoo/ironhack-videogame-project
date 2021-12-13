class Pet {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.vx = 1;

        this.img = new Image();
        this.img.src = '/assets/images/animal_sprites.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }

        this.horizontalFrames = 3;
        this.verticalFrames = 3;

        this.xFrame = 0;
        this.yFrame = 0;

      
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
       
    }

    move() {

        this.x -= this.vx;

        }
    }
