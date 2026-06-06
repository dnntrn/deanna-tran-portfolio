// ASCII Cat - Sparkle Button Delight
const sparkleBtn = document.querySelector('.sparkle-btn');
const asciiCat = document.getElementById('ascii-cat');
const catFace = document.querySelector('.cat-face');
const catSpeech = document.querySelector('.cat-speech');
const catCrown = document.querySelector('.cat-crown');

let clickCount = 0;
let isCatVisible = false;

const normalFace = ` /\\_/\\
( o.o )
 > ^ <`;
const winkingFace = ` /\\_/\\
( o.- )
 > ^ <`;

let winkInterval = null;

function startWinking() {
    let isWinking = false;
    winkInterval = setInterval(() => {
        if (isWinking) {
            catFace.textContent = normalFace;
            catFace.classList.remove('winking');
        } else {
            catFace.textContent = winkingFace;
            catFace.classList.add('winking');
        }
        isWinking = !isWinking;
    }, 400);
}

function stopWinking() {
    if (winkInterval) {
        clearInterval(winkInterval);
        winkInterval = null;
    }
    catFace.textContent = normalFace;
    catFace.classList.remove('winking');
}

catFace.addEventListener('mouseenter', () => {
    if (isCatVisible) startWinking();
});

catFace.addEventListener('mouseleave', () => {
    stopWinking();
});

function showNormalCat() {
    catFace.textContent = normalFace;
    catFace.classList.remove('winking');
    catCrown.classList.remove('visible');
    catSpeech.classList.remove('queen-message');
    catSpeech.textContent = 'purr';
    asciiCat.classList.remove('hidden');
    asciiCat.classList.add('popping');
    isCatVisible = true;
    setTimeout(() => catSpeech.classList.add('visible'), 400);
    setTimeout(() => asciiCat.classList.remove('popping'), 400);
}

function addCrown() {
    if (!isCatVisible) return;
    catCrown.classList.add('visible');
    setTimeout(() => {
        const crownRect = catCrown.getBoundingClientRect();
        createSparkleBurst(crownRect.left + crownRect.width / 2, crownRect.top + crownRect.height / 2);
    }, 50);
    setTimeout(() => {
        catSpeech.classList.remove('visible');
        setTimeout(() => {
            catSpeech.textContent = '👑 Code like a queen!';
            catSpeech.classList.add('queen-message');
            catSpeech.classList.add('visible');
        }, 300);
    }, 200);
}

function hideCat() {
    asciiCat.classList.add('hidden');
    isCatVisible = false;
    setTimeout(() => {
        catCrown.classList.remove('visible');
        catSpeech.classList.remove('visible');
        catSpeech.classList.remove('queen-message');
        catSpeech.textContent = 'purr';
        catFace.textContent = normalFace;
    }, 300);
}

if (sparkleBtn && asciiCat) {
    sparkleBtn.addEventListener('click', (e) => {
        clickCount++;
        const rect = sparkleBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        if (clickCount === 1) {
            createSparkleBurst(centerX, centerY);
            showNormalCat();
        } else if (clickCount === 2) {
            createSparkleBurst(centerX, centerY);
            addCrown();
        } else {
            hideCat();
            clickCount = 0;
        }
    });
}

document.addEventListener('click', (e) => {
    if (isCatVisible && !asciiCat.contains(e.target) && !sparkleBtn.contains(e.target)) {
        hideCat();
        clickCount = 0;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCatVisible) {
        hideCat();
        clickCount = 0;
    }
});