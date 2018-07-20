var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var ZipCodes = require('./model');
var constants = require('./constants');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// to add a new zipcode
app.post('/zipcodes', function (req, res) {
    var zipCodeData = new ZipCodes(req.body);
    zipCodeData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            console.log(err.message);
            res.status(400).send("unable to save to database");
        });

});

// zipcodes to populate the drop down list
app.get('/zipcodes', function (req, res) {
    ZipCodes.find({}, function (err, zipcodes) {
        res.send(zipcodes);
    })
})

// http://localhost:3000/weather/75035
app.get('/weather/zipcodes/:zipCode', function (req, res) {
    let query = 'select * from weather.forecast where woeid in (select woeid from geo.places where placetype=\'Zip\' AND text=';
    let url = constants.BASE_URL +'?q=' + query + '\'' + req.params.zipCode + '\'' + ')&format=' + constants.FORMAT;
    axios.get(url)
        .then(response=>{
            var weatherObj = response.data.query.results.channel;
            var weatherUSObj = [];
            if(weatherObj!=null){
                var filterLocationObj = weatherObj.filter(function (obj) {
                    return obj.location!= undefined
                });
                weatherUSObj = filterLocationObj.filter(function (item) {
                    return item.location.country === constants.COUNTRY
                });
            }
            res.send(weatherUSObj);
        })
        .catch(function (err) {
            console.log(err.message);
        });
});

//  http://localhost:3000/weather?zipCodes=75035&zipCodes=75063
app.post('/weather/zipcodes', function (req, res) {
    let query = 'select * from weather.forecast where woeid in (select woeid from geo.places where placetype=\'Zip\' AND text in (';
    let url = constants.BASE_URL +'?q=' + query + req.body.zipCodes + '))&format=' + constants.FORMAT;
    axios.get(url)
        .then(response=>{
            var weatherObj = response.data.query.results.channel;
            var weatherUSObj = [];
            if(weatherObj!=null){
                var filterLocationObj = weatherObj.filter(function (obj) {
                    return obj.location!= undefined
                });
                weatherUSObj = filterLocationObj.filter(function (item) {
                    return item.location.country === constants.COUNTRY
                });
            }
            res.send(weatherUSObj);
        })
        .catch(function (err) {
            console.log(err.message);
        });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});