// Staggered fade-in: each paragraph fades in as a complete block, one after another
document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = document.querySelectorAll('.typewriter-paragraph, .fade-paragraph');
    
    async function runSequence() {
        // Pause before starting (let page settle)
        await new Promise(r => setTimeout(r, 1500));
        
        // Fade in each paragraph sequentially as a complete block
        for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].classList.add('visible');
            // Wait before showing the next one
            await new Promise(r => setTimeout(r, 400));
        }
    }
    
    if (paragraphs.length > 0) {
        runSequence();
    }
});
