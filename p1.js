const logins = document.getElementsByClassName('login');
const registers = document.getElementsByClassName('register');


function register() {
    // Function to handle registration logic
    for (let i = 0; i < logins.length; i++) {
        logins[i].style.display = 'none';
    }
    for (let i = 0; i < registers.length; i++) {
        registers[i].style.display = 'block';
    }
}

function login() {
    // Function to handle login logic
    for (let i = 0; i < logins.length; i++) {
        logins[i].style.display = 'block';
    }
    for (let i = 0; i < registers.length; i++) {
        registers[i].style.display = 'none';
    }
}