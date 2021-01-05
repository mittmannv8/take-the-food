const defaultOptions = {
  autoplay: false,
  volume: 0.5,
  loop: false
};

export class Sound {
  constructor(src, soundOptions = {}) {
    const options = { ...defaultOptions, ...soundOptions };

    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "");
    this.sound.setAttribute("controls", "none");
    this.sound.volume = options.volume;
    this.sound.autoplay = options.autoplay;
    this.sound.loop = options.loop;
    this.sound.style.display = "none";
    this.sound.load();
    document.body.appendChild(this.sound);
  }

  play() {
    try {
      this.sound.play();
    } catch (e) {}
  }

  stop() {
    this.sound.pause();
  }

  remove() {
    this.sound.remove();
  }
}
