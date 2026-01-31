const profileInfoContainer = document.getElementById('profile-info');
const userPostsContainer = document.getElementById('user-posts-container');
const themeSwitch = document.getElementById('theme-switch');
const myInfoSection = document.getElementById('my-info-section');
const authLinks = document.getElementById('auth-links');

// Initialize posts from localStorage or use default posts
let posts = JSON.parse(localStorage.getItem('posts'));
if (!posts) {
    posts = [
        {
            id: 1,
            title: "First Post",
            content: "This is the content of the first post.",
            author: "user1",
            comments: [],
            likes: 0,
            category: "General"
        },
        {
            id: 2,
            title: "Second Post",
            content: "This is the content of the second post.",
            author: "user2",
            comments: [],
            likes: 0,
            category: "Technology"
        },
        {
            id: 3,
            title: "Third Post",
            content: "This is the content of the third post.",
            author: "user1",
            comments: [],
            likes: 0,
            category: "Lifestyle"
        },
        {
            id: 4,
            title: "Fourth Post",
            content: "This is the content of the fourth post.",
            author: "user3",
            comments: [],
            likes: 0,
            category: "News"
        }
    ];
    localStorage.setItem('posts', JSON.stringify(posts));
}

function renderUserProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user');

    if (username) {
        profileInfoContainer.innerHTML = `<h2>${username}'s Profile</h2>`;
        
        const userPosts = posts.filter(post => post.author === username);
        
        userPostsContainer.innerHTML = '';
        if (userPosts.length > 0) {
            userPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
                `;
                userPostsContainer.appendChild(postElement);
            });
        } else {
            userPostsContainer.innerHTML = '<p>This user has no posts yet.</p>';
        }
    } else {
        profileInfoContainer.innerHTML = '<h2>User not found.</h2>';
    }
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
    window.location.href = 'index.html';
}

themeSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
}

renderUserProfile();
updateAuthUI();
