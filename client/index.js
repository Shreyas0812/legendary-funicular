document.addEventListener('DOMContentLoaded', function() {
    dom_loaded = true;
    console.log('DOM loaded',select_table.value)
})

const select_table = document.getElementById("select-table");
//console.log(select_table.value)

select_table.addEventListener('click', function () {
    var val = select_table.value;
    var t_name
    if (val == 1) {
        console.log('Student Table');
        t_name = 'student';
    } else if (val == 2) {
        console.log('Company Table');
        t_name = 'company';
    } else if (val == 3) {
        console.log('Projects Table');
        t_name = 'projects';
    } else if (val == 4) {
        console.log('Weekly Contest Table');
        t_name = 'weekly_contests';
    } else {
        t_name = 'student';
    } 

    fetch('http://localhost:5000/showTable/' + t_name)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']))
});

function loadHTMLTable(data) {
    console.log(data);
}