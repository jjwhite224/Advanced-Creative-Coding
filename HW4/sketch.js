var table;
var songNames;
var albumNames;
var colors;
var songCount = [];
var albumCount = [];
var albumBubbles = [];
var songBubbles = [];

function preload(){
  table = loadTable('assets/MusicSurvey.csv', 'csv', 'header');


}
function setup() {
  createCanvas(displayWidth,displayHeight);
  textAlign(CENTER)
  rectMode(CENTER)
  songData();
  albumData();
  console.log(albumCount)
  for(i=0;i<songNames.length;i++){
    songBubbles.push(new Bubble(songNames[i],songCount[i],colors[i]))
    albumBubbles.push(new Bubble(albumNames[i],albumCount[i],colors[i]))
  }
  console.log(songBubbles)
  console.log(albumBubbles)
  }

function draw(){
noStroke();

  background("white")

  for (i=0;i<songBubbles.length;i++){
    songBubbles[i].draw();
    songBubbles[i].move();
  }
  for (i=0;i<albumBubbles.length;i++){
    albumBubbles[i].albumdraw();
    albumBubbles[i].move();
  }
}
function songData(){
  songNames = table.getColumn("What's your favorite song right now and who is it by?")
  colors = table.getColumn("What color would you say this music makes you feel?")
  console.log(songNames)
  console.log(colors)
  soungCounter = 0;
  for (i=0;i<songNames.length;i++){
    for(j=0;j<songNames.length;j++){
      if (songNames[i] == songNames[j]){
        soungCounter += 1
        append(songCount,soungCounter);
      }
soungCounter = 0
      }

    }
  }
  function albumData(){
    albumNames = table.getColumn("What's your favorite album right now and who is it by?")
    colors = table.getColumn("What color would you say this music makes you feel?")
    console.log(albumNames)
    albumCounter = 1;
    for (i=0;i<albumNames.length;i++){
      albumCounter = 0;
      for(j=0;j<albumNames.length;j++){
        if (albumNames[j] == albumNames[i]){
          albumCounter += 1



        }


        }
albumCount.push(albumCounter);
albumCounter = 0;
      }
    }



class Bubble{
  constructor(songname,songcount,color){
    this.text = songname
    this.size=songcount * 25
    this.rectsize = songcount * 50
    this.color = color
    this.x = random(100,displayWidth-100)
    this.y= random(100,displayHeight-100)
    this.spd = random(-2,2)
    this.xspd = this.x
    this.yspd = this.y
  }
  draw(){
    push()
    fill(this.color)
    ellipse(this.xspd,this.yspd,this.size)
    pop()
    text(this.text,this.xspd,this.yspd)
  }
  albumdraw(){
    push()
    fill(this.color)
    rect(this.xspd,this.yspd,this.rectsize,this.rectsize)
    pop()
    text(this.text,this.xspd,this.yspd)
  }
  move(){
     this.xspd = this.xspd + this.spd
     this.yspd = this.yspd + -this.spd,this.spd
    if (this.yspd + this.size >= height|| this.yspd + this.size <= 0){
      this.spd = -this.spd
    }
    if (this.xspd + this.size >= width || this.xspd + this.size <= 0){
      this.spd = -this.spd
    }
  }
}
