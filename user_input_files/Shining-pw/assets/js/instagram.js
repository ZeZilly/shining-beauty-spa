// Instagram Feed Integration
class InstagramFeed {
    constructor() {
        this.accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN'; // Instagram Basic Display API token
        this.userId = 'YOUR_USER_ID';
        this.apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${this.accessToken}`;
    }

    async loadFeed(containerId, limit = 6) {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            
            if (data.data) {
                this.renderFeed(data.data.slice(0, limit), containerId);
            } else {
                this.renderPlaceholder(containerId);
            }
        } catch (error) {
            console.error('Instagram feed error:', error);
            this.renderPlaceholder(containerId);
        }
    }

    renderFeed(posts, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = posts.map(post => `
            <div class="instagram-post relative group cursor-pointer overflow-hidden rounded-lg">
                <img src="${post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}" 
                     alt="${post.caption ? post.caption.substring(0, 50) + '...' : 'Instagram post'}" 
                     class="w-full h-32 object-cover">
                <div class="instagram-overlay absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i class="fab fa-instagram text-2xl text-white"></i>
                </div>
                <a href="${post.permalink}" target="_blank" class="absolute inset-0"></a>
            </div>
        `).join('');
    }

    renderPlaceholder(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Placeholder posts with sample images
        const placeholderPosts = [
            { image: '../reel2.png', link: 'https://www.instagram.com/shining.beauty.wellness' },
            { image: '../reel3.png', link: 'https://www.instagram.com/shining.beauty.wellness' },
            { image: '../shining logo.png', link: 'https://www.instagram.com/shining.beauty.wellness' },
            { image: '../reel2.png', link: 'https://www.instagram.com/shining.beauty.wellness' },
            { image: '../reel3.png', link: 'https://www.instagram.com/shining.beauty.wellness' },
            { image: '../shining logo.png', link: 'https://www.instagram.com/shining.beauty.wellness' }
        ];

        container.innerHTML = placeholderPosts.map(post => `
            <div class="instagram-post relative group cursor-pointer overflow-hidden rounded-lg">
                <img src="${post.image}" alt="Instagram Post" class="w-full h-32 object-cover">
                <div class="instagram-overlay absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i class="fab fa-instagram text-2xl text-white"></i>
                </div>
                <a href="${post.link}" target="_blank" class="absolute inset-0"></a>
            </div>
        `).join('');
    }

    // Method to get Instagram access token (for setup)
    static getAccessTokenInstructions() {
        return `
        Instagram Basic Display API Setup:
        1. Go to https://developers.facebook.com/
        2. Create a new app
        3. Add Instagram Basic Display product
        4. Configure OAuth redirect URIs
        5. Get your access token
        6. Replace YOUR_INSTAGRAM_ACCESS_TOKEN in the code
        `;
    }
}

// Initialize Instagram feed
const instagramFeed = new InstagramFeed();

// Auto-load Instagram feeds when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load Instagram feed in gallery page
    if (document.getElementById('instagram-feed')) {
        instagramFeed.loadFeed('instagram-feed', 6);
    }
    
    // Load Instagram feed in main page
    if (document.getElementById('instagram-grid')) {
        instagramFeed.loadFeed('instagram-grid', 6);
    }
});

// Export for use in other files
window.instagramFeed = instagramFeed;
