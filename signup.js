document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }

    users.push({ username: username, password: password }); // In a real app, hash the password!
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign up successful! Please log in.');
    window.location.href = 'login.html';
});
