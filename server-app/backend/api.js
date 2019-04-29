const express = require('express');

const app = express();
const router = require('./routes/routes');
// set headers
// parse body

const bodyParser = require('body-parser');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.send('Express');
// });
app.use('/users', router);
// app.get('/', (req,res) => {
//     res.status(200).json({
//         message: 'get success'
//     });
// });
module.exports = app;