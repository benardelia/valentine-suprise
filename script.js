(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();

const noButton = document.querySelector('.no-button');
const shyMessage = document.querySelector('.shy-message');
var count = 0;

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

document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const buttonRect = noButton.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // Calculate distance from mouse to button
    const distX = buttonCenterX - mouseX;
    const distY = buttonCenterY - mouseY;
    
    // If mouse is close to button, move it away
    if (Math.sqrt(distX * distX + distY * distY) < 80) {
        const angle = Math.atan2(distY, distX);
        const distance = 150;
        
        const newX = Math.cos(angle) * distance;
        const newY = Math.sin(angle) * distance;
        
        noButton.style.transform = `translate(${newX}px, ${newY}px) scale(1.1)`;
        noButton.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';

        count++;
        if (count > 10)
        {
            shyMessage.innerHTML = shyMessages[shyMessageIndex];
            shyMessageIndex = (shyMessageIndex + 1) % shyMessages.length;
            count = 0;
        }
        

    }
});

/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/
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

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}