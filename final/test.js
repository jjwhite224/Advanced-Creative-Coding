gifarray = [];
giffinarray = [];
let playing = false;
var gifvid;
var mygif;
var myAsciiArt;
var gifnum = 0;

/*
  The size of generated ASCII graphics expressed in characters and lines.
*/
var asciiart_width=192; var asciiart_height=108;

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
var cyclic_t;

/*

  Let's load the example images first.
*/

function preload(){
gifs = loadJSON('https://api.giphy.com/v1/gifs/search?api_key=Y9OfF5m05o8BZJ5MAjOY9CDXg8XVcY20&q= psychedelic &limit=25&offset=0&rating=r&lang=en',pickGif)
//gifarray[0] =

// "Le Penseur", Auguste Rodin, 1880
//gifarray[1] =loadImage('../assets/animegif1.gif');
// "American Gothic", Grant DeVolson Wood, 1930
//gifarray[2] = loadImage('../assets/animegif(2).gif');
// "La Liseuse", Jean-Honoré Fragonard, 1770
//gifarray[3] = loadImage('../assets/animegif(3).gif');
}
function setup(){
  console.log(gifs)
  createCanvas(windowWidth,windowHeight);
  gifvid = createVideo(mygif);
  gifvid.hide();
  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  playButton = createButton('play')
  playButton.mousePressed(toggleVid)
  skipButton = createButton('skip')
  skipButton.mousePressed(nextgif)
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
  textAlign(CENTER, CENTER); textFont('monospace', 12); textStyle(NORMAL);
  noStroke();
  /*
    Finally we set the framerate.
  */
  frameRate(random(60));


}
function draw(){
  background(0);
  gfx.background(0);
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
  gfx.filter(POSTERIZE, 5);
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
fill(random(255),random(255),random(255));

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
  function toggleVid() {
    if (playing) {
      gifvid.pause();
      playButton.html('play');
    } else {
      gifvid.loop();
      playButton.html('pause');
    }
    playing = !playing;
  }

  function nextgif(){
    gifnum += 1;
  }
