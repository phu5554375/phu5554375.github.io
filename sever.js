var express = require('express');
var apiMocker = require('connect-api-mocker');
const port = 9900; 
var cors = require('cors');
var app = express();
app.use(cors());
app.use('/api', apiMocker('mock-api'));
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));