// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    initBlog();
});

// Blog data (in real app, this would come from API)
const blogPosts = [
    {
        id: 1,
        title: "Yaz Aylarında Cilt Bakımı İpuçları",
        excerpt: "Güneşin zararlı etkilerinden korunmak ve cildinizi sağlıklı tutmak için...",
        category: "cilt-bakimi",
        date: "2024-06-15",
        image: "../images/blog/summer-skincare.jpg",
        slug: "yaz-cilt-bakimi"
    },
    {
        id: 2,
        title: "Stres Yönetimi ve Wellness",
        excerpt: "Modern yaşamın stresinden kurtulmak için etkili yöntemler...",
        category: "wellness",
        date: "2024-06-10",
        image: "../images/blog/stress-management.jpg",
        slug: "stres-yonetimi"
    },
    {
        id: 3,
        title: "Doğal Cilt Bakım Maskeleri",
        excerpt: "Evde hazırlayabileceğiniz doğal maskeler ile cildinizi besleyin...",
        category: "cilt-bakimi",
        date: "2024-06-05",
        image: "../images/blog/natural-masks.jpg",
        slug: "dogal-maskeler"
    },
    {
        id: 4,
        title: "Masajın Sağlığa Faydaları",
        excerpt: "Düzenli masajın vücudunuz ve ruh haliniz üzerindeki olumlu etkileri...",
        category: "saglik",
        date: "2024-05-30",
        image: "../images/blog/massage-benefits.jpg",
        slug: "masaj-faydalari"
    },
    {
        id: 5,
        title: "Meditasyon ve İç Huzur",
        excerpt: "Günlük yaşamda meditasyonun önemi ve nasıl başlanacağı...",
        category: "wellness",
        date: "2024-05-25",
        image: "../images/blog/meditation.jpg",
        slug: "meditasyon"
    },
    {
        id: 6,
        title: "Cildinizi Yaşlandıran 5 Alışkanlık",
        excerpt: "Fark etmediğiniz bu alışkanlıklar cildinizi erken yaşlandırıyor olabilir...",
        category: "cilt-bakimi",
        date: "2024-05-20",
        image: "../images/blog/aging-habits.jpg",
        slug: "yaslandiran-aliskanliklar"
    }
];

let currentPosts = [];
let displayedPosts = 0;
const postsPerLoad = 3;

function initBlog() {
    currentPosts = [...blogPosts];
    loadBlogPosts();
    initFilters();
    initSearch();
    initLoadMore();
}

function loadBlogPosts() {
    const grid = document.getElementById('blogGrid');
    const postsToShow = currentPosts.slice(displayedPosts, displayedPosts + postsPerLoad);
    
    postsToShow.forEach(post => {
        const postElement = createBlogPostElement(post);
        grid.appendChild(postElement);
    });
    
    displayedPosts += postsToShow.length;
    
    // Hide load more button if all posts are displayed
    const loadMoreBtn = document.getElementById('loadMore');
    if (displayedPosts >= currentPosts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

function createBlogPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-post fade-in';
    article.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative">
                <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">
                <div class="absolute top-4 left-4">
                    <span class="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${getCategoryName(post.category)}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-2">
                    <i class="fas fa-calendar mr-2"></i>
                    <span>${formatDate(post.date)}</span>
                </div>
                <h3 class="text-xl font-bold text-primary mb-3 hover:text-accent transition-colors">
                    <a href="blog/${post.slug}.html">${post.title}</a>
                </h3>
                <p class="text-gray-600 mb-4">${post.excerpt}</p>
                <a href="blog/${post.slug}.html" class="inline-flex items-center text-accent font-semibold hover:text-primary transition-colors">
                    Devamını Oku
                    <i class="fas fa-arrow-right ml-2"></i>
                </a>
            </div>
        </div>
    `;
    
    return article;
}

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            const category = this.dataset.category;
            filterPosts(category);
        });
    });
}

function filterPosts(category) {
    if (category === 'all') {
        currentPosts = [...blogPosts];
    } else {
        currentPosts = blogPosts.filter(post => post.category === category);
    }
    
    // Reset and reload
    displayedPosts = 0;
    document.getElementById('blogGrid').innerHTML = '';
    loadBlogPosts();
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            searchPosts(query);
        }, 300);
    });
}

function searchPosts(query) {
    if (query === '') {
        currentPosts = [...blogPosts];
    } else {
        currentPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query)
        );
    }
    
    // Reset and reload
    displayedPosts = 0;
    document.getElementById('blogGrid').innerHTML = '';
    loadBlogPosts();
}

function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMore');
    loadMoreBtn.addEventListener('click', loadBlogPosts);
}

function getCategoryName(category) {
    const categories = {
        'cilt-bakimi': 'Cilt Bakımı',
        'wellness': 'Wellness',
        'saglik': 'Sağlık'
    };
    return categories[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Add CSS for filter buttons
const style = document.createElement('style');
style.textContent = `
    .filter-btn {
        padding: 0.5rem 1rem;
        border: 2px solid var(--accent);
        background: transparent;
        color: var(--accent);
        border-radius: 1.5rem;
        font-weight: 600;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: var(--accent);
        color: white;
    }
    
    .blog-post {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
