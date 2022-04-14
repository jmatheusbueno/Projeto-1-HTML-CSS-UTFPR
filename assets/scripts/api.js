
document.addEventListener("DOMContentLoaded", function() {
    load();
});

function load() {
    let connected = window.location.href.split('?')[1];
    if (connected === 'connected') {
        document.getElementById('connect').textContent = 'Usuário Conectado';
    }
}

function search() {
    let result;
    let search = document.querySelector('[name="search"]').value;
    var http = new XMLHttpRequest();
    http.open("get", `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${search}`, true);
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            result = JSON.parse(http.responseText);
            loadDataSource(result);
        }
    }
    http.send();
}

function loadDataSource(dataJSON) {
    console.log(typeof dataJSON.data)
    console.log(dataJSON.data)
    let data = [];

    for (let obj in dataJSON.data) {
        console.log(obj);
        data.push({
            title: obj.title,
        });
    }

    console.log(data);
}