// Input handling

export class InputHandler {
  constructor() {
    this.leftPressed = false;
    this.rightPressed = false;

    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    document.addEventListener('keyup', this.keyUpHandler.bind(this));
  }

  keyDownHandler(event) {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
      this.leftPressed = true;
    } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
      this.rightPressed = true;
    }
  }

  keyUpHandler(event) {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
      this.leftPressed = false;
    } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
      this.rightPressed = false;
    }
  }
}
