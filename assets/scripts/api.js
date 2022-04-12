function search() {
    let search = document.querySelector('[name="search"]').value;
    var http = new XMLHttpRequest();
    http.open("get", `https://api.deezer.com/search?q=${search}`, true);
    http.send();
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            const json = JSON.parse(http.responseText);
            console.log(json);
        }
    }
}