//Global Variables
var monkey, monkey_running;
var ground, backdrop;
var bananaGroup, stoneGroup;
var bananaImage, stoneImage;

var score;
var gameOver, restart;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  backdrop = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png","Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  stoneImage = loadImage("stone.png");
  groundImage = loadImage("ground.jpg");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(50,280,20,50);
  monkey.addAnimation("running", monkey_running);

  backdrop = createSprite(200,200,10,10);
  
  ground = createSprite(200,280,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  gameOver = createSprite(310,50,20,20);
  gameOver.addImage("gameOver", gameOverImage);
  
  restart = createSprite(310,100,20,20);
  restart.addImage("restart", restartImage);

  score = 0;
}

function draw(){
 background(255); 
  
  monkey.collide(invisibleGround);
  
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    
  if(keyDown("space")){
  monkey.velocityY = -14;
  }
  
    spawnBananas();
    spawnStones();
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(bananaGroup.isTouching(monkey)){
      count= count + 1;
    }
    
    if(stoneGroup.isTouching(monkey)){
     gameState = END; 
    }
  }
  
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    monkey.velocityY = 0;
  }
  
  if(mousePressedOver(restart)){
    reset();
  }
  //console.log(trex.y);
 drawSprites();
}

function reset() {
gameState = PLAY;
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  ground.velocityX = -3;
  gameOver.visible = false;
  restart.visible = false;
  count = 0;
}

function spawnBananas() {
  if(frameCount % 60 === 0){
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    banana.depth = monkey.depth
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  }
}
function spawnStones() {
  if(frameCount % 80 === 0){
    var stone = createSprite(600,165,10,40);
    stone.velocityX = -4;
    stone.addImage(stoneImage);
    stone.lifetime = 300;
    
    stonesGroup.add(stone);
  }
}