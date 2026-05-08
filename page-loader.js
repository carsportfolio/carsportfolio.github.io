// Page Loader - Waits for all images to load before hiding loading screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    // If no images, hide loader immediately
    if (totalImages === 0) {
        hideLoader();
        return;
    }

    // Function to hide the loading screen
    function hideLoader() {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    // Function to check if all images are loaded
    function imageLoaded() {
        loadedCount++;
        if (loadedCount === totalImages) {
            hideLoader();
        }
    }

    // Add load event listeners to all images
    images.forEach(img => {
        if (img.complete) {
            // Image already loaded (cached)
            imageLoaded();
        } else {
            // Wait for image to load
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded); // Count errors as loaded to prevent hanging
        }
    });

    // Fallback: Hide loader after 10 seconds regardless
    setTimeout(() => {
        if (!loadingScreen.classList.contains('hidden')) {
            console.log('Loader timeout - hiding anyway');
            hideLoader();
        }
    }, 10000);
});
