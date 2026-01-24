document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const numbersContainer = document.getElementById('numbers-container');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Function to apply the theme
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.dataset.theme = 'dark';
      themeToggle.checked = true;
    } else {
      body.dataset.theme = 'light';
      themeToggle.checked = false;
    }
  };

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Theme toggle event listener
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      applyTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      applyTheme('light');
      localStorage.setItem('theme', 'light');
    }
  });

  const getBallColor = (number) => {
    if (number <= 10) return 'var(--ball-color-1)';
    if (number <= 20) return 'var(--ball-color-2)';
    if (number <= 30) return 'var(--ball-color-3)';
    if (number <= 40) return 'var(--ball-color-4)';
    return 'var(--ball-color-5)';
  };

  const generateNumbers = () => {
    // 1. Clear previous numbers
    numbersContainer.innerHTML = '';

    // 2. Generate 6 unique numbers
    const numbers = new Set();
    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNumber);
    }

    // 3. Sort and display numbers
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
      const ball = document.createElement('div');
      ball.className = 'number-ball';
      ball.style.backgroundColor = getBallColor(number);
      ball.textContent = number;
      
      // Stagger the animation
      ball.style.animationDelay = `${index * 0.1}s`;
      
      numbersContainer.appendChild(ball);
    });
  };

  generateBtn.addEventListener('click', generateNumbers);

  // Generate numbers on initial load for a nice first impression
  generateNumbers();
});