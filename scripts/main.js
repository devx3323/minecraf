// Main JavaScript for CraftMiner Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set current date for news articles
    setCurrentDate();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add smooth scrolling for navigation links
    addSmoothScrolling();
    
    // Initialize image error handling
    initializeImageErrorHandling();
});

// Copy Server IP functionality
function copyServerIP() {
    const serverIP = 'play.craftminer.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        // Use Clipboard API for secure contexts
        navigator.clipboard.writeText(serverIP).then(() => {
            showCopyToast();
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(serverIP);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(serverIP);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyToast();
        } else {
            console.error('Fallback: Oops, unable to copy');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success toast
function showCopyToast() {
    const toast = document.getElementById('copyToast');
    if (toast) {
        toast.classList.add('show');
        
        // Update icon to check mark
        const icon = toast.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', 'check');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
        
        // Hide toast after 2 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            
            // Reset icon back to copy
            setTimeout(() => {
                if (icon) {
                    icon.setAttribute('data-lucide', 'copy');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            }, 300);
        }, 2000);
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.navbar-mobile-toggle i');
    
    if (mobileMenu && toggle) {
        mobileMenu.classList.toggle('active');
        
        // Toggle hamburger/close icon
        const isActive = mobileMenu.classList.contains('active');
        toggle.setAttribute('data-lucide', isActive ? 'x' : 'menu');
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Prevent body scroll when menu is open
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.mobile-link, .sidebar-link');
    
    // Close sidebar when clicking on navigation links
    if (sidebar && sidebar.classList.contains('active')) {
        navLinks.forEach(link => {
            if (link.contains(e.target)) {
                toggleMobileMenu();
            }
        });
    }
    
    // Close sidebar when clicking outside of it
    if (sidebar && sidebar.classList.contains('active')) {
        if (!sidebar.contains(e.target)) {
            toggleMobileMenu();
        }
    }
});

// Set current date for news articles
function setCurrentDate() {
    const today = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        locale: 'tr-TR'
    };
    
    const dateString = today.toLocaleDateString('tr-TR', options);
    
    // Update all date elements
    const dateElements = document.querySelectorAll('.date');
    dateElements.forEach(element => {
        if (element.textContent.includes('11 Aralık 2025')) {
            element.textContent = element.textContent.replace('11 Aralık 2025', dateString);
        }
    });
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe news cards and feature cards
    const cards = document.querySelectorAll('.news-card, .feature-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Add smooth scrolling for navigation links
function addSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#home' || href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sidebar scroll effect
window.addEventListener('scroll', function() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        if (window.scrollY > 50) {
            sidebar.style.background = 'rgba(255, 255, 255, 0.98)';
            sidebar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            sidebar.style.background = 'rgba(255, 255, 255, 0.95)';
            sidebar.style.boxShadow = 'none';
        }
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-link, .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.news-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click tracking for analytics (optional)
function trackEvent(action, category, label) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Console log for debugging
    console.log('Event tracked:', { action, category, label });
}

// Add event listeners for tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track Discord button clicks
    const discordBtn = document.querySelector('.discord-btn');
    if (discordBtn) {
        discordBtn.addEventListener('click', function() {
            trackEvent('click', 'social', 'discord');
        });
    }
    
    // Track IP copy attempts
    const copyBtns = document.querySelectorAll('.copy-btn, .sidebar-copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('copy', 'server', 'ip_address');
        });
    });
    
    // Track news article clicks
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            trackEvent('click', 'content', `news_article_${index + 1}`);
        });
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken images with placeholder
            const placeholderSvg = `
                <svg width="${this.width || 400}" height="${this.height || 200}" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#E6F0FF"/>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" opacity="0.3"/>
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0066FF" stroke-width="1"/>
                        </pattern>
                    </defs>
                    <text x="50%" y="50%" text-anchor="middle" fill="#0066FF" font-family="Arial" font-size="16" font-weight="bold">
                        CraftMiner
                    </text>
                    <text x="50%" y="65%" text-anchor="middle" fill="#6C757D" font-family="Arial" font-size="12">
                        Image Coming Soon
                    </text>
                </svg>
            `;
            this.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(placeholderSvg);
            this.alt = 'Image placeholder';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    // Copy IP with Ctrl+C when focused on copy button
    if (e.ctrlKey && e.key === 'c') {
        const copyBtns = document.querySelectorAll('.copy-btn, .sidebar-copy-btn');
        copyBtns.forEach(btn => {
            if (document.activeElement === btn) {
                e.preventDefault();
                copyServerIP();
            }
        });
    }
});

