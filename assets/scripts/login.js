function closeModal() {
    document.querySelector('.login-modal').style.display = 'none';
}

function openModal() {
    document.querySelector('.login-modal').style.display = 'block';
}

function mongoLogin() {
    if (!loginIsValid())
        return;

    const username = document.querySelector('#idUsername').value;
    const password = document.querySelector('#idPassword').value;
    const url = window.location.href;
    var http = new XMLHttpRequest();
    
    http.open("get", `${url}/login/get/${username}/${password}`, true);

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            result = JSON.parse(http.responseText);
            console.log(result.data);
        } else {
            window.alert('Usuário invalido');
        }
    }
    http.send();
}

function loginIsValid() {
    const username = document.querySelector('#idUsername').value;
    const password = document.querySelector('#idPassword').value;

    const errorUsername = document.querySelector('.errorUsername');
    const errorPassword = document.querySelector('.errorPassword');

    errorUsername.innerHTML = '';
    errorPassword.innerHTML = '';

    let isValid = true;
    if (!correctValue(username)) {
        document.querySelector('#idUsername').style.borderColor = "red";
        errorUsername.innerHTML += "Username invalido";
        isValid = false;
    }
    if (!correctValue(password)) {
        document.querySelector('#idPassword').style.borderColor = "red";
        errorPassword.innerHTML += "Senha invalida";
        isValid = false;
    } 

    return isValid;
}

function correctValue(strData) {
    if (strData === undefined || strData === null || strData === '' || strData.length < 3)
        return false;
    return true;
}