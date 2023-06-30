var blockSize = 25;
var total_row = 17; //total row number
var total_col = 17; //total column number
var board;
var context;
 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
 
// Set the total number of rows and columns
var speedX = 0;  //speed of snake in x coordinate.
var speedY = 0;  //speed of snake in Y coordinate.
 
var snakeBody = [];
 
var foodX;
var foodY;
 
var gameOver = false;
var score = 0;
var bestScore = 0;

class Body {
    constructor() {
      if (new.target === Body) {
        throw new TypeError("Cannot instantiate abstract class.");
      }
      this.level = 1;
    }

    get color() {
      throw new Error("Property 'color' must be implemented.");
    }
  
    get type() {
      throw new Error("Property 'type' must be implemented.");
    }
    use() {
      throw new Error("Method 'use()' must be implemented.");
    }
  
    upgrade() {
      this.level++;
      console.log(`Upgraded to level ${this.level}.`);
    }

    remove(){
        return
    }
}

class GenericBody extends Body {
    constructor() {
      super();
    }
  
    get color() {
      return "gray";
    }
  
    get type() {
      return "generic";
    }
  
    get level() {
      return this.level;
    }
  
    use(){
      return
    }
}

class ScoreBody extends Body{
    constructor(){
        super();
        this.scoreInterval = null;
        
    }


    get color(){
        return "red";
    }

    get type(){
        return 'score';
    }

    get level(){
        return this.level;
    }

    use(){
        const increment = Math.pow(10, this.level-1)
        this.scoreInterval = setInterval(()=>{
            global.score += increment;},1000);
    }

    remove(){
        clearInterval(this.scoreInterval);

    }
}

class MultiplierBody extends Body{
    constructor(){
        super();

    }

    get color(){
        return "green";
    }

    get type(){
        return 'multiplier';

    }

    get level(){
        return 1
    }

    use(){
        global.score = global.score * 2
        global.speed = global.speed * 2
    }

    upgrade(){
        return
    }
}

class ShieldBody extends Body{
    constructor(){
        super();
    }

    get color(){
        return 'blue';
    }

    get type(){
        return 'shield'
    }

    get level(){
        return 1
    }

    use(){
        global.protected = true;
    }

    remove(){
        global.protected = false;
    }
}
 
window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");
 
    placeFood();
    document.addEventListener("keyup", changeDirection);  //for movements
    // Set snake speed
    setInterval(update, 1000 / 10);
}
 
function update() {
    if (gameOver) {
        if (score >= bestScore){
            bestScore = score;
            score = 0;
            updateBestScore();
        }
        return;
    }
 
    // Background of a Game
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);
 
    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);
 
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        updateScore();
    }
 
    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
 
    context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle = "black";
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
 
        if (snakeX < 0) {
        snakeX = (total_col - 1) * blockSize;
    } else if (snakeX >= total_col * blockSize) {
        snakeX = 0;
    }
    
    if (snakeY < 0) {
        snakeY = (total_row - 1) * blockSize;
    } else if (snakeY >= total_row * blockSize) {
        snakeY = 0;
    }
 
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
             
            // Snake eats own body
            gameOver = true;
            alert("Game Over");
        }
    }
}
 
// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }

}

function updateScore() {
    var scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score;
}

function updateBestScore(){
    var scoreElement = document.getElementById("bestScore");
    scoreElement.textContent = "Best Score: "+ bestScore; 
}
 
// Randomly place food
function placeFood() {
 
    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize;
     
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}