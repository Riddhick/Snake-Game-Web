//game variables
let inputDir={x:0,y:0};
let speed=4;
let lastPaintTime=0;
let snakeArr=[{x:10,y:10}]
let food={x:5,y:8}
let score=0;
let speedfactor=0.1;
let upper=17;
let lower=1;

//game functions
function main(ctime) {//ctime=>current time
    gameframe=window.requestAnimationFrame(main);
    //control the fps
    console.log(ctime);
    if((ctime-lastPaintTime)/1000< 1/speed){
        return
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snakeArr){
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y==snakeArr[0].y)
            return true;
    }    
    if(snakeArr[0].x>=18 || snakeArr[0].x<=0 ||snakeArr[0].y>=18 || snakeArr[0].y<=0 )     
        return true;
    return false;
}

function endGame(){
    inputDir={x:0,y:0};
        alert('GameOver');
        snakeArr=[{x:10,y:10}];
        score=0;
        speed=4;
        window.cancelAnimationFrame(gameframe);
}

function gameEngine(){
    //updating the snake
    if(isCollide(snakeArr)){    //collides with the wall
        endGame();
    }
    //eating the food
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
        food={x:Math.round(lower+(upper-lower)*Math.random()),y:Math.round(lower+(upper-lower)*Math.random())}
        score+=1;
        speed=speed+speed*speedfactor;
    }
    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){ 
        snakeArr[i+1]={...snakeArr[i]}; //... to create new object 
    }

    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    //render the snake and food 
    board.innerHTML="";
    document.getElementById('score-show').innerHTML=score;
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0)
            snakeElement.classList.add('snake-head');
        else
            snakeElement.classList.add('snake-body');    
        board.appendChild(snakeElement);
    })
    //food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//gameloop
function startGame(){
    window.requestAnimationFrame(main);
}    

//game logic
window.addEventListener('keydown',e=>{
    //inputDir={x:0,y:1} //start the game
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;        
        default:
            break;    
    }

});