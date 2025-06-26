const tiles = document.querySelector(".tile-container");
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

const rows = 6
const columns = 5
let currentColumn = 0;
let currentRow = 0;
let lettrick = ""

async function fetchLettrick() {
    const response = await fetch('https://random-word-api.vercel.app/api?words=1&length=5');
    const data = await response.json();
    lettrick = data;
}
await fetchLettrick();
let lettrickMap = {}
    for (let index = 0; index < lettrick.length; index++) {
        lettrickMap[lettrick[index]] = index;
    }

const guesses = []

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    guesses[rowIndex] = new Array(columns)
    const tileRow = document.createElement("div")
    tileRow.setAttribute("id", "row" + rowIndex)
    tileRow.setAttribute("class", "tile-row")
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        const tileColumn = document.createElement("div")
        tileColumn.setAttribute("id", "row"+rowIndex+"column"+columnIndex)
        tileColumn.setAttribute("class", rowIndex === 0 ? "tile-column typing" : "tile-column disabled")
        tileRow.append(tileColumn)
        guesses[rowIndex][columnIndex] = ""
    }
    tiles.append(tileRow);
}

const checkGuess = () => {
    const guess = guesses[currentRow].join("");
    if (guess.length !== columns){
        return
    }

    var currentColumns = document.querySelectorAll(".typing")
    for (let index = 0; index < columns; index++) {
        const letter = guess[index];
        if (lettrickMap[letter] === undefined) {
            currentColumns[index].classList.add("wrong")
         } else {
            if(lettrickMap[letter] === index) {
                currentColumns[index].classList.add("right")
            } else {
                currentColumns[index].classList.add("displaced")
            }
         }
    }
        if(guess === lettrick) {
            window.alert(` 🎉🥳 🎊🎁🎊🎉 🥳 Congrats 🎊🎉 🥳 👏 💝💐🏆 🥂👏 🎊\nYou guessed the word '${lettrick}'`)
            return} {
        if(currentRow === rows -1){
        window.alert(`Good Game :(\nYour word was: '${lettrick}'`)
        } else {
        moveToNextRow()
        }
    }
}

const moveToNextRow = () => {
    var typingColumns = document.querySelectorAll(".typing")
    for (let index = 0; index < typingColumns.length; index++) {
        typingColumns[index].classList.remove("typing")
        typingColumns[index].classList.add("disabled")
    }
    currentRow++
    currentColumn = 0;

    const currentRowEl = document.querySelector("#row" + currentRow);
    var currentColumns = currentRowEl.querySelectorAll(".tile-column");
    for (let index = 0; index <currentColumns.length; index++) {
        currentColumns[index].classList.remove("disabled")
        currentColumns[index].classList.add("typing")
    }
}

const handleKeyboardOnClick = (key) => {
    if(currentColumn === columns) {
        return
    }
    const currentTile = document.querySelector(
        "#row" + currentRow + "column" + currentColumn
    );
    currentTile.classList.add("tile-font");
    currentTile.textContent = key
    guesses[currentRow][currentColumn] = key;
    currentColumn++
};


const createKeyboardRow = (keys, keyboardRow) => {
    keys.forEach((key) => {
        var buttonElement = document.createElement("button")
        buttonElement.textContent = key
        buttonElement.setAttribute("id", key)
        buttonElement.addEventListener("click", () => handleKeyboardOnClick(key));
        keyboardRow.append(buttonElement)
    })
}

createKeyboardRow(keysFirstRow, keyboardFirstRow)
createKeyboardRow(keysSecondRow, keyboardSecondRow)
createKeyboardRow(keysThirdRow, keyboardThirdRow)

const handleBackspace = () => {
    if(currentColumn === 0) {
        return
    }
    
    currentColumn--
    guesses[currentRow][currentColumn] = ""
    const tile = document.querySelector("#row" + currentRow + "column" + currentColumn)
    tile.textContent = ""
};
const backspaceButton = document.createElement("button")
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "←";
backspaceAndEnterRow.append(backspaceButton);

const enterButton = document.createElement("button")
enterButton.addEventListener("click", () =>
    checkGuess());
enterButton.setAttribute("id", "enterButton")
enterButton.textContent = "✔"
backspaceAndEnterRow.append(enterButton);

document.onkeydown = function (evt) {
    evt = evt || window.evt
    if(evt.key === "Enter"){
        checkGuess();
    } else if (evt.key === "Backspace") {
        handleBackspace()
    } else {
        handleKeyboardOnClick(evt.key.toUpperCase())
    }
}

return(
<div style={{ marginTop: '16px' }}>
          <a
            href="https://github.com/naranjii/star-edit-ui"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: 'rgb(255, 254, 198, 0.3)' }}
          >
            <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '6px' }}>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            naranjii/star-edit-ui
          </a></div>)
