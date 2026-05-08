// Home page role cycling animation
document.addEventListener('DOMContentLoaded', function() {
    const roles = document.querySelectorAll('.role');
    let currentRole = 0;
    
    function cycleRoles() {
        // Remove active class from current role
        roles[currentRole].classList.remove('active');
        
        // Move to next role
        currentRole = (currentRole + 1) % roles.length;
        
        // Add active class to new role
        roles[currentRole].classList.add('active');
    }
    
    // Cycle roles every 2 seconds
    setInterval(cycleRoles, 2000);
});
