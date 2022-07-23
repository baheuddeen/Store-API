function signup() {
    console.log('shit');
    const signup = document.getElementById('signup-form');
    console.log(signup);
    signup.addEventListener('submit', async function (e) {
        e.preventDefault();
        const name = this.querySelector('#name').value;
        const password = this.querySelector('#password').value;
        const email = this.querySelector('#email').value;
        console.log(name);
        fetch(signup.action, {
            method: signup.method,
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
            headers:{
                'content-type': 'application/json',
                'accept': '*/*'
            }
        }).then((res) => {
            if(res.status === 200){
                window.location.pathname = '/';
            }
            console.log(res);
        });
    })
}


document.addEventListener('DOMContentLoaded', signup);