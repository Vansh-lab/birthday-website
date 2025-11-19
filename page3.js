// Interactive slideshow logic
const slides = Array.from(document.querySelectorAll('.slide'));
const leftZone = document.getElementById('left-zone');
const rightZone = document.getElementById('right-zone');
const dotsRoot = document.getElementById('dots');

let current = 0;
const total = slides.length;
let touchStartX = null;

// init show
function showSlide(index) {
    slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });
    updateDots(index);
}
showSlide(current);

// build dots
function buildDots() {
    for (let i = 0; i < total; i++) {
        const d = document.createElement('div');
        d.className = 'dot' + (i === current ? ' active' : '');
        d.dataset.index = i;
        d.addEventListener('click', (e) => {
            current = Number(e.target.dataset.index);
            showSlide(current);
        });
        dotsRoot.appendChild(d);
    }
}
buildDots();

function updateDots(idx) {
    const dots = Array.from(dotsRoot.children);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

// next / prev functions
function nextSlide() {
    if (current < total - 1) {
        current++;
        showSlide(current);
    } else {
        // optional: loop back to start. If you want looping, uncomment next line:
        // current = 0; showSlide(current);
    }
}

function prevSlide() {
    if (current > 0) {
        current--;
        showSlide(current);
    } else {
        // optional: loop to end:
        // current = total - 1; showSlide(current);
    }
}

// click zones
rightZone.addEventListener('click', (e) => {
    nextSlide();
});
leftZone.addEventListener('click', (e) => {
    prevSlide();
});

// keyboard support
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// touch support (simple swipe)
const slideshowEl = document.getElementById('slideshow');
slideshowEl.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
});
slideshowEl.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    // swipe threshold
    if (Math.abs(diff) > 40) {
        if (diff < 0) nextSlide(); // swipe left => next
        else prevSlide(); // swipe right => prev
    } else {
        // tap: determine side
        const rect = slideshowEl.getBoundingClientRect();
        const x = touchEndX - rect.left;
        if (x > rect.width / 2) nextSlide();
        else prevSlide();
    }
    touchStartX = null;
});

// desktop click: also let click on the slide area itself detect side
slideshowEl.addEventListener('click', (e) => {
    // ignore clicks on the dots (they are inside slideshow)
    if (e.target.classList.contains('dot')) return;
    const rect = slideshowEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width / 2) nextSlide();
    else prevSlide();
});