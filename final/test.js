var gifarray = [];
let playing = false;
var gifvid;
var mygif;
var myAsciiArt;
var gifnum = 0;
let timer = 30;
var playPromise;
var fft;
var bass;
var treble;
var mid;
var vidloaded = false;
var audioloaded = false;
var soundPlaying = false;
var asciitreble=192;
var asciibass=108;
/*
  The size of generated ASCII graphics expressed in characters and lines.
*/
var asciiart_width=asciitreble; var asciiart_height=asciibass;

/*
  This table will store several example images that will be converted to the
  ASCII art form.
*/


/*
  Buffer for processed graphics, simplifying some operations. This will be an
  object derived from the p5.Graphics class
*/
var gfx;

/*
  This variable will store a two-dimensional array - "image" in the form of
  ASCII codes.
*/
var ascii_arr;

/*
  A helper variable to store current "circular" time, useful in controlling of
  the cyclic image display.
*/
//space gif search term: @salmonickatelier space @dualvoidanima space
function preload(){
gifs = loadJSON('https://api.giphy.com/v1/gifs/search?api_key=Y9OfF5m05o8BZJ5MAjOY9CDXg8XVcY20&q=@dualvoidanima&limit=25&offset=0&rating=r&lang=en',pickGif);
carti = loadSound('assets/'+str(floor(random(5)))+'.mp3',soundLoaded)
}
function setup(){
  gifvid = createVideo(mygif,vidLoaded);
  gifvid.hide();
  console.log(gifarray)
  createCanvas(windowWidth,windowHeight);
  fft= new p5.FFT();
  amplitude = new p5.Amplitude();
  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  /*
    Here we create an object derived from the AsciiArt pseudo-class from the
    p5.asciiart library.
      new AsciiArt(_sketch);
      new AsciiArt(_sketch, _fontName);
      new AsciiArt(_sketch, _fontName, _fontSize);
      new AsciiArt(_sketch, _fontName, _fontSize, _textStyle);
  */
  myAsciiArt = new AsciiArt(this);
  /*
    After initializing the object, look at (in the console) the listing of the
    array containing the glyphs sorted according to the amount of space
    occupied. This table is the basis for the procedure that converts
    individual image pixels into glyphs.
  */
  myAsciiArt.printWeightTable();
  /*
    Here we set the font family, size and style. By default ASCII Art library
    is using 'monospace' font, so we want to apply the same setting to our
    sketch.
  */
  textAlign(CENTER, CENTER); textStyle(NORMAL);
  noStroke();
  /*
    Finally we set the framerate.
  */
  frameRate(30);


}
function draw(){
  colorMode(HSL,360,100,100,1)
  fft.analyze();
  bass = fft.getEnergy("bass");
  treble = fft.getEnergy("treble");
  mid = fft.getEnergy("mid");
  amp = amplitude.getLevel();
  //console.log(amp)
  var bassScale = map(bass,0,255,0,1);
  var midscale = map(mid,0,255,0,1);
  var treblescale = map(treble,0,255,0,1);
  var hueVar = map(treblescale,0,1,0,360);
  var sat = map(midscale,0,1,0,100);
  var bright = map(bassScale,0,1,10,100);
  gifvid.playbackRate = map(amp,0,1,0,0.5);
  //fill('hsb('+str(map(bass,0,255,0,360))+str(map(mid,0,255,0,100))+str(map(mid,0,255,0,100))+')');
  songColor  = color(random(hueVar),random(sat),bright)
  asciibass=map(map,0,1,0,windowHeight/10)
  asciitreble=map(amp,0,1,0,windowWidth/10)
  textFont('monospace', map(amp,0,1,4,20))
  //textFont('monospace',12)
  //console.log([bass,mid,treble,asciibass,asciitreble])
  ampScale = map(amp,0,1,0,100)
  ampScale360 = map(amp,0,1,0,random(360))
  background('black');
  //skipButton.mousePressed(nextgif)
  //console.log(gifnum)
  //gfx.background('purple');
  /*
    First, let's calculate which image from the images[] array should now be
    displayed. The floor part of the calculated value will indicate the index
    of the image to be displayed. The decimal part will be used to calculate
    the tint.
  */
  /*
    Let's prepare the image for conversion. Although the object derived from
    the AsciiArt pseudo-class has it's own mechanism of changing the size of
    the image, we will use the external one. Thanks to this we will be able -
    before transferring the image for conversion - to perform the posterize
    effect on it, which will make the final effect better.
  */
  gfx.image(gifvid,0,0,gfx.width,gfx.height);
  /*
    It is worth experimenting with the value of the parameter defining the
    level of posterization. Depending on the characteristics of the image,
    different values may have the best effect. And sometimes it is worth not
    to apply the effect of posterization on the image.
  */
  gfx.filter(POSTERIZE, 7);
  /*
    Here the processed image is converted to the ASCII art. The convert()
    function in this case is used with just one parameter (image we want to
    convert), so the resultant ASCII graphics will have the same resolution
    as the image. If necessary (especially if the resolution of the converted
    image is relatively high), it is possible to use the converter function
    in the version with three parameters: then the second and third
    parameters will be respectively the width and height of the generated
    glyph table. The convert() function returns a two-dimensional array of
    characters containing the representation of the converted graphics in the
    form of the ASCII art. If the conversion fails, the function returns
    null
  */
  ascii_arr = myAsciiArt.convert(gfx);
  /*
    Now it's time to show ASCII art on the screen. First, we set drawing
    parametrs. Next, we call the function typeArray2d() embedded in the
    ASCII Art library, that writes the contents of a two-dimensional array
    containing (implicitly) text characters (chars) on the screen. In this
    case, we call a function with 2 parameters: the first is the table
    whose contents we want to print, and the second is the destination (an
    object with "canvas" property). If you use the function with two
    parameters (as we do in this example), it will assume that you need to
    fill the entire surface of the target canvass with a drawing. However,
    the function can be called in 3 variants:
      [AsciiArt instance].typeArray2d(_arr2d, _dst);
      [AsciiArt instance].typeArray2d(_arr2d, _dst, _x, _y);
      [AsciiArt instance].typeArray2d(_arr2d, _dst, _x, _y, _w, _h);
    The parameters are as follows:
      _arr2d - 2-dimentional array containing glyphs (chars)
      _dst - destination (typically the sketch itself)
      _x, _y - coordinates of the upper left corner
      _w, _h - width and height
    It is relatively easy to write your own function that formats the contents
    of an array to ASCII graphics. At the end of this example, I glue the
    function code from a non-minimized version of the library - it can be
    used as a base for your own experiments.
  */
  myAsciiArt.typeArray2d(ascii_arr, this);
  /*
    Finally, let's display the source image, too.
  */
  //image(gifvid,0,0,width,height);
  fill(hueVar,sat,bright)
  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
     timer --;
   }
   if (timer == 0) {
     timer = 30;
     nextgif();
   }

 }


