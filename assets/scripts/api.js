function search() {
    let result;
    let search = document.querySelector('[name="search"]').value;
    var http = new XMLHttpRequest();
    http.open("get", `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${search}`, true);
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            result = JSON.parse(http.responseText);
            console.log(result);
        }
    }
    http.send();
}

function login() {
    console.log(window.location.hostname);
    let result;
    var http = new XMLHttpRequest();
    http.open(
        "get", 
        `https://connect.deezer.com/oauth/auth.php?app_id=1&redirect_uri=https://developers.deezer.com/api/oauth&perms=basic_access,email`, 
        true
    );
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            result = JSON.parse(http.responseText);
        }
    }
    http.send();
    console.log(result);
}