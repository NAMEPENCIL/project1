function renderTrendingPosts() {
    const trendingPostsContainer = document.getElementById('trending-posts-container');
    if (!trendingPostsContainer) return;

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    
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
