//gsap
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(MorphSVGPlugin);
gsap.registerPlugin(TextPlugin);

gsap.to(".kirbytext", {
  duration: 2,
  text: "POYO",
  ease: "none",
  scrollTrigger: {
    trigger: '.section1',
    start: "top 0%",
    end: "bottom 70%",
    scrub: true,
  }
});

const animation = gsap.to(".kirbyflotte", {
  motionPath: {
    path: "#path",
    align: "#path",
    autoRotate: true,
    alignOrigin: [0.5, 0.5]
  },
  scrollTrigger: {
    trigger: '.section2',
    start: "top 70%",
    end: "bottom top",
    scrub: true
  }
});

Draggable.create(".kirbyetoile", {
  bounds: ".section3",
  inertia: true
});

const split = new SplitText(".kirbytext", { type: "words,chars" });

gsap.from(split.chars, {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.05,
  delay: 0.5
});

var morph = gsap.to("#circle", {
  duration: 1,
  morphSVG: "#etoile",
  repeat: 1,
  yoyo: true,
  repeatDelay: 0.2,
  scrollTrigger: {
    trigger: '.section5',
    start: "top 20%",
    end: "bottom 70%",
    scrub: true,
    markers: true
  }
});

// Son
let sonBravo = new Audio("./assets/audio/bravo.mp3");
sonBravo.volume = 0.3;

// Boutons 
let score = 0;
let reponse1 = document.getElementById("reponse1");
let reponse2 = document.getElementById("reponse2");
let reponse3 = document.getElementById("reponse3");
let reponse4 = document.getElementById("reponse4");
let reponse5 = document.getElementById("reponse5");
let reponse6 = document.getElementById("reponse6");
let reponse7 = document.getElementById("reponse7");
let reponse8 = document.getElementById("reponse8");
let reponse9 = document.getElementById("reponse9");
let points = document.getElementById("pointage");
let bonnesReponses = document.getElementById("bonnes-reponses")

// Section 2
reponse1.addEventListener('click', function () {
  reponse1.style.backgroundColor = "red";
  reponse2.style.display = "none";
  reponse3.style.display = "none";
  points.innerHTML = score + "/3"
}, { once: true })

reponse2.addEventListener('click', function () {
  reponse2.style.backgroundColor = "red";
  reponse1.style.display = "none";
  reponse3.style.display = "none";
  points.innerHTML = score + "/3"
}, { once: true })

reponse3.addEventListener('click', function () {
  reponse3.style.backgroundColor = "green";
  reponse1.style.display = "none";
  reponse2.style.display = "none";
  score++;
  points.innerHTML = score + "/3";
  if (score == 3) {
    sonBravo.play()
  }
}, { once: true })

// Section 3
reponse4.addEventListener('click', function () {
  reponse4.style.backgroundColor = "green";
  reponse5.style.display = "none";
  reponse6.style.display = "none";
  score++;
  points.innerHTML = score + "/3";
  if (score == 3) {
    sonBravo.play()
  }
}, { once: true })

reponse5.addEventListener('click', function () {
  reponse5.style.backgroundColor = "red";
  reponse4.style.display = "none";
  reponse6.style.display = "none";
  points.innerHTML = score + "/3"
}, { once: true })

reponse6.addEventListener('click', function () {
  reponse6.style.backgroundColor = "red";
  reponse4.style.display = "none";
  reponse5.style.display = "none";
  points.innerHTML = score + "/3"
}, { once: true })

// Section 4
reponse7.addEventListener('click', function () {
  reponse7.style.backgroundColor = "green";
  reponse8.style.display = "none";
  reponse9.style.display = "none";
  score++;
  points.innerHTML = score + "/3";
  if (score == 3) {
    sonBravo.play()
  }
}, { once: true })

reponse8.addEventListener('click', function () {
  reponse8.style.backgroundColor = "red";
  reponse7.style.display = "none";
  reponse9.style.display = "none";
  points.innerHTML = score + "/3"
}, { once: true })

reponse9.addEventListener('click', function () {
  reponse9.style.backgroundColor = "red";
  reponse7.style.display = "none";
  reponse8.style.display = "none";
  points.innerHTML = score + "/3"
}, { once: true })

bonnesReponses.addEventListener('mouseover', function () {
  bonnesReponses.innerHTML = "Réponses: Waddle Dee, Popstar, Masahiro Sakurai";
})

bonnesReponses.addEventListener('mouseleave', function () {
  bonnesReponses.innerHTML = "Voir les reponses";
})




