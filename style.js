// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Tab Functionality
function setupTabs(containerClass, buttonClass, contentClass) {
    const tabContainers = document.querySelectorAll(`.${containerClass}`);
    
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll(`.${buttonClass}`);
        const tabContents = container.querySelectorAll(`.${contentClass}`);
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                tabContents[index].class.add('active');
            });
        });
    });
}

// Initialize tabs
setupTabs('top-games-tabs', 'tab-btn', 'tab-content');
setupTabs('community-highlights', 'highlight-btn', 'highlight-content');

// Review Filter Functionality
const genreFilter = document.getElementById('genre-filter');
const platformFilter = document.getElementById('platform-filter');
const ratingFilter = document.getElementById('rating-filter');
const reviewCards = document.querySelectorAll('.review-card');

function filterReviews() {
    const genreValue = genreFilter.value;
    const platformValue = platformFilter.value;
    const ratingValue = ratingFilter.value;
    
    reviewCards.forEach(card => {
        const cardGenre = card.dataset.genre;
        const cardPlatform = card.dataset.platform;
        const cardRating = parseFloat(card.dataset.rating);
        
        const genreMatch = genreValue === 'all' || cardGenre === genreValue;
        const platformMatch = platformValue === 'all' || cardPlatform === platformValue;
        const ratingMatch = ratingValue === 'all' || cardRating >= parseFloat(ratingValue);
        
        if (genreMatch && platformMatch && ratingMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add event listeners to filters
genreFilter.addEventListener('change', filterReviews);
platformFilter.addEventListener('change', filterReviews);
ratingFilter.addEventListener('change', filterReviews);

// Hero Video Fallback
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
    heroVideo.addEventListener('error', () => {
        heroVideo.style.display = 'none';
        const fallbackImage = document.createElement('div');
        fallbackImage.className = 'hero-fallback';
        heroVideo.parentNode.insertBefore(fallbackImage, heroVideo);
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Simple validation
        if (email && email.includes('@')) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dark/Light Mode Toggle (Bonus Feature)
const modeToggle = document.createElement('div');
modeToggle.className = 'mode-toggle';
modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(modeToggle);

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Add dark mode styles
const style = document.createElement('style');
style.textContent = `
    .dark-mode {
        --primary-color: #1a1a2e;
        --secondary-color: #4cc9f0;
        --accent-color: #f72585;
        --light-color: #16213e;
        --dark-color: #0f0f1a;
        --text-color: #e2e2e2;
        --text-light: #a1a1a1;
        background-color: var(--dark-color);
    }
    
    .dark-mode .game-card,
    .dark-mode .review-card,
    .dark-mode .news-card,
    .dark-mode .feature-card,
    .dark-mode .community-post,
    .dark-mode .filter-section {
        background-color: var(--light-color);
        color: var(--text-color);
    }
    
    .dark-mode .rating span,
    .dark-mode .game-info h3 {
        color: var(--text-color);
    }
    
    .mode-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 100;
    }
`;
document.head.appendChild(style);