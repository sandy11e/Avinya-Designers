// ==========================================
// AVINYA DESIGNERS - MAIN JAVASCRIPT
// Minimal Luxury Fashion Design
// ==========================================

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const hamburger = document.querySelector('.nav-hamburger');
const navMenu = document.querySelector('.nav-links');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('nav-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('nav-open');
        }
    });
}

// ==========================================
// SMOOTH SCROLLING FOR NAV LINKS
// ==========================================

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

// ==========================================
// CONTACT FORM HANDLING WITH SEND-METHOD PROMPT
// ==========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const phone = this.querySelector('#phone').value.trim();
        const category = this.querySelector('#category').value;
        const deadline = this.querySelector('#deadline').value;
        const budget = this.querySelector('#budget').value;
        const message = this.querySelector('#message').value.trim();

        if (!name || !email || !phone || !category || !message) {
            showNotification('Please fill out all required fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        const composed = [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Category: ${category}`,
            deadline ? `Required By: ${deadline}` : null,
            budget ? `Budget: ${budget}` : null,
            '',
            `Message:`,
            message,
        ].filter(Boolean).join('\n');

        const waUrl = `https://wa.me/918675337366?text=${encodeURIComponent(`Hello, I am ${name}.\n\n${composed}`)}`;
        window.location.href = waUrl;
    });
}

// ==========================================
// EMAIL VALIDATION
// ==========================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ==========================================
// ADD CSS ANIMATIONS
// ==========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// SCROLL ANIMATIONS - REVEAL ELEMENTS ON SCROLL
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to all cards and items
document.querySelectorAll('.spec-card, .service-card, .portfolio-item, .testimonial-card, .audience-card, .info-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// ==========================================
// NAVBAR BACKGROUND ON SCROLL
// ==========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #E8897E;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navStyle);

// ==========================================
// LAZY LOADING FOR IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// PORTFOLIO LIGHTBOX (OPTIONAL ENHANCEMENT)
// ==========================================

const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const info = this.querySelector('.portfolio-info');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.9);
            z-index: 9999;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const lightboxContent = document.createElement('div');
        lightboxContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90vh;
        `;
        
        const lightboxImage = document.createElement('img');
        lightboxImage.src = img.src;
        lightboxImage.style.cssText = `
            max-width: 100%;
            max-height: 85vh;
            border-radius: 10px;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 3rem;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.color = '#E8897E';
        });
        
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.color = 'white';
        });
        
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
        });
        
        lightboxContent.appendChild(lightboxImage);
        lightboxContent.appendChild(closeBtn);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);
        
        // Close lightbox when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
            }
        });
        
        // Close lightbox on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.querySelector('.lightbox')) {
                document.querySelector('.lightbox').remove();
            }
        });
    });
});

// ==========================================
// COUNTER ANIMATION (OPTIONAL)
// ==========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ==========================================
// WHATSAPP INTEGRATION HELPER
// ==========================================

function openWhatsApp() {
    const phoneNumber = '918675337366';
    const message = 'Hello! I\'d like to know more about your design services.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ==========================================
// INITIALIZE ON DOM LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Avinya Designers Website Loaded Successfully');
    
    // Add any initialization code here
    // Example: Load analytics, check if user is returning, etc.
    // Inject a global floating WhatsApp button on every page
    if (!document.querySelector('.floating-whatsapp')) {
        const wrap = document.createElement('div');
        wrap.className = 'floating-whatsapp';
        const a = document.createElement('a');
        a.href = 'https://wa.me/918675337366';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.title = 'Chat on WhatsApp';
        a.innerHTML = '<i class="fab fa-whatsapp"></i>';
        wrap.appendChild(a);
        document.body.appendChild(wrap);
    }
});

// ==========================================
// SERVICE WORKER FOR PWA (OPTIONAL)
// ==========================================

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
        // Service worker registration failed, app will still work normally
        console.log('Service Worker registration failed:', err);
    });
}

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

window.addEventListener('load', function() {
    // Log page load time
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page Load Time:', pageLoadTime + 'ms');
});
