// Typewriter Effect
function typeWriter(element, text, speed = 80) {
    return new Promise((resolve) => {
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
                resolve();
            }
        }
        
        type();
    });
}

// Sequential typewriter: type each phrase, then fade in everything else
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.typewriter-target');
    const fadeParagraphs = document.querySelectorAll('.fade-paragraph');
    
    async function runSequence() {
        // Type each target sequentially
        for (const target of targets) {
            const text = target.textContent;
            target.textContent = '';
            target.classList.add('typing');
            await typeWriter(target, text, 70);
            
            // Pause between phrases (except after the last one)
            if (target !== targets[targets.length - 1]) {
                await new Promise(r => setTimeout(r, 800));
            }
        }
        
        // After all typing is done, pause then reveal everything
        await new Promise(r => setTimeout(r, 1200));
        
        // Add .visible to all typewriter-paragraphs (triggers hidden-text fade-in)
        document.querySelectorAll('.typewriter-paragraph').forEach(p => {
            p.classList.add('visible');
        });
        
        // Stagger fade in remaining paragraphs
        fadeParagraphs.forEach((p, index) => {
            setTimeout(() => {
                p.classList.add('visible');
            }, index * 500);
        });
    }
    
    if (targets.length > 0) {
        runSequence();
    }
});