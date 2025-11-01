// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAdmin();
});

function initAdmin() {
    initNavigation();
    loadBlogPosts();
    loadGalleryItems();
    initForms();
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show section
            const section = this.dataset.section;
            showSection(section);
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'blog': 'Blog Yönetimi',
        'gallery': 'Galeri Yönetimi',
        'appointments': 'Randevular',
        'settings': 'Ayarlar'
    };
    
    document.getElementById('page-title').textContent = titles[sectionName] || 'Admin Panel';
}

// Blog Management
let blogPosts = [
    {
        id: 1,
        title: "Kış Aylarında Cilt Bakımının Önemi",
        category: "cilt-bakimi",
        excerpt: "Soğuk hava ve düşük nem oranı cildinizi nasıl etkiler?",
        date: "2024-12-15",
        status: "published",
        image: "../images/blog/winter-skincare.jpg"
    },
    {
        id: 2,
        title: "Yaz Aylarında Cilt Bakımı İpuçları",
        category: "cilt-bakimi",
        excerpt: "Güneşin zararlı etkilerinden korunmak için...",
        date: "2024-06-15",
        status: "published",
        image: "../images/blog/summer-skincare.jpg"
    }
];

function loadBlogPosts() {
    const tbody = document.getElementById('blog-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    blogPosts.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <img src="${post.image}" alt="${post.title}" class="w-10 h-10 rounded object-cover mr-3">
                    <span class="font-medium">${post.title}</span>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 bg-accent text-white rounded text-sm">
                    ${getCategoryName(post.category)}
                </span>
            </td>
            <td class="px-6 py-4 text-gray-500">${formatDate(post.date)}</td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    ${post.status === 'published' ? 'Yayında' : 'Taslak'}
                </span>
            </td>
            <td class="px-6 py-4">
                <div class="flex space-x-2">
                    <button onclick="editBlogPost(${post.id})" class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteBlogPost(${post.id})" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showBlogForm() {
    document.getElementById('blog-modal').classList.remove('hidden');
    document.getElementById('blog-modal').classList.add('flex');
}

function closeBlogForm() {
    document.getElementById('blog-modal').classList.add('hidden');
    document.getElementById('blog-modal').classList.remove('flex');
    document.getElementById('blog-form').reset();
}

function editBlogPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (post) {
        const form = document.getElementById('blog-form');
        form.title.value = post.title;
        form.category.value = post.category;
        form.excerpt.value = post.excerpt;
        showBlogForm();
    }
}

function deleteBlogPost(id) {
    if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
        blogPosts = blogPosts.filter(p => p.id !== id);
        loadBlogPosts();
        showNotification('Blog yazısı silindi', 'success');
    }
}

// Gallery Management
let galleryItems = [
    {
        id: 1,
        title: "Resepsiyon Alanı",
        category: "tesis",
        image: "../images/gallery/tesis-1.jpg"
    },
    {
        id: 2,
        title: "Spa Odası",
        category: "tesis",
        image: "../images/gallery/tesis-2.jpg"
    },
    {
        id: 3,
        title: "Cilt Bakımı",
        category: "hizmetler",
        image: "../images/gallery/service-1.jpg"
    }
];

function loadGalleryItems() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    galleryItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'relative group cursor-pointer';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="w-full h-32 object-cover rounded-lg">
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div class="text-white text-center">
                    <p class="font-semibold">${item.title}</p>
                    <div class="flex space-x-2 mt-2">
                        <button onclick="editGalleryItem(${item.id})" class="text-blue-400 hover:text-blue-300">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteGalleryItem(${item.id})" class="text-red-400 hover:text-red-300">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(div);
    });
}

function showGalleryForm() {
    // Gallery form implementation
    showNotification('Galeri formu açılacak', 'info');
}

function editGalleryItem(id) {
    showNotification('Galeri öğesi düzenlenecek', 'info');
}

function deleteGalleryItem(id) {
    if (confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) {
        galleryItems = galleryItems.filter(item => item.id !== id);
        loadGalleryItems();
        showNotification('Fotoğraf silindi', 'success');
    }
}

// Form handling
function initForms() {
    const blogForm = document.getElementById('blog-form');
    if (blogForm) {
        blogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const newPost = {
                id: Date.now(),
                title: formData.get('title'),
                category: formData.get('category'),
                excerpt: formData.get('excerpt'),
                content: formData.get('content'),
                date: new Date().toISOString().split('T')[0],
                status: 'published',
                image: '../images/blog/default.jpg'
            };
            
            blogPosts.unshift(newPost);
            loadBlogPosts();
            closeBlogForm();
            showNotification('Blog yazısı kaydedildi', 'success');
        });
    }
}

// Utility functions
function getCategoryName(category) {
    const categories = {
        'cilt-bakimi': 'Cilt Bakımı',
        'wellness': 'Wellness',
        'saglik': 'Sağlık',
        'tesis': 'Tesis',
        'hizmetler': 'Hizmetler'
    };
    return categories[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add admin-specific styles
const adminStyles = `
    .admin-nav-link {
        display: block;
        padding: 0.75rem 1rem;
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
    }
    
    .admin-nav-link:hover,
    .admin-nav-link.active {
        background: rgba(217, 179, 106, 0.2);
        color: var(--accent);
    }
    
    .admin-section {
        min-height: calc(100vh - 120px);
    }
`;

const style = document.createElement('style');
style.textContent = adminStyles;
document.head.appendChild(style);
