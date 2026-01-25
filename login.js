async function hashPassword(password, salt) {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashedPassword;
}

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);

    if (user) {
        const hashedPassword = await hashPassword(password, user.salt);
        if (hashedPassword === user.passwordHash) {
            sessionStorage.setItem('loggedInUser', JSON.stringify({ username: user.username })); // Only store username in session
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password.');
        }
    } else {
        alert('Invalid username or password.');
    }
});
