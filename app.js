const width = 8;
const gameboard = document.getElementById("gameboard");
const startGame = document.getElementById("startGame");

let startPieces = [];
let mine = 8;
let pole = width * width;
const minepoint = `MINA`;
let numbersMaps = [];
const bombCheckerBtn = document.getElementById(`bombcheck`);
let bombcheckFlag = false;

function bombChecker() {
  if (!bombcheckFlag) {
    bombcheckFlag = !bombcheckFlag;
    bombCheckerBtn.style.backgroundColor = "red";
  } else {
    bombcheckFlag = !bombcheckFlag;
    bombCheckerBtn.style.backgroundColor = "white";
  }
  // console.log(bombcheckFlag);
}

function winCheck() {
  let winPoint = 56;
  for (let i = 0; i < 63; i++) {
    if (document.getElementById(`${i}`).getAttribute("visability") == false) {
      winPoint--;
    }
  }
  if (winCheck == 0) {
    restartGame();
    createBoard();
    console.log("WIN");
  }
}

bombCheckerBtn.addEventListener("click", bombChecker);
function test(tab) {
  let g = [];
  let x = 0;
  for (let i = 0; i < 64; i++) {
    x++;
    g.push(tab[i]);
    if (x == 8) {
      console.log(g);
      g = [];
      x = 0;
    }
  }
}
function showNumber(id) {
  if (startPieces[id] > 0) {
    document.getElementById(`${id}`).textContent = startPieces[id];
    document.getElementById(`${id}`).style.backgroundColor = `white`;
    document.getElementById(`${id}`).setAttribute("visability", false);
  }
}

function showNumberAll(id) {
  showNumber(id + 1);
  showNumber(id - 1);
  showNumber(id + 8);
  showNumber(id - 8);
}

function whereisNULL(id) {
  if (
    startPieces[id - 1] == 0 &&
    (id - 1) % 7 != 0 &&
    document.getElementById(`${id - 1}`).getAttribute("visability")
  ) {
    let x = id - 1;
    document.getElementById(`${id - 1}`).style.backgroundColor = `white`;
    startPieces[id - 1] = -1;
    document.getElementById(`${id - 1}`).setAttribute("visability", false);
    showNumberAll(id);
    whereisNULL(id - 1);
  }

  if (
    startPieces[id + 1] == 0 &&
    (id + 1) % 8 != 0 &&
    document.getElementById(`${id + 1}`).getAttribute("visability")
  ) {
    let x = id - 1;
    document.getElementById(`${id + 1}`).style.backgroundColor = `white`;
    startPieces[id + 1] = -1;
    document.getElementById(`${id + 1}`).setAttribute("visability", false);
    showNumberAll(id);
    whereisNULL(id + 1);
  }
  if (
    startPieces[id + 8] == 0 &&
    id + 8 < 64 &&
    document.getElementById(`${id + 8}`).getAttribute("visability")
  ) {
    let x = id - 1;
    document.getElementById(`${id + 8}`).style.backgroundColor = `white`;
    startPieces[id + 8] = -1;
    document.getElementById(`${id + 8}`).setAttribute("visability", false);
    showNumberAll(id);
    whereisNULL(id + 8);
  }
  if (
    startPieces[id - 8] == 0 &&
    id - 8 > 0 &&
    document.getElementById(`${id - 8}`).getAttribute("visability")
  ) {
    let x = id - 1;
    document.getElementById(`${id - 8}`).style.backgroundColor = `white`;
    startPieces[id - 8] = -1;
    document.getElementById(`${id - 8}`).setAttribute("visability", false);
    showNumberAll(id);
    whereisNULL(id - 8);
  }
  showNumber(id + 1 && (id + 1) % 8 != 0);
  showNumber(id - 1 && (id - 1) % 7 != 0);
  showNumber(id + 8);
  showNumber(id - 8);
}
function changeColor(event) {
  let clikedDiv = event.target;
  showNumber(clikedDiv.id);

  console.log(event.button, clikedDiv.id);
  if (!bombcheckFlag) {
    if (startPieces[clikedDiv.id] === "m") {
      restartGame();
      createBoard();
      console.log("LOSE");
    }
    if (startPieces[clikedDiv.id] === 0) {
      clikedDiv.style.backgroundColor = `white`;
      whereisNULL(clikedDiv.id);
    }
  } else {
    if (
      document.getElementById(`${clikedDiv.id}`).getAttribute("visability") !=
        null &&
      clikedDiv.innerHTML == `MINA`
    ) {
      clikedDiv.innerHTML = ``;
    } else {
      document
        .getElementById(`${clikedDiv.id}`)
        .setAttribute("visability", false);
      clikedDiv.innerHTML = minepoint;
    }
  }
  winCheck();
}

function checkBoxAround(id) {
  let idCyferek = [];

  if (id % 8 == 0) {
    idCyferek.push(id + 1, id - 7, id + 9, id + 8, id - 8);
  } else if (id % 7 == 0 && id != 0) {
    idCyferek.push(id - 1, id - 8, id + 8, id - 9, id + 7);
  } else {
    idCyferek.push(
      id - 1,
      id + 1,
      id - 7,
      id + 7,
      id - 8,
      id + 8,
      id + 9,
      id - 9
    );
  }
  // console.log(idCyferek, id);
  return idCyferek;
}

function createBoard() {
  for (let i = 0; i < pole; i++) {
    startPieces.push(0);
  }

  let x = 0;
  while (x < mine) {
    let cur = Math.floor(Math.random() * 64);

    let tab = [];

    if (startPieces[cur] == 0) {
      startPieces[cur] = "m";

      x++;
      numbersMaps = [...numbersMaps, ...checkBoxAround(cur)];
    }
  }
  // console.log(startPieces);
  // console.log(numbersMaps);

  numbersMaps.forEach((element) => {
    if (startPieces[element] != "m" && element > -1 && element < 64)
      startPieces[element]++;
  });

  //console.log(...startPieces);

  //test(startPieces);

  startPieces.forEach((startPiece, i) => {
    const square = document.createElement("div");
    square.classList.add(`squere`);
    square.setAttribute("id", i);
    square.setAttribute("visability", true);

    square.addEventListener("click", changeColor);
    gameboard.append(square);
  });
}

while (gameboard.firstChild) {
  gameboard.removeChild(divElement.firstChild);
}
let gamestart = false;
startGame.addEventListener("click", function () {
  if (!gamestart) {
    createBoard();
    gamestart = !gamestart;
  } else {
    restartGame();
    createBoard();
  }
});
function restartGame() {
  startPieces.splice(0, startPieces.length);
  numbersMaps.splice(0, numbersMaps.length);
  while (gameboard.firstChild) {
    gameboard.removeChild(gameboard.firstChild);
  }
}
