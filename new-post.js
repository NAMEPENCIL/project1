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
        myInfoSection.innerHTML = `<h2 data-i18n="my_info_title"></h2><p>${getTranslation('welcome_message').replace('!', ', ' + loggedInUser.username + '!')}</p>`;
        authLinks.innerHTML = `<button id="logout-button">${getTranslation('logout_button')}</button>`;
        document.getElementById('logout-button').addEventListener('click', logout);
    } else {
        myInfoSection.innerHTML = `<h2 data-i18n="my_info_title"></h2><p data-i18n="welcome_message"></p>`;
        authLinks.innerHTML = `
            <p><a href="login.html">${getTranslation('login_button')}</a></p>
            <p><a href="signup.html">${getTranslation('signup_link')}</a></p>
        `;
    }
    translatePage(currentLanguage); // Re-translate static elements in the updated UI
}

function logout() {
    sessionStorage.removeItem('loggedInUser');
    updateAuthUI();
    window.location.href = 'index.html'; // Redirect to refresh UI
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert(getTranslation('must_be_logged_in_to_post_alert'));
        window.location.href = 'login.html';
        return;
    }
    updateAuthUI();
});


document.getElementById('new-post-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const category = document.getElementById('category').value;
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        title: title,
        content: content,
        author: loggedInUser.username,
        category: category,
        comments: [],
        likes: 0
    };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    alert(getTranslation('post_created_successful_alert'));
    window.location.href = 'index.html';
});


themeSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
}
