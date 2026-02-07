// Get elements
const noBtn = document.querySelector('.option-btn:nth-child(2)');
const yesBtn = document.querySelector('.option-btn:nth-child(1)');
const container = document.querySelector('.valentine');

// Initialize button to absolute position inside the container so we can move it smoothly
function initButtonPosition() {
    const btnRect = noBtn.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();

    // Set absolute positioning relative to container
    noBtn.style.position = 'absolute';
    noBtn.style.left = (btnRect.left - contRect.left) + 'px';
    noBtn.style.top = (btnRect.top - contRect.top) + 'px';
    noBtn.style.transition = 'left 0.28s cubic-bezier(.2,.9,.2,1), top 0.28s cubic-bezier(.2,.9,.2,1)';
}

// Ensure initial position on load
window.addEventListener('load', initButtonPosition);
window.addEventListener('DOMContentLoaded', initButtonPosition);
window.addEventListener('resize', initButtonPosition);

// Evasion settings
let lastMove = 0;
const MOVE_COOLDOWN = 300; // ms between auto-moves
const MIN_DISTANCE = 140; // minimum distance from cursor to button center

function moveButtonAway(mouseX, mouseY) {
    const btnRect = noBtn.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();

    // Try several random positions inside the container until we find one far enough
    const attempts = 25;
    let newLeft = 0;
    let newTop = 0;
    for (let i = 0; i < attempts; i++) {
        newLeft = Math.random() * (contRect.width - btnRect.width);
        newTop = Math.random() * (contRect.height - btnRect.height);

        const candidateCenterX = contRect.left + newLeft + btnRect.width / 2;
        const candidateCenterY = contRect.top + newTop + btnRect.height / 2;
        const d = Math.hypot(mouseX - candidateCenterX, mouseY - candidateCenterY);
        if (d >= MIN_DISTANCE) break;
    }

    // final clamp just in case
    newLeft = Math.max(0, Math.min(newLeft, contRect.width - btnRect.width));
    newTop = Math.max(0, Math.min(newTop, contRect.height - btnRect.height));

    noBtn.style.left = newLeft + 'px';
    noBtn.style.top = newTop + 'px';
}

// Immediately move on enter
// Desktop: when entering, move immediately and while moving keep evading
noBtn.addEventListener('mouseenter', (e) => {
    lastMove = Date.now();
    moveButtonAway(e.clientX, e.clientY);
});

noBtn.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMove < MOVE_COOLDOWN) return;

    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    if (dist < MIN_DISTANCE + 20) {
        lastMove = now;
        moveButtonAway(e.clientX, e.clientY);
    }
});

// Touch: prevent tapping the button by moving it on touchstart/touchmove
noBtn.addEventListener('touchstart', (evt) => {
    // allow preventing default to stop the click
    if (evt.cancelable) evt.preventDefault();
    lastMove = Date.now();
    const t = evt.touches && evt.touches[0];
    if (t) moveButtonAway(t.clientX, t.clientY);
}, { passive: false });

noBtn.addEventListener('touchmove', (evt) => {
    const now = Date.now();
    if (now - lastMove < MOVE_COOLDOWN) return;
    lastMove = now;
    const t = evt.touches && evt.touches[0];
    if (t) {
        // keep moving to random safe places while finger moves
        moveButtonAway(t.clientX, t.clientY);
    }
}, { passive: true });

// Add click handler for "Yes" button
yesBtn.addEventListener('click', () => {
    // Change h1 texts and image without page reload
    const greetingText = document.getElementById('greetingText');
    const questionText = document.getElementById('questionText');
    const valentineImg = document.getElementById('valentineImg');
    const celebrationAudio = document.getElementById('celebrationAudio');
    
    greetingText.textContent = 'Yay! You made me the happiest person alive! 🥰';
    questionText.textContent = 'Thank you for accepting, My love! ❤️';
    valentineImg.src = './assets/Love You Hearts Sticker.gif'; // Replace with your celebration image
    
    // Play the celebration audio
    celebrationAudio.play().catch(err => console.log('Audio play failed:', err));
    
    // Optional: Hide the buttons
    const optionsDiv = document.querySelector('.options');
    optionsDiv.style.display = 'none';
});

// Add click handler for "No" button
noBtn.addEventListener('click', () => {
    alert('Nice try, but you can\'t escape! 😄');
});

document.querySelectorAll(".option-btn")[0].addEventListener("click", function () {

    emailjs.send("service_u1f0kdd", "template_wv1gkkm", {
        to_email: "gabuatracheller@gmail.com",
        name:"Joshua Castillon",
       
    })

   
    .then(function(response) {
        alert("Email sent successfully!");
    }, function(error) {
        alert("Failed to send email.");
        console.log(error);
    });

});

