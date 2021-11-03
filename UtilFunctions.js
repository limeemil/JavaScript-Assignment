var Player = class {
    constructor(xpos, ypos){
        this.xpos = xpos;
        this.ypos = ypos;
    }
}

var Block = class {
    constructor(name, xpos, ypos, id){
        this.name = name;
        this.xpos = xpos;
        this.ypos = ypos;
        this.id = id;
    }
}

var Goal = class {
    constructor(xpos, ypos){
        this.xpos = xpos;
        this.ypos = ypos;
    }
}

const player = new Player(0, 0);
const blocks = [];
const goals = [];

window.onload = function () {
    var blockNumber = 0;
    var goalNumber = 0;
    for (let x = 0; x < tileMap01.height; x++) {
        for (let y = 0; y < tileMap01.width; y++) {
            var img = document.createElement("img");
            img.id = "x" + x + "y" + y;
            if (tileMap01.mapGrid[x][y] == "W") {
                img.className = "tile-wall";
                img.src = "./Images/Wall.png";
                loadMaze(img, x, y);  
            }
            else if (tileMap01.mapGrid[x][y] == "B"){
                img.className = "entity-block";
                img.src = "./Images/Block.png";
                var block = new Block("block" + blockNumber, x, y, img.id);
                blocks[blockNumber] = block;
                loadMaze(img, x, y);
                console.log(blocks[blockNumber]); 
                blockNumber++;
                
            }
            else if (tileMap01.mapGrid[x][y] == "G"){
                img.className = "tile-goal";
                img.src = "./Images/Goal.png";
                var goal = new Goal(x, y);
                goals[goalNumber] = goal;
                loadMaze(img, x, y); 
                goalNumber++;
            }
            else if (tileMap01.mapGrid[x][y] == "P"){
                img.className = "entity-player";
                img.src = "./Images/Companion_Cube.png";
                player.xpos = x;
                player.ypos = y;
                loadMaze(img, x, y); 
            }
            else {
                loadMaze(img, x, y);
            }
        }
    }

    let boxes = document.getElementsByClassName("entity-block");
    console.log(boxes.length);
    for (let i = 0; i < boxes.length; i++){
        document.getElementById("map").appendChild(boxes[i]);
        boxes[i].style.top = blocks[i].xpos * 50 + "px";
        boxes[i].style.left = blocks[i].ypos * 50 + "px";
        console.log("box:" + boxes[i].id);
        console.log("blockx:" + blocks.find(element => element.id == boxes[i].id).xpos);
        console.log("blocky:" + blocks.find(element => element.id == boxes[i].id).ypos);
    }
    let players = document.getElementsByClassName("entity-player");
    document.getElementById("map").appendChild(players[0]);
    players[0].style.top = player.xpos * 50 + "px";
    players[0].style.left = player.ypos * 50 + "px";
};

function loadMaze(img, x, y){
    img.width = "50px";
    img.height = "50px";
    document.getElementById("map").appendChild(img);
    img.style.top = x * 50 + "px";
    img.style.left = y * 50 + "px";
};

window.addEventListener("keydown", function(e) {
    if(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1 ){
        e.preventDefault();
        arrowKeys(e);
    }
}, false);

function arrowKeys(e) {
    if ("ArrowUp".indexOf(e.code) > -1) {
        movePlayer(0, -1);
    }
    else if ("ArrowDown".indexOf(e.code) > -1) {
        movePlayer(0, 1);
    }
    else if ("ArrowLeft".indexOf(e.code) > -1) {
        movePlayer(-1, 0);
    }
    else if ("ArrowRight".indexOf(e.code) > -1) {
        movePlayer(1, 0);
    }
};

function movePlayer(xdif, ydif) {
    let destTile = tileMap01.mapGrid[player.ypos + ydif][player.xpos + xdif];
    if (destTile == " " || destTile == "G"){
        drawPlayer(xdif, ydif);
    }
    if (destTile == "B"){
        let boxDest = tileMap01.mapGrid[player.ypos + ydif * 2][player.xpos + xdif * 2];
        let boxes = document.getElementsByClassName("entity-block");
        if (boxDest == " " || boxDest == "G"){
            for (let i = 0; i < blocks.length; i++){
                if (player.ypos + ydif == blocks[i].xpos && player.xpos + xdif == blocks[i].ypos){
                    let boxTop = player.ypos + ydif * 2;
                    console.log(boxTop);
                    let boxLeft = player.xpos + xdif * 2;
                    console.log(boxLeft);
                    tileMap01.mapGrid[boxTop][boxLeft] = " ";
                    boxes[i].style.top = boxTop * 50 + "px";
                    boxes[i].style.left = boxLeft * 50 + "px";
                    blocks[i].ypos = boxLeft;
                    blocks[i].xpos = boxTop;
                    tileMap01.mapGrid[player.ypos + ydif * 2][player.xpos + xdif * 2] = ["B"];
                    drawPlayer(xdif, ydif);
                    if(hasWon()){
                        alert("Victory!");
                    }
                    break;
                }
            }
            
        }
    }
};

function drawPlayer(xdif, ydif) {
    tileMap01.mapGrid[player.ypos][player.xpos] = [" "];
    player.xpos += xdif;
    player.ypos += ydif;
    let player1 = document.getElementsByClassName("entity-player");
    player1[0].style.top = player.ypos * 50 + "px";
    player1[0].style.left = player.xpos * 50 + "px";
    tileMap01.mapGrid[player.ypos][player.xpos] = ["P"];
    
}

function hasWon() {
    let goalTiles = document.getElementsByClassName("tile-goal");
    for(let i = 0; i < goalTiles.length; i++){
        console.log("goal:" + goals[i].ypos);
        console.log(tileMap01.mapGrid[goals[i].xpos][goals[i].ypos]);
        if (tileMap01.mapGrid[goals[i].xpos][goals[i].ypos] != "B"){
            return false;
        }
    }
    return true;
}