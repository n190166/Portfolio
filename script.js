// EmailJS Configuration (Replace with your actual credentials)
const EMAILJS_CONFIG = {
    publicKey:  'GY6Hrt2HqFpAFb_x0', // Replace with your EmailJS public key
    serviceId: 'service_tav6uis', // Replace with your EmailJS service ID
    templateId: 'template_9rs72rf' // Replace with your EmailJS template ID
};

// Initialize EmailJS
(function() {
     emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.updateThemeIcon();
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.updateThemeIcon();
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
    }

    setupMobileMenu() {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    setupScrollEffects() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop;
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSection = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentSection}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-70px 0px 0px 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupCounterAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        const animatedElements = document.querySelectorAll(
            '.section-header, .about-text, .about-image, .skills-category, .project-card, .timeline-item, .contact-info, .contact-form'
        );

        animatedElements.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            if (index % 2 === 0) {
                el.classList.add('animate-left');
            } else {
                el.classList.add('animate-right');
            }
            observer.observe(el);
        });
    }

    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillFill = entry.target;
                    const width = skillFill.getAttribute('data-width');
                    
                    setTimeout(() => {
                        skillFill.style.width = width;
                    }, 500);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent);
                    const increment = target / 100;
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = `${Math.ceil(current)}+`;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = `${target}+`;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.init();
    }

    init() {
        contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupFormValidation();
    }

    setupFormValidation() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'text':
            case 'textarea':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'This field must be at least 2 characters long';
                }
                break;
        }

        if (!isValid) {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormStatus('Please correct the errors above', 'error');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Get form data
            const formData = new FormData(contactForm);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                // to_name: 'yamini', // Replace with your name
            };

            // Send email using EmailJS
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );

            // Success
            this.showFormStatus('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            
            // Clear form validation states
            inputs.forEach(input => {
                this.clearFieldError(input);
            });

        } catch (error) {
            console.error('EmailJS Error:', error);
            this.showFormStatus('Sorry, there was an error sending your message. Please try again later.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    setLoadingState(isLoading) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('i');
        
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
            submitBtn.style.opacity = '1';
        }
    }

    showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeScrollListeners();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('lazy-load');
            imageObserver.observe(img);
        });
    }

    optimizeScrollListeners() {
        // Use passive event listeners for better performance
        const passiveEvents = ['scroll', 'touchstart', 'touchmove'];
        
        passiveEvents.forEach(event => {
            document.addEventListener(event, () => {}, { passive: true });
        });
    }
}

// Error Handling
class ErrorHandler {
    static handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        
        // You can add error reporting service here
        // Example: Sentry, LogRocket, etc.
    }

    static setupGlobalErrorHandling() {
        window.addEventListener('error', (e) => {
            this.handleError(e.error, 'Global Error');
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.handleError(e.reason, 'Unhandled Promise Rejection');
        });
    }
}

// Initialize Application
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all managers
            new ThemeManager();
            new NavigationManager();
            new AnimationManager();
            new ContactFormManager();
            new PerformanceOptimizer();
            
            // Setup error handling
            ErrorHandler.setupGlobalErrorHandling();
            
            // Add loading complete class
            document.body.classList.add('loaded');
            
            console.log('🚀 Portfolio website initialized successfully!');
            
        } catch (error) {
            ErrorHandler.handleError(error, 'App Initialization');
        }
    }
}

// Start the application
new App();

// Additional utility functions for enhanced user experience
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth hover effects to cards
    const cards = document.querySelectorAll('.project-card, .skills-category, .timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
    `;
    document.head.appendChild(style);
});

// SEO and Meta Management
class SEOManager {
    static updateMetaTags(title, description) {
        document.title = title;
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = description;
    }
    
    static addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "yamini",
            "jobTitle": "Full Stack Developer",
            "description": "Experienced full-stack developer specializing in modern web technologies and blockchain development.",
            "url": window.location.origin,
            "sameAs": [
                "https://github.com/johndoe",
                "https://linkedin.com/in/johndoe",
                "https://twitter.com/johndoe"
            ]
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
}

// Initialize SEO enhancements
SEOManager.updateMetaTags(
    'yamini - Full Stack Developer',
    'Experienced full-stack developer specializing in modern web technologies. View my portfolio and get in touch for your next project.'
);
SEOManager.addStructuredData();