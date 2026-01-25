const postContentContainer = document.getElementById('post-content');
const themeSwitch = document.getElementById('theme-switch');

function renderPost() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    const post = posts.find(p => p.id === postId);

    if (post) {
        postContentContainer.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
        `;
    } else {
        postContentContainer.innerHTML = "<p>Post not found.</p>";
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

themeSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
}

renderPost();