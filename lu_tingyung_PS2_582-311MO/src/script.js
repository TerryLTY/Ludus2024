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
    markers: true
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


const split = new SplitText(".superstartext", { type: "words,chars" });

gsap.from(split.chars, {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.05,
  delay: 3
});

// Son
let sonBravo = new Audio("./assets/audio/bravo.mp3")
//sonBravo.play()

// Boutons 
let score = 0;
let reponse1 = document.getElementById("reponse1");
let reponse2 = document.getElementById("reponse2");
let reponse3 = document.getElementById("reponse3");

reponse1.addEventListener('click', function () {
  reponse1.style.backgroundColor = "red";
  reponse2.style.display = "none";
  reponse3.style.display = "none";
}, { once: true })

reponse2.addEventListener('click', function () {
  reponse2.style.backgroundColor = "red";
  reponse1.style.display = "none";
  reponse3.style.display = "none"
}, { once: true })

reponse3.addEventListener('click', function () {
  reponse3.style.backgroundColor = "green";
  reponse1.style.display = "none";
  reponse2.style.display = "none";
  score++;
}, { once: true })


