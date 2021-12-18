const canvas = document.getElementById('game-canvas');

const ctx = canvas.getContext('2d');

const game = new Game(ctx);

window.onload = function() {
    document.getElementById('start-button').onclick = () => {
        game.start();
    }

    document.addEventListener('keydown', (event) => {
        game.oneKeyDown(event.keyCode);
    })

    document.addEventListener('keyup', (event) => {
        game.oneKeyUp(event.keyCode);
      })
}

document.getElementById("heroContainer").addEventListener("click", function() {
    document.getElementById("heroContainer").hidden = true;
})

