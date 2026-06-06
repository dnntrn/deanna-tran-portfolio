// Typewriter Effect
function typeWriter(element, text, speed = 80, onComplete) {
    let i = 0;
    element.textContent = '';
    element.classList.add('typing');
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing');
            element.classList.add('typing-done');
            if (onComplete) onComplete();
        }
    }
    
    type();
}

// Type out job title on page load, then fade in all paragraphs sequentially
document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector('.typewriter-target');
    const allParagraphs = document.querySelectorAll('.first-paragraph, .fade-paragraph');
    
    if (target) {
        const text = target.textContent;
        target.textContent = '';
        target.classList.add('typing');
        
        typeWriter(target, text, 70, () => {
            allParagraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.classList.add('visible');
                }, 1200 + (index * 500));
            });
        });
    }
});