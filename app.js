


const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));



app.get("/", function(req , res){

   res.sendFile(__dirname + "/index.html");
  

   
    });
   
  
    app.post("/", function(req ,res){
     


      const query = req.body.cityName;
      const apiKey = "78ba45075395b06a5d22cfdd9f1bc5d1";
      const units = "metric";
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" +  query +  "&appid="  +  apiKey +"&units=" + units;
      https.get(url , function(response){
      console.log(response.statusCode);

       response.on("data", function(data){
       const weatherData = JSON.parse(data);
       console.log(weatherData);
       const temp = weatherData.main.temp
       console.log(temp)
       const weatherDescription = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon
       const imageURL = "http://openweathermap.org/img/wn/" + icon  + "@2x.png"
       const feels_like = weatherData.main.feels_like
       const humidity = weatherData.main.humidity
       const pressure = weatherData.main.pressure
       const visibility = weatherData.visibility
       const wind = weatherData.wind.speed
       
       res.write("<p><b> Today's Temperature in " + query + " is " + temp + "C</b></p>");
       res.write("<p><b>The weather is currently : " + weatherDescription + "</b></p>");
       res.write("<img src=" + imageURL + ">");
       res.write("<p><b>Feels LiKe : " + feels_like + "C </b></p>");
       res.write("<p><b>Humidity  : " + humidity + "% <b/></p>");
       res.write("<p><b>Pressure : " + pressure +  "</b><p>")
       res.write("<p><b>Visibility : " + visibility + "</b></p>")
       res.write("<p><b> Wind :" + wind + " Km/h</b></p>")
        res.send();

          });
      });
       
    })
 
  





app.listen(3000 , function(){
    console.log("Server is running on port 3000");
});

