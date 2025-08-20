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
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('exampleModalLabel');
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));

    if (data.status === 'success') {
      modalTitle.textContent = 'Success';
      modalBody.innerHTML = `<p>${data.message || 'Registration complete!'}</p>`;
    } else if (data.message === 'duplicate') {
      modalTitle.textContent = 'Duplicate Entry';
      modalBody.innerHTML = `<p> Username already exists. Please try another.</p>`;
    } else {
      modalTitle.textContent = 'Error';
      modalBody.innerHTML = `<p style="color: red;"> ${data.message || 'Registration failed.'}</p>`;
    }

    modal.show();
  })
  .catch(error => {
    console.error('Fetch error:', error);
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('exampleModalLabel');
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));

    modalTitle.textContent = 'Network Error';
    modalBody.innerHTML = `<p style="color: red;">Unable to connect. Please try again later.</p>`;
    modal.show();
  });
}

function showModal() {
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}

function loginSubmit() {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  formData.append('action', 'login');

  fetch('form.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('exampleModalLabel');
    const modalElement = document.getElementById('exampleModal');
    const modal = new bootstrap.Modal(modalElement);

    let shouldRedirect = false;

    if (data.status === 'success') {
      modalTitle.textContent = 'Welcome';
      modalBody.innerHTML = `<p>${data.message || 'Login successful!'}</p>`;
      shouldRedirect = true;
    } else if (data.message === 'User not found') {
      modalTitle.textContent = 'User Not Found';
      modalBody.innerHTML = `<p>No account matches that username.</p>`;
    } else if (data.message === 'Incorrect password') {
      modalTitle.textContent = 'Incorrect Password';
      modalBody.innerHTML = `<p>Password is incorrect. Please try again.</p>`;
    } else {
      modalTitle.textContent = 'Login Error';
      modalBody.innerHTML = `<p>${data.message || 'Login failed.'}</p>`;
    }

    // Attach redirect logic to modal close event
    modalElement.addEventListener('hidden.bs.modal', function () {
      if (shouldRedirect) {
        window.location.href = 'p2.html';
      }
    });

    modal.show();
  })
  .catch(error => {
    console.error('Fetch error:', error);
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('exampleModalLabel');
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));

    modalTitle.textContent = 'Network Error';
    modalBody.innerHTML = `<p style="color: red;">Unable to connect. Please try again later.</p>`;
    modal.show();
  });
}