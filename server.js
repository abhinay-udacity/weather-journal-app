// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

/* Dependencies */
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// POST route
app.post('/add', returnData);
function returnData(req, res){
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    //console.log("insideapp.post"+projectData['temp']);
    res.send(projectData);
}


app.get('/all', (req, res)=>{
    //console.log(projectData.date);
    res.send(projectData);
    
});

// server details
const port = 8000;
const server = app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});