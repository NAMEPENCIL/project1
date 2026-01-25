// Initialize posts from localStorage or use default posts
let posts = JSON.parse(localStorage.getItem('posts'));
if (!posts) {
    posts = [
        {
            id: 1,
            title: "First Post",
            content: "This is the content of the first post."
        },
        {
            id: 2,
            title: "Second Post",
            content: "This is the content of the second post."
        },
        {
            id: 3,
            title: "Third Post",
            content: "This is the content of the third post."
        },
        {
            id: 4,
            title: "Fourth Post",
            content: "This is the content of the fourth post."
        }
    ];
    localStorage.setItem('posts', JSON.stringify(posts));
}

const postsContainer = document.getElementById('posts-container');
const themeSwitch = document.getElementById('theme-switch');
const myInfoSection = document.getElementById('my-info-section');
const authLinks = document.getElementById('auth-links');
const newPostButton = document.getElementById('new-post-button');

function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
        `;
        postsContainer.appendChild(postElement);
    });
}

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
        newPostButton.style.display = 'inline-block'; // Show new post button
    } else {
        myInfoSection.innerHTML = `<h2>My Info</h2><p>Welcome!</p>`;
        authLinks.innerHTML = `
            <p><a href="login.html">Log In</a></p>
            <p><a href="signup.html">Sign Up</a></p>
        `;
        newPostButton.style.display = 'none'; // Hide new post button
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

renderPosts();
updateAuthUI(); // Call on load to set initial auth state