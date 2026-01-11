const directions = {
  UPLEFT: 0,
  UP: 1,
  UPRIGHT: 2,
  LEFT: 3,
  IDLE: 4,
  RIGHT: 5,
  DOWNLEFT: 6,
  DOWN: 7,
  DOWNRIGHT: 8
}

class Cat {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset("img/CatSpriteFromPinterest.png");

    this.direction = 0; // 0-8: UPLEFT, UP, UPRIGHT, LEFT, IDLE, RIGHT, DOWNLEFT, DOWN, DOWNRIGHT at least for now

    this.x = 0;
    this.y = 0;
    this.speed = 200;

    this.animations = []; // store animation states
    this.loadAnimations(); // load in the animations
  };

  loadAnimations() {
    this.animations.push(new Animator(this.spritesheet, 100, 41, 24, 23, 3, 0.15, 8, true, true, false)); // upleft
    this.animations.push(new Animator(this.spritesheet, 9, 104, 14, 24, 3, 0.1, 18, false, true, true)); // up
    this.animations.push(new Animator(this.spritesheet, 100, 105, 24, 23, 3, 0.15, 8, false, true, false)); // upright
    this.animations.push(new Animator(this.spritesheet, 2, 41, 28, 23, 3, 0.15, 4, false, true, false)); // left
    this.animations.push(new Animator(this.spritesheet, 41, 3, 14, 29, 1, 1, 18, false, true, false)); // idle
    this.animations.push(new Animator(this.spritesheet, 2, 73, 28, 23, 3, 0.15, 4, false, true, false)); // right
    this.animations.push(new Animator(this.spritesheet, 100, 7, 25, 25, 3, 0.15, 7, false, true, false)); // downleft
    this.animations.push(new Animator(this.spritesheet, 9, 3, 14, 29, 3, 0.1, 18, false, true, true)); // down
    this.animations.push(new Animator(this.spritesheet, 99, 71, 25, 25, 3, 0.15, 7, false, true, false)); // downright
  }

  update() {
    // if (this.x > this.game.ctx.canvas.width) {
    //   this.x = 0;
    //   this.direction += 1;
    // }

    // if (this.direction > 8) {
    //   this.direction = 0;
    // }
    // this.x += this.speed * this.game.clockTick;

    this.direction = 4; // default idle position

    if (this.game.keys.w) {
      this.direction = 1;
      this.y -= this.speed * this.game.clockTick;
    }

    if (this.game.keys.a) {
      this.direction = 3;
      this.x -= this.speed * this.game.clockTick;
    }

    if (this.game.keys.s) {
      this.direction = 7;
      this.y += this.speed * this.game.clockTick;
    }

    if (this.game.keys.d) {
      this.direction = 5;
      this.x += this.speed * this.game.clockTick;
    }

    if (this.game.keys.w && this.game.keys.a) {
      this.direction = 0;
    }

    if (this.game.keys.a && this.game.keys.s) {
      this.direction = 6;
    }

    if (this.game.keys.s && this.game.keys.d) {
      this.direction = 8;
    }

    if (this.game.keys.w && this.game.keys.d) {
      this.direction = 2;
    }

    // if the sprite runs off the screen
    if (this.x < 0) this.x = this.game.ctx.canvas.width;
    if (this.y < 0) this.y = this.game.ctx.canvas.height;
    if (this.x > this.game.ctx.canvas.width) this.x = 0;
    if (this.y > this.game.ctx.canvas.height) this.y = 0;
  }

  draw(ctx) {
    ctx.imageSmoothingEnabled = false;
    if (this.game.options.debugging) {
      this.animations[this.direction].drawFrameWithBoundingBox(this.game.clockTick, ctx, this.x, this.y, 4);
    } else {
      this.animations[this.direction].drawFrame(this.game.clockTick, ctx, this.x, this.y, 4);
    }
  }
}