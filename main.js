// 스크립트를 실행하기 전에 DOM이 완전히 로드될 때까지 기다립니다.
document.addEventListener('DOMContentLoaded', () => {
  // DOM 요소에 대한 참조 가져오기
  const generateBtn = document.getElementById('generate-btn');
  const numbersContainer = document.getElementById('numbers-container');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  /**
   * 본문에 'data-theme' 속성을 설정하고 토글 스위치의 상태를 업데이트하여
   * 선택한 테마를 적용합니다.
   * @param {string} theme - 적용할 테마 ('dark' 또는 'light').
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

  // localStorage에 저장된 테마를 확인하고 페이지 로드 시 적용합니다.
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // 테마 토글 스위치에 이벤트 리스너를 추가합니다.
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      // 체크된 경우, 다크 테마를 적용하고 설정을 저장합니다.
      applyTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // 그렇지 않으면, 라이트 테마를 적용하고 설정을 저장합니다.
      applyTheme('light');
      localStorage.setItem('theme', 'light');
    }
  });

  /**
   * 숫자에 따라 로또 볼의 색상을 결정합니다.
   * @param {number} number - 로또 번호.
   * @returns {string} 볼 색상에 대한 CSS 변수.
   */
  const getBallColor = (number) => {
    if (number <= 10) return 'var(--ball-color-1)';
    if (number <= 20) return 'var(--ball-color-2)';
    if (number <= 30) return 'var(--ball-color-3)';
    if (number <= 40) return 'var(--ball-color-4)';
    return 'var(--ball-color-5)';
  };

  /**
   * 6개의 고유한 로또 번호를 생성하고 표시합니다.
   */
  const generateNumbers = () => {
    // 1. 이전에 생성된 번호를 모두 지웁니다.
    numbersContainer.innerHTML = '';

    // 2. 1에서 45 사이의 고유한 숫자 6개를 생성합니다.
    const numbers = new Set();
    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNumber);
    }

    // 3. 숫자를 오름차순으로 정렬합니다.
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    // 4. 각 숫자에 대한 볼을 생성하고 표시합니다.
    sortedNumbers.forEach((number, index) => {
      const ball = document.createElement('div');
      ball.className = 'number-ball';
      ball.style.backgroundColor = getBallColor(number);
      ball.textContent = number;
      
      // 멋진 시각적 효과를 위해 팝인 애니메이션을 지연시킵니다.
      ball.style.animationDelay = `${index * 0.1}s`;
      
      numbersContainer.appendChild(ball);
    });
  };

  // '번호 생성' 버튼에 이벤트 리스너를 추가합니다.
  generateBtn.addEventListener('click', generateNumbers);

  // 초기 페이지 로드 시 번호 세트를 생성합니다.
  generateNumbers();
});