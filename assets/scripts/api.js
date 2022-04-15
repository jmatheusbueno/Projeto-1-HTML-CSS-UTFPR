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
            loadDataSource(result.data);
        }
    }
    http.send();
}

function search2() {
    loadDataSource(example.data);
}

function loadDataSource(data) {
    let filteredData = [];

    let count = 1;
    for (let obj in data) {
        filteredData.push({
            number: count,
            title: data[obj].title,
            preview: data[obj].preview,
            avatar: data[obj].album.cover_small,
        });
        count++;
    }

    for (let obj in filteredData) {
        let tableContainer = document.querySelector('.table-container');

        let trCard = document.createElement('tr');
    
        let tdCardCounter = document.createElement('td');
        tdCardCounter.classList.add('card-counter');
        tdCardCounter.innerHTML = filteredData[obj].number;

        let tdCardImg = document.createElement('td');
        let imgCardImg = document.createElement('img');
        imgCardImg.src = filteredData[obj].avatar;
        imgCardImg.classList.add('card-avatar');
        tdCardImg.appendChild(imgCardImg);

        let tdCardTitle = document.createElement('td');
        tdCardTitle.classList.add('card-tittle');
        tdCardTitle.innerHTML = filteredData[obj].title;

        let tdCardAudio = document.createElement('td');
        let audioCardAudio = document.createElement('audio');
        audioCardAudio.controls = 'controls';
        let sourceAudioCardAudio = document.createElement('source');
        sourceAudioCardAudio.src = filteredData[obj].preview;
        sourceAudioCardAudio.type = 'audio/mp3';
        audioCardAudio.appendChild(sourceAudioCardAudio);
        tdCardAudio.appendChild(audioCardAudio);

        trCard.appendChild(tdCardCounter);
        trCard.appendChild(tdCardImg);
        trCard.appendChild(tdCardTitle);
        trCard.appendChild(tdCardAudio);

        tableContainer.appendChild(trCard);
    }
}