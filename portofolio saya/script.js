// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initSmoothScroll();
    initMediaTabs();
    initContactForm();
    initFeedbackForm();
    initCurrentYear();
    initAnimations();
    initVideoModal();
});

// Navigation Functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle hamburger animation
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}


// Media Tabs
function initMediaTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Harap lengkapi semua field!', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Pesan berhasil dikirim! Saya akan membalas segera.', 'success');
            
            // Reset form
            contactForm.reset();
        }, 2000);
    });
}

// Feedback Form
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (!feedbackForm) return;
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!data.name || !data.email || !data.category || !data.feedback) {
            showNotification('Harap lengkapi semua field yang wajib!', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Terima kasih atas saran dan kritik Anda!', 'success');
            
            // Reset form
            feedbackForm.reset();
        }, 2000);
    });
}

// Current Year in Footer
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Animations on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-level')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                        entry.target.style.transition = 'width 1.5s ease-in-out';
                    }, 300);
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.section-title, .section-subtitle, .project-card, .photo-item, .video-item, .profile-card'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Video Modal
function initVideoModal() {
    const playButtons = document.querySelectorAll('.play-btn');
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <div class="video-container">
                <iframe width="560" height="315" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add styles for modal
    const modalStyles = document.createElement('style');       
    document.head.appendChild(modalStyles);
    
    // Handle play button clicks
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoItem = this.closest('.video-item');
            const thumbnail = videoItem.querySelector('img');
            const videoId = this.closest('.video-item').querySelector('img').src.includes('youtube') 
                ? thumbnail.src.split('/')[4].split('?')[0] 
                : 'dQw4w9WgXcQ'; // Fallback video
            
            const iframe = modal.querySelector('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modal.querySelector('iframe').src = '';
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            modal.querySelector('iframe').src = '';
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification
    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('style');
        styles.className = 'notification-styles';
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Video Player Functionality
function initVideoPlayers() {
    const videoPlayers = document.querySelectorAll('.video-player');
    
    videoPlayers.forEach((player, index) => {
        const video = player.querySelector('video');
        const playPauseBtn = player.querySelector('.play-pause-btn');
        const progressBar = player.querySelector('.progress-bar');
        const progress = player.querySelector('.progress');
        const currentTimeEl = player.querySelector('.current-time');
        const durationEl = player.querySelector('.duration');
        const videoControls = player.querySelector('.video-controls');
        
        // Format waktu
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        // Update progress bar
        function updateProgress() {
            if (!video.duration) return;
            const progressPercent = (video.currentTime / video.duration) * 100;
            progress.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(video.currentTime);
        }
        
        // Set duration ketika video dimuat
        function setDuration() {
            if (video.duration) {
                durationEl.textContent = formatTime(video.duration);
            }
        }
        
        // Toggle play/pause
        function togglePlayPause() {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                player.classList.add('playing');
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                player.classList.remove('playing');
            }
        }
        
        // Skip ke posisi tertentu
        function skipToPosition(e) {
            if (!video.duration) return;
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        }
        
        // Event Listeners
        video.addEventListener('loadedmetadata', setDuration);
        video.addEventListener('timeupdate', updateProgress);
        
        // Play/Pause button
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlayPause();
        });
        
        // Klik video untuk play/pause
        video.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlayPause();
        });
        
        // Klik progress bar untuk skip
        progressBar.addEventListener('click', (e) => {
            e.stopPropagation();
            skipToPosition(e);
        });
        
        // Show controls on hover
        player.addEventListener('mouseenter', () => {
            if (!player.classList.contains('playing')) {
                videoControls.style.opacity = '1';
                videoControls.style.transform = 'translateY(0)';
            }
        });
        
        player.addEventListener('mouseleave', () => {
            if (!player.classList.contains('playing')) {
                videoControls.style.opacity = '0';
                videoControls.style.transform = 'translateY(100%)';
            }
        });
        
        // Keep controls visible when playing
        video.addEventListener('play', () => {
            player.classList.add('playing');
            videoControls.style.opacity = '1';
            videoControls.style.transform = 'translateY(0)';
        });
        
        video.addEventListener('pause', () => {
            player.classList.remove('playing');
        });
        
        // Loading state
        video.addEventListener('waiting', () => {
            player.classList.add('loading');
        });
        
        video.addEventListener('canplay', () => {
            player.classList.remove('loading');
        });
        
        // Initialize
        setDuration();
        updateProgress();
    });
    
    // Stop semua video ketika berpindah tab
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            stopAllVideos();
        });
    });
}

// Fungsi untuk menghentikan semua video
function stopAllVideos() {
    const videos = document.querySelectorAll('.video-player video');
    const playButtons = document.querySelectorAll('.play-pause-btn');
    
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    playButtons.forEach(button => {
        button.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // Hapus class playing
    const players = document.querySelectorAll('.video-player');
    players.forEach(player => {
        player.classList.remove('playing');
    });
}

// Panggil fungsi di DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... kode lainnya ...
    initVideoPlayers();
});
// Add animation styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize when page loads
window.addEventListener('load', function() {
    // Add loaded class to body for transitions
    document.body.classList.add('loaded');
    
    // Animate skill bars on page load
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1.5s ease-in-out';
        }, 500);
    });
});
