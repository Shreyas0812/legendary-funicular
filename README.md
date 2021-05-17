# legendary-funicular

#### Abstract

Social networking for Students is primarily limited to websites
such as LinkedIn and college based contacts. This allows students to search for like-minded people only in a limited circle. In contrast, using our application would enable students to expand their boundaries and reach students from various parts of the world.

This is a social networking website designed for business professionals. Interaction on the platform is not restricted to only companies to students but collaborations between students is also encouraged. 

It allows you to share work-related information with other users and keep an online list of professional contacts. 

The project highlights the database management aspect of the aforementioned application.

#### Entity Relationship Diagram
![E-R Diagram](https://github.com/Shreyas0812/legendary-funicular/blob/main/DBMS%20Project%20ER%20Diagram%20Legendary%20Funicular.png)

#### To Run this DBMS Project:
1. Clone this Repository
2. Ensure that node-js and mysql are already installed
3. Make the necessary tables in sql. Schema for the same is given in the Project_report attatched.
5. Make a .env file in the service with the following specification :
> PORT=5000 <br />
> USER=[sql_user] <br />
> PASSWORD=[sql-password] <br />
> DATABASE=[name of the database] <br />
> DB_PORT=3306 <br />
> HOST=localhost <br />
6. In the Powershell/cmd, run: 
> cd server <br />
> npm install express <br />
> npm install mysql <br />
> npm install cors <br />
> npm install dotnenv <br />
> npm install nodemon --save-dev <br />
> npm start <br />
8. Open the Project on localhost:5000 on your browser
