function scrollToSection(id){
    document.getElementById(id).scrollIntoView({behavior:"smooth"});
  }

  /* QUIZ LOGIC (from second code) */
  const allQuestions = [
    { question: "Find the odd one out: 2, 6, 12, 20, 30, 42", options: ["12", "20", "30"], answer: "20" },
    { question: "Capital of France?", options: ["Berlin","Paris","Rome"], answer: "Paris" },
    { question: "Which language runs in a browser?", options: ["Java","C","JavaScript"], answer: "JavaScript" },
    { question: "HTML stands for?", options: ["Hyper Text Markup Language","High Tech Modern Language","None"], answer: "Hyper Text Markup Language" },
    { question: "CSS is used for?", options: ["Styling","Logic","Database"], answer: "Styling" },
    { question: "Who developed C language?", options: ["Bjarne Stroustrup","Dennis Ritchie","James Gosling"], answer: "Dennis Ritchie" },
    { question: "Which is not a programming language?", options: ["Python","HTML","C++"], answer: "HTML" },
    { question: "Which company developed Java?", options: ["Sun Microsystems","Microsoft{ question:","Apple"], answer: "Sun Microsystems" },
     { question: "Which company owns the Android operating system?", options: ["Apple", "Google", "Microsoft"], answer: "Google" },
    { question: "Which year was JavaScript created?", options: ["1995","2000","1990"], answer: "1995" }
  ];

  let selectedQuestions = [];
  let currentQuestionIndex = 0;
  let userAnswers = {};

  function startQuiz() {
    const numQuestions = parseInt(document.getElementById("num-questions").value);
    let shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    selectedQuestions = shuffled.slice(0, numQuestions);

    currentQuestionIndex = 0;
    userAnswers = {};

    document.getElementById("setup-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    document.getElementById("result").textContent = "";
    document.getElementById("restart-btn").classList.add("hidden");
    document.querySelector(".btn-container").style.display = "block";

    showQuestion();
  }

  function showQuestion() {
    const q = selectedQuestions[currentQuestionIndex];
    document.getElementById("question-title").textContent =
      `Question ${currentQuestionIndex + 1} of ${selectedQuestions.length}`;

    let qBox = document.getElementById("question-box");
    qBox.innerHTML = `<p>${q.question}</p>`;

    q.options.forEach(opt => {
      let checked = userAnswers[currentQuestionIndex] === opt ? "checked" : "";
      qBox.innerHTML += `<label><input type="radio" name="q${currentQuestionIndex}" value="${opt}" ${checked}> ${opt}</label><br>`;
    });

    document.getElementById("prev-btn").style.display =
      currentQuestionIndex === 0 ? "none" : "inline-block";
    document.getElementById("next-btn").style.display =
      currentQuestionIndex === selectedQuestions.length - 1 ? "none" : "inline-block";
    document.getElementById("submit-btn").classList.toggle("hidden", currentQuestionIndex !== selectedQuestions.length - 1);

    updateProgress();
  }

  function updateProgress() {
    const progress = (currentQuestionIndex / selectedQuestions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
  }

  function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    }
  }

  function prevQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
    }
  }

  function saveAnswer() {
    const selected = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (selected) {
      userAnswers[currentQuestionIndex] = selected.value;
    }
  }

  function submitQuiz() {
    saveAnswer();
    let score = 0;
    let output = "";

    selectedQuestions.forEach((q, index) => {
      let userAns = userAnswers[index] || "No Answer";
      let cssClass = userAns === q.answer ? "correct" : "wrong";
      if (userAns === q.answer) score++;

      output += `<div class="question-box ${cssClass}">
        <p><strong>Q${index + 1}:</strong> ${q.question}</p>
        <p>✅ Correct Answer: <b>${q.answer}</b></p>
        <p>📝 Your Answer: <b>${userAns}</b></p>
      </div>`;
    });

    document.getElementById("question-box").innerHTML = output;
    document.getElementById("question-title").textContent = "Quiz Finished 🎉";
    document.getElementById("result").textContent = `✅ You scored ${score} / ${selectedQuestions.length}`;
    document.querySelector(".btn-container").style.display = "none";
    document.getElementById("restart-btn").classList.remove("hidden");
    document.getElementById("progress-bar").style.width = "100%";
  }

  function restartQuiz() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("setup-screen").classList.remove("hidden");
  }

  /* RANDOM API */
  const randomDiv=document.getElementById('random-api');
  function fetchData(){
    fetch("https://dummyjson.com/quotes/random")
      .then(res=>res.json())
      .then(data=>{
        randomDiv.innerHTML=`<h2>"${data.quote}"</h2><h3>- ${data.author}</h3>`;
      })
  }
  fetchData();

  /* CAROUSEL */
  let currentSlide=0;let slides=[];
  function loadCarouselImages(count=5){
    const container=document.getElementById("carousel-container");
    slides=[];container.querySelectorAll("img").forEach(img=>img.remove());
    for(let i=0;i<count;i++){
      const img=document.createElement("img");
      img.src=`https://picsum.photos/500/300?random=${Math.floor(Math.random()*10000)}`;
      if(i===0)img.classList.add("active");
      container.insertBefore(img,container.querySelector(".prev"));
      slides.push(img);
    }
  }
  function showSlide(index){
    slides.forEach((s,i)=>{s.classList.remove("active");if(i===index)s.classList.add("active")});
  }
  function nextSlide(){currentSlide=(currentSlide+1)%slides.length;showSlide(currentSlide);}
  function prevSlide(){currentSlide=(currentSlide-1+slides.length)%slides.length;showSlide(currentSlide);}
  window.onload=()=>loadCarouselImages(5);

  /* Scroll Animation */
  const sections=document.querySelectorAll(".section");
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("visible");}
    });
  },{threshold:.2});
  sections.forEach(s=>observer.observe(s));