// Add loading states for buttons
function addLoadingState(button, text = 'Yükleniyor...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<span class="loading-spinner"></span> ${text}`;
    button.disabled = true;
    
    return function removeLoading() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Add CSS for loading spinner
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// News Modal Functions
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to all Read More buttons
    const readMoreBtns = document.querySelectorAll('.read-more-btn-small');
    readMoreBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const newsIndex = Array.from(document.querySelectorAll('.read-more-btn-small')).indexOf(this);
            openNewsModal(newsIndex);
        });
    });
});

function openNewsModal(newsIndex) {
    const modal = document.getElementById('newsModal');
    const newsData = getNewsData()[newsIndex];
    
    if (!newsData) return;
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = newsData.title;
    modal.querySelector('.modal-date').textContent = newsData.date;
    modal.querySelector('.modal-read-time').textContent = newsData.readTime;
    modal.querySelector('.modal-image').src = newsData.image;
    modal.querySelector('.modal-image').alt = newsData.title;
    modal.querySelector('.modal-author').textContent = newsData.author;
    modal.querySelector('.modal-content').innerHTML = newsData.content;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function getNewsData() {
    return [
        {
            title: "OTTER WEEKLY - 12/3/2025",
            date: "3 Dec 2025",
            readTime: "2 min read",
            image: "images/news-advent-calendar.png",
            author: "CraftMiner Team",
            content: `
                <div class="news-modal-content">
                    <p class="news-intro">It's December and that means Merry Mayhem is on its way sooner than you think! Let's discuss!</p>
                    
                    <div class="news-section">
                        <h3>⚠️ Weekly Topics:</h3>
                        <ul>
                            <li>Merry Mayhem Event</li>
                            <li>Community Spotlight</li>
                            <li>Server Performance Updates</li>
                            <li>Upcoming Features</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>🎄 Merry Mayhem Event</h3>
                        <p>The festive season is here! Get ready for our biggest holiday event of the year. We'll have special quests, exclusive rewards, and festive builds across the entire server. Players who participate will earn exclusive holiday-themed items and cosmetics.</p>
                        <p>We're also introducing a special Santa's Workshop where players can craft unique holiday items using rare materials. Stay tuned for more details!</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>🌟 Community Spotlight</h3>
                        <p>This week we're featuring the amazing skyblock builds from our community! From intricate pixel art to massive castle constructions, the creativity continues to amaze us. Check out the community showcase at <strong>/warp showcase</strong>.</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>⚡ Server Performance</h3>
                        <p>We've implemented several optimizations to improve server performance during peak hours. Response times have improved by 40% and lag during large events has been significantly reduced.</p>
                    </div>
                    
                    <div class="news-author">🦦 CraftMiner Team 💖</div>
                </div>
            `
        },
        {
            title: "OTTER WEEKLY - 10/18/2025",
            date: "18 Nov 2025", 
            readTime: "2 min read",
            image: "images/news-bundles.png",
            author: "CraftMiner Team",
            content: `
                <div class="news-modal-content">
                    <p class="news-intro">New bundles are here and we're excited to share what's coming in the next update!</p>
                    
                    <div class="news-section">
                        <h3>⚠️ Weekly Topics:</h3>
                        <ul>
                            <li>New Bundle Releases</li>
                            <li>Crafting System Updates</li>
                            <li>Community Events</li>
                            <li>Build of the Week</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>🎁 New Bundle Releases</h3>
                        <p>We're introducing three new themed bundles this week! Each bundle contains exclusive items, special tools, and unique cosmetics that you can't get anywhere else.</p>
                        <ul>
                            <li><strong>Explorer's Bundle</strong> - Perfect for adventure seekers with enhanced tools and navigation items</li>
                            <li><strong>Builder's Bundle</strong> - Everything a master builder needs with rare building blocks and creative tools</li>
                            <li><strong>Survival Bundle</strong> - Enhanced survival gear and rare resources for the ultimate challenge</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>🔨 Crafting System Updates</h3>
                        <p>We've revamped the crafting system to make it more intuitive and rewarding. New recipes have been added, and existing ones have been balanced for better gameplay experience.</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>🏆 Build of the Week</h3>
                        <p>Congratulations to <strong>@SkyBlockMaster</strong> for creating an incredible floating castle that perfectly showcases the potential of our building system!</p>
                    </div>
                    
                    <div class="news-author">🦦 CraftMiner Team 💖</div>
                </div>
            `
        },
        {
            title: "FORSAKEN MYTHS RELEASED!!!",
            date: "3 Nov 2025",
            readTime: "1 min read", 
            image: "images/news-forsaken-myths.png",
            author: "CraftMiner Team",
            content: `
                <div class="news-modal-content">
                    <p class="news-intro">The long-awaited Forsaken Myths update is finally here! Dive into a world of mystery and ancient magic.</p>
                    
                    <div class="news-section">
                        <h3>🗿 What's New:</h3>
                        <ul>
                            <li>New Mythical Mobs</li>
                            <li>Ancient Artifacts System</li>
                            <li>Mysterious Dungeons</li>
                            <li>Legendary Weapons</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>👹 Mythical Mobs</h3>
                        <p>Face off against fearsome creatures from ancient legends! These powerful mobs drop rare materials needed for the new artifact crafting system.</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>🏺 Ancient Artifacts</h3>
                        <p>Discover and craft powerful artifacts that grant special abilities. Each artifact tells a story of ancient civilizations and their lost knowledge.</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>⚔️ Legendary Weapons</h3>
                        <p>The update introduces a new tier of weapons with unique abilities and stunning visuals. These weapons are earned through challenging quests and dangerous expeditions.</p>
                    </div>
                    
                    <div class="news-author">🦦 CraftMiner Team 💖</div>
                </div>
            `
        },
        {
            title: "OTTER WEEKLY - 10/28/2025",
            date: "27 Oct 2025",
            readTime: "2 min read",
            image: "images/news-haunted-hallows.png", 
            author: "CraftMiner Team",
            content: `
                <div class="news-modal-content">
                    <p class="news-intro">Haunted Hallows comes to an end, but the scares continue! Here's what's happening this week.</p>
                    
                    <div class="news-section">
                        <h3>⚠️ Weekly Topics:</h3>
                        <ul>
                            <li>Haunted Hallows Conclusion</li>
                            <li>November Events Preview</li>
                            <li>Community Achievements</li>
                            <li>Server Improvements</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>🎃 Haunted Hallows Conclusion</h3>
                        <p>What an incredible event! Over 500 players participated in our haunted challenges, and the spooky builds were absolutely terrifying and amazing!</p>
                        <p>The event items will remain available for one more week, so make sure to grab any Halloween cosmetics you might have missed!</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>📅 November Events Preview</h3>
                        <p>November brings us exciting new events including a Thanksgiving celebration, a massive building competition, and our first-ever cross-server tournament!</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>⭐ Community Achievements</h3>
                        <p>This week we reached 1,000 active players! Thank you to everyone who makes this community amazing. Special shoutout to our top builders and event participants!</p>
                    </div>
                    
                    <div class="news-author">🦦 CraftMiner Team 💖</div>
                </div>
            `
        },
        {
            title: "Server Update 1",
            date: "December 7, 2025",
            readTime: "1 min read",
            image: "images/news-update-1.png",
            author: "CraftMiner Team", 
            content: `
                <div class="news-modal-content">
                    <p class="news-intro">Important server updates to improve performance and fix critical issues.</p>
                    
                    <div class="news-section">
                        <h3>🔧 What's Fixed:</h3>
                        <ul>
                            <li>Fixed chunk loading issues in end islands</li>
                            <li>Resolved inventory lag during mass crafting</li>
                            <li>Improved mob AI for better challenge balance</li>
                            <li>Fixed trading system desync issues</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>⚡ Performance Improvements</h3>
                        <p>We've optimized several core systems to reduce server load during peak hours. Players should notice faster response times and smoother gameplay.</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>🛠️ New Features</h3>
                        <p>Added quality of life improvements including better tooltips, improved quest tracking, and enhanced build protection systems.</p>
                    </div>
                    
                    <div class="news-author">🦦 CraftMiner Team 💖</div>
                </div>
            `
        },
        {
            title: "Server Update 2", 
            date: "December 6, 2025",
            readTime: "1 min read",
            image: "images/news-update-2.png",
            author: "CraftMiner Team",
            content: `
                <div class="news-modal-content">
                    <p class="news-intro">Second update this week with additional fixes and new features.</p>
                    
                    <div class="news-section">
                        <h3>🐛 Bug Fixes:</h3>
                        <ul>
                            <li>Fixed island claiming issues</li>
                            <li>Resolved teleport cooldowns</li>
                            <li>Fixed auction house search functionality</li>
                            <li>Corrected reward distribution in events</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>💡 New Features</h3>
                        <p>Introducing island statistics! Players can now view detailed stats about their island including playtime, resources gathered, and achievements unlocked.</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>🎮 Quality of Life</h3>
                        <p>Added auto-save indicators, improved chat formatting, and enhanced the settings menu for better customization options.</p>
                    </div>
                    
                    <div class="news-author">🦦 CraftMiner Team 💖</div>
                </div>
            `
        },
        {
            title: "Security Enhancements",
            date: "December 5, 2025", 
            readTime: "2 min read",
            image: "images/news-security.png",
            author: "CraftMiner Team",
            content: `
                <div class="news-modal-content">
                    <p class="news-intro">Important security updates to protect our community and ensure fair gameplay.</p>
                    
                    <div class="news-section">
                        <h3>🔒 Security Improvements:</h3>
                        <ul>
                            <li>Enhanced anti-cheat detection</li>
                            <li>Improved account verification system</li>
                            <li>Better protection against exploits</li>
                            <li>Strengthened data encryption</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>🛡️ Anti-Cheat Updates</h3>
                        <p>We've deployed advanced detection algorithms that can identify and prevent cheating more effectively while maintaining fair gameplay for legitimate players.</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>👤 Account Security</h3>
                        <p>Two-factor authentication is now available for all accounts! Enable it in your account settings to add an extra layer of security to your account.</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>🚨 Report System</h3>
                        <p>We've improved our reporting system to make it easier for players to report issues. All reports are now reviewed within 24 hours.</p>
                    </div>
                    
                    <div class="news-author">🦦 CraftMiner Team 💖</div>
                </div>
            `
        },
        {
            title: "Sugar Spree Event",
            date: "December 4, 2025",
            readTime: "1 min read",
            image: "images/news-sugar-spree.avif",
            author: "CraftMiner Team",
            content: `
                <div class="news-modal-content">
                    <p class="news-intro">Sweeten up your day with our delicious Sugar Spree event!</p>
                    
                    <div class="news-section">
                        <h3>🍭 Event Details:</h3>
                        <ul>
                            <li>Candy collection challenges</li>
                            <li>Special recipe crafting</li>
                            <li>Sweet themed builds contest</li>
                            <li>Exclusive candy rewards</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>🎯 How to Participate</h3>
                        <p>Collect candy by completing daily challenges, participating in events, and trading with other players. Use candy to craft exclusive sweet-themed items and cosmetics!</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>🏆 Contest Highlights</h3>
                        <p>Build the most creative sweet-themed structure for a chance to win 50 Rare Keys and a special "Master Baker" title!</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>⏰ Event Duration</h3>
                        <p>The Sugar Spree runs for one week. Don't miss out on these sweet rewards!</p>
                    </div>
                    
                    <div class="news-author">🦦 CraftMiner Team 💖</div>
                </div>
            `
        },
        {
            title: "Skyblock Tournament",
            date: "December 3, 2025",
            readTime: "1 min read", 
            image: "images/news-tournament.avif",
            author: "CraftMiner Team",
            content: `
                <div class="news-modal-content">
                    <p class="news-intro">Compete in our biggest tournament yet! Show off your skyblock skills against the best players.</p>
                    
                    <div class="news-section">
                        <h3>🏆 Tournament Details:</h3>
                        <ul>
                            <li>Solo and team competitions</li>
                            <li>Multiple skill categories</li>
                            <li>Massive prize pool</li>
                            <li>Live streaming matches</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>🎮 Competition Format</h3>
                        <p>Players will compete in various categories including building speed, resource efficiency, and creative design. Each category offers unique challenges and rewards!</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>💰 Prizes</h3>
                        <p>Over 500 Rare Keys, exclusive titles, and special cosmetic items await the winners. The grand prize winner gets a custom island design and 100 Legendary Keys!</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>📺 Live Coverage</h3>
                        <p>Top matches will be streamed live on our Discord with commentary and analysis. Join us to watch the best players compete!</p>
                    </div>
                    
                    <div class="news-author">🦦 CraftMiner Team 💖</div>
                </div>
            `
        },
        {
            title: "WEEKLY OTTER NEWS - 8/7/2025",
            date: "6 Aug 2025",
            readTime: "2 min read",
            image: "images/news-tournament.avif", 
            author: "CraftMiner Team",
            content: `
                <div class="news-modal-content">
                    <p class="news-intro">Another exciting week at CraftMiner with amazing community builds and upcoming events!</p>
                    
                    <div class="news-section">
                        <h3>⚠️ Weekly Topics:</h3>
                        <ul>
                            <li>Community Build Showcase</li>
                            <li>New Island Features</li>
                            <li>Weekly Events Recap</li>
                            <li>Coming Soon</li>
                        </ul>
                    </div>
                    
                    <div class="news-section">
                        <h3>🏗️ Community Build Showcase</h3>
                        <p>This week's featured build comes from <strong>@IslandArchitect</strong> - an incredible floating city that perfectly demonstrates the creativity of our community! Check it out at <strong>/warp showcase</strong>.</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>🏝️ New Island Features</h3>
                        <p>We've added new interactive elements to island builds including automated farms, resource collectors, and decorative items that bring your island to life!</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>📈 Server Statistics</h3>
                        <p>This week we saw record engagement with over 2,000 unique players and 15,000 hours of gameplay. Thank you for making this community amazing!</p>
                    </div>
                    
                    <div class="news-section">
                        <h3>🔮 Coming Soon</h3>
                        <p>Next week brings a major update with new building materials, enhanced crafting recipes, and our first-ever guild system. Stay tuned for more details!</p>
                    </div>
                    
                    <div class="news-author">🦦 CraftMiner Team 💖</div>
                </div>
            `
        }
    ];
}

// Staff page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only run staff page functionality if we're on the staff page
    if (window.location.pathname.includes('staff.html') || document.querySelector('.staff-page-content')) {
        initializeStaffPage();
    }
});

