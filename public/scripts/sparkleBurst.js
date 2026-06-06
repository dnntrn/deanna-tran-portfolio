// Sparkle Burst Effect
function createSparkleBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'sparkle-burst';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    document.body.appendChild(burst);
    
    const particleCount = 6 + Math.floor(Math.random() * 3);
    for (let i = 0; i < particleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';
        
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
        
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        
        sparkle.style.left = offsetX + 'px';
        sparkle.style.top = offsetY + 'px';
        sparkle.style.animationDelay = (i * 0.05) + 's';
        
        burst.appendChild(sparkle);
    }
    
    setTimeout(() => burst.remove(), 1000);
}