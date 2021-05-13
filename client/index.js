document.addEventListener('DOMContentLoaded', function() {
    dom_loaded = true;
    console.log('DOM loaded',select_table.value)
})

const select_table = document.getElementById("select-table");
//console.log(select_table.value)

select_table.addEventListener('click', function () {
    //const t_name = select_table.value;
    //console.log(select_table, t_name)
    
    fetch('http://localhost:5000/showTable/' + select_table.value)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data'], select_table.value))
});

function loadHTMLTable(data, t_name) {
    console.log('Here',data, t_name);
    
    const table_header = document.querySelector('table thead')
    
    let number_of_columns = 0;
    let thHTML = '';

    const add_btn_table = document.querySelector('#add-record-table')
    let abHTML = ""


    if (t_name == 'student') {
        thHTML =`
            <th>Reg_no</th>
            <th>Name</th>
            <th>YOS</th>
            <th>Skills</th>
            <th>Achievements</th>
            <th>Projects</th>
            <th>Delete</th>
            `;
        number_of_columns = 6;
        abHTML =`
            <br>
            <h6>Add New:</h6>
            <tr>
                <td><input placeholder="Reg_no" id="input-reg-no" type=></td>
                <td><input placeholder="Name" id="input-name"></td>
                <td><input placeholder="YOS" id="input-yos"></td>
                <td><input placeholder="Skills" id="input-skills"></td>
                <td><input placeholder="Achievements" id="input-achievements"></td>
                <td><input placeholder="Projects" id="input-projects"></td>
            </tr>`;
    } else if (t_name == 'company') {
        thHTML =`
            <th>Company_Id</th>
            <th>Company_name</th>
            <th>CTC</th>
            <th>Job_Role</th>
            <th>Skill_set</th>
            <th>Contests</th>
            <th>Delete</th>
            `;
        number_of_columns = 6;
        abHTML =`
            <br>
            <h6>Add New:</h6>
            <tr>
                <td><input placeholder="Company_ID" id="input-company-id" type=></td>
                <td><input placeholder="Company_name" id="input-company-name"></td>
                <td><input placeholder="CTC" id="input-ctc"></td>
                <td><input placeholder="Job_Role" id="input-job-role"></td>
                <td><input placeholder="Skill_set" id="input-skill-set"></td>
                <td><input placeholder="Contests" id="input-contests"></td>
            </tr>`;
    } else if (t_name == 'projects') {
        thHTML =`
            <th>Project_id</th>
            <th>Project_title</th>
            <th>Host_id</th>
            <th>Host_name</th>
            <th>Skill_set</th>
            <th>Skill_set_required</th>
            <th>Members</th>
            <th>Delete</th>
            `;
        number_of_columns = 7;
        abHTML =`
            <br>
            <h6>Add New:</h6>
            <tr>
                <td><input placeholder="Project_id" id="input-project-id" type=></td>
                <td><input placeholder="Project_title" id="input-project-title"></td>
                <td><input placeholder="Host_id" id="input-host-id"></td>
                <td><input placeholder="Host_name" id="input-host-name"></td>
                <td><input placeholder="Skill_set" id="input-skill-set"></td>
                <td><input placeholder="Skill_set_required" id="input-skill-set-required"></td>
                <td><input placeholder="Members" id="input-members"></td>
            </tr>`
    } else if (t_name == 'weekly_contests') {
        thHTML =`
            <th>Contest_id</th>
            <th>Contest_name</th>
            <th>Host_Company</th>
            <th>Skills_Required</th>
            <th>Delete</th>
            `;
        number_of_columns = 4;
        abHTML =`
            <br>
            <h6>Add New:</h6>
            <tr>
                <td><input placeholder="Contest_id" id="input-contest-id" type=></td>
                <td><input placeholder="Contest_name" id="input-contest-name"></td>
                <td><input placeholder="Host_Company" id="input-host-company"></td>
                <td><input placeholder="Skills_Required" id="input-skills-required"></td>
            </tr>`;
    } else {
        //Do Nothing
    }
    
    table_header.innerHTML = thHTML;
    add_btn_table.innerHTML = abHTML;

    console.log('data: ', data)
    // Data
    const table_body = document.getElementById('main-table-body');
    let tbHTML = '';
    if (data.length === 0) {
        tbHTML =  `<tr><td class='no-data' colspan = ${number_of_columns}>No Data</td></tr>`;
        table_body.innerHTML = String(tbHTML);
        return;
    }


    if (t_name == 'student') {
        data.forEach(function({Reg_no, Name, YOS, Skills, Achievements, projects }) {
            tbHTML += "<tr>"
            tbHTML += `<td>${Reg_no}</td>`
            tbHTML += `<td>${Name}</td>`
            tbHTML += `<td>${YOS}</td>`
            tbHTML += `<td>${Skills}</td>`
            tbHTML += `<td>${Achievements}</td>`
            tbHTML += `<td>${projects}</td>`
            tbHTML += `<td><button class="delete-row-btn" data-id=${Reg_no}>Delete</button></td>`
            tbHTML += "</tr>"

        });
    } else if (t_name == 'company') {
        data.forEach(function({Company_ID, Company_name, CTC, Job_Role, Skill_set, Contests }) {
            tbHTML += "<tr>"
            tbHTML += `<td>${Company_ID}</td>`
            tbHTML += `<td>${Company_name}</td>`
            tbHTML += `<td>${CTC}</td>`
            tbHTML += `<td>${Job_Role}</td>`
            tbHTML += `<td>${Skill_set}</td>`
            tbHTML += `<td>${Contests}</td>`
            tbHTML += `<td><button class="delete-row-btn" data-id=${Company_ID}>Delete</button></td>`
            tbHTML += "</tr>"
        });
    } else if (t_name == 'projects') {
        data.forEach(function({Project_id, Project_title, Host_id, Host_name, Skill_set, Skill_set_required, Members }) {
            tbHTML += "<tr>"
            tbHTML += `<td>${Project_id}</td>`
            tbHTML += `<td>${Project_title}</td>`
            tbHTML += `<td>${Host_id}</td>`
            tbHTML += `<td>${Host_name}</td>`
            tbHTML += `<td>${Skill_set}</td>`
            tbHTML += `<td>${Skill_set_required}</td>`
            tbHTML += `<td>${Members}</td>`
            tbHTML += `<td><button class="delete-row-btn" data-id=${Project_id}>Delete</button></td>`
            tbHTML += "</tr>"
        });
    } else if (t_name == 'weekly_contests') {
        data.forEach(function({Contest_id, Contest_name, Host_Company, Skills_Required }) {
            tbHTML += "<tr>"
            tbHTML += `<td>${Contest_id}</td>`
            tbHTML += `<td>${Contest_name}</td>`
            tbHTML += `<td>${Host_Company}</td>`
            tbHTML += `<td>${Skills_Required}</td>`
            tbHTML += `<td><button class="delete-row-btn" data-id=${Contest_id}>Delete</button></td>`
            tbHTML += "</tr>"
        });
    } else {
        //Do Nothing
    }
    table_body.innerHTML = tbHTML;
}