function initializeStaffPage() {
    // Rank filter functionality
    const rankFilters = document.querySelectorAll('.rank-filter-btn');
    const staffCards = document.querySelectorAll('.staff-card');
    
    if (rankFilters.length === 0 || staffCards.length === 0) return;
    
    rankFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            rankFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const selectedRank = this.getAttribute('data-rank');
            
            // Show/hide staff cards based on selected rank
            staffCards.forEach(card => {
                const cardRank = card.getAttribute('data-rank');
                
                if (cardRank === selectedRank) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
    
    // Add loading animation to staff cards
    staffCards.forEach((card, index) => {
        // Only show owner cards initially
        if (card.getAttribute('data-rank') === 'owner') {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'all 0.5s ease';
            }, index * 100);
        } else {
            card.style.display = 'none';
        }
    });
});

// Image error handling for better user experience
function initializeImageErrorHandling() {
    // Add error handlers to all images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add fallback for loading errors
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            
            // Create fallback placeholder
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #292320 0%, #3a3a3a 50%, #292320 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 12px;
                text-align: center;
                border-radius: inherit;
            `;
            
            // Try to determine content type from src
            if (this.src.includes('news-')) {
                fallback.innerHTML = '📰 Resim Yüklenemedi';
            } else if (this.src.includes('staff-')) {
                fallback.innerHTML = '👤 Avatar Yüklenemedi';
            } else if (this.src.includes('logo')) {
                fallback.innerHTML = '🎨 Logo Yüklenemedi';
            } else {
                fallback.innerHTML = '🖼️ Resim Yüklenemedi';
            }
            
            // Replace image with fallback
            if (this.parentNode) {
                this.parentNode.replaceChild(fallback, this);
            }
        });
        
        // Add loading event for better UX
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Force load if not already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}