var blockSize = 25;
var total_row = 33; //total row number
var total_col = 33; //total column number 
var board;
var context;
 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
 
// Set the total number of rows and columns
var speedX = 0;  //speed of snake in x coordinate.
var speedY = 0;  //speed of snake in Y coordinate.
var speed = 100;
 
var snakeBody = [];
var snaketype =[];
var food=['score','generic','multiplier','shield'];
 
var foodX;
var foodY;

var EnemyX;
var EnemyY;

var gameOver = false;
var score = 0;
var bestScore = 0;
var shield = false;
var x;

var speedInterval = null;
class Enemy{
    constructor(){
        if (new.target === Enemy) {
            throw new TypeError("Cannot instantiate abstract class.");
        }
    }

    get color(){
        throw new Error("Property 'color' must be implemented.");
    }

    get type(){
        throw new Error("Property 'type' must be implemented.");
    }

    use(){
        throw new Error("Upgrade not implemented")
    }   

    remove(){
        return;
    }
}

class AreaEnemy extends Enemy{
    constructor(){
        super();
    }

    get color(){
        return "red";
    }

    get type(){
        return "Area";
    }

    use(){

    }

    remove(){

    }
}

class RowEnemy extends Enemy{
    constructor(){
        super();
    }

    get color(){
        return "red"
    }

    get type(){
        return "Row"
    }

    use(){

    }

    remove(){
        
    }
}

class ColumnEnemy extends Enemy{
    constructor(){
        super();
    }

    get color(){
        return "red"
    }

    get type(){
        return "Column"
    }

    use(){
        
    }

    remove(){
        
    }
}
class Body {
    constructor() {
      if (new.target === Body) {
        throw new TypeError("Cannot instantiate abstract class.");
      }
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
  
    upgrade(){
        throw new Error("Upgrade not implemented")
    }

    remove(){
        return;
    }
}

class GenericBody extends Body {
    constructor() {
      super();
      this._level = 1
    }
  
    get color() {
      return "orange";
    }
  
    get type() {
      return "generic";
    }
  
    get level() {
      return this._level;
    }

    setLevel(value){
        this._level = value;
    }
  
    use(){
      return
    }

    upgrade() {
        this._level++;
        console.log(`Upgraded to level ${this.level}.`);
    }
}

class ScoreBody extends Body{
    constructor(){
        super();
        this.scoreInterval = null;
        this._level = 1;
    }

    get color(){
        return "red";
    }

    get type(){
        return 'score';
    }

    get level(){
        return this._level;
    }

    setLevel(value){
        this._level = value;
    }

    use(){
        // const increment = Math.pow(10, this.level-1)
        const increment = 10
        this.scoreInterval = setInterval(()=>{
            score += increment;},1000);
        // setInterval(score++,speed);
    }

    remove(){
        console.log("clearing score interval")
        clearInterval(this.scoreInterval);
    }

    upgrade() {
        this._level++;
        console.log(`Upgraded to level ${this.level}.`);
    }
}

class MultiplierBody extends Body{
    constructor(){
        super();
    }

    get color(){
        return "yellow";
    }

    get type(){
        return 'multiplier';

    }

    get level(){
        return 1
    }

    use(old){
        // score = score * 2
        speed = 75;
        clearInterval(old);
        speedInterval = setInterval(update, speed);
    }

    upgrade(){
        console.log('cant upgrade')
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
        shield = true;
        console.log("test");
    }

    remove(){
        shield = false;
    }

    upgrade(){
        console.log('cant upgrade')
        return
    }
}

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    // context.fillStyle = "green";
    // context.fillRect(0, 0, board.width, board.height);   
    placeFood();
    document.addEventListener("keyup", changeDirection);  //for movements
    // Set snake speed
    speedInterval = setInterval(update, speed);
}
 
