function signin() {
    console.log('shit');
    const signin = document.getElementById('signin-form');
    console.log(signin);
    signin.addEventListener('submit', function (e) {
        e.preventDefault();
        const password = this.querySelector('#password').value;
        const email = this.querySelector('#email').value;
        console.log(email);
        fetch(signin.action, {
            method: signin.method,
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers:{
                'content-type': 'application/json',
                'accept': '*/*'
            }
        }).then(() => {
            window.location.pathname = '/';
        });
    })
}


document.addEventListener('DOMContentLoaded', signin);