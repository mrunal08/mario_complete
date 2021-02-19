
var ground,groundImage;
var cat,catImage;
var IVground,IVgroundImage;
var emy,emyImage;
var cloud,cloudImage;
var coin,coinImage;
var bullet,bulletImage;
var cute, cuteImage;
var  restart,restartImg;
var gameOver,gameOverImage;

var bg;
var log,logImage;
var score = 0
var life = 5
var restart, restartImage;
var gameOver, gameOverImage;
var treasurebox;

var PLAY = 1
var END = 0
var gameState = PLAY

localStorage["HighestScore"] = 0;

function preload() {
bg = loadImage("bg.png")
groundImage = loadImage("ground.png")
catImage = loadAnimation("cat1.png","cat2.png","cat3.png","cat4.png","cat5.png","cat6.png")
emyImage = loadAnimation("emy1.png","emy2.png","emy3.png")
logImage = loadImage("log.png")
cloudImage = loadImage("cloud.png")
coinImage = loadImage("coin.png")
bulletImage = loadImage("bullet.png")
cuteImage = loadImage("cute.png")
gameOverImage = loadImage("gameOver.png")
restartImage = loadImage("restart.png")
treasurebox = loadAnimation("box1.png","box2.png","box4.png","box5.png","box6.png","box7.png")

}


function setup() {
      createCanvas(windowWidth, windowHeight);


      ground = createSprite(600,windowHeight-20,1200,20)
      ground.addImage("ground",groundImage)
      ground.x = ground.width/2

      cat = createSprite(150,windowHeight-60,20,20)
      cat.addAnimation("cat",catImage)
      cat.scale = 0.5

      IVground = createSprite(600,windowHeight-40,1200,10)
      IVground.visible = false

      gameOver = createSprite(620,200)
      gameOver.addImage("gameOver",gameOverImage)
      gameOver.scale = 0.3
      gameOver.visible = false

      restart = createSprite(620,240)
      restart.addImage("restart",restartImage)
      restart.scale = 0.2
      restart.visible = false

      coin = createSprite(200,50,10,10)
      coin.addImage("coin",coinImage)


      logGroup = new Group()
      cloudGroup = new Group()
      bulletGroup = new Group()
      emyGroup = new Group()
      coinGroup = new Group()
      cuteGroup = new Group()

      score = 0;
}


function draw() {
  background(bg)
  if(score === 1){
    
    background(bg)
    coinGroup.setVelocityXEach(0)
    emyGroup.destroyEach();
    logGroup.destroyEach();

   var  treasure = createSprite(1150, 310,100,10)
    treasure.addAnimation("treasure",treasurebox)
    treasure.scale=0.6
    
    cat.velocityX=3;
    cat.velocityY = 0;
    
    
  }

  fill("purple");
	textSize(35);
	textFont("monospace");
	text("Score   : " + score, 70, 60);
  text("Life: " + life, 330, 60);
  drawSprites(); 

if(gameState===PLAY){
  
  restart.visible = false
  gameOver.visible=false;

   ground.velocityX = -7
    
    if(ground.x<0){
    ground.x = ground.width/2
   }

   if(keyDown("space")&& cat.y>320){
    cat.velocityY = -20

   }

   if(keyWentDown("UP_ARROW")){
     bullet = createSprite(cat.x, cat.y)
     bullet.addImage("bullet",bulletImage)
     bullet.velocityX = 4
     bulletGroup.add(bullet)

   }
    cat.velocityY = cat.velocityY +0.8

    spawnlog();
    spawnemy();
    spawnclouds();
    spawncoins();
    spawncute();

  if(logGroup.isTouching(cat)){
   life =life -1;
    gameState = END;
  }

  if(emyGroup.isTouching(cat)){
    life = life-1;
    gameState = END;
    
  }

  if(bulletGroup.isTouching(emyGroup)){
    emyGroup.destroyEach()
    bulletGroup.destroyEach()

  }
  if (coinGroup.isTouching(cat)) {
    score = score + 1;
    //coinSound.play();
    
   coinGroup[0].destroy();
    
  }
  /*
  for(var j=0;j<coinGroup.length;j++){
     if(coinGroup.isTouching(cat)){
       coinGroup.get(j).destroy()
       coinCount = coinCount+1
       }

     }

    */ 

  
}
else if(gameState===END){
  gameOver.visible=false;
    restart.visible = true;

    if(life === 0){
      gameOver = createSprite(600,330,20,20)
        gameOver.addImage(gameOverImage)
        gameOver.scale = 0.3
        restart.visible = false
        gameOver.visible=true;
    }

  ground.velocityX = 0
  if(cat.isTouching(treasure)){
    textSize(35)
    fill("black")
    text("Congratulations!!!!!!!! YOU WON",550,250)
    ground.velocityX = 0
    cat.velocityX=0;
    

  }

  emyGroup.setVelocityXEach(0)
  logGroup.setVelocityXEach(0)
  cloudGroup.setVelocityXEach(0)
  coinGroup.setVelocityXEach(0)

  cloudGroup.setLifetimeEach(-1)
  coinGroup.setLifetimeEach(-1)
  logGroup.setLifetimeEach(-1)
  emyGroup.destroyEach();

  cat.velocityY = 0;

  if (mousePressedOver(restart)) {
    if (life > 0) {
      reset();
    }
  }

}

  cat.collide(IVground)
 
}


function spawnlog() {
  //write code here to spawn the pipe
  if (frameCount % 550 === 0) {
    var log = createSprite(1200,310,40,10);
    log.addImage(logImage);
    log.scale = 0.3;
    log.velocityX = -6;
    logGroup.add(log)
  }
}

function spawnemy() {
  //write code here to spawn the enemy
  if (frameCount % 200 === 0) {
    var emy = createSprite(1200,windowHeight-70,40,10);
    emy.addAnimation("emy",emyImage);
    emy.scale = 0.5;
    emy.velocityX = -7;
    emy.lifetime=300
    emyGroup.add(emy)
  }
}

function spawncoins() {
  //write code here to spawn the coin
  if (frameCount % 100 === 0) {
    for(var i=0;i<5;i++){
    coin = createSprite(1200+i*20,windowHeight-400,10,10);
   coin.addImage("coin",coinImage);
    
    coin.velocityX = -4;
    coin.lifetime = 400
    coinGroup.add(coin)
    }
  }
}

function spawnclouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 2.5;
    cloud.lifetime = 200;
    cloud.velocityX = -3;
    cloudGroup.add(cloud)

  }
}

function spawncute() {
  //write code here to spawn the enemy
  if (frameCount % 100 === 0) {
    var cute = createSprite(1200,random(50,150),40,10);
    cute.addAnimation("cute",cuteImage);
    cute.scale = 0.1;
    cute.velocityX = -7;
    cuteGroup.add(cute)
  }
}

function reset() {

    gameState = PLAY;
    restart.visible = false;

    logGroup.destroyEach()
    cloudGroup.destroyEach()
    emyGroup.destroyEach()
    coinGroup.destroyEach()

      

      if (localStorage["HighestScore"] < score) {
        localStorage["HighestScore"] = score;
      }

      score = 0;
    
}
