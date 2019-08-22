var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

// var items = [
//   {
//     name: 'item 1',
//     date: '2019.12.21 18:46'
//   },
//   {
//     name: 'item 2',
//     date: '2018.12.21 18:46'
//   }
// ];

app.get('/items', function (req, res) {
  res.send(items);
});

app.post('/items', function (req, res) {
  var item = {
    name: req.body.name,
    date: req.body.date
  };
  items.push(item);
  res.send(item);
});

