const questions = {
    html: [
      { question: "What does HTML stand for?", options: ["HyperText Markup Language", "Hyper Transfer Markup Language", "Home Tool Markup Language", "Hyper Tool Machine Language"], answer: 0 },
      { question: "Which tag is used to define a paragraph?", options: ["<p>", "<div>", "<span>", "<section>"], answer: 0 },
      { question: "What tag is used for a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1 },
      { question: "Which attribute sets an image source?", options: ["src", "href", "link", "img"], answer: 0 },
      { question: "Which element creates a numbered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], answer: 1 }
    ],
    css: [
      { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Syntax", "Control Style Sheet"], answer: 1 },
      { question: "Which property changes text color?", options: ["text-color", "font-color", "color", "background"], answer: 2 },
      { question: "How do you center a block element?", options: ["text-align: center", "margin: auto", "center: block", "padding: center"], answer: 1 },
      { question: "What is the default position value?", options: ["relative", "absolute", "static", "fixed"], answer: 2 },
      { question: "Which unit is relative to font size?", options: ["px", "em", "vh", "%"], answer: 1 }
    ],
    javascript: [
      { question: "How do you declare a variable?", options: ["int x", "let x", "val x", "define x"], answer: 1 },
      { question: "Which keyword creates a constant?", options: ["let", "var", "const", "constant"], answer: 2 },
      { question: "What does DOM stand for?", options: ["Data Object Model", "Document Object Model", "Display Order Model", "Digital Object Mapping"], answer: 1 },
      { question: "Which method prints to console?", options: ["console.log()", "print()", "log.console()", "output()"], answer: 0 },
      { question: "How do you create a function?", options: ["function myFunc()", "def myFunc()", "func myFunc()", "create myFunc()"], answer: 0 }
    ],
    accessibility: [
      { question: "What does ARIA stand for?", options: ["Accessible Rich Internet Applications", "Audio Read Interface Access", "Accessibility Role Integration Area", "Automated Resource Info Access"], answer: 0 },
      { question: "Which attribute gives alt text to images?", options: ["alt", "desc", "title", "label"], answer: 0 },
      { question: "Which tag defines navigation?", options: ["<nav>", "<navigate>", "<menu>", "<sidebar>"], answer: 0 },
      { question: "What should buttons have for accessibility?", options: ["aria-label", "id", "href", "alt"], answer: 0 },
      { question: "Which device helps users with vision loss?", options: ["Screen reader", "Braille printer", "Monitor", "Voice assistant"], answer: 0 }
    ]
  };
  
  let currentTopic = '';
  let currentQuestion = 0;
  let score = 0;
  let answerSelected = false;
  
  function startQuiz(topic) {
    currentTopic = topic;
    currentQuestion = 0;
    score = 0;
    answerSelected = false;
  
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
  
    showQuestion();
  }
  
  function showQuestion() {
    const quiz = questions[currentTopic][currentQuestion];
    document.getElementById('question-title').textContent = quiz.question;
  
    const optionsEl = document.getElementById('options');
    optionsEl.innerHTML = '';
    answerSelected = false;
  
    quiz.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(btn, idx));
      optionsEl.appendChild(btn);
    });
  }
  
  function handleAnswer(button, selectedIndex) {
    if (answerSelected) return;
    answerSelected = true;
  
    const quiz = questions[currentTopic][currentQuestion];
    const correctIndex = quiz.answer;
    const buttons = document.querySelectorAll('#options button');
  
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
      }
    });
  
    if (selectedIndex === correctIndex) {
      score += 1;
      showFeedback("😉"); // firework for correct
    } else {
      showFeedback("😵"); // emoji for wrong
    }
  }
  
  function nextQuestion() {
    if (!answerSelected) {
      alert("Please select an answer before continuing.");
      return;
    }
  
    currentQuestion++;
    if (currentQuestion < questions[currentTopic].length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('score-text').textContent = `You scored ${score} out of ${questions[currentTopic].length}`;
  }
  
  function restartQuiz() {
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
  }
  
  function showFeedback(emoji) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = emoji;
    feedback.classList.add('feedback-show');
  
    setTimeout(() => {
      feedback.classList.remove('feedback-show');
    }, 1000);
  }
  
  document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });