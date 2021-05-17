const mysql = require('mysql');
const dotenv = require('dotenv');
const { request, response } = require('express');
const e = require('express');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDBServiceInstance() {
        return instance ? instance : new DbService();
    }
    
    async getTableData(tname) {
        try {
            console.log(tname)
            const response = await new Promise((resolve, reject) => {
                var sql_query;
                if (tname == 'student') {
                    sql_query = 'SELECT * FROM student';
                } else if (tname == 'company') {
                    sql_query = 'SELECT * FROM company';
                } else if (tname == 'projects') {
                    sql_query = 'SELECT * FROM projects';
                } else if (tname == 'weekly_contests') {
                    sql_query = 'SELECT * FROM weekly_contests';
                } else {
                    //Do Nothing
                }
                
                //console.log(sql_query)
                connection.query(sql_query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results)
                }) ;
            });

            //console.log(response);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    
    /*
    async getTableData(tname) {
        try {
            console.log(tname)
            const response = await new Promise((resolve, reject) => {
                const sql_query = 'SELECT * FROM ?';
                console.log(sql_query)
                connection.query(sql_query, [tname], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results)
                }) ;
            });

            console.log(response);
            return response;
        } catch (error) {
            console.log(error)
        }
    }*/

    async insertStudentData(Reg_no, Name, YOS, Skills, Achievements, Projects) {
        try {
            const New_Reg_no = await new Promise((resolve, reject) => {
                const sql_query = "INSERT INTO student VALUES (?, ?, ?, ?, ?, ?);";
                connection.query(sql_query, [Reg_no, Name, YOS, Skills, Achievements, Projects], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.Reg_no);
                });
            });

            //console.log(New_Reg_no);
            return {
                Reg_no: Reg_no,
                Name: Name,
                YOS: YOS,
                Skills: Skills,
                Achievements: Achievements,
                Projects: Projects
            };
        } catch (error) {
            console.log(error)
        }
    }

    async insertCompanyData(Company_ID, Company_name, Job_Role, Skill_set, Contest_name) {
        try {
            const New_company_table_val = await new Promise((resolve, reject) => {
                const sql_query = "INSERT INTO company VALUES (?, ?, ?, ?, ?);";
                connection.query(sql_query, [Company_ID, Company_name, Job_Role, Skill_set, Contest_name], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.Company_ID);
                });
            });

            //console.log(New_company_table_val);
            return {
                Company_ID:Company_ID,
                Company_name: Company_name,
                Job_Role: Job_Role,
                Skill_set: Skill_set,
                Contest_name: Contest_name
            };
            
        } catch (error) {
            console.log(error);
        }
    }

    async insertProjectsData(Project_id, Project_title, Host_id, Host_name, Skill_set, Skill_set_required, Members) {
        try {
            const New_projects_table_val = await new Promise((resolve, reject) => {
                const sql_query = "INSERT INTO projects VALUES (?, ?, ?, ?, ?, ?, ?);";
                connection.query(sql_query,[Project_id, Project_title, Host_id, Host_name, Skill_set, Skill_set_required, Members], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.Project_id);
                });
            });

            //console.log(New_projects_table_val);
            return {
                Project_id: Project_id,
                Project_title: Project_title,
                Host_id: Host_id,
                Host_name: Host_name,
                Skill_set: Skill_set,
                Skill_set_required: Skill_set_required,
                Members: Members
            };
        } catch(error) {
            console.log(error);
        }
    }

    async insertWeeklyContestsData(Contest_id, Contest_name, Host_Company, Skills_Required) {
        try {
            const New_weekly_contests_table_val = await new Promise((resolve, reject) => {
                const sql_query = "INSERT INTO weekly_contests VALUES (?, ?, ?, ?);";
                connection.query(sql_query, [Contest_id, Contest_name, Host_Company, Skills_Required], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.Contest_id);
                });
            });

            //console.log(New_weekly_contests_table_val);
            return {
                Contest_id: Contest_id,
                Contest_name: Contest_name,
                Host_Company: Host_Company,
                Skills_Required: Skills_Required
            };
        } catch(error) {
            console.log(error);
        }
    }

    async deleteRowById(id, tname) {
        try {   
            const response = await new Promise((resolve, reject) => {
                var sql_query
                if (tname == 'student') {
                    sql_query = 'DELETE FROM student where Reg_no = ?';
                } else if (tname == 'company') {
                    sql_query = 'DELETE FROM company where company_ID = ?';
                } else if (tname == 'projects') {
                    sql_query = 'DELETE FROM projects where Project_id = ?';
                } else if (tname == 'weekly_contests') {
                    sql_query = 'DELETE FROM weekly_contests where Contest_id = ?';
                } else {
                    //Do Nothing
                }
                connection.query(sql_query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });

            console.log(response);
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
        }
    }

    async searchByValue(tname, searchValue){
        try {
            const response = await new Promise((resolve, rejecct) => {
                var sql_query;
                if (tname == 'student') {
                    sql_query = `SELECT * FROM student 
                        WHERE Reg_no LIKE '%${searchValue}%' OR
                            Name LIKE '%${searchValue}%' OR
                            YOS LIKE '%${searchValue}%' OR
                            Skills LIKE '%${searchValue}%' OR
                            Achievements LIKE '%${searchValue}%' OR
                            Projects LIKE '%${searchValue}%' 
                        ;`;
                } else if (tname == 'company') {
                    sql_query = `SELECT * FROM company
                        WHERE Company_ID LIKE '%${searchValue}%' OR
                            Company_name LIKE '%${searchValue}%' OR
                            Job_Role LIKE '%${searchValue}%' OR
                            Skill_set LIKE '%${searchValue}%' OR
                            Contests LIKE '%${searchValue}%'
                        ;`;
                } else if (tname == 'projects') {
                    sql_query = `SELECT * FROM projects
                        WHERE Project_id LIKE '%${searchValue}%' OR
                            Project_title LIKE '%${searchValue}%' OR
                            Host_id LIKE '%${searchValue}%' OR
                            Host_name LIKE '%${searchValue}%' OR
                            Skill_set LIKE '%${searchValue}%' OR
                            Skill_set_required LIKE '%${searchValue}%' OR
                            Members LIKE '%${searchValue}%'
                        ;`;
                } else if (tname == 'weekly_contests') {
                    sql_query = `SELECT * FROM weekly_contests
                        WHERE Contest_id LIKE '%${searchValue}%' OR
                            Contest_name LIKE '%${searchValue}%' OR
                            Host_Company LIKE '%${searchValue}%' OR
                            Skills_Required LIKE '%${searchValue}%' OR
                        ;`;
                } else {
                    //Do Nothing
                }
                console.log(sql_query)
                connection.query(sql_query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });

            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;