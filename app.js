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
    const response = await fetch('/api/random-word');
    const data = await response.json();
    lettrick = data.word;
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
            window.alert("🎉 🎉🥳 🎉🥳🎊🎁🎊🎊🎉 🥳 congrats🎊🎊🎉 🥳 👏 💝💐🏆 🥂👏🍾 ✨ 🏆 🎊")
            return} {
        if(currentRow === rows -1){
        window.alert(`𝔾𝕆𝕆𝔻 𝔾𝔸𝕄𝔼. A palavra era: ${lettrick}`)
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
