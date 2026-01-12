class Background {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
  }

  update() {
    
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "#32006e";
    ctx.fillRect(0, 0, this.game.ctx.canvas.width, this.game.ctx.canvas.height)
    ctx.fillStyle = "white";
    ctx.font = "24px monospace"
    ctx.fillText("USE WASD TO MOVE AND OBSERVE THE DIFFERENT ANIMATIONS", 16, 32);
    ctx.restore();
  }
}