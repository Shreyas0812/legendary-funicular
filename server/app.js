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

    const result = db.insertStudentData(Reg_no, Name, YOS, Skills, Achievements, Projects);

    result
    .then(data => response.json({ data: data }))
    .catch (err => console.log(err));

});

app.post('/insertcompany', (request, response) => {
    const { Company_ID } = request.body;
    const { Company_name } = request.body;
    const { Job_Role } = request.body;
    const { Skill_set } = request.body;
    const { Contest_name } = request.body;
    //console.log(request.body, Reg_no);


    const db = getDBServiceInstance();

    const result = db.insertCompanyData(Company_ID, Company_name, Job_Role, Skill_set, Contest_name);

    //console.log('Results: ', result)
    result
    .then(data => response.json({ data: data }))
    .catch (err => console.log(err));

});

app.post('/insertprojects', (request, response) => {
    const { Project_id } = request.body;
    const { Project_title } = request.body;
    const { Host_id } = request.body;
    const { Host_name } = request.body;
    const { Skill_set } = request.body;
    const { Skill_set_required } = request.body;
    const { Members } = request.body;

    const db = getDBServiceInstance();

    const result = db.insertProjectsData(Project_id, Project_title, Host_id, Host_name, Skill_set, Skill_set_required, Members);

    //console.log('Results: ', result)
    result
    .then(data => response.json({ data: data }))
    .catch (err => console.log(err));

});

app.post('/insertweeklycontests', (request, response) => {
    const { Contest_id } = request.body;
    const { Contest_name } = request.body;
    const { Host_Company } = request.body;
    const { Skills_Required } = request.body;

    const db = getDBServiceInstance();

    const result = db.insertWeeklyContestsData(Contest_id, Contest_name, Host_Company, Skills_Required);

    //console.log('Results: ', result)
    result
    .then(data => response.json({ data: data }))
    .catch (err => console.log(err));

});


app.delete('/delete/:id/:t_name', (request, response) => {
    //console.log('Parameter: ', request.params);

    const { id } = request.params;
    const { t_name } = request.params;
    //console.log(id, t_name)
    
    const db = getDBServiceInstance();

    const result = db.deleteRowById(id, t_name);

    result
    .then (data => response.json({ success: data }))
    .catch (err => console.log(err));

});

app.get('/search/:searchValue/:t_name', (request, response) => {
    const {t_name} = request.params;
    const {searchValue} = request.params;

    console.log("Search here: ", t_name, searchValue)

    const db = dbService.getDBServiceInstance();
    const result = db.searchByValue(t_name, searchValue);

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));
})


app.listen(process.env.PORT, () => console.log('App is running'));