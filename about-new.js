// Modern About Page Navigation
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.about-nav-dot');
    const texts = document.querySelectorAll('.about-text');
    let currentSection = 1;
    const totalSections = 3;
    
    function goToSection(section) {
        // Remove active class from all
        dots.forEach(d => d.classList.remove('active'));
        texts.forEach(t => t.classList.remove('active'));
        
        // Add active class to current section
        const targetDot = document.querySelector(`.about-nav-dot[data-section="${section}"]`);
        const targetText = document.querySelector(`.about-text[data-section="${section}"]`);
        
        if (targetDot && targetText) {
            targetDot.classList.add('active');
            targetText.classList.add('active');
            currentSection = section;
        }
    }
    
    function nextSection() {
        const next = currentSection >= totalSections ? 1 : currentSection + 1;
        goToSection(next);
    }
    
    // Click on dots
    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the page click
            const section = parseInt(this.getAttribute('data-section'));
            goToSection(section);
        });
    });
    
    // Click anywhere on the page to go to next section
    document.addEventListener('click', function(e) {
        // Don't trigger if clicking on a link or the profile image
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        nextSection();
    });
    
    // Optional: Arrow keys for navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextSection();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const prev = currentSection <= 1 ? totalSections : currentSection - 1;
            goToSection(prev);
        }
    });
});
