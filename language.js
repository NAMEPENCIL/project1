document.addEventListener('DOMContentLoaded', () => {
    const langSwitch = document.getElementById('lang-switch');
    
    // Set initial language from localStorage or default to 'en'
    let currentLang = localStorage.getItem('lang') || 'en';
    document.documentElement.lang = currentLang;

    if (currentLang === 'ko') {
        langSwitch.checked = true;
    }

    langSwitch.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.lang = 'ko';
            localStorage.setItem('lang', 'ko');
        } else {
            document.documentElement.lang = 'en';
            localStorage.setItem('lang', 'en');
        }
        // In a real application, you would re-render content here
        // For this example, we only change the 'lang' attribute and store preference.
        // Alert for demonstration purposes.
        alert(`Language switched to: ${document.documentElement.lang}`);
    });
});
