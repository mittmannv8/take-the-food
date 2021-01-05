import { Sound } from "./audio";
import { Game } from "./game";
import "./styles/styles.scss";

const startButton = document.querySelector("#playButton");
const username = document.querySelector("#username");
username.focus();

startButton.addEventListener("click", loadGame);
startButton.addEventListener("keydown", loadGame);

const music = new Sound(
  "https://freesound.org/data/previews/277/277363_5172617-lq.mp3",
  {
    autoplay: true,
    loop: true
  }
);

function loadGame() {
  music.remove();
  startButton.style.display = "none";
  username.style.display = "none";
  const user = username;
  console.log(user.value);
  new Game(username.value);
}
