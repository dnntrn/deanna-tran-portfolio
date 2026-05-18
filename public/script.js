// ===== ASCII Cat - Sparkle Button Delight =====
const sparkleBtn = document.querySelector('.sparkle-btn');
const asciiCat = document.getElementById('ascii-cat');
const catFace = document.querySelector('.cat-face');
const catSpeech = document.querySelector('.cat-speech');
const catCrown = document.querySelector('.cat-crown');

let clickCount = 0;
let isCatVisible = false;

// Normal and winking faces
const normalFace = ` /\\_/\\
( o.o )
 > ^ <`;
const winkingFace = ` /\\_/\\
( o.- )
 > ^ <`;

// Wink loop on hover
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
    }, 400); // Wink every 400ms (200ms wink, 200ms normal)
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
    if (isCatVisible) {
        startWinking();
    }
});

catFace.addEventListener('mouseleave', () => {
    stopWinking();
});

// Sparkle burst effect
function createSparkleBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'sparkle-burst';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    document.body.appendChild(burst);
    
    // Create 6-8 sparkle particles
    const particleCount = 6 + Math.floor(Math.random() * 3);
    for (let i = 0; i < particleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';
        
        // Create pink star SVG instead of emoji
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.style.display = 'block';
        
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        star.setAttribute('d', 'M12 3 Q 12 9 18 9 Q 12 9 12 15 Q 12 9 6 9 Q 12 9 12 3 Z');
        star.setAttribute('fill', '#e8a5c0');
        
        svg.appendChild(star);
        sparkle.appendChild(svg);
        
        // Random position around the click point
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        
        sparkle.style.left = offsetX + 'px';
        sparkle.style.top = offsetY + 'px';
        sparkle.style.animationDelay = (i * 0.05) + 's';
        
        burst.appendChild(sparkle);
    }
    
    // Remove after animation
    setTimeout(() => {
        burst.remove();
    }, 1000);
}

// Handle sparkle button clicks
if (sparkleBtn && asciiCat) {
    sparkleBtn.addEventListener('click', (e) => {
        clickCount++;
        
        // Get button position for sparkle burst
        const rect = sparkleBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        if (clickCount === 1) {
            // Click 1: Show normal cat with pop animation
            createSparkleBurst(centerX, centerY);
            showNormalCat();
        } else if (clickCount === 2) {
            // Click 2: Add crown with sparkle burst
            createSparkleBurst(centerX, centerY);
            addCrown();
        } else if (clickCount >= 3) {
            // Click 3: Hide cat
            hideCat();
            clickCount = 0; // Reset cycle
        }
    });
}

function showNormalCat() {
    // Reset to normal state
    catFace.textContent = normalFace;
    catFace.classList.remove('winking');
    catCrown.classList.remove('visible');
    catSpeech.classList.remove('queen-message');
    catSpeech.textContent = 'purr';
    
    // Show cat with pop animation
    asciiCat.classList.remove('hidden');
    asciiCat.classList.add('popping');
    isCatVisible = true;
    
    // Show speech bubble after pop
    setTimeout(() => {
        catSpeech.classList.add('visible');
    }, 400);
    
    // Remove pop class after animation
    setTimeout(() => {
        asciiCat.classList.remove('popping');
    }, 400);
    
    console.log('🐱 Meow!');
}

function addCrown() {
    if (!isCatVisible) return;
    
    // Show crown with pop animation first
    catCrown.classList.add('visible');
    
    // Get crown position after it's visible and create sparkles
    setTimeout(() => {
        const crownRect = catCrown.getBoundingClientRect();
        const crownX = crownRect.left + crownRect.width / 2;
        const crownY = crownRect.top + crownRect.height / 2;
        
        // Create sparkles around the crown
        createSparkleBurst(crownX, crownY);
    }, 50);
    
    // Change speech to queen message
    setTimeout(() => {
        catSpeech.classList.remove('visible');
        setTimeout(() => {
            catSpeech.textContent = '👑 Code like a queen!';
            catSpeech.classList.add('queen-message');
            catSpeech.classList.add('visible');
        }, 300);
    }, 200);
    
    console.log('👑 Queen mode activated!');
}

function hideCat() {
    asciiCat.classList.add('hidden');
    isCatVisible = false;
    
    // Reset after hiding
    setTimeout(() => {
        catCrown.classList.remove('visible');
        catSpeech.classList.remove('visible');
        catSpeech.classList.remove('queen-message');
        catSpeech.textContent = 'purr';
        catFace.textContent = normalFace;
    }, 300);
}

// Close cat when clicking outside
document.addEventListener('click', (e) => {
    if (isCatVisible && !asciiCat.contains(e.target) && !sparkleBtn.contains(e.target)) {
        hideCat();
        clickCount = 0;
    }
});

// Close cat with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCatVisible) {
        hideCat();
        clickCount = 0;
    }
});

// ===== Wave Animation with Preloading =====
function preloadImages(urls) {
    return Promise.all(
        urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(url);
                img.onerror = () => reject(url);
                img.src = url;
            });
        })
    );
}

function playWaveAnimation() {
    const container = document.getElementById('wave-container');
    if (!container) return;
    
    const frames = [
        container.querySelector('[data-frame="0"]'), // static
        container.querySelector('[data-frame="1"]'), // wave1
        container.querySelector('[data-frame="2"]')  // wave2
    ];
    
    // Ensure frame 0 is visible initially
    frames[0].classList.add('frame-active');
    
    // Animation timeline with overlapping crossfades
    // Transition 0→1 (starts at 500ms)
    setTimeout(() => {
        frames[0].classList.remove('frame-active');
        frames[1].classList.add('frame-active');
    }, 500);
    
    // Transition 1→2 (starts at 700ms, 200ms overlap with 0→1)
    setTimeout(() => {
        frames[1].classList.remove('frame-active');
        frames[2].classList.add('frame-active');
    }, 700);
    
    // Transition 2→0 (starts at 900ms, 200ms overlap with 1→2)
    setTimeout(() => {
        frames[2].classList.remove('frame-active');
        frames[0].classList.add('frame-active');
    }, 900);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const imageUrls = [
        'cartoon-me-full-body.png',
        'cartoon-me-wave-1.png',
        'cartoon-me-wave-2.png'
    ];
    
    // Preload images, then play animation
    preloadImages(imageUrls)
        .then(() => {
            console.log('Wave images preloaded');
            playWaveAnimation();
        })
        .catch((err) => {
            console.log('Image preload failed, showing static:', err);
            // Static image is already visible by default
        });
});

// ===== Smooth scroll for any anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Console Easter Egg =====
console.log('👋 Hey there! Like what you see? Let\'s build something together.');
console.log('💡 Click the star button to meet the ASCII cat! Click twice for a surprise...');
