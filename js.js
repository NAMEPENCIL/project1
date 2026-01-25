const posts = [
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

const postsContainer = document.getElementById('posts-container');
const themeSwitch = document.getElementById('theme-switch');

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

themeSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
}

renderPosts();