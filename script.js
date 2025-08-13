// Modal functionality with enhanced accessibility
function openLogin() {
    const modal = document.getElementById('login-modal');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    setTimeout(() => manageFocus('login-modal'), 100);
    
    // Announce modal opening to screen readers
    announceToScreenReader('Login modal opened');
}

function openContact() {
    const modal = document.getElementById('contact-modal');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    setTimeout(() => manageFocus('contact-modal'), 100);
    
    // Announce modal opening to screen readers
    announceToScreenReader('Contact modal opened');
}

function openAccessibility() {
    const modal = document.getElementById('accessibility-modal');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    setTimeout(() => manageFocus('accessibility-modal'), 100);
    
    // Announce modal opening to screen readers
    announceToScreenReader('Accessibility information modal opened');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    
    // Return focus to the button that opened the modal
    const triggerButton = getTriggerButton(modalId);
    if (triggerButton) {
        triggerButton.focus();
    }
    
    // Clear any error/success messages
    clearMessages(modalId);
    
    // Announce modal closing to screen readers
    announceToScreenReader('Modal closed');
}

// Get the button that triggered the modal
function getTriggerButton(modalId) {
    const buttonMap = {
        'login-modal': 'loginButton',
        'contact-modal': 'contactButton',
        'accessibility-modal': 'accessibilityButton'
    };
    
    const buttonId = buttonMap[modalId];
    return buttonId ? document.getElementById(buttonId) : null;
}

// Clear error and success messages
function clearMessages(modalId) {
    const modal = document.getElementById(modalId);
    const errorMessages = modal.querySelectorAll('.error-message, .success-message, .field-error');
    errorMessages.forEach(msg => {
        msg.style.display = 'none';
        msg.textContent = '';
    });
    
    // Also clear contact form messages if it's the contact modal
    if (modalId === 'contact-modal') {
        clearContactMessages();
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            const modalId = modal.id;
            closeModal(modalId);
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                const modalId = modal.id;
                closeModal(modalId);
            }
        });
    }
});

