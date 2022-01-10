const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");
const app = express();
const p = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    // const url = ;
    res.sendFile(__dirname + "/index.html");
    // res.send("server is up and running ");

});
app.post("/", function (req, res) {
    const name = req.body.cityname
    const query = req.body.cityname;
    const appid = "8b2ab38830844a8479f2054117d7364a";
    // const units = "metric";  + "&units=" + units + ""
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid
    https.get(url, function (response) {
        console.log(response);

        response.on("data", function (data) {
            const weatherdata = JSON.parse(data)
            // const object = {
            //     name: "Ashwani",
            //     favouriteFood: "Sahani"
            // }
            // console.log(JSON.stringify(object));
            const temp = weatherdata.main.temp
            res.write("<h1>temperature of " + name + " in (kelvin) " + temp + "</h1>");
            const icon = weatherdata.weather[0].icon;
            const weatherdesc = weatherdata.weather[0].description
            const pressure = weatherdata.main.pressure;
            const humidity = weatherdata.main.humidity;
            const imgurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h2>weather description : " + weatherdesc + "</h2>");
            res.write("<h2>Pressure in " + name + " is " + pressure + " </h2>");
            res.write("<h2> humidity in " + name + " is : " + humidity + " </h2>");
            res.write("<img src=" + imgurl + ">");
            res.send();

        })
    })
})

app.listen(p, function () {
    console.log("server is running on port 3000.");
})