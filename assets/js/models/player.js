class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 25;
        this.maxY = 610;
        this.y = this.maxY;
    
        this.vx = 0;
        this.vy = 0;
        this.ay = 1;

        this.speedX = 4;

        this.width = 104;
        this.height = 114;

        this.img = new Image();
        this.img.src = "/assets/images/WalkOne.png";
        this.img.isReady = false;

        this.img.onload = () => {
            this.img.isReady = true;
        }

        this.running = false;
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

    move() {
        this.x += this.vx;
        this.vy += this.ay;
        this.y += this.vy;

        if (this.x <= 0) {
            this.x = 0;
        }

        if (this.x + this.width >= this.ctx.canvas.width) {
        this.x = this.ctx.canvas.width - this.width;
}

        if (this.y <= 0) {
            this.y = 0;
        }

        if (this.y >= this.maxY) {
            this.y = this.maxY;
            this.jumping = false;
        }
        
    }

    oneKeyDown(keyCode) {

        if (keyCode === TOP_KEY && !this.jumping) {
            this.vy = -15;
            this.jumping = true;
        }

        if (keyCode === RIGHT_KEY) {
            this.vx = this.speedX;
            this.running = true;
        
        }

        if (keyCode === LEFT_KEY) {
            this.vx = -this.speedX;
            this.running = true;
        }
        
    }

    oneKeyUp(keyCode) {
        if (keyCode === RIGHT_KEY || keyCode === LEFT_KEY) {
          this.vx = 0
          this.running = false
        }
      }


}