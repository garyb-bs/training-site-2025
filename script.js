// Modal functionality
function openLogin() {
    document.getElementById('login-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openContact() {
    document.getElementById('contact-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openAccessibility() {
    document.getElementById('accessibility-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.querySelector('#login-modal .form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (username && password) {
                alert('Login functionality would be implemented here!\nUsername: ' + username);
                closeModal('login-modal');
                loginForm.reset();
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // Contact form
    const contactForm = document.querySelector('#contact-modal .form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                alert('Thank you for your message! We\'ll get back to you soon.\n\nName: ' + name + '\nEmail: ' + email);
                closeModal('contact-modal');
                contactForm.reset();
            } else {
                alert('Please fill in all fields');
            }
        });
    }
});

// Accessibility features
let currentFontSize = 16;
let highContrastMode = false;

function increaseFontSize() {
    currentFontSize += 2;
    document.body.style.fontSize = currentFontSize + 'px';
    updateAccessibilityStatus();
}

function decreaseFontSize() {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.body.style.fontSize = currentFontSize + 'px';
        updateAccessibilityStatus();
    }
}

function toggleHighContrast() {
    highContrastMode = !highContrastMode;
    
    if (highContrastMode) {
        document.body.classList.add('high-contrast');
        document.body.style.backgroundColor = '#000';
        document.body.style.color = '#fff';
        
        // Update section cards
        const sectionCards = document.querySelectorAll('.section-card');
        sectionCards.forEach(card => {
            card.style.backgroundColor = '#000';
            card.style.color = '#fff';
            card.style.borderColor = '#fff';
        });
        
        // Update modals
        const modals = document.querySelectorAll('.modal-content');
        modals.forEach(modal => {
            modal.style.backgroundColor = '#000';
            modal.style.color = '#fff';
        });
    } else {
        document.body.classList.remove('high-contrast');
        document.body.style.backgroundColor = '#f8f9fa';
        document.body.style.color = '#333';
        
        // Reset section cards
        const sectionCards = document.querySelectorAll('.section-card');
        sectionCards.forEach(card => {
            card.style.backgroundColor = 'white';
            card.style.color = '#333';
            card.style.borderColor = 'transparent';
        });
        
        // Reset modals
        const modals = document.querySelectorAll('.modal-content');
        modals.forEach(modal => {
            modal.style.backgroundColor = 'white';
            modal.style.color = '#333';
        });
    }
    
    updateAccessibilityStatus();
}

function updateAccessibilityStatus() {
    const statusElement = document.querySelector('.accessibility-status');
    if (statusElement) {
        statusElement.textContent = `Font Size: ${currentFontSize}px | High Contrast: ${highContrastMode ? 'On' : 'Off'}`;
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Tab navigation for modals
    if (event.key === 'Tab') {
        const activeModal = document.querySelector('.modal[style*="block"]');
        if (activeModal) {
            const focusableElements = activeModal.querySelectorAll('button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        }
    }
});

// Add focus management for better accessibility
function manageFocus(modalId) {
    const modal = document.getElementById(modalId);
    const focusableElements = modal.querySelectorAll('button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

// Enhanced modal opening with focus management
function openLogin() {
    document.getElementById('login-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => manageFocus('login-modal'), 100);
}

function openContact() {
    document.getElementById('contact-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => manageFocus('contact-modal'), 100);
}

function openAccessibility() {
    document.getElementById('accessibility-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => manageFocus('accessibility-modal'), 100);
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for better UX
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Add click event listeners for section cards
document.addEventListener('DOMContentLoaded', function() {
    const sectionCards = document.querySelectorAll('.section-card');
    
    sectionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the button
            if (e.target.classList.contains('section-button')) {
                return;
            }
            
            // Find the button and click it
            const button = card.querySelector('.section-button');
            if (button) {
                button.click();
            }
        });
    });
}); 