const addBtn = document.querySelector('#add-record-btn');

addBtn.onclick = function() {
    console.log('In add record',select_table.value);
    
    t_name = select_table.value;
    if (t_name == 'student') {
        const Reg_no_input = document.querySelector('#input-reg-no');
        const Reg_no = Reg_no_input.value || "";
        Reg_no_input.value = "";
        const Name_input = document.querySelector('#input-name');
        const Name = Name_input.value || "";
        Name_input.value = "";
        const YOS_input = document.querySelector('#input-yos');
        const YOS = YOS_input.value || "";
        YOS_input.value = "";
        const Skills_input = document.querySelector('#input-skills'); 
        const Skills = Skills_input.value || "";
        Skills_input.value = "";
        const Achievements_input = document.querySelector('#input-achievements');
        const Achievements = Achievements_input.value || "";
        Achievements_input.value = "";
        const Projects_input = document.querySelector('#input-projects');
        const Projects = Projects_input.value || "";
        Projects_input.value = "";

        //sending to backend
        fetch('http://localhost:5000/insertstudent', {
            headers: {
                'Content-type': 'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                Reg_no: Reg_no,
                Name: Name,
                YOS: YOS,
                Skills: Skills,
                Achievements: Achievements,
                Projects: Projects
            })
        })
        .then (response => response.json())
        .then (data => insertRowIntoTable(data['data'], t_name))
        ;
    } else if (t_name == 'company') {
        const Company_ID_input = document.querySelector('#input-company-id');
        const Company_ID = Company_ID_input.value || "";
        Company_ID_input.value = "";
        const Company_name_input = document.querySelector('#input-company-name');
        const Company_name = Company_name_input.value || "";
        Company_name_input.value = "";
        const CTC_input = document.querySelector('#input-ctc');
        const CTC = CTC_input.value || "";
        CTC_input.value = "";
        const Job_Role_input = document.querySelector('#input-job-role');
        const Job_Role = Job_Role_input.value || "";
        Job_Role_input.value = "";
        const Skill_set_input = document.querySelector('#input-skill-set');
        const Skill_set = Skill_set_input.value || "";
        Skill_set_input.value = "";
        const Contest_name_input = document.querySelector('#input-contests');
        const Contest_name = Contest_name_input.value || "";
        Contest_name_input.value = "";
        
        //sending to backend
        fetch('http://localhost:5000/insertcompany', {
            headers: {
                'Content-type': 'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                Company_ID: Company_ID,
                Company_name: Company_name,
                CTC: CTC,
                Job_Role: Job_Role,
                Skill_set: Skill_set,
                Contest_name: Contest_name
            })
        })
        .then (response => response.json())
        .then (data => insertRowIntoTable(data['data'], t_name))
        ;
    } else if (t_name == 'projects') {
        const Project_id_input = document.querySelector('#input-project-id');
        const Project_id = Project_id_input.value || "";
        Project_id_input.value = "";
        const Project_title_input = document.querySelector('#input-project-title');
        const Project_title = Project_title_input.value || "";
        Project_title_input.value = "";
        const Host_id_input = document.querySelector('#input-host-id');
        const Host_id = Host_id_input.value || "";
        Host_id_input.value = "";
        const Host_name_input = document.querySelector('#input-host-name');
        const Host_name = Host_name_input.value || "";
        Host_name_input.value = "";
        const Skill_set_input = document.querySelector('#input-skill-set');
        const Skill_set = Skill_set_input.value || "";
        Skill_set_input.value = "";
        const Skill_set_required_input = document.querySelector('#input-skill-set-required');
        const Skill_set_required = Skill_set_required_input.value || "";
        Skill_set_required_input.value = "";
        const Members_input = document.querySelector('#input-members');
        const Members = Members_input.value || "";
        Members_input.value = "";
        
        //sending to backend
        fetch('http://localhost:5000/insertprojects', {
            headers: {
                'Content-type': 'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                Project_id: Project_id,
                Project_title: Project_title,
                Host_id: Host_id,
                Host_name: Host_name,
                Skill_set: Skill_set,
                Skill_set_required: Skill_set_required,
                Members: Members
            })
        })
        .then (response => response.json())
        .then (data => insertRowIntoTable(data['data'], t_name))
        ;
    } else if (t_name == 'weekly_contests') {
        const Contest_id_input = document.querySelector('#input-contest-id');
        const Contest_id = Contest_id_input.value || "";
        Contest_id_input.value = "";
        const Contest_name_input = document.querySelector('#input-contest-name');
        const Contest_name = Contest_name_input.value || "";
        Contest_name_input.value;
        const Host_Company_input = document.querySelector('#input-host-company');
        const Host_Company = Host_Company_input.value || "";
        Host_Company_input.value = "";
        const Skills_Required_input = document.querySelector('#input-skills-required');
        const Skills_Required = Skills_Required_input.value || "";
        Skills_Required_input.value = "";
        
        //sending to backend
        fetch('http://localhost:5000/insertweeklycontests', {
            headers: {
                'Content-type': 'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                Contest_id: Contest_id,
                Contest_name: Contest_name,
                Host_Company: Host_Company,
                Skills_Required: Skills_Required
            })
        })
        .then (response => response.json())
        .then (data => insertRowIntoTable(data['data'], t_name))
        ;
    } else {
        //Do Nothing
    }
}

function insertRowIntoTable(data, t_name) {
    console.log('Insert this: ', data, 'into', t_name);
    const table_body = document.getElementById('main-table-body');

    const isTableData = table_body.querySelector('.no-data');

    let tbAddHTML = "<tr>";
    let index = 0;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            tbAddHTML += `<td>${data[key]}</td>`;
            console.log('key',key, data[key])
            
            if (index == 0) {
                primary_key = key;
            }
            index += 1
        }
    }

    tbAddHTML += `<td><button class="delete-row-btn" data-id=${data[primary_key]}>Delete</button></td>`;
    tbAddHTML += "</tr>";

    console.log('Main Data and Primary Key: ', data, data[primary_key])    
    //check
    if (isTableData) {
        table_body.innerHTML = tbAddHTML;
    } else {
        const newRow = table_body.insertRow();
        newRow.innerHTML = tbAddHTML;
    }
    
}