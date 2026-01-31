async function hashPassword(password, salt) {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashedPassword;
}

function generateSalt() {
    const array = new Uint8Array(16); // 16 bytes for a 128-bit salt
    crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert(getTranslation('passwords_mismatch_alert'));
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.username === username)) {
        alert(getTranslation('username_exists_alert'));
        return;
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    users.push({ username: username, passwordHash: hashedPassword, salt: salt });
    localStorage.setItem('users', JSON.stringify(users));

    alert(getTranslation('signup_successful_alert'));
    window.location.href = 'login.html';
});
