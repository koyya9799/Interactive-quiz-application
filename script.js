const users = {};
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authContainer = document.getElementById('auth-container');
const quizContainer = document.getElementById('quiz-container');

document.getElementById('show-register').onclick = e => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
};
document.getElementById('show-login').onclick = e => {
  e.preventDefault();
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
};

document.getElementById('btn-register').onclick = () => {
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-password').value;
  if (email && pass) {
    users[email] = pass;
    alert('Registration successful! Please login.');
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  } else alert('Please fill in both fields.');
};

document.getElementById('btn-login').onclick = () => {
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;
  if (users[email] === pass) {
    authContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    startQuiz();
  } else alert('Invalid credentials.');
};

const quizData = [
  { question:"Capital of France?", options:["London","Berlin","Paris","Madrid"], answer:2 },
  { question:"Language in browser?", options:["Java","C","Python","JavaScript"], answer:3 },
  { question:"CSS stands for?", options:["Central Style","Cascading Style Sheets","Simple Sheets","Cars SUVs"], answer:1 }
];

let current = 0, score = 0;
const qEl = document.getElementById('question');
const opts = document.getElementById('options');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreCont = document.getElementById('score-container');

function startQuiz(){
  current=0; score=0;
  scoreCont.classList.add('hidden');
  nextBtn.classList.add('hidden');
  qEl.parentElement.classList.remove('hidden');
  loadQuestion();
}

function loadQuestion(){
  const q = quizData[current];
  qEl.innerText = q.question;
  opts.innerHTML = '';
  q.options.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.className = 'option-btn';
    btn.onclick = () => selectAnswer(i, btn);
    opts.appendChild(btn);
  });
  feedback.innerText = '';
  nextBtn.classList.add('hidden');
}

function selectAnswer(i, btn){
  const correct = i === quizData[current].answer;
  if (correct) {
    score++;
    btn.classList.add('option-correct');
    feedback.innerText = 'Correct!';
  } else {
    btn.classList.add('option-wrong');
    feedback.innerText = `Wrong! It was "${quizData[current].options[quizData[current].answer]}"`;
    opts.children[quizData[current].answer].classList.add('option-correct');
  }
  Array.from(opts.children).forEach(b => b.disabled = true);
  nextBtn.classList.remove('hidden');
}

nextBtn.onclick = () => {
  current++;
  if (current < quizData.length) loadQuestion();
  else showScore();
};

function showScore(){
  qEl.parentElement.classList.add('hidden');
  nextBtn.classList.add('hidden');
  scoreCont.innerHTML = `<p>Your Score: ${score}/${quizData.length}</p>
    <button class="btn-bg" onclick="startQuiz()">Retake Quiz</button>`;
  scoreCont.classList.remove('hidden');
}
