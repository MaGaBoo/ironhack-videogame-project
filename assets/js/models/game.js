class Game {
    constructor(ctx) {
        this.ctx = ctx;

        this.background = new Background(ctx);
        this.player = new Player(ctx);
    }

    start() {
        this.draw();
    }

    draw() {
        this.background.draw();
        this.player.draw();
    }
}