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

const postsContainer = document.getElementById('posts-container');
const themeSwitch = document.getElementById('theme-switch');
const myInfoSection = document.getElementById('my-info-section');
const authLinks = document.getElementById('auth-links');
const newPostButton = document.getElementById('new-post-button');
const categoryFilter = document.getElementById('category-filter');

function renderPosts(filter = 'all') {
    postsContainer.innerHTML = '';
    let filteredPosts = posts;
    if (filter !== 'all') {
        filteredPosts = posts.filter(post => post.category === filter);
    }

    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
            <p>${getTranslation('by_prefix')} <a href="profile.html?user=${post.author}">${post.author}</a></p>
            <p>${getTranslation('category_prefix')} ${post.category}</p>
            <button class="like-button" data-id="${post.id}">${getTranslation('like_button')}</button>
            <span class="likes-count">${post.likes}</span>
        `;
        postsContainer.appendChild(postElement);
    });
}

postsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-button')) {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            alert(getTranslation('must_be_logged_in_to_like_alert'));
            return;
        }

        const postId = parseInt(e.target.dataset.id);
        let likedPosts = JSON.parse(sessionStorage.getItem('likedPosts')) || [];
        if (likedPosts.includes(postId)) {
            alert(getTranslation('already_liked_post_alert'));
            return;
        }

        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            likedPosts.push(postId);
            localStorage.setItem('posts', JSON.stringify(posts));
            sessionStorage.setItem('likedPosts', JSON.stringify(likedPosts));
            renderPosts(categoryFilter.value);
            renderTrendingPosts();
        }
    }
});

categoryFilter.addEventListener('change', (e) => {
    renderPosts(e.target.value);
});

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
        newPostButton.style.display = 'inline-block'; // Show new post button
    } else {
        myInfoSection.innerHTML = `<h2 data-i18n="my_info_title"></h2><p data-i18n="welcome_message"></p>`;
        authLinks.innerHTML = `
            <p><a href="login.html">${getTranslation('login_button')}</a></p>
            <p><a href="signup.html">${getTranslation('signup_link')}</a></p>
        `;
        newPostButton.style.display = 'none'; // Hide new post button
    }
    translatePage(currentLanguage); // Re-translate static elements in the updated UI
}

function logout() {
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('likedPosts');
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
renderTrendingPosts();