// Form handling with enhanced accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.querySelector('#login-modal .form');
    if (loginForm) {
        // Clear error message when user starts typing
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        
        usernameInput.addEventListener('input', function() {
            document.getElementById('error').style.display = 'none';
            document.getElementById('success').style.display = 'none';
            // Clear field-specific errors
            clearFieldError('username');
            // Update ARIA invalid state
            this.setAttribute('aria-invalid', 'false');
        });
        
        passwordInput.addEventListener('input', function() {
            document.getElementById('error').style.display = 'none';
            document.getElementById('success').style.display = 'none';
            // Clear field-specific errors
            clearFieldError('password');
            // Update ARIA invalid state
            this.setAttribute('aria-invalid', 'false');
        });
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            // Clear previous messages
            clearMessages('login-modal');
            
            // Simple validation
            if (username && password) {
                // Check if credentials are "correct" (demo purposes)
                if (username === 'student' && password === 'Password123') {
                    // Show success message
                    const successElement = document.getElementById('success');
                    const errorElement = document.getElementById('error');
                    
                    // Hide any existing error message
                    errorElement.style.display = 'none';
                    
                    // Show success message
                    successElement.textContent = 'Login successful! Welcome!';
                    successElement.style.display = 'block';
                    
                    // Reset form but keep modal open
                    loginForm.reset();
                    
                    // Announce success to screen readers
                    announceToScreenReader('Login successful! Welcome!');
                } else {
                    // Show error message for incorrect credentials based on what's wrong
                    const errorElement = document.getElementById('error');
                    let errorMessage = '';
                    
                    if (username !== 'student' && password !== 'Password123') {
                        errorMessage = 'Your username and password are invalid!';
                    } else if (username !== 'student') {
                        errorMessage = 'Your username is invalid!';
                    } else if (password !== 'Password123') {
                        errorMessage = 'Your password is invalid!';
                    }
                    
                    errorElement.textContent = errorMessage;
                    errorElement.style.display = 'block';
                    
                    // Announce error to screen readers
                    announceToScreenReader(errorMessage);
                }
            } else {
                // Show appropriate error message based on what's missing
                const errorElement = document.getElementById('error');
                let errorMessage = '';
                
                if (!username && !password) {
                    errorMessage = 'Your username and password are invalid!';
                    showFieldError('username', 'Username is required');
                    showFieldError('password', 'Password is required');
                    usernameInput.setAttribute('aria-invalid', 'true');
                    passwordInput.setAttribute('aria-invalid', 'true');
                } else if (!username) {
                    errorMessage = 'Your username is invalid!';
                    showFieldError('username', 'Username is required');
                    usernameInput.setAttribute('aria-invalid', 'true');
                } else if (!password) {
                    errorMessage = 'Your password is invalid!';
                    showFieldError('password', 'Password is required');
                    passwordInput.setAttribute('aria-invalid', 'true');
                }
                
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
                
                // Announce error to screen readers
                announceToScreenReader(errorMessage);
            }
        });
    }

    // Contact form
    const contactForm = document.querySelector('#contact-modal .form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Clear previous field errors
            clearAllFieldErrors();
            
            // Enhanced validation with single error message
            if (name && email && message) {
                // Validate email format
                if (!isValidEmail(email)) {
                    showEmailFormatError();
                    announceToScreenReader('Please enter a valid email address format');
                    return;
                }
                
                // Show success message using dedicated element
                const successElement = document.getElementById('contact-success');
                const errorElement = document.getElementById('contact-error');
                
                // Hide error message and show success message
                errorElement.style.display = 'none';
                successElement.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                successElement.style.display = 'block';
                
                // Announce success to screen readers
                announceToScreenReader('Message sent successfully! We\'ll get back to you soon.');
                
                // Reset the form but keep modal open
                contactForm.reset();
            } else {
                // Determine which fields are missing and show appropriate error message
                const missingFields = [];
                if (!name) missingFields.push('name');
                if (!email) missingFields.push('email');
                if (!message) missingFields.push('message');
                
                // Show single error message based on what's missing
                const errorElement = document.getElementById('contact-error');
                let errorMessage = '';
                
                if (missingFields.length === 3) {
                    // All fields empty
                    errorMessage = 'All fields are required. Please fill in your name, email, and message.';
                } else if (missingFields.length === 2) {
                    // Two fields empty - show specific combinations
                    if (!name && !email) {
                        errorMessage = 'Name and email are required. Please fill in both fields.';
                    } else if (!name && !message) {
                        errorMessage = 'Name and message are required. Please fill in both fields.';
                    } else if (!email && !message) {
                        errorMessage = 'Email and message are required. Please fill in both fields.';
                    }
                } else {
                    // One field empty
                    if (!name) {
                        errorMessage = 'Name is required. Please enter your full name.';
                    } else if (!email) {
                        errorMessage = 'Email is required. Please enter your email address.';
                    } else if (!message) {
                        errorMessage = 'Message is required. Please enter your message.';
                    }
                }
                
                // Display the error message
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
                
                // Announce error to screen readers
                announceToScreenReader(errorMessage);
            }
        });
        
        // Add input event listeners to clear error and success messages when user starts typing
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        
        if (nameField) {
            nameField.addEventListener('input', function() {
                clearContactMessages();
                this.setAttribute('aria-invalid', 'false');
            });
        }
        
        if (emailField) {
            emailField.addEventListener('input', function() {
                clearContactMessages();
                clearEmailError();
                this.setAttribute('aria-invalid', 'false');
            });
        }
        
        if (messageField) {
            messageField.addEventListener('input', function() {
                clearContactMessages();
                this.setAttribute('aria-invalid', 'false');
            });
        }
    }
});

// Field error management
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.setAttribute('aria-invalid', 'true');
    }
}

function clearFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function clearAllFieldErrors() {
    const fieldErrors = document.querySelectorAll('.field-error');
    fieldErrors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    // Reset aria-invalid attributes
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.setAttribute('aria-invalid', 'false');
    });
    
    // Also clear email-specific error
    clearEmailError();
}

