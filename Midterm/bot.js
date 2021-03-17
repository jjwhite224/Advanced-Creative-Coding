const Twit = require("twit");
const request = require("request");
const fs = require("fs");
const config = require('./config.js');
var T = new Twit(config);
var tweet;


botTweet();

setInterval(botTweet,60*60*1000);

function botTweet(error, data, response){
  var randompoke = Math.floor(Math.random() * 898);
  var pokeurl = "https://pokeapi.co/api/v2/pokemon/"+String(randompoke);
  request(pokeurl, gotPoke);
  randompoke = Math.floor(Math.random() * 898)

  function gotPoke(error,response,body){
      var poke_data=JSON.parse(body);
      console.log(poke_data)
      pokename = poke_data.name;
      tweet =  "The Pokemon of the Day is " + pokename + "!";
      pokeimgurl = poke_data.sprites.front_default;
      download(pokeimgurl,"images/"+pokename+".png")
      function download(url, filename){
  		request(url).pipe(fs.createWriteStream(filename)).on('close', encodeImage);
  		function encodeImage(){
  			var encoded_img = fs.readFileSync(filename, {encoding: 'base64'});
  			T.post('media/upload', {media_data: encoded_img}, insertMetaData);
  		}

        function insertMetaData(error, data, response){
        		if(error){
        			console.log(error);
        		}
        		var mediaIdStr = data.media_id_string;
        		var altText = "This is a pokemon named" + poke_data.name;
        		var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };


        		T.post('media/metadata/create', {media_id: mediaIdStr}, createdMedia);


  		      function createdMedia(error, data, response){
            			if(error){
            				console.log("createdMedia");
            				console.log(error);
            				console.log(data);
            			}
            			var tweet_parameters = {status: tweet, media_ids: mediaIdStr};
            			T.post('statuses/update', tweet_parameters, tweeted);
            		}

                function tweeted(error, data, response){
                    if(error){
                    console.log(error);
                    } else {
                    console.log(pokename + "Sucess!");
                    }
                }
              }
              }
              }
              }
