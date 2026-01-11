class Animator {
  /**
   * 
   * @param {*} spritesheet Spritesheet image
   * @param {*} xStart starting X coordinate of the first frame
   * @param {*} yStart starting Y coordinate of the first frame
   * @param {*} width width of the frame
   * @param {*} height height of the frame
   * @param {*} frameCount number of frames that make up the animation
   * @param {*} frameDuration how long each frame should be painted on the canvas
   * @param {*} framePadding amount of empty padding between each frame
   * @param {*} reverse flag to reverse the order in which frames are drawn
   * @param {*} loop specify if the animation is a looping animation
   * @param {*} flipflop runs in alternating reverse and forward order
   */
  constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop, flipflop) {
    Object.assign(this, { spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop, flipflop })
  
    this.elapsedTime = 0; // keep track of how much time it's been since the last animation
    this.totalTime = this.frameCount * this.frameDuration;
  };

  drawFrame(tick, ctx, x, y, scale) {
    this.elapsedTime += tick;

    if (this.isDone()) {
      if (this.loop) {
        this.elapsedTime -= this.totalTime; // go back to the beginning if looping
        if (this.flipflop) { // if flipflopping is enabled, set to reverse order
          this.reverse = !this.reverse;
        }
      }
    }

    let frame = this.currentFrame();

    if (this.reverse) {
      frame = this.frameCount - frame - 1;
    }

    ctx.drawImage(this.spritesheet,
      this.xStart + frame * (this.width + this.framePadding), this.yStart, // source from sheet
      this.width, this.height,
      x, y,
      this.width * scale,
      this.height * scale
    );
  };

  drawFrameWithBoundingBox(tick, ctx, x, y, scale) {
    ctx.strokeRect(x, y, this.width * scale, this.height * scale);
    this.drawFrame(tick, ctx, x, y, scale);
  }

  currentFrame() {
    return Math.floor(this.elapsedTime / this.frameDuration);
  }

  isDone() {
    return (this.elapsedTime >= this.totalTime);
  }
}