// Main JavaScript file for Dr. Thomas Athisayaraj's website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupScrollEffects();
    setupGallery();
    setupContactForm();
    setupAnimations();
}

// Navigation functionality
function setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Footer navigation links
    const footerLinks = document.querySelectorAll('footer a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Make scrollToSection globally available
window.scrollToSection = scrollToSection;

// Scroll effects and animations
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for service cards
                if (entry.target.classList.contains('services-grid')) {
                    const serviceCards = entry.target.querySelectorAll('.service-card');
                    serviceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }

                // Special handling for gallery items
                if (entry.target.classList.contains('gallery-grid')) {
                    const galleryItems = entry.target.querySelectorAll('.gallery-item');
                    galleryItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const elementsToObserve = document.querySelectorAll(
        '.section-header, .about-content, .services-grid, .experience-content, .gallery-grid, .contact-content'
    );
    
    elementsToObserve.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Gallery functionality
function setupGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.getElementById('modal-close');

    // Gallery images data
    const galleryImages = [
        {
            src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
            alt: "Modern surgical suite with advanced equipment"
        },
        {
            src: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
            alt: "Hospital corridor with modern medical facility design"
        },
        {
            src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
            alt: "Advanced endoscopic equipment and monitors"
        },
        {
            src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
            alt: "Laparoscopic surgical instruments and technology"
        },
        {
            src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
            alt: "Medical diagnostic equipment and computer systems"
        },
        {
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
            alt: "Traditional English countryside with historic buildings"
        },
        {
            src: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
            alt: "Professional medical consultation setup"
        }
    ];

    // Create gallery items
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
        
        // Add click event to open modal
        galleryItem.addEventListener('click', function() {
            openModal(image.src, image.alt);
        });
        
        galleryGrid.appendChild(galleryItem);
    });

    // Modal functionality
    function openModal(src, alt) {
        modalImage.src = src;
        modalImage.alt = alt;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close modal events
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    service: formData.get('service'),
                    message: formData.get('message')
                })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                showNotification('Message sent successfully! Thank you for your message. We will contact you soon!', 'success');
                contactForm.reset();
            } else {
                showNotification(result.message || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showNotification('Failed to send message. Please try again or call us directly.', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            z-index: 2000;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        
        .notification-error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .notification-message {
            flex: 1;
            line-height: 1.4;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: inherit;
            padding: 0;
            line-height: 1;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Close notification functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    });
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }
    }, 5000);
}

// Additional animations setup
function setupAnimations() {
    // Add floating animation to hero image after page load
    setTimeout(() => {
        const doctorImage = document.querySelector('.doctor-image');
        if (doctorImage) {
            doctorImage.style.animation = 'float 6s ease-in-out infinite';
        }
    }, 1500);
    
    // Add staggered animation to service cards
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('services-grid')) {
                const serviceCards = entry.target.querySelectorAll('.service-card');
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.2 });
    
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        observer.observe(servicesGrid);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

// Replace the scroll event listener in setupNavigation with the debounced version
window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();