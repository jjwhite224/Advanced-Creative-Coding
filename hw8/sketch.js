var img;
var detector;

var myVid;
var objectResults = [];
var score = 0;

function preload(){
  // img = loadImage("images/dog-and-cat.jpg");
  detector = ml5.objectDetector("cocossd");
  mastodon=loadFont('fonts/MASTOD__.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight/2);
  // img.resize(width, height);
  myVid = createCapture(VIDEO, videoLoaded);
  guessButton = createButton('guess')
  yesButton = createButton('yes')
  noButton = createButton('no')
  guessButton.size(75)
  yesButton.size(50)
  noButton.size(50)
  guessButton.position(width/2-150,height)
  yesButton.position(width/2-55,height)
  noButton.position(width/2,height)
}
function videoLoaded(){
  myVid.size(width/2, height);
  myVid.hide();
  detector.detect(myVid, objectsIDed);
}

// callbacks on ml5 functions are error first
function objectsIDed(error, results){
  if(error){
    console.error(error);
  } else {
    // console.log(results);
    objectResults = results;
    // function calling itself is called a recursive function
    detector.detect(myVid, objectsIDed);
  }
}
function word(){
  clear()
  for(var i=0; i<objectResults.length; i++){
    var obj = objectResults[i];
    console.log(obj)
    textFont(mastodon)
    stroke(0);
    textSize(48);
    strokeWeight(1);
    text("I see a " + obj.label,width/2+100, height/2);
}
}
function wordcorrect(){
  score = score + 1
}

function wordwrong(){
  text("I got "+score+" right!",width/2+100,350)
  score = 0;
}

function draw() {

  //background('yellow');
  image(myVid,0,0);
  guessButton.mousePressed(word);
  yesButton.mousePressed(wordcorrect);
  noButton.mousePressed(wordwrong);

}
