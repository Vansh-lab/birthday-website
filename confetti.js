function startConfetti() {
    const duration = 1 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 6,
            spread: 80
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}