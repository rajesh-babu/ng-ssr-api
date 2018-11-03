var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.static(path.join(__dirname, "public")));

app.get("/getCMSData", function(req, res) {
    console.log("req.params.reqURL->"+ JSON.stringify(req.query.reqURL))
    
    var data = ({
      data: [
          {compType: 'home', url: req.query.reqURL, compData:{value:1}}
      ]
    });
    res.status(200).send(data);

});

var server = app.listen(process.env.COUCHBASE_PORT || 3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
