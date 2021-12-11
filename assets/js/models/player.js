class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 25;
        this.maxY = 965;
        this.y = this.maxY;

        this.prevY = this.y;
    
        this.vx = 0;
        this.vy = 1;
        this.ay = 1;

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
        this.prevY = this.y;
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
            this.jumping = 0;
        }
        
    }

    collidesWithIsland(island) {
        const xPadding = 10;
        const yPadding = 20;

        if(this.vy >= 0 &&
        this.x + this.width / 2 + xPadding < island.x + island.width &&
        this.x + this.width - this.width / 2 > island.x &&
        this.y + this.height >= island.y + yPadding &&
        this.prevY + this.height <= island.y + yPadding ||
        this.maxY === island.y - this.height + yPadding &&
        this.x + this.width / 2 + xPadding < island.x + island.width &&
        this.x + this.width - this.width / 2 > island.x) {
            this.getOnIsland(island.y + yPadding);
        
        } else {
            this.getOnFloor();
        }
    }

     collidesWith(pet) {
        if (
        this.x < pet.x + pet.width &&
        this.x + this.width > pet.x &&
        this.y < pet.y + pet.height &&
        this.y + this.height > pet.y) {
            return true;
        }
            return false;
    }
    
    getOnIsland(islandY) {
        this.maxY = islandY - this.height;
    }

    getOnFloor() {
        if(this.maxY !== 965) {
            this.vy = 0;
            this.maxY = 965;
        }
    }

    oneKeyDown(keyCode) {

        if (keyCode === TOP_KEY) {
            if(this.jumping <= 1) {
                this.vy = -20;
                this.jumping++
            }
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