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
    } else if (t_name == 'weekly_contests') {
        thHTML =`
            <th>Contest_id</th>
            <th>Contest_name</th>
            <th>Host_Company</th>
            <th>Skills_Required</th>
            <th>Delete</th>
            `;
        number_of_columns = 4;
    } else {
        //Do Nothing
    }
    
    table_header.innerHTML = thHTML;

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
            tbHTML += `<td><button class="delete-row-btn" data-id=${Reg_no}>Delete</button></td>`
            tbHTML += "</tr>"
        });
    } else if (t_name == 'weekly_contests') {
        data.forEach(function({Contest_id, Contest_name, Host_Company, Skills_Required }) {
            tbHTML += "<tr>"
            tbHTML += `<td>${Contest_id}</td>`
            tbHTML += `<td>${Contest_name}</td>`
            tbHTML += `<td>${Host_Company}</td>`
            tbHTML += `<td>${Skills_Required}</td>`
            tbHTML += `<td><button class="delete-row-btn" data-id=${Reg_no}>Delete</button></td>`
            tbHTML += "</tr>"
        });
    } else {
        //Do Nothing
    }
    
}