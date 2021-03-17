var fibs = [1,1]
var numFibs
let scale = 1
let play = true
let slider
let fibSlider
var fibcolors= []
function setup(){

  createCanvas(displayWidth,displayHeight)
  angleMode(DEGREES)
  colorMode(RGB)
  console.log(fibs);
  var PlayButt = select("#play_button");
  var PauseButt = select("#pause_button");
  PlayButt.mousePressed(Play);
  PauseButt.mousePressed(Pause);
  let slider = createSlider(0,44,4,1)
  fibSlider = createSlider(0,1000,100,50)



}

function draw(){
  background(200);
  translate(displayWidth/2,displayHeight/2);
  numFibs = fibSlider.value()
  let fibAni = new Fibonacci(fibs,fibcolors)

  //fibAni.color()
fibAni.draw()
console.log(scale)
}


function Pause(){
play = false;

}

function fibcolor(){
for (var i=0;i<slider.value();i++){
fibcolors[i] = color(random(255),random(255),random(255))
}
}
function Play(){
play = true;
if (fibs.length == 2){
  for (i=2;i<numFibs;i++){
    newFib = fibs[i-1] + fibs[i-2]
    fibs.push(newFib)
  }
}
fibcolor();
}

function setMinScale(fibs){
  const fibLen = fibs.length

  minScale = fibs[fibLen-5]/fibs[fibLen-1]
}
class Fibonacci{
  constructor(FibArray,ColorArray){
    this.fibs = FibArray
    this.fibcolors = ColorArray
  }
  draw(){
    setMinScale(this.fibs)
    for (var i=0;i<this.fibs.length;i++){
      const fib = fibs[i] * scale
      if (this.fibcolors.length > 0){
      const color = this.fibcolors[i%4]
      fill(lerpColor(color,this.fibcolors[slider.value()],.4))
    }
      rect(0,0,fib,fib)
      arc(fib,0,2*fib,2*fib,90,180)
      translate(fib,fib)
      rotate(-90)
    }
    if (play){
      if (scale <= minScale){
        scale = 1
        this.fibs = [1,1]
}
      else {
    scale *= .99
  }
}

}
}
