// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the DOM elements
  const generateBtn = document.getElementById('generate-btn');
  const numbersContainer = document.getElementById('numbers-container');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  /**
   * Applies the selected theme by setting the 'data-theme' attribute on the body
   * and updating the toggle switch's state.
   * @param {string} theme - The theme to apply ('dark' or 'light').
   */
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.dataset.theme = 'dark';
      themeToggle.checked = true;
    } else {
      body.dataset.theme = 'light';
      themeToggle.checked = false;
    }
  };

  // Check for a saved theme in localStorage and apply it on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Add an event listener to the theme toggle switch
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      // If checked, apply the dark theme and save the preference
      applyTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // Otherwise, apply the light theme and save the preference
      applyTheme('light');
      localStorage.setItem('theme', 'light');
    }
  });

  /**
   * Determines the color of the lotto ball based on the number.
   * @param {number} number - The lotto number.
   * @returns {string} The CSS variable for the ball color.
   */
  const getBallColor = (number) => {
    if (number <= 10) return 'var(--ball-color-1)';
    if (number <= 20) return 'var(--ball-color-2)';
    if (number <= 30) return 'var(--ball-color-3)';
    if (number <= 40) return 'var(--ball-color-4)';
    return 'var(--ball-color-5)';
  };

  /**
   * Generates and displays 6 unique lotto numbers.
   */
  const generateNumbers = () => {
    // 1. Clear any previously generated numbers
    numbersContainer.innerHTML = '';

    // 2. Generate 6 unique numbers between 1 and 45
    const numbers = new Set();
    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNumber);
    }

    // 3. Sort the numbers in ascending order
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    // 4. Create and display a ball for each number
    sortedNumbers.forEach((number, index) => {
      const ball = document.createElement('div');
      ball.className = 'number-ball';
      ball.style.backgroundColor = getBallColor(number);
      ball.textContent = number;
      
      // Stagger the pop-in animation for a nice visual effect
      ball.style.animationDelay = `${index * 0.1}s`;
      
      numbersContainer.appendChild(ball);
    });
  };

  // Add an event listener to the 'Generate Numbers' button
  generateBtn.addEventListener('click', generateNumbers);

  // Generate a set of numbers on initial page load
  generateNumbers();
});