function pickGif(){
    for(var i=0;i<gifs.data.length;i++){
      gif = gifs.data[i].images.looping.mp4;
      append(gifarray,gif)
    }
    mygifnum = floor(random(gifarray.length))
    mygif = gifarray[mygifnum]
    console.log(mygif)

  }

function playVid(){
  if (vidloaded == true){
   gifvid.play();
   console.log(gifvid)
 }
}

function playSound(){
    if (audioloaded == true && soundPlaying == false){
    carti.play();
    soundPlaying = true;
    }
    }

  function pauseVid(){
      gifvid.pause();
      if (soundPlaying == true){
      carti.pause();
      soundPlaying = false;
    }
  }

  function nextgif(){
    clear();
    gifnum += 1;
    gifvid.remove();
    gifvid=createVideo(gifarray[gifnum],playVid);
    gifvid.hide();
  }

function keyPressed(){if(keyCode==32){playVid();/*playSound*/}else if(keyCode==16){pauseVid();}else if(keyCode==49){carti = loadSound('assets/1.mp3',soundLoaded);if(audioloaded == true){playSound();}}else if(keyCode==50){carti = loadSound('assets/2.mp3',soundLoaded);if(audioloaded == true){playSound();}}else if(keyCode==51){carti = loadSound('assets/3.mp3',soundLoaded);if(audioloaded == true){playSound();}}else if(keyCode==52){carti = loadSound('assets/4.mp3',soundLoaded);if(audioloaded == true){playSound();}}else if(keyCode==53){carti = loadSound('assets/5.mp3',soundLoaded);if(audioloaded == true){playSound();}}else if (keyCode == 9){nextgif();}}
function vidLoaded(){vidloaded=true;console.log(vidloaded)}
function soundLoaded(){audioloaded=true;console.log(audioloaded)}

//function keyPressed(){if(keyCode=='Shift 16'){pauseVid()}}
