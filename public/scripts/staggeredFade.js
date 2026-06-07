// Staggered fade-in: each paragraph fades in as a complete block, one after another
// Only animates on the first visit per browser session
document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = document.querySelectorAll('.typewriter-paragraph, .fade-paragraph');
    
    if (paragraphs.length === 0) return;
    
    const hasSeenAnimation = sessionStorage.getItem('hasSeenHomeAnimation');
    
    if (hasSeenAnimation) {
        // Skip animation — show all content immediately
        paragraphs.forEach(p => p.classList.add('visible'));
    } else {
        // Run staggered fade-in animation
        async function runSequence() {
            // Pause before starting (let page settle)
            await new Promise(r => setTimeout(r, 1500));
            
            // Fade in each paragraph sequentially as a complete block
            for (let i = 0; i < paragraphs.length; i++) {
                paragraphs[i].classList.add('visible');
                // Wait before showing the next one
                await new Promise(r => setTimeout(r, 400));
            }
            
            // Mark animation as seen for this session
            sessionStorage.setItem('hasSeenHomeAnimation', 'true');
        }
        
        runSequence();
    }
});
