// ==========================================
// PROJECT FILTERING FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeProjectFilters();
    initializeHamburgerMenu();
    initializeButtonActions();
    initializeScrollAnimations();
});

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            filterCards(filterValue, projectCards);
        });
    });
}

function filterCards(filterValue, cards) {
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
            card.style.display = 'block';
            // Add animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
        }
    });
}

// ==========================================
// HAMBURGER MENU FUNCTIONALITY
// ==========================================

function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    if (!hamburger) return;

    hamburger.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        const navButtons = document.querySelector('.nav-buttons');
        
        if (navLinks) {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        }
        if (navButtons) {
            navButtons.style.display = navButtons.style.display === 'flex' ? 'none' : 'flex';
        }

        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transition = '0.3s';
        });
    });
}

// ==========================================
// BUTTON ACTION HANDLERS
// ==========================================

function initializeButtonActions() {
    // Login Button
    const loginBtn = document.querySelector('.nav-buttons .btn-secondary');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            handleLogin();
        });
    }

    // Register Button
    const registerBtn = document.querySelector('.nav-buttons .btn-primary');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            handleRegister();
        });
    }

    // Hero Section Primary Button
    const heroPrimaryBtn = document.querySelector('.hero-buttons .btn-primary');
    if (heroPrimaryBtn) {
        heroPrimaryBtn.addEventListener('click', function() {
            scrollToElement('#projects');
        });
    }

    // Hero Section Outline Button
    const heroOutlineBtn = document.querySelector('.hero-buttons .btn-outline');
    if (heroOutlineBtn) {
        heroOutlineBtn.addEventListener('click', function() {
            scrollToElement('#how-it-works');
        });
    }

    // Bid Buttons on Project Cards
    const bidButtons = document.querySelectorAll('.project-card .btn-small');
    bidButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('.project-title').textContent;
            handleBidSubmit(projectTitle);
        });
    });

    // View All Projects Button
    const viewAllBtn = document.querySelector('.view-all .btn-primary');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            scrollToElement('#projects');
        });
    }
}

// ==========================================
// EVENT HANDLERS
// ==========================================

function handleLogin() {
    console.log('Logging in...');
    // Integrate with Django login view
    window.location.href = '/accounts/login/';
}

function handleRegister() {
    console.log('Registering...');
    // Integrate with Django register view
    window.location.href = '/accounts/register/';
}

function handleBidSubmit(projectTitle) {
    showNotification(`"${projectTitle}" loyihasi uchun bid yuborish formasi...`, 'info');
    
    // Check if user is authenticated - integrate with Django
    if (!isUserAuthenticated()) {
        setTimeout(() => {
            window.location.href = '/accounts/login/';
        }, 1500);
    } else {
        // Navigate to project detail with bid form
        console.log('User authenticated. Showing bid form.');
    }
}

function isUserAuthenticated() {
    // This would check Django's authentication state
    // Can be done via checking for auth token or making API call
    return document.body.dataset.authenticated === 'true';
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#d32f2f' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initializeScrollAnimations() {
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

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe step cards
    document.querySelectorAll('.step-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ==========================================
// SMOOTH SCROLL ANIMATIONS CSS INJECTION
// ========================================== 

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// RESPONSIVE NAV MENU FUNCTIONALITY
// ==========================================

function setupResponsiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu if open
            const navLinksContainer = document.querySelector('.nav-links');
            if (window.innerWidth <= 768) {
                navLinksContainer.style.display = 'none';
            }
        });
    });
}

setupResponsiveNav();

// ==========================================
// DYNAMIC CONTENT INTEGRATION
// ========================================== 

/**
 * This function integrates with Django views
 * Update project list from API
 */
function updateProjectsList(projects) {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    projects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });

    initializeProjectFilters();
}

/**
 * Creates a project card element dynamically
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card`;
    card.setAttribute('data-category', project.category || 'web');
    
    card.innerHTML = `
        <div class="project-header">
            <span class="project-category">${project.category || 'Web Dizayn'}</span>
            <span class="project-status ${project.status === 'open' ? 'active' : ''}">${project.status === 'open' ? 'Ochiq' : 'Yopilgan'}</span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-meta">
            <span class="budget">💰 $${project.min_budget} - $${project.max_budget}</span>
            <span class="deadline">📅 ${project.deadline} kun</span>
        </div>
        <div class="project-footer">
            <div class="client-info">
                <div class="client-avatar">${getInitials(project.client_name)}</div>
                <div>
                    <p class="client-name">${project.client_name}</p>
                    <p class="client-rating">⭐ ${project.rating}</p>
                </div>
            </div>
            <button class="btn btn-small" data-project-id="${project.id}">Bid Yuborish</button>
        </div>
    `;

    // Add event listener to bid button
    card.querySelector('.btn-small').addEventListener('click', function() {
        handleBidSubmit(project.title);
    });

    return card;
}

/**
 * Get initials from a name
 */
function getInitials(name) {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

// ==========================================
// API INTEGRATION EXAMPLE
// ========================================== 

/**
 * Fetch projects from Django API
 */
async function fetchProjectsFromAPI() {
    try {
        const response = await fetch('/api/projects/');
        if (!response.ok) throw new Error('Failed to fetch projects');
        
        const projects = await response.json();
        updateProjectsList(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        showNotification('Loyihalar yuklanishida xatolik yuz berdi', 'error');
    }
}

// Uncomment to fetch projects on page load
// window.addEventListener('load', fetchProjectsFromAPI);

// ==========================================
// STATS COUNTER ANIMATION
// ========================================== 

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        let currentNumber = 0;
        const increment = finalNumber / 50;

        const interval = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                stat.textContent = finalNumber + suffix;
                clearInterval(interval);
            } else {
                stat.textContent = Math.floor(currentNumber) + suffix;
            }
        }, 40);
    });
}

// Trigger stats animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(statsSection);
}

// ==========================================
// FORM HANDLING (FOR FUTURE USE)
// ========================================== 

/**
 * Submit bid form to Django
 */
async function submitBidForm(projectId, bidData) {
    try {
        const response = await fetch(`/bids/create/${projectId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(bidData)
        });

        if (!response.ok) throw new Error('Failed to submit bid');
        
        showNotification('Bid muvaffaqiyatli yuborildi!', 'success');
        return true;
    } catch (error) {
        console.error('Error submitting bid:', error);
        showNotification('Bid yuborishda xatolik yuz berdi', 'error');
        return false;
    }
}

/**
 * Get CSRF token from cookies (Django requirement)
 */
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// ==========================================
// LOG INITIALIZATION
// ========================================== 

console.log('[FreelanceHub] Platform yuklanishi tugallandi');
console.log('[FreelanceHub] Django integratsiyasi tayyor');
