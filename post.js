const postContentContainer = document.getElementById('post-content');
const themeSwitch = document.getElementById('theme-switch');
const myInfoSection = document.getElementById('my-info-section');
const authLinks = document.getElementById('auth-links');
const commentsContainer = document.getElementById('comments-container');
const commentForm = document.getElementById('comment-form');
const commentText = document.getElementById('comment-text');

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
} else {
    // Ensure all existing posts have a likes property
    posts = posts.map(post => ({
        ...post,
        likes: post.likes === undefined ? 0 : post.likes
    }));
    localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage with potentially new 'likes' properties
}

function renderPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    const post = posts.find(p => p.id === postId);

    if (post) {
        postContentContainer.innerHTML = `
            <h1>${post.title}</h1>
            <p>${getTranslation('by_prefix')} <a href="profile.html?user=${post.author}">${post.author}</a></p>
            <p>${getTranslation('category_prefix')} ${post.category}</p>
            <p>${post.content}</p>
            <p>${getTranslation('likes_prefix')} ${post.likes}</p>
        `;
        renderComments();
    } else {
        postContentContainer.innerHTML = `<p>${getTranslation('post_not_found_message')}</p>`;
    }
}

function renderComments() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    const post = posts.find(p => p.id === postId);

    commentsContainer.innerHTML = '';
    if (post && post.comments) {
        post.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <p><strong><a href="profile.html?user=${comment.author}">${comment.author}</a></strong>: ${comment.text}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
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
        myInfoSection.innerHTML = `<h2 data-i18n="my_info_title"></h2><p>${getTranslation('welcome_message').replace('!', ', ' + loggedInUser.username + '!')}</p>`;
        authLinks.innerHTML = `<button id="logout-button">${getTranslation('logout_button')}</button>`;
        document.getElementById('logout-button').addEventListener('click', logout);
        commentForm.style.display = 'block';
    } else {
        myInfoSection.innerHTML = `<h2 data-i18n="my_info_title"></h2><p data-i18n="welcome_message"></p>`;
        authLinks.innerHTML = `
            <p><a href="login.html">${getTranslation('login_button')}</a></p>
            <p><a href="signup.html">${getTranslation('signup_link')}</a></p>
        `;
        commentForm.style.display = 'none';
    }
    translatePage(currentLanguage); // Re-translate static elements in the updated UI
}

function logout() {
    sessionStorage.removeItem('loggedInUser');
    updateAuthUI();
    window.location.href = 'index.html'; // Redirect to refresh UI
}

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    const post = posts.find(p => p.id === postId);
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (post && loggedInUser) {
        const newComment = {
            author: loggedInUser.username,
            text: commentText.value
        };
        if (!post.comments) {
            post.comments = [];
        }
        post.comments.push(newComment);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderComments();
        commentText.value = '';
    }
});

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