const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { request, response } = require('express');

dotenv.config();

const dbService = require('./dbService');
const { getDBServiceInstance } = require('./dbService');

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

//insert
app.post('/insertstudent', (request, response) => {
    const { Reg_no } = request.body;
    const { Name } = request.body;
    const { YOS } = request.body;
    const { Skills } = request.body;
    const { Achievements } = request.body;
    const { Projects } = request.body;
    //console.log(request.body, Reg_no);

    const db = getDBServiceInstance();

    const result = db.insertStudentDate(Reg_no, Name, YOS, Skills, Achievements, Projects);

    result
    .then(data => response.json({ data: data }))
    .catch (err => console.log(err));

});

app.post('/insert_company', (request, response) => {
    
});

app.post('/insert_projects', (request, response) => {
    
});

app.post('/insert_weekly_contests', (request, response) => {
    
});

//start local server
app.listen(process.env.PORT, () => console.log('App is running'));