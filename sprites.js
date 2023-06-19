// Sprite class to handle rendering and updating game sprites
export class Sprite {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.frameX = 0;
    this.frameY = 0;
  }

  render(ctx, x, y) {
    ctx.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      x,
      y,
      this.width,
      this.height
    );
  }
}

// Load game sprites
export const bubbleSprite = new Sprite(bubbleImage, BUBBLE_SIZE, BUBBLE_SIZE);
export const shooterSprite = new Sprite(shooterImage, SHOOTER_WIDTH, SHOOTER_HEIGHT);
