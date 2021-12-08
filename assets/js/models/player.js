class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 25;
        this.maxY = 965;
        this.y = this.maxY;
    
        this.vx = 0;
        this.vy = 1;
        this.ay = 0.5;

        this.gravity = 0.5;

        this.speedX = 8;

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

    update() {
        this.vy +=  this.gravity;
        this.x += this.vx;
        this.y += this.vy;
    }

    getOnPlatform(platform) {
        return this.x < platform.x + platform.width &&
        this.x + this.width > platform.x &&
        this.y < platform.y + platform.height &&
        this.y + this.height > platform.y;

    }

    collidesWith(pet) {
        return this.x < pet.x + pet.width &&
          this.x + this.width > pet.x &&
          this.y < pet.y + pet.height &&
          this.y + this.height > pet.y
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