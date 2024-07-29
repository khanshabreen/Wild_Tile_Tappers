let currMoleTile;
let currPlantTiles = []; // Array to hold multiple plant tiles
let score = 0;
let gameOver = false;
let moleInterval;
let plantInterval;
let level = 1; // Track current level
var misscount=0;

window.onload = function() {
    document.getElementById("start").addEventListener("click", startGame);
    document.getElementById("restart").addEventListener("click", restartGame);
}

function startGame() {
    if (gameOver) {
        resetBoard();
    }
    setGame();
    document.getElementById("start").style.display = "none";
    document.getElementById("restart").style.display = "inline-block";
    document.getElementById("board").style.visibility = "visible";
    document.getElementById("score").style.visibility = "visible";
    document.getElementById("game-over-message").style.display = "none"; // Hide game over message
    document.getElementById("level-up-message").style.display = "none"; // Hide level up message
    document.getElementById("level-up-message2").style.display = "none";
    document.getElementById("game-over-message2").style.display = "none";
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTiles.some(tile => tile.id == num)) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    currPlantTiles.forEach(tile => tile.innerHTML = "");
    currPlantTiles = [];

    let plant1 = document.createElement("img");
    plant1.src = "./piranha-plant.png";
   
    let num1, num2;
    do {
        num1 = getRandomTile();
    } while (currMoleTile && currMoleTile.id == num1);
    
    do {
        num2 = getRandomTile();
    } while (num2 == num1 || (currMoleTile && currMoleTile.id == num2));

    currPlantTiles.push(document.getElementById(num1));
    currPlantTiles.push(document.getElementById(num2));
    
    currPlantTiles[0].appendChild(plant1);
   
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        document.getElementById("right-sound").play();

        score +=10;
        document.getElementById("score").innerText = "Score: " + score.toString();
        
        if (score >= 200 && level == 1) {
            levelUp();

        }
        if (score >= 400 && level == 2) {
            levelUp2();
        }
    } else if (currPlantTiles.includes(this)) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        document.getElementById("wrong-sound").play();
        gameOver = true;
        clearInterval(moleInterval);
        clearInterval(plantInterval);
        document.getElementById("start").style.display = "inline-block";
        document.getElementById("restart").style.display = "none";
        document.getElementById("level-up-message2").style.display = "none";
        document.getElementById("game-over-message2").style.display = "none";
        document.getElementById("game-over-message").style.display = "block"; 
        document.getElementById("level-up-message2").style.display = "none";// Show game over message
    }
    else{
        misscount++;
        var value=misscount;
        checkGameOver(value);
    }
}

function levelUp() {
    level = 2;
    misscount=0;
    document.getElementById("score").innerText = "Level 2 - Score: " + score.toString();
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    moleInterval = setInterval(setMoleLevel2, 1000);
    plantInterval = setInterval(setPlantLevel2, 2000);
    const levelUpMessage = document.getElementById("level-up-message");
    levelUpMessage.style.display = "block";
    
    // Hide level up message after 1 second
    setTimeout(() => {
        levelUpMessage.style.display = "none";
    }, 1000); // Show level up message
}

function setMoleLevel2() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./cutepanda.png";

    let num = getRandomTile();
    if (currPlantTiles.some(tile => tile.id == num)) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlantLevel2() {
    if (gameOver) {
        return;
    }
    currPlantTiles.forEach(tile => tile.innerHTML = "");
    currPlantTiles = [];

    let plant1 = document.createElement("img");
    plant1.src = "./piranha-plant.png";
    let plant2 = document.createElement("img");
    plant2.src = "./piranha-plant.png";
    
    let num1, num2;
    do {
        num1 = getRandomTile();
    } while (currMoleTile && currMoleTile.id == num1);
    
    do {
        num2 = getRandomTile();
    } while (num2 == num1 || (currMoleTile && currMoleTile.id == num2));
    
   
    currPlantTiles.push(document.getElementById(num1));
    currPlantTiles.push(document.getElementById(num2));
   
    
    currPlantTiles[0].appendChild(plant1);
    currPlantTiles[1].appendChild(plant2);
   
}


function levelUp2() {
    level = 3;
    misscount=0;
    document.getElementById("score").innerText = "Level 3- Score: " + score.toString();
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    moleInterval = setInterval(setMoleLevel3, 1000);
    plantInterval = setInterval(setPlantLevel3, 2000);
    const levelUpMessage = document.getElementById("level-up-message2");
    levelUpMessage.style.display = "block";
    
    // Hide level up message after 1 second
    setTimeout(() => {
        levelUpMessage.style.display = "none";
    }, 1000); // Show level up message
}

function setMoleLevel3() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monkey.png";

    let num = getRandomTile();
    if (currPlantTiles.some(tile => tile.id == num)) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlantLevel3() {
    if (gameOver) {
        return;
    }
    currPlantTiles.forEach(tile => tile.innerHTML = "");
    currPlantTiles = [];

    let plant1 = document.createElement("img");
    plant1.src = "./piranha-plant.png";
    let plant2 = document.createElement("img");
    plant2.src = "./piranha-plant.png";
    let plant3= document.createElement("img");
    plant3.src = "./piranha-plant.png";
    
   

    let num1, num2, num3;
    do {
        num1 = getRandomTile();
    } while (currMoleTile && currMoleTile.id == num1);
    
    do {
        num2 = getRandomTile();
    } while (num2 == num1 || (currMoleTile && currMoleTile.id == num2));
    
    do {
        num3 = getRandomTile();
    } while (num3 == num1 || num3 == num2 || (currMoleTile && currMoleTile.id == num3));

    currPlantTiles.push(document.getElementById(num1));
    currPlantTiles.push(document.getElementById(num2));
    currPlantTiles.push(document.getElementById(num3));
    
    currPlantTiles[0].appendChild(plant1);
    currPlantTiles[1].appendChild(plant2);
    currPlantTiles[2].appendChild(plant3);
}

function restartGame() {
    score = 0;
    level = 1;
    gameOver = false;
    document.getElementById("score").innerText = "Score: " + score.toString();
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    currPlantTiles.forEach(tile => tile.innerHTML = "");
    currPlantTiles = [];
    currMoleTile = null;
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
    document.getElementById("game-over-message").style.display = "none"; // Hide game over message
    document.getElementById("level-up-message").style.display = "none"; 
    document.getElementById("level-up-message2").style.display = "none";
    document.getElementById("game-over-message2").style.display = "none";
 
}

function resetBoard() {
    document.getElementById("board").innerHTML = "";
    document.getElementById("score").innerText = "Score: 0";
    score = 0;
    currMoleTile = null;
    currPlantTiles.forEach(tile => tile.innerHTML = "");
    currPlantTiles = [];
    gameOver = false;
    document.getElementById("game-over-message").style.display = "none"; // Hide game over message
    document.getElementById("level-up-message").style.display = "none"; // Hide level up message
    document.getElementById("level-up-message2").style.display = "none";
    document.getElementById("game-over-message2").style.display = "none";
}


function checkGameOver(value) {
    if (value > 2) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        document.getElementById("wrong-sound").play();
        gameOver = true;
        clearInterval(moleInterval);
        clearInterval(plantInterval);
        document.getElementById("start").style.display = "inline-block";
        document.getElementById("restart").style.display = "none";
        document.getElementById("game-over-message").style.display = "none";
        document.getElementById("game-over-message2").style.display = "block";
    }
}