// Clear contact form error and success messages
function clearContactMessages() {
    const errorElement = document.getElementById('contact-error');
    const successElement = document.getElementById('contact-success');
    
    if (errorElement) {
        errorElement.style.display = 'none';
        errorElement.textContent = '';
    }
    
    if (successElement) {
        successElement.style.display = 'none';
        successElement.textContent = '';
    }
}

// Email validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showEmailFormatError() {
    const emailErrorElement = document.getElementById('email-error');
    if (emailErrorElement) {
        emailErrorElement.textContent = 'Please enter a valid email address format';
        emailErrorElement.style.display = 'block';
    }
    
    // Also set aria-invalid on the email field
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.setAttribute('aria-invalid', 'true');
    }
}

function clearEmailError() {
    const emailErrorElement = document.getElementById('email-error');
    if (emailErrorElement) {
        emailErrorElement.style.display = 'none';
        emailErrorElement.textContent = '';
    }
}

// Accessibility features
let currentFontSize = 16;
let highContrastMode = false;

function increaseFontSize() {
    if (currentFontSize < 24) {
        currentFontSize += 2;
        document.body.style.fontSize = currentFontSize + 'px';
        updateAccessibilityStatus();
        announceToScreenReader(`Font size increased to ${currentFontSize} pixels`);
    }
}

function decreaseFontSize() {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.body.style.fontSize = currentFontSize + 'px';
        updateAccessibilityStatus();
        announceToScreenReader(`Font size decreased to ${currentFontSize} pixels`);
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
        
        announceToScreenReader('High contrast mode enabled');
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
        
        announceToScreenReader('High contrast mode disabled');
    }
    
    updateAccessibilityStatus();
}

function updateAccessibilityStatus() {
    const fontStatusElement = document.getElementById('font-size-status');
    const contrastStatusElement = document.getElementById('contrast-status');
    
    if (fontStatusElement) {
        fontStatusElement.textContent = `Font Size: ${currentFontSize}px`;
    }
    
    if (contrastStatusElement) {
        contrastStatusElement.textContent = `High Contrast: ${highContrastMode ? 'On' : 'Off'}`;
    }
}

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Enhanced keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Tab navigation for modals with focus trapping
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
    
    // Enter key support for buttons
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'BUTTON' && !activeElement.disabled) {
            activeElement.click();
        }
    }
    
    // Space key support for buttons
    if (event.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'BUTTON' && !activeElement.disabled) {
            event.preventDefault();
            activeElement.click();
        }
    }
});

// Focus management for better accessibility
function manageFocus(modalId) {
    const modal = document.getElementById(modalId);
    const focusableElements = modal.querySelectorAll('button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    if (focusableElements.length > 0) {
        // Focus the first focusable element
        focusableElements[0].focus();
        
        // Set tabindex for focus trapping
        focusableElements.forEach((element, index) => {
            element.setAttribute('tabindex', index === 0 ? '0' : '0');
        });
    }
}

// Enhanced modal opening with focus management
function openLogin() {
    const modal = document.getElementById('login-modal');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => manageFocus('login-modal'), 100);
    announceToScreenReader('Login modal opened');
}

function openContact() {
    const modal = document.getElementById('contact-modal');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => manageFocus('contact-modal'), 100);
    announceToScreenReader('Contact modal opened');
}

function openAccessibility() {
    const modal = document.getElementById('accessibility-modal');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => manageFocus('accessibility-modal'), 100);
    announceToScreenReader('Accessibility information modal opened');
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
            
            // Focus the target for accessibility
            if (target.hasAttribute('tabindex')) {
                target.focus();
            }
        }
    });
});

// Add loading states for better UX
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.setAttribute('aria-busy', 'false');
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
        
        // Add keyboard support for section cards
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const button = card.querySelector('.section-button');
                if (button) {
                    button.click();
                }
            }
        });
        
        // Make section cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', card.querySelector('h2').textContent + ' section');
    });
    
    // Initialize accessibility status
    updateAccessibilityStatus();
});

// Add page load announcement for screen readers
window.addEventListener('load', function() {
    announceToScreenReader('Training website loaded successfully. Use Tab key to navigate and Enter or Space to activate buttons.');
}); 