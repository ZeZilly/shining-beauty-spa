// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initLightbox();
    initBeforeAfter();
});

let currentImageIndex = 0;
let galleryImages = [];

function initGallery() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Show all items initially
    showGalleryItems('all');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filter = this.dataset.filter;
            showGalleryItems(filter);
        });
    });
    
    // Collect all images for lightbox navigation
    galleryImages = Array.from(document.querySelectorAll('.gallery-image')).map(img => img.src);
}

function showGalleryItems(filter) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach((item, index) => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        } else {
            item.classList.remove('show');
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    // Open lightbox for images
    document.querySelectorAll('.gallery-image').forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index;
            showInLightbox(this.src, 'image');
        });
    });
    
    // Open lightbox for videos
    document.querySelectorAll('.video-play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const video = this.parentElement.querySelector('.gallery-video source');
            if (video) {
                showInLightbox(video.src, 'video');
            }
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation
    prevBtn.addEventListener('click', showPrevious);
    nextBtn.addEventListener('click', showNext);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevious();
                    break;
                case 'ArrowRight':
                    showNext();
                    break;
            }
        }
    });
    
    function showInLightbox(src, type) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (type === 'image') {
            lightboxImage.src = src;
            lightboxImage.style.display = 'block';
            lightboxVideo.style.display = 'none';
        } else if (type === 'video') {
            lightboxVideo.querySelector('source').src = src;
            lightboxVideo.load();
            lightboxVideo.style.display = 'block';
            lightboxImage.style.display = 'none';
        }
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxVideo.pause();
    }
    
    function showPrevious() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showInLightbox(galleryImages[currentImageIndex], 'image');
    }
    
    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showInLightbox(galleryImages[currentImageIndex], 'image');
    }
}

function initBeforeAfter() {
    const beforeAfterCards = document.querySelectorAll('.before-after');
    
    beforeAfterCards.forEach(card => {
        const slider = card.querySelector('.before-after-slider');
        const afterImage = card.querySelector('.after-image');
        let isDragging = false;
        
        if (!slider || !afterImage) return;
        
        function updateSlider(e) {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            slider.style.left = percentage + '%';
            afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
        }
        
        // Mouse events
        slider.addEventListener('mousedown', function(e) {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                updateSlider(e);
            }
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        // Touch events
        slider.addEventListener('touchstart', function(e) {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', function(e) {
            if (isDragging) {
                updateSlider(e);
                e.preventDefault();
            }
        });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
        
        // Click to move slider
        card.addEventListener('click', function(e) {
            if (!isDragging) {
                updateSlider(e);
            }
        });
    });
}

// Instagram feed integration (placeholder)
function loadInstagramFeed() {
    // This would integrate with Instagram API in a real application
    const instagramPosts = document.querySelectorAll('.instagram-post');
    
    instagramPosts.forEach(post => {
        post.addEventListener('click', function() {
            // Open Instagram post in new tab
            window.open('https://www.instagram.com/shining.beauty.wellness', '_blank');
        });
    });
}

// Initialize Instagram feed
document.addEventListener('DOMContentLoaded', loadInstagramFeed);
