let translations = {};
let currentLanguage = localStorage.getItem('lang') || 'en';

async function loadTranslations() {
    try {
        const response = await fetch('./translations.json');
        const data = await response.json();
        translations = data;
        translatePage(currentLanguage);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function getTranslation(key, lang = currentLanguage) {
    if (translations[key] && translations[key][lang]) {
        return translations[key][lang];
    }
    // Fallback to English or the key itself if translation not found
    return translations[key] ? translations[key]['en'] : key;
}

function translatePage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = getTranslation(key, lang);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = getTranslation(key, lang);
    });

    // Re-render dynamic content if necessary
    // This part will be handled by calling specific render functions in each JS file
    if (typeof renderPosts === 'function') renderPosts(document.getElementById('category-filter').value);
    if (typeof renderPost === 'function') renderPost();
    if (typeof renderUserProfile === 'function') renderUserProfile();
    if (typeof renderTrendingPosts === 'function') renderTrendingPosts();
    if (typeof updateAuthUI === 'function') updateAuthUI();
}

document.addEventListener('DOMContentLoaded', () => {
    const langSwitch = document.getElementById('lang-switch');
    
    // Set initial language from localStorage or default to 'en'
    currentLanguage = localStorage.getItem('lang') || 'en';
    document.documentElement.lang = currentLanguage;

    if (currentLanguage === 'ko') {
        langSwitch.checked = true;
    }

    loadTranslations(); // Load translations and then translate the page

    langSwitch.addEventListener('change', (e) => {
        if (e.target.checked) {
            translatePage('ko');
        } else {
            translatePage('en');
        }
    });
});
