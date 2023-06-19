// Sound class to handle playing sound effects
export class Sound {
  constructor(src) {
    this.sound = new Audio(src);
  }

  play() {
    this.sound.play();
  }
}

// Load sound effects
export const popSound = new Sound(SOUND_POP);
export const gameOverSound = new Sound(SOUND_GAME_OVER);
