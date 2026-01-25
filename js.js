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
    }
];

const postsContainer = document.getElementById('posts-container');

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

renderPosts();
