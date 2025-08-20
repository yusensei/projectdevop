const logins = document.getElementsByClassName('login');
const registers = document.getElementsByClassName('register');


function registerMode() {
    // Function to handle registration logic
    for (let i = 0; i < logins.length; i++) {
        logins[i].style.display = 'none';
    }
    for (let i = 0; i < registers.length; i++) {
        registers[i].style.display = 'block';
    }
}

function loginMode() {
    // Function to handle login logic
    for (let i = 0; i < logins.length; i++) {
        logins[i].style.display = 'block';
    }
    for (let i = 0; i < registers.length; i++) {
        registers[i].style.display = 'none';
    }
}

function loginSubmit() {

    const form = document.querySelector('form');
    const formData = new FormData(form);
    formData.append('action', 'login'); // Explicitly set action

    fetch('form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login response:', data);
    })
    .catch(error => {
        console.error('Login error:', error);
    });
}

function registerSubmit() {

    const form = document.querySelector('form');
    const formData = new FormData(form);
    formData.append('action', 'register');

    fetch('form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Registered:', data.message);
        } else if (data.message === 'duplicate') {
            alert('Error: Duplicate username');
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}