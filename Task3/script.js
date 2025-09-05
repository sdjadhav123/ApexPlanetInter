function scrollToSection(id){
    document.getElementById(id).scrollIntoView({behavior:"smooth"});
  }

  /* Quiz */
  const quizData=[
    {question:"Which language is used for styling web pages?",options:["HTML","CSS","Python"],answer:"CSS"},
    {question:"Which company developed JavaScript?",options:["Google","Netscape","Microsoft"],answer:"Netscape"},
    {question:"What does API stand for?",options:["Application Programming Interface","Applied Program Internet","Advanced Protocol Integration"],answer:"Application Programming Interface"}
  ];
  let quizContainer=document.getElementById("quiz-content");
  quizData.forEach((q,i)=>{
    let qBlock=`<div class="quiz-question"><h4>${q.question}</h4>`;
    q.options.forEach(opt=>{
      qBlock+=`<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label>`;
    });
    qBlock+=`</div>`;
    quizContainer.innerHTML+=qBlock;
  });
  function submitQuiz(){
    let score=0;
    quizData.forEach((q,i)=>{
      let selected=document.querySelector(`input[name="q${i}"]:checked`);
      if(selected&&selected.value===q.answer)score++;
    });
    document.getElementById("result").innerText=`You scored ${score}/${quizData.length}`;
  }

  /* Random API */
  const randomDiv=document.getElementById('random-api');
  function fetchData(){
    fetch("https://dummyjson.com/quotes/random")
      .then(res=>res.json())
      .then(data=>{
        randomDiv.innerHTML=`<h2>"${data.quote}"</h2><h3>- ${data.author}</h3>`;
      })
  }
  fetchData();

  /* Carousel */
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
