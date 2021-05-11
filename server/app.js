const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { request, response } = require('express');

dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

//CRUD Operations

//read

app.get('/showTable/:tname', (request, response) => {
    //console.log(request.params);
    const { tname } = request.params;
    const db = dbService.getDBServiceInstance();

    const result = db.getTableData(tname);
    
    result
    .then (data => response.json({ data: data }))
    .catch(err => console.log(err));
});

//start local server
app.listen(process.env.PORT, () => console.log('App is running'));