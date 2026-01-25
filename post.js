const postContentContainer = document.getElementById('post-content');
const themeSwitch = document.getElementById('theme-switch');
const myInfoSection = document.getElementById('my-info-section');
const authLinks = document.getElementById('auth-links');

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

function updateAuthUI() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        myInfoSection.innerHTML = `<h2>My Info</h2><p>Welcome, ${loggedInUser.username}!</p>`;
        authLinks.innerHTML = `<button id="logout-button">Logout</button>`;
        document.getElementById('logout-button').addEventListener('click', logout);
    } else {
        myInfoSection.innerHTML = `<h2>My Info</h2><p>Welcome!</p>`;
        authLinks.innerHTML = `
            <p><a href="login.html">Log In</a></p>
            <p><a href="signup.html">Sign Up</a></p>
        `;
    }
}

function logout() {
    sessionStorage.removeItem('loggedInUser');
    updateAuthUI();
    window.location.href = 'index.html'; // Redirect to refresh UI
}

themeSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
}

renderPost();
updateAuthUI(); // Call on load to set initial auth state