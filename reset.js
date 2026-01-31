document.getElementById('reset-button').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all data (posts, users, and liked posts)? This cannot be undone.')) {
        localStorage.removeItem('posts');
        localStorage.removeItem('users');
        sessionStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('likedPosts');
        localStorage.removeItem('theme'); // Reset theme to default
        localStorage.removeItem('lang'); // Reset language to default
        alert('All data has been reset.');
        window.location.href = 'index.html';
    }
});