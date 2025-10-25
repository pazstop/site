// Analytics Tracker using CountAPI by Miles Hilliard (Free, No Registration)

const Analytics = {
    // CountAPI configuration
    API_BASE: 'https://countapi.mileshilliard.com/api/v1',
    VISITORS_KEY: 'letstop-paz-visitors',
    AUDIO_KEY: 'letstop-paz-audio',

    // Initialize counters
    init: function() {
        // Track page visit automatically
        this.trackVisit();
    },

    // Track site visit (unique visitors only)
    trackVisit: function() {
        // Check if this visitor has already been counted
        const visitorTracked = localStorage.getItem('paz-visitor-tracked');

        if (visitorTracked) {
            console.log('Visitor already tracked (unique visitor)');
            return; // Don't count again
        }

        // This is a new unique visitor - track them
        const url = `${this.API_BASE}/hit/${this.VISITORS_KEY}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('New unique visitor tracked:', data.value);
                // Mark this visitor as tracked
                localStorage.setItem('paz-visitor-tracked', 'true');
            })
            .catch(error => {
                console.error('Error tracking visit:', error);
            });
    },

    // Track audio play
    trackAudioPlay: function() {
        const url = `${this.API_BASE}/hit/${this.AUDIO_KEY}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Audio play tracked:', data.value);
            })
            .catch(error => {
                console.error('Error tracking audio play:', error);
            });
    },

    // Get current stats
    getStats: async function() {
        try {
            const visitorsUrl = `${this.API_BASE}/get/${this.VISITORS_KEY}`;
            const audioUrl = `${this.API_BASE}/get/${this.AUDIO_KEY}`;

            const [visitorsResponse, audioResponse] = await Promise.all([
                fetch(visitorsUrl),
                fetch(audioUrl)
            ]);

            const visitorsData = await visitorsResponse.json();
            const audioData = await audioResponse.json();

            return {
                siteVisitors: visitorsData.value || 0,
                audioPlays: audioData.value || 0
            };
        } catch (error) {
            console.error('Error fetching stats:', error);
            return {
                siteVisitors: 0,
                audioPlays: 0
            };
        }
    },

    // Reset all counters (admin function)
    resetStats: async function() {
        try {
            // CountAPI doesn't support reset via API
            // You would need to use a different key or manually reset via their website
            console.warn('Reset functionality requires creating new counter keys');
            alert('לאיפוס המונים, צור קשר עם מפתח האתר');
        } catch (error) {
            console.error('Error resetting stats:', error);
        }
    }
};

// Auto-initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        Analytics.init();
    });
} else {
    Analytics.init();
}
