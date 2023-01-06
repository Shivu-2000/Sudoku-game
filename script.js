// Load board from files or manually
const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298",
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895",
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841",
];

//create variable
var timer;
var timeRemaining;
var lives;
var selectedTile;
var disableSelect;
var selectedNum;

window.onload = function () {
  // start the game when new game button is clicked
  id("start-btn").addEventListener("click", startGame);
};

function startGame() {
  //console.log("Start!!");
  //choose game difficulty
  let board;
  if (id("diff-1").checked) board = easy[0];
  else if (id("diff-2").checked) board = medium[0];
  else board = hard[0];

  //lives count =3
  lives = 3;
  disableSelect = false;
  id("lives").textContent = "Lives Remaining: 3";

  //board create as per difficulty
  generateBoard(board);

  //Timer
  startTimer();

  //Sets on basis of input
  if (id("theme-1").checked) {
    qs("body").classList.remove("dark");
  } else {
    qs("body").classList.add("dark");
  }

  //show number container
  id("number-container").classList.remove("hidden");
}
function generateBoard(board) {
  // Clear the old board
  clearPrevious();

  //let is used to incrementt tiles ids
  let idCount = 0;

  //create tiles for board
  for (let i = 0; i < 81; i++) {
    //create new paragraph element
    let tile = document.createElement("p");
    //if tiles have number
    if (board.charAt(i) != "-") {
      tile.textContent = board.charAt(i);
    } else {
      //add the click event listner
    }
    //tile ids
    tile.id = idCount;
    //increament for next tile
    idCount++;
    //add tiles class to all tiles
    tile.classList.add("tile");
    if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)) {
      tile.classList.add("bottomBorder");
    }
    if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
      tile.classList.add("rightBorder");
    }
    //Adding tiles
    id("board").appendChild(tile);
  }
}

function clearPrevious() {
  //access all the tiles
  let tiles = qsa(".tile");

  //remove tiles
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].remove();
  }
  //if timer than clear it
  if (timer) clearTimeout(timer);

  //deselect any number
  for (let i = 0; i < id("number-container").children.length; i++) {
    id("number-container").children[i].classList.remove("selected");
  }

  //clear selected variables
  selectedTile = null;
  selectedNum = null;
}

function startTimer() {
  //set timer on basis of input
  if (id("time-1").checked) timeRemaining = 180;
  else if (id("time-2").checked) timeRemaining = 300;
  else timeRemaining = 600;

  //sets the timer for start sec
  id("timer").textContent = timeConversion(timeRemaining);

  //update timer
  timer = setInterval(function () {
    timeRemaining--;

    //end of time
    if (timeRemaining === 0) endGame(); 
    id("timer").textContent= timeConversion(timeRemaining);
  }, 1000);
}

//secs into time format
function timeConversion(time) {
  let min = Math.floor(time / 60);
  if (min < 10) min = "0" + min;
  let sec = time % 60;
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
}
//Helper functions

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

function id(id) {
  return document.getElementById(id);
}
