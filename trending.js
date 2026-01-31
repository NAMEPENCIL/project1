function renderTrendingPosts() {
    const trendingPostsContainer = document.getElementById('trending-posts-container');
    if (!trendingPostsContainer) return;

    let posts = JSON.parse(localStorage.getItem('posts'));
    if (!posts) {
        posts = [ // Default posts with likes:0, same as in js.js
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
    
    const sortedPosts = posts.sort((a, b) => b.likes - a.likes);
    
    const top3Posts = sortedPosts.slice(0, 3);

    const trendingPostsList = document.createElement('ul');
    top3Posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="post.html?id=${post.id}">${post.title}</a> (${post.likes} ${getTranslation('likes_count_suffix')})`;
        trendingPostsList.appendChild(listItem);
    });

    // Clear existing content and append the new list
    trendingPostsContainer.innerHTML = `<h2 data-i18n="trending_posts_title">${getTranslation('trending_posts_title')}</h2>`;
    trendingPostsContainer.appendChild(trendingPostsList);
}
