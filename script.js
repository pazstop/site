// Enhanced Media Player Functionality
document.addEventListener('DOMContentLoaded', function() {

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);

    // Audio player enhancements
    const audioElements = document.querySelectorAll('audio');

    audioElements.forEach((audio, index) => {
        // Pause other audio when one plays
        audio.addEventListener('play', function() {
            audioElements.forEach((otherAudio, otherIndex) => {
                if (otherIndex !== index && !otherAudio.paused) {
                    otherAudio.pause();
                }
            });
        });

        // Add visual feedback on play
        audio.addEventListener('play', function() {
            this.parentElement.style.borderRight = '4px solid var(--accent-gold)';
            this.parentElement.style.backgroundColor = '#2a2a2a';
        });

        audio.addEventListener('pause', function() {
            this.parentElement.style.borderRight = 'none';
            this.parentElement.style.backgroundColor = 'var(--bg-accent)';
        });

        audio.addEventListener('ended', function() {
            this.parentElement.style.borderRight = 'none';
            this.parentElement.style.backgroundColor = 'var(--bg-accent)';
        });
    });

    // Video player enhancement
    const videoElement = document.querySelector('video');
    if (videoElement) {
        // Pause audio when video plays
        videoElement.addEventListener('play', function() {
            audioElements.forEach(audio => {
                if (!audio.paused) {
                    audio.pause();
                }
            });
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in';
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Smooth scroll for internal links
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

    // Add entrance animation to sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Track media engagement (optional analytics placeholder)
    function trackMediaEngagement(type, action) {
        console.log(`Media engagement: ${type} - ${action}`);
        // Add your analytics code here if needed
        // Example: gtag('event', action, { 'event_category': type });
    }

    audioElements.forEach((audio, index) => {
        audio.addEventListener('play', () => trackMediaEngagement('audio', `play_audio_${index + 1}`));
    });

    if (videoElement) {
        videoElement.addEventListener('play', () => trackMediaEngagement('video', 'play_video'));
    }

    // Add dynamic timestamp to footer
    const timestampElement = document.querySelector('.timestamp');
    if (timestampElement) {
        const now = new Date();
        const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
        const hebrewDate = `${months[now.getMonth()]} ${now.getFullYear()}`;
        timestampElement.textContent = `עודכן לאחרונה: ${hebrewDate}`;
    }

    // Mobile detection and optimization
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Add mobile-specific optimizations
        document.body.classList.add('mobile-device');

        // Optimize video loading on mobile
        if (videoElement) {
            videoElement.preload = 'metadata';
        }

        // Optimize audio loading on mobile
        audioElements.forEach(audio => {
            audio.preload = 'metadata';
        });
    }

    // Performance: Preload critical media
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = heroImage.src;
        document.head.appendChild(preloadLink);
    }

    // Error handling for media files
    audioElements.forEach((audio, index) => {
        audio.addEventListener('error', function() {
            console.error(`Error loading audio ${index + 1}`);
            this.parentElement.innerHTML = `
                <div class="audio-label">הקלטה ${index + 1}</div>
                <p style="color: var(--accent-red); padding: 10px;">שגיאה בטעינת הקובץ</p>
            `;
        });
    });

    if (videoElement) {
        videoElement.addEventListener('error', function() {
            console.error('Error loading video');
            this.parentElement.innerHTML = '<p style="color: var(--accent-red); text-align: center;">שגיאה בטעינת הסרטון</p>';
        });
    }

    console.log('🚨 אתר חשיפה טעון בהצלחה');
});
