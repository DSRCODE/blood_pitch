const TOTAL_SLIDES = 14;

// Get saved slide from localStorage or default to 1
let currentSlide = parseInt(localStorage.getItem("currentSlide")) || 1;

// Prevent invalid slide on start
if (currentSlide > TOTAL_SLIDES || currentSlide < 1) {
  currentSlide = 1;
}

const frame = document.getElementById("slide-frame");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const slideInfo = document.getElementById("slide-info");

function loadSlide(slideNum) {
  frame.style.opacity = 0;

  setTimeout(() => {
    currentSlide = slideNum;

    // Save slide number to persist on refresh
    localStorage.setItem("currentSlide", currentSlide);

    frame.src = `sl${slideNum}.html`;
    updateUI();
    frame.style.opacity = 1;
  }, 150);
}

function updateUI() {
  slideInfo.textContent = `Slide ${currentSlide} of ${TOTAL_SLIDES}`;
  prevBtn.disabled = currentSlide === 1;
  nextBtn.disabled = currentSlide === TOTAL_SLIDES;
}

function nextSlide() {
  if (currentSlide < TOTAL_SLIDES) {
    loadSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 1) {
    loadSlide(currentSlide - 1);
  }
}

// Event Listeners
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

// Initialize slide on page load
loadSlide(currentSlide);
