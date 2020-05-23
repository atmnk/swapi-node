var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, err => {
    console.log("app running on port.", server.address().port);
});