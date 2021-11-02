window.onload = function () {
    console.log(tileMap01.height);
    var xpos = 0;
    for (let x = 0; x < tileMap01.height; x++) {
        console.log(x);
        for (let y = 0; y < tileMap01.width; y++) {
            console.log(tileMap01.mapGrid[x][y]);
            var img = document.createElement("img");
            img.id = "x" + x + "y" + y;
            if (tileMap01.mapGrid[x][y] == "W") {
                img.className = "tile-wall";
                img.src = "./Images/Wall.png";  
            }
            else if (tileMap01.mapGrid[x][y] == "B"){
                img.className = "entity-block";
                img.src = "./Images/Block.png"; 
            }
            else if (tileMap01.mapGrid[x][y] == "G"){
                img.className = "tile-goal";
                img.src = "./Images/Goal.png"; 
            }
            else if (tileMap01.mapGrid[x][y] == "P"){
                img.className = "entity-player";
                img.src = "./Images/Companion_Cube.png"; 
            }
            img.width = "50px";
            img.height = "50px";
            document.getElementById("map").appendChild(img);
            img.style.top = x * 50 + "px";
            img.style.left = y * 50 + "px";
            console.log(img.src);
        }
    }
};