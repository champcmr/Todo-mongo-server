const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

const port = 8080;
const db = 'mongodb://localhost/local';

mongoose.connect(db);

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());


let server = app.listen(port, function() {
    let runnigPort = server.address().port;
    console.log('App listening on port ' + runnigPort);
});

let dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function() {
    console.log('We are connected');
});

require('./routes/member_route.js')(app);
require('./routes/task_route.js')(app);