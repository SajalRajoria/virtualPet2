var  dog, happyDog,dogImg, database;
var frame;
var foodStock,foodS;
var fedTime,lastTime,lastFed;
var foodObj;
var feed,addFood, a;



function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  backgroundImg = loadImage("bk.jpg")
}

function setup() {
  createCanvas(1000, 600);
  database = firebase.database();

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  dog = createSprite(800,200,10,10);
  dog.scale = 0.15
  dog.addImage(dogImg);

  // yellow frame 
  frame = createSprite(500,590,1000,20);
  frame.shapeColor = "yellow";

  frame2 = createSprite(10,300,20,600);
  frame2.shapeColor = "yellow";

  frame3 = createSprite(990,300,20,600);
  frame3.shapeColor = "yellow";

  //orange frame
  frame4 = createSprite(920,270,20,550);
  frame4.shapeColor = "orange";

  frame1 = createSprite(80,270,20,550);
  frame1.shapeColor = "orange";

  frame5 = createSprite(500,545,860,20);
  frame5.shapeColor = "orange";

  //red frame
  frame6 = createSprite(45,290,50,580)
  frame6.shapeColor = "red";

  frame7 = createSprite(955,290,50,580)
  frame7.shapeColor = "red";

  frame8 = createSprite(500,567,900,24)
  frame8.shapeColor = "red";



   feed = createButton("Feed the dog");
   feed.position(700,95);
   feed.mousePressed(feedDog);

   addFood=createButton("Add Food");
   addFood.position(800,95);
   addFood.mousePressed(addFoods);

}


function draw() {  
background(backgroundImg);
foodObj.display();
/*
if(keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(happyDog);
}
*/


  //add styles here


  
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();
  })

   textSize(15);
     fill("white");
   if(lastFed >= 12){
    text("Last Feed : " + lastFed%12 + " PM",360,100);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : " + lastFed + " AM",360,100);
  }

  drawSprites();

   

}
//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



// function to update food stock and last time
function feedDog(){
  dog.addImage(happyDog);



  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  
  
  })
  console.log(hour());

 
}


// function to add foodin stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}
