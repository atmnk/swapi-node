var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, err => {
    console.log("app running on port.", server.address().port);
});