function update() {
    if (gameOver) {
        if (score >= bestScore){
            bestScore = score;
            score = 0;
            updateBestScore();
        }
        let restart = window.confirm("Game over!");//back to starting page
        if(restart){
            history.back();
        }
        // return;
    }
    // console.log(speed);
    // Background of a Game
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);
    
    // Set food color and position
    // const test=new ScoreBody();
    // context.fillStyle = test.color;
    // context.fillRect(foodX, foodY, blockSize, blockSize);
    // context.fillStyle=food[Math.floor(Math.random()*3)].color;
    // context.fillRect(foodX, foodY, blockSize, blockSize);
    // x=food[Math.floor(Math.random()*4)].color;

    //generate body
    context.fillStyle=x.color;
    context.fillRect(foodX, foodY, blockSize, blockSize);
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        snaketype.push(x);
        x.use(speedInterval);
        checkUpgrade();
        placeFood();
    }
    updateScore();
 
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

    for (let i = 0; i < snakeBody.length; i++) {
        
        context.fillStyle = snaketype[i].color;
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        context.fillStyle = "black";
        context.font = "20px Comic Sans MS"
        context.fillText(snaketype[i].level.toString(),snakeBody[i][0]+blockSize/3, snakeBody[i][1]+blockSize);
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
            // alert("Game Over");
        }
    }
    
}
 
// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "KeyW" && speedY != 1) {
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "KeyS" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "KeyA" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "KeyD" && speedX != -1) {
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
    rand=food[Math.floor(Math.random()*2)];// which body to generate
    if(rand === 'score'){
       x = new ScoreBody();
    }
    else if(rand === "generic"){
       x = new GenericBody();
    }
    else if (rand === "multiplier"){
       x = new MultiplierBody();
    }
    else if (rand === 'shield'){
       x = new ShieldBody();
    }
    //x = new ScoreBody();
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
    
    // context.fillRect(foodX, foodY, blockSize, blockSize);
}

function checkUpgrade(){
    if (snaketype.length < 3){
        return
    }
    first = snaketype[snaketype.length-3]
    second = snaketype[snaketype.length-2]
    last = snaketype[snaketype.length-1]
    if(first.type === second.type && first.level === second.level && first.type !== 'generic' && second.type !== 'generic' && last.type !== 'generic'){
        if(second.type === last.type && second.level === last.level){
            first.upgrade();
            second.remove();
            last.remove();
            snaketype.splice(snaketype.length-2,2)
            snakeBody.splice(snakeBody.length-2,2)
            checkUpgrade();
        }
        return
    }
    else if(first.type ==='generic' && second.type === 'generic' && first.level === second.level){
        if(last.level === first.level){
            last.upgrade();
            first.remove();
            second.remove();
            snaketype.splice(snaketype.length-3,2)
            snakeBody.splice(snakeBody.length-3,2)
            checkUpgrade();
        }
        return
    }
    else if(first.type === 'generic' && last.type === 'generic' && first.level === last.level){
        
        if(second.level === first.level){
            second.upgrade();
            first.remove();
            last.remove();
            temp = snakeBody[snakeBody.length-2];
            snaketype.splice(snaketype.length-3);
            snakeBody.splice(snakeBody.length-3);
            snaketype.push(second);
            snakeBody.push(temp);
            checkUpgrade();
        }
        return
    }
    else if(second.type === 'generic' && last.type === 'generic' && second.level === last.level){
        if(first.level === second.level){
            first.upgrade();
            second.remove();
            last.remove();
            snaketype.splice(snaketype.length-2,2)
            snakeBody.splice(snakeBody.length-2,2)
            checkUpgrade();
        }
        return
    }
    else if(first.type === 'generic' && first.level === second.level){
        if(second.type === last.type && second.level === last.level){
            last.upgrade();
            first.remove();
            second.remove();
            snaketype.splice(snaketype.length-3,2)
            snakeBody.splice(snakeBody.length-3,2)
            checkUpgrade();

        }
        return
    }
    else if(second.type === 'generic' && first.level === second.level){
        if(first.type === last.type && first.level === last.level){
            first.upgrade();
            second.remove();
            last.remove();
            snaketype.splice(snaketype.length-2,2)
            snakeBody.splice(snakeBody.length-2,2)
            checkUpgrade();
        }
        return
    }
    else if(last.type === 'generic' && first.level === last.level){
        if(first.type === second.type && first.level === second.level){
            first.upgrade();
            second.remove();
            last.remove();
            snaketype.splice(snaketype.length-2,2)
            snakeBody.splice(snakeBody.length-2,2)
            checkUpgrade();
        }
        return
    }
    return
}