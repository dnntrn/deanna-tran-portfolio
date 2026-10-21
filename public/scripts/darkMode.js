// Dark Mode Toggle — theme is set inline in <head> to prevent flash.
// Delegated so it survives Astro page transitions.
document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const themeToggle = target.closest('.theme-toggle');
    if (!themeToggle) return;

    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme-v2', newTheme);
});
