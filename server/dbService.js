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
                var sql_query
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
                
                console.log(sql_query)
                connection.query(sql_query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results)
                }) ;
            });

            console.log(response);
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
}

module.exports = DbService;