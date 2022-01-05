const express = require("express");
//native https module for external data callback
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//ONLY 1 RES.SEND IN ONE GET
app.get("/", function(req,res){

  res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "8d8995616300be1221119c702ca02505";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey+"&units=" + unit;

  https.get(url,function(response){   //response is the json data received
    console.log(response.statusCode);

    response.on("data", function(data){
      //use JSON.parse to convert JSON to readable data
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;   //the address
      const desc = "The weather in "+ query+ " is currently " + weatherData.weather[0].description;
      const iconUrl = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
      res.write("<h1> "+desc+"</h1>");
      res.write("<h2>The temperature is " + temp + " degress celsius.</h2>")
      res.write("<img src="+iconUrl + ">");
      res.send();
    });

  });
});






app.listen(3000, function(){
  console.log("Server running on port 3000.");
});
