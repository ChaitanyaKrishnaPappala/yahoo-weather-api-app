var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://chaitanya:password123@ds143461.mlab.com:43461/ckpweatherapp");

var zipCodeSchema = new mongoose.Schema({
    zipCode: String
});

var ZipCodes = mongoose.model("zipcodes", zipCodeSchema);

module.exports = ZipCodes;