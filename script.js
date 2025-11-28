let currentSlideIndex = 1;
const totalSlides = 12;

function updateControls() {
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    if (prev) prev.toggleAttribute('disabled', currentSlideIndex === 1);
    if (next) next.toggleAttribute('disabled', currentSlideIndex === totalSlides);
}

function updateProgress() {
    const fill = document.getElementById('progressFill');
    if (!fill) return;
    // ensure progress shows proportion including first and last slide
    const percent = Math.round((currentSlideIndex) / totalSlides * 100);
    fill.style.width = percent + '%';
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');

    if (n > totalSlides) currentSlideIndex = totalSlides;
    if (n < 1) currentSlideIndex = 1;

    slides.forEach(slide => slide.classList.remove('current-slide'));
    slides[currentSlideIndex - 1].classList.add('current-slide');

    const counter = document.getElementById('slideCounter');
    if (counter) counter.textContent = `${currentSlideIndex} / ${totalSlides}`;

    // Accessibility: announce slide title for screen readers
    const live = document.getElementById('ariaAnnounce');
    if (live) {
        const current = slides[currentSlideIndex - 1];
        let titleEl = current.querySelector('h1, h2, h3');
        const titleText = titleEl ? titleEl.textContent.trim() : `Slide ${currentSlideIndex}`;
        live.textContent = `Slide ${currentSlideIndex} of ${totalSlides}: ${titleText}`;
    }

    updateControls();
    updateProgress();
}

function nextSlide() {
    if (currentSlideIndex < totalSlides) {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }
}

function prevSlide() {
    if (currentSlideIndex > 1) {
        currentSlideIndex--;
        showSlide(currentSlideIndex);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ' ) nextSlide();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
    if (e.key === 'Home') { currentSlideIndex = 1; showSlide(currentSlideIndex); }
    if (e.key === 'End') { currentSlideIndex = totalSlides; showSlide(currentSlideIndex); }
});

document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// make nav buttons keyboard-focusable and provide focus outline for accessibility
document.querySelectorAll('.nav-button').forEach(btn => {
    btn.setAttribute('tabindex', '0');
});

// Touch / swipe support for mobile
let touchStartX = null;
let touchStartY = null;
const threshold = 40; // min px for swipe

document.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
}, {passive: true});

document.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        if (dx < 0) nextSlide();
        else prevSlide();
    }
    touchStartX = null;
    touchStartY = null;
}, {passive: true});

// init
showSlide(currentSlideIndex);
updateProgress();