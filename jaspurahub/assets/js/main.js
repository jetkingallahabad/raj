// JaspuraHub Theme Main JavaScript

(function() {
    'use strict';
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add active class to current menu item
    document.querySelectorAll('.menu a').forEach(function(link) {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
})();
