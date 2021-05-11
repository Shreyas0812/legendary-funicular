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
    .then(data => loadHTMLTable(data['data']))
});

function loadHTMLTable(data) {
    console.log('Here',data);
}