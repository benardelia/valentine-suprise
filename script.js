const params = new URLSearchParams(window.location.search);
const recipientName = params.get('name');

const titleEl = document.getElementById('title');
if (recipientName) {
    titleEl.textContent = `Will you be my Valentine, ${recipientName}?`;
    document.title = `Will You Be My Valentine, ${recipientName}?`;
}



const noButton = document.querySelector('.no-button');
const yesButton = document.querySelector('.yes-button');
const shyMessage = document.querySelector('.shy-message');
let count = 0;

const shyMessages = [
    "Seems like no is little shy 🫣🥰",
    "No button is blushing... 💕",
    "Aww, someone's feeling shy! 😳",
    "The no button needs space... 🥺",
    "This button is camera shy! 📸",
    "Oops, it ran away! 🏃‍♂️💨",
    "So much shyness in one button! 😤❤️",
    "It's playing hard to get... 😏",
    "The no button is flustered! 👀💗",
    "Caught you being shy! 🙈",
    "This button has performance anxiety! 😅",
    "Someone's got the butterflies! 🦋",
    "The button said 'not now' 🤐",
    "Shyness level: expert mode! 🌟",
    "The no button is having trust issues 😂💔"
];

let shyMessageIndex = 0;

function clampToViewport(x, y, rect) {
    const margin = 10;
    const maxX = window.innerWidth - rect.width - margin;
    const maxY = window.innerHeight - rect.height - margin;
    return {
        x: Math.max(margin, Math.min(x, maxX)),
        y: Math.max(margin, Math.min(y, maxY))
    };
}

function dodgeButton(mouseX, mouseY) {
    const buttonRect = noButton.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const distX = buttonCenterX - mouseX;
    const distY = buttonCenterY - mouseY;

    if (Math.sqrt(distX * distX + distY * distY) < 80) {
        const angle = Math.atan2(distY, distX);
        const distance = 150;

        let newLeft = buttonRect.left + Math.cos(angle) * distance;
        let newTop = buttonRect.top + Math.sin(angle) * distance;

        const clamped = clampToViewport(newLeft, newTop, buttonRect);

        noButton.style.position = 'fixed';
        noButton.style.left = `${clamped.x}px`;
        noButton.style.top = `${clamped.y}px`;
        noButton.style.transform = 'scale(1.1)';
        noButton.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';

        count++;
        if (count > 10) {
            shyMessage.textContent = shyMessages[shyMessageIndex];
            shyMessageIndex = (shyMessageIndex + 1) % shyMessages.length;
            count = 0;
        }
    }
}

document.addEventListener('mousemove', function (e) {
    dodgeButton(e.clientX, e.clientY);
});

document.addEventListener('touchmove', function (e) {
    const touch = e.touches[0];
    dodgeButton(touch.clientX, touch.clientY);
}, { passive: true });

noButton.addEventListener('touchstart', function (e) {
    e.preventDefault();
    const rect = noButton.getBoundingClientRect();
    const randomX = Math.random() * (window.innerWidth - rect.width - 20) + 10;
    const randomY = Math.random() * (window.innerHeight - rect.height - 20) + 10;

    noButton.style.position = 'fixed';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
    noButton.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';

    count++;
    if (count > 5) {
        shyMessage.textContent = shyMessages[shyMessageIndex];
        shyMessageIndex = (shyMessageIndex + 1) % shyMessages.length;
        count = 0;
    }
}, { passive: false });

const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;
const MAX_YES_FONT_SIZE = 80;

noButton.addEventListener('click', function () {
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    if (currentSize < MAX_YES_FONT_SIZE) {
        yesButton.style.fontSize = `${Math.min(currentSize * 1.5, MAX_YES_FONT_SIZE)}px`;
    }
});

yesButton.addEventListener('click', function () {
    const url = recipientName
        ? `yes_page.html?name=${encodeURIComponent(recipientName)}`
        : 'yes_page.html';
    window.location.href = url;
});
