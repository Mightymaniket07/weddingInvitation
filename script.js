

const scrollElements = [
  { selector: '.flower', offset: 500 },
  { selector: '.title', offset: 510 },
  { selector: '.opening', offset: 530 },
  { selector: '.profiles', offset: 560 },
  { selector: '.profile-1', offset: 500 },
  { selector: '.profile-2', offset: 500 },
  { selector: '.dan', offset: 550 },
  { selector: '.dan2', offset: 500 },
  { selector: '.flower2', offset: 550 },
  { selector: '.title2', offset: 540 },
  { selector: '.flower3', offset: 550 },
  { selector: '.title3', offset: 550 },
  { selector: '.flower4', offset: 550 },
  { selector: '.title4', offset: 550 },
  { selector: '.flower5', offset: 550 },
  { selector: '.title5', offset: 550 },
  { selector: '.card1', offset: 500 },
  { selector: '.card2', offset: 500 },
  { selector: '#img1', offset: 600 },
  { selector: '#img2', offset: 600 },
  { selector: '#img3', offset: 600 },
  { selector: '#img4', offset: 600 },
  { selector: '#img5', offset: 600 },
  { selector: '#img6', offset: 600 },
  { selector: '.circle1', offset: 550 },
  { selector: '.circle2', offset: 550 },
  { selector: '.circle3', offset: 550 },
  { selector: '.circle4', offset: 550 },
  { selector: '.btn-map', offset: 550 }
];

// ✅ Navigation highlight on scroll
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

// ✅ Lightbox gallery
const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");

// ✅ Audio player toggle
const playerButton = document.querySelector('.player-button');
const audio = document.querySelector('audio');

const playIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
  </svg>
`;


const pauseIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
  </svg>
`;


const container = document.querySelector('.petal-container');

// List of petal image URLs
const petalImages = [
  'img/element/petal1.png',
  'img/element/petal2.png',
  'img/element/petal3.png',
  'img/element/petal4.png'
];



let scrollSpeed = 4;          // ✅ smaller = smoother, but adjust with interval
let scrollInterval = null;
let isUserInteracting = false;
let resumeTimeout = null;
let frameTime = 50;              // ✅ ms per tick (~120fps for ultra-smooth)


const params = new URLSearchParams(window.location.search);
const invitee = params.get("to");

let heartInterval;
// const hearts = ["💖", "💗", "💓", "💞", "💘", "💝"];
const heartImages = [
  "img/element/heart1.png",
  "img/element/heart2.png",
  "img/element/heart3.png"
];

window.onload = () => {
  if (invitee) {
    const nameElement = document.getElementById("invitee-name");
    const decoded = decodeURIComponent(invitee).replace(/_/g, " ");;
    const capitalized = decoded.charAt(0).toUpperCase() + decoded.slice(1);
    nameElement.textContent = `Dear ${capitalized},`;

    if (invitee.toLowerCase() === "deepshikha") {
      startHeartFloatLoop();
    }
  }

  document.getElementById("open").addEventListener("click", () => {
    stopHeartFloatLoop();
  });
};

function heartFloat() {
  const cover = document.getElementById("cover");
  const container = document.createElement("div");
  container.classList.add("heart-container");
  cover.appendChild(container);

  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("img");
    heart.src = heartImages[Math.floor(Math.random() * heartImages.length)];
    heart.classList.add("float-heart");

    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const size = 20 + Math.random() * 30;
    const drift = Math.random() < 0.5 ? "-" : "+";

    heart.style.left = `${left}%`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.width = `${size}px`;
    heart.style.height = "auto";
    heart.style.setProperty("--drift", drift);

    container.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }


  setTimeout(() => container.remove(), 5200);
}

function startHeartFloatLoop() {
  heartFloat();
  heartInterval = setInterval(heartFloat, 2000);
}

function stopHeartFloatLoop() {
  clearInterval(heartInterval);
}




function handleScrollAnimations() {
  const wScroll = window.scrollY;

  scrollElements.forEach(({ selector, offset }) => {
    const el = document.querySelector(selector);
    if (el && typeof el.offsetTop === 'number') {
      if (wScroll > el.offsetTop - offset) {
        el.classList.add('muncul');
      } else {
        el.classList.remove('muncul');
      }
    }
  });
}

window.addEventListener('scroll', handleScrollAnimations, { passive: true });

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => link.classList.remove('active'));

  if (current) {
    const activeLink = document.querySelector(`nav ul li a[href*="${current}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
});

window.addEventListener('load', () => {
  // Reset scroll to top
  window.scrollTo(0, 0);

  // Show the cover again
  const cover = document.getElementById('cover');
  if (cover) {
    cover.classList.remove('hidden');
    cover.style.marginTop = "0";
    cover.style.opacity = "1";
  }

  // Disable scrolling
  document.body.classList.add('no-scroll');
});

window.addEventListener('click', () => {
  const audio = document.getElementById('weddingAudio');
  audio.muted = false;
  audio.play().catch(() => { });
}, { once: true });






// ✅ Cover open animation
document.getElementById('open')?.addEventListener('click', () => {
  const cover = document.querySelector('#cover');
  cover.style.marginTop = "-100rem";
  cover.style.opacity = "0";
  cover.style.transition = "all 1s .1s ease-in-out";
  setTimeout(() => {
    cover.classList.add('hidden');
    document.body.classList.remove('no-scroll'); // ✅ Enable scrolling
  }, 2000);
});




function openFullImg(pic) {
  fullImgBox.style.display = "flex";
  fullImg.src = pic;
}

function closeFullImg() {
  fullImgBox.style.display = "none";
}


function toggleAudio() {
  if (audio.paused) {
    audio.play();
    playerButton.innerHTML = pauseIcon;
  } else {
    audio.pause();
    playerButton.innerHTML = playIcon;
  }
}

function toggleContactButtons() {
  startAutoScroll();
  const contact = document.getElementById("contactButtons");
  contact.classList.toggle("hidden");
}

playerButton?.addEventListener('click', toggleAudio);



function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petal');

  // Random image
  const img = petalImages[Math.floor(Math.random() * petalImages.length)];
  petal.style.backgroundImage = `url('${img}')`;

  // Random horizontal position
  petal.style.left = Math.random() * window.innerWidth + 'px';

  // Random animation duration
  petal.style.animationDuration = 5 + Math.random() * 5 + 's';

  container.appendChild(petal);

  // Remove after animation
  setTimeout(() => petal.remove(), 10000);
}

// Create petals at intervals
setInterval(createPetal, 300);


function startAutoScroll() {
  if (scrollInterval) clearInterval(scrollInterval);

  scrollInterval = setInterval(() => {
    if (!isUserInteracting) {
      window.scrollBy(0, scrollSpeed);

      // Stop when reaching the bottom
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        clearInterval(scrollInterval);
      }
    }
  }, frameTime);
}

function handleUserInteraction() {
  isUserInteracting = true;

  if (resumeTimeout) clearTimeout(resumeTimeout);

  resumeTimeout = setTimeout(() => {
    isUserInteracting = false;
  }, 3000); // resume 3s after idle
}

// ✅ Works on both desktop and mobile
['wheel', 'touchstart', 'touchmove', 'pointerdown', 'pointermove', 'keydown', 'mousemove']
  .forEach(evt => window.addEventListener(evt, handleUserInteraction, { passive: true }));




