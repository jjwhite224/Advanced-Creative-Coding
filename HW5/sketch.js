var url = "https://pokeapi.co/api/v2/pokemon/"
let pokeInfo;
var pokeDex;
let pokeinp;
let pokeButton;
let pokecolor = "red"
let pokeImg;
let img;
let pokefont;
let pokename;
let pokeAbilities = "";
let pokeMoves = [];
let para;
let isShiny = false;
let statbubbles = [];
function preload(){
pokefont = loadFont('assets/pokemon/Pokemon Hollow.ttf');
}
function setup(){
  pokeinp = createInput("Enter a pokemon(all lowercase pls)")
  pokeButton = createButton("Search Pokedex")
  randpokeButton = createButton("Random Search Pokedex")
  reloadButton = createButton("Reload Page")
  pokeinp.position(25,10)
  pokeButton.position(pokeinp.x+250,pokeinp.y)
  randpokeButton.position(pokeinp.x+375,pokeinp.y)
  reloadButton.position(pokeinp.x+555,pokeinp.y)
  pokeinp.size(250)
  createCanvas(windowWidth,500)
}

function draw(){

background(pokecolor)
//image(img,1200,0,100,100)
$("h1,h2,h3,h4,h5,h6").css({"background-color": pokecolor,"color":"white","text-align": "center","margin":'auto'});
$("img").css({"width":300,"height":300});
pokeButton.mousePressed(findPokemon);
randpokeButton.mousePressed(findrandPokemon);
reloadButton.mousePressed(reload)
if ($('img').length>0){
if ($("img").click(changeSprite)){
}
}
//image(pokeImg,width/2,height/2)
//image(pokeImg,width/2,height/2,100,100)
if (statbubbles.length>0){
  for (i=0;i<statbubbles.length;i++){
statbubbles[i].render();
}
}


function findPokemon(){
  pokeInfo = loadJSON(url+pokeinp.value(),pokeAnalyze)
  console.log(pokeInfo)
}
function findrandPokemon(){
  var randpoke = str(floor(random(0,898)))
  pokeInfo = loadJSON(url+randpoke,pokeAnalyze)
  console.log(pokeInfo)
  console.log(randpoke)
}

function reload(){
  location.reload();
}

function pokeAnalyze(){
  var type = pokeInfo.types[0].type.name
  console.log(type)
  if (type == "electric"){
    pokecolor = "#F7D02C"
  }else if (type =="dark"){
    pokecolor = "#705746"
  }else if (type == "psychic"){
    pokecolor = "#F95587"
  }else if (type == "ground"){
    pokecolor = "#E2BF65"
  }else if (type == "steel"){
    pokecolor = "#B7B7CE"
  }else if (type == "water"){
    pokecolor = "#6390F0"
  }else if (type == "ice"){
    pokecolor = "#96D9D6"
  }else if (type == "dragon"){
    pokecolor = "#6F35FC"
  }else if (type == "fire"){
    pokecolor = "#EE8130"
  }else if (type == "flying"){
    pokecolor = "#A98FF3"
  }else if (type== "poison"){
    pokecolor = "#A33EA1"
  }else if (type== "fighting"){
    pokecolor = "#C22E28"
  }else if (type== "normal"){
    pokecolor = "#A8A77A"
  }else if (type== "grass"){
    pokecolor = "#7AC74C"
  }else if(type =="bug"){
    pokecolor = "#A6B91A"
  }else if(type =="rock"){
    pokecolor = "#B6A136"
  }else if(type =="fairy"){
    pokecolor = "#D685AD"
  }else if(type =="ghost"){
    pokecolor = "#735797"
  }
createImg(pokeInfo.sprites.front_default)
pokeImg=document.querySelector("img");
pokename = pokeInfo.name
for(i=0;i<pokeInfo.abilities.length;i++){
pokeAbilities+= pokeInfo.abilities[i].ability.name + " "
}
console.log(pokeMoves)
para = document.querySelector("h1");
para2 = document.querySelector("h2");
para3 = document.querySelector("h3");
para4 = document.querySelector("h4");
para5 = document.querySelector("h5");
(para).append(pokeImg);
(para2).append(pokename);
(para3).append("Type: "+type);
(para4).append("Abilities: " + pokeAbilities);
(para5).append("Moves: ");

for (var i=0;i<pokeInfo.moves.length;i++){
  append(pokeMoves,pokeInfo.moves[i].move.name)
  //(para4).append("Moves: " + pokeMoves[i]);

}
for (var i=0;i<pokeInfo.moves.length;i++){
  //append(pokeMoves,pokeInfo.moves[i].move.name)
  (para5).append(pokeMoves[i]+" ");

}

//(para4).append("Moves: " + pokeMoves[0]);
var statlocationy = 250;
var statlocationx = -50;
for (i=0;i<pokeInfo.stats.length;i++){


  statlocationx+= 200;
  statbubbles[i] = new StatBubble(pokeInfo.stats[i],statlocationx,statlocationy);
}
}

}

function changeSprite(){
  if (isShiny == false){
  $("img").attr("src",pokeInfo.sprites.front_shiny)
  isShiny =true;
}else{
  $("img").attr("src",pokeInfo.sprites.front_default)
  isShiny = false;
}
}

class StatBubble{
  constructor(stats,x,y){
  this.name = stats.stat.name
  this.size = int(stats.base_stat)
  this.x = x
  this.y = y

}
render(){
   textSize(18)
   textAlign(CENTER)
   textFont(pokefont)
   noStroke();
   fill("white")
   text(this.name+":"+this.size,this.x,this.y-75)
   strokeWeight(3);
   stroke('black');
   ellipse(this.x,this.y,this.size);

   fill(pokecolor);
   strokeWeight(3);
   stroke('black');
   arc(this.x,this.y,this.size,this.size,PI,PI*0,CHORD);

   strokeWeight(3);
   stroke('black');
   fill('white');
   circle(this.x,this.y,this.size/4);

   strokeWeight(1);
   stroke('black');
   fill('whaite');
   circle(this.x,this.y,this.size/6);

   fill('black');
   circle(this.x,this.y,this.size/13);
}
}
