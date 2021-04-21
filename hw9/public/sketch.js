var chat_input;
var chat_button;
var machine_text;
var itf;
var show_text = "";

var england_responses = ["Oh I love the Premier League","How are Arsenal so Bad lol at least were not them, unless...", "City are running away with again maybe we are the farmers..."]

var italy_responses = ["Oh I love Serie A!", "Juve are really bad this season huh","I still feel AC can win it idk"];

var spain_responses = ["Oh I love La Liga!", "Barca need to win for Messi's sake", "Im a Barca fan but if Atletico win I'm not mad"]

var france_responses = ["Oh I love Ligue Un!", "PSG might not win this year wild","Lille are really really good this year right?!"]

var germany_responses = ["Oh I love the Bundesliga", "Bayern on top again what a shock...", "Why are Dortumnd so bad with such a good team???"]
function preload(){
  itf=loadFont("./assets/NovareseStd-Bold.otf")
}
function setup() {
  createCanvas(windowWidth/3,windowHeight);
  chat_input = createInput('Hey! Whats your favorite Soccer Club in Europe!');
  //chat_input.style('margin', '60px');
  chat_input.size(300);
  chat_button = createButton("Enter");
  //chat_button.style('margin', '30px');
  chat_button.mousePressed(enteredChat);
  chat_input.position(windowWidth/2-175,75)
  chat_button.position(windowWidth/2+125,chat_input.y);
  machine_text = ""

  // set up socket
  socket = io.connect('http://localhost:3000');
  socket.on('guess', makeAGuess);
}

function enteredChat(){
  var chat_text = chat_input.value();

  // send data to server
  socket.emit('guess', chat_text);
}

function makeAGuess(data){
  if(data == 'England'){
    machine_text = england_responses[Math.floor(Math.random() * england_responses.length)];
  } else if(data == 'Italy'){
    machine_text = italy_responses[Math.floor(Math.random() * italy_responses.length)];
  }else if(data == 'Spain'){
    machine_text = spain_responses[Math.floor(Math.random() * spain_responses.length)];
}else if(data == 'France'){
  machine_text += france_responses[Math.floor(Math.random() * france_responses.length)];
}else if(data == 'Germany'){
  machine_text = germany_responses[Math.floor(Math.random() * germany_responses.length)];
}
}

function draw() {
  background("teal");
  textSize(24)
  textFont(itf)
  fill("White")
  text(machine_text,width/2-150,100)
}
