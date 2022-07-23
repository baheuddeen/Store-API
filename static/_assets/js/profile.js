function getCookieByName(name) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim().split('='));
    const cookie = cookies.filter(cookie => cookie[0] === name)
    if (cookie.length === 0) {
        return undefined
    }
    const cookieValue = cookie[0][1];
    return cookieValue;
}


function setUsreName() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("/api/users/userInfo", requestOptions)
        .then(response => {
            if(response.status !== 200) throw new Error("invalid JWT ..")
            return response.json();
        }
        )
        .then(result => {
            console.log(result);
            document.getElementById('user-name').innerText = result['name'];
            document.getElementById('user-email').innerText = result['email'];
            document.getElementById('user-picture').querySelector('img').src = result['picture'];
        })
        .catch(error => console.log('error', error));

}
document.addEventListener('DOMContentLoaded', setUsreName);
