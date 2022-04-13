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

    console.log(json);
}