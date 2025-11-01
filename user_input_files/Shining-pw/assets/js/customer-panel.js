// Customer Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initCustomerPanel();
});

// Sample customer data (would come from API in real app)
const customerData = {
    id: 'CUST001',
    name: 'Ayşe Yılmaz',
    phone: '+90 532 123 45 67',
    email: 'ayse@example.com',
    birthdate: '1990-05-15',
    memberSince: '2023-03-15',
    loyaltyPoints: 1250,
    tier: 'gold',
    appointments: [
        {
            id: 'APP001',
            service: 'Hydrafacial',
            staff: 'Ayşe Yılmaz',
            date: '2024-12-20',
            time: '14:00',
            duration: 90,
            price: 800,
            status: 'upcoming'
        },
        {
            id: 'APP002',
            service: 'İsveç Masajı',
            staff: 'Mehmet Kaya',
            date: '2024-12-15',
            time: '16:00',
            duration: 60,
            price: 400,
            status: 'completed',
            rating: 5
        },
        {
            id: 'APP003',
            service: 'Klasik Cilt Bakımı',
            staff: 'Zeynep Demir',
            date: '2024-11-28',
            time: '11:00',
            duration: 60,
            price: 300,
            status: 'completed',
            rating: 4
        }
    ],
    preferences: {
        favoriteService: 'Cilt Bakımı',
        preferredStaff: 'Ayşe Yılmaz',
        allergies: [],
        notes: ''
    }
};

function initCustomerPanel() {
    loadCustomerInfo();
    loadAppointments();
    loadServiceHistory();
    updateLoyaltyInfo();
    initSectionNavigation();
}

function loadCustomerInfo() {
    document.getElementById('customer-name').textContent = customerData.name;
    document.getElementById('loyalty-points').textContent = customerData.loyaltyPoints.toLocaleString();
    
    // Update profile form
    const form = document.getElementById('profile-form');
    if (form) {
        form.name.value = customerData.name;
        form.phone.value = customerData.phone;
        form.email.value = customerData.email;
        form.birthdate.value = customerData.birthdate;
    }
}

function loadAppointments() {
    const upcomingContainer = document.getElementById('upcoming-appointments');
    const pastContainer = document.getElementById('past-appointments');
    
    if (!upcomingContainer || !pastContainer) return;
    
    const upcomingAppointments = customerData.appointments.filter(app => app.status === 'upcoming');
    const pastAppointments = customerData.appointments.filter(app => app.status === 'completed' || app.status === 'cancelled');
    
    // Load upcoming appointments
    if (upcomingAppointments.length === 0) {
        upcomingContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-calendar-times text-4xl mb-4"></i>
                <p>Yaklaşan randevunuz bulunmuyor</p>
                <button onclick="showSection('new-appointment')" class="btn-primary mt-4">Yeni Randevu Al</button>
            </div>
        `;
    } else {
        upcomingContainer.innerHTML = upcomingAppointments.map(appointment => 
            createAppointmentCard(appointment)
        ).join('');
    }
    
    // Load past appointments
    if (pastAppointments.length === 0) {
        pastContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-history text-4xl mb-4"></i>
                <p>Geçmiş randevu bulunmuyor</p>
            </div>
        `;
    } else {
        pastContainer.innerHTML = pastAppointments.map(appointment => 
            createAppointmentCard(appointment)
        ).join('');
    }
}

function createAppointmentCard(appointment) {
    const statusText = {
        upcoming: 'Yaklaşan',
        completed: 'Tamamlandı',
        cancelled: 'İptal Edildi'
    };
    
    const statusClass = appointment.status;
    
    return `
        <div class="appointment-card ${statusClass}">
            <div class="appointment-status ${statusClass}">${statusText[appointment.status]}</div>
            
            <h3 class="text-lg font-bold text-primary mb-2">${appointment.service}</h3>
            
            <div class="appointment-info">
                <div class="appointment-info-item">
                    <i class="fas fa-user"></i>
                    <span>${appointment.staff}</span>
                </div>
                <div class="appointment-info-item">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(appointment.date)}</span>
                </div>
                <div class="appointment-info-item">
                    <i class="fas fa-clock"></i>
                    <span>${appointment.time} (${appointment.duration} dk)</span>
                </div>
                <div class="appointment-info-item">
                    <i class="fas fa-lira-sign"></i>
                    <span>₺${appointment.price}</span>
                </div>
            </div>
            
            ${appointment.rating ? `
                <div class="flex items-center mt-2">
                    <span class="text-sm text-gray-600 mr-2">Değerlendirme:</span>
                    <div class="service-rating">
                        ${Array.from({length: 5}, (_, i) => 
                            `<i class="fas fa-star ${i < appointment.rating ? 'text-yellow-400' : 'text-gray-300'}"></i>`
                        ).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="appointment-actions">
                ${appointment.status === 'upcoming' ? `
                    <button onclick="rescheduleAppointment('${appointment.id}')" class="btn-reschedule">
                        <i class="fas fa-edit mr-1"></i>Yeniden Planla
                    </button>
                    <button onclick="cancelAppointment('${appointment.id}')" class="btn-cancel">
                        <i class="fas fa-times mr-1"></i>İptal Et
                    </button>
                ` : ''}
                
                ${appointment.status === 'completed' && !appointment.rating ? `
                    <button onclick="rateAppointment('${appointment.id}')" class="btn-review">
                        <i class="fas fa-star mr-1"></i>Değerlendir
                    </button>
                ` : ''}
                
                <button onclick="viewAppointmentDetail('${appointment.id}')" class="btn-secondary">
                    <i class="fas fa-eye mr-1"></i>Detay
                </button>
            </div>
        </div>
    `;
}

function loadServiceHistory() {
    const historyContainer = document.getElementById('service-history');
    if (!historyContainer) return;
    
    const completedServices = customerData.appointments.filter(app => app.status === 'completed');
    
    if (completedServices.length === 0) {
        historyContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-spa text-4xl mb-4"></i>
                <p>Henüz hizmet geçmişiniz bulunmuyor</p>
            </div>
        `;
        return;
    }
    
    historyContainer.innerHTML = completedServices.map(service => `
        <div class="service-history-item">
            <div class="service-icon">
                <i class="fas fa-spa"></i>
            </div>
            <div class="service-details">
                <div class="service-name">${service.service}</div>
                <div class="service-date">${formatDate(service.date)} - ${service.staff}</div>
                ${service.rating ? `
                    <div class="service-rating">
                        ${Array.from({length: 5}, (_, i) => 
                            `<i class="fas fa-star ${i < service.rating ? 'text-yellow-400' : 'text-gray-300'}"></i>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="text-accent font-bold">₺${service.price}</div>
        </div>
    `).join('');
}

function updateLoyaltyInfo() {
    const points = customerData.loyaltyPoints;
    const tier = customerData.tier;
    
    // Update loyalty tier display
    const tierNames = {
        bronze: 'Bronze',
        silver: 'Silver', 
        gold: 'Gold',
        platinum: 'Platinum'
    };
    
    // Calculate progress to next tier
    const tierThresholds = {
        bronze: 0,
        silver: 500,
        gold: 1000,
        platinum: 2000
    };
    
    const currentThreshold = tierThresholds[tier];
    const nextTier = Object.keys(tierThresholds).find(t => tierThresholds[t] > points);
    const nextThreshold = nextTier ? tierThresholds[nextTier] : tierThresholds.platinum;
    
    const progress = ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    
    // Update progress bar if exists
    const progressBar = document.querySelector('.loyalty-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
}

function initSectionNavigation() {
    // Default to appointments section
    showSection('appointments');
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.panel-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update active button
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.classList.remove('active');
    });
}

// Appointment Actions
function rescheduleAppointment(appointmentId) {
    showNotification('Randevu yeniden planlama özelliği yakında aktif olacak', 'info');
}

function cancelAppointment(appointmentId) {
    if (confirm('Randevunuzu iptal etmek istediğinizden emin misiniz?')) {
        // Find and update appointment
        const appointment = customerData.appointments.find(app => app.id === appointmentId);
        if (appointment) {
            appointment.status = 'cancelled';
            loadAppointments();
            showNotification('Randevunuz başarıyla iptal edildi', 'success');
        }
    }
}

function rateAppointment(appointmentId) {
    const rating = prompt('Hizmetimizi 1-5 arasında değerlendirin:');
    if (rating && rating >= 1 && rating <= 5) {
        const appointment = customerData.appointments.find(app => app.id === appointmentId);
        if (appointment) {
            appointment.rating = parseInt(rating);
            loadAppointments();
            loadServiceHistory();
            showNotification('Değerlendirmeniz kaydedildi. Teşekkürler!', 'success');
        }
    }
}

function viewAppointmentDetail(appointmentId) {
    const appointment = customerData.appointments.find(app => app.id === appointmentId);
    if (!appointment) return;
    
    const modal = document.getElementById('appointment-detail-modal');
    const content = document.getElementById('appointment-detail-content');
    
    content.innerHTML = `
        <div class="space-y-4">
            <div class="text-center">
                <h4 class="text-xl font-bold text-primary">${appointment.service}</h4>
                <p class="text-gray-600">Randevu No: ${appointment.id}</p>
            </div>
            
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span class="font-medium">Uzman:</span>
                    <p>${appointment.staff}</p>
                </div>
                <div>
                    <span class="font-medium">Tarih:</span>
                    <p>${formatDate(appointment.date)}</p>
                </div>
                <div>
                    <span class="font-medium">Saat:</span>
                    <p>${appointment.time}</p>
                </div>
                <div>
                    <span class="font-medium">Süre:</span>
                    <p>${appointment.duration} dakika</p>
                </div>
                <div>
                    <span class="font-medium">Ücret:</span>
                    <p>₺${appointment.price}</p>
                </div>
                <div>
                    <span class="font-medium">Durum:</span>
                    <p class="capitalize">${appointment.status === 'upcoming' ? 'Yaklaşan' : 
                        appointment.status === 'completed' ? 'Tamamlandı' : 'İptal Edildi'}</p>
                </div>
            </div>
            
            ${appointment.rating ? `
                <div class="text-center">
                    <span class="font-medium">Değerlendirmeniz:</span>
                    <div class="service-rating justify-center mt-1">
                        ${Array.from({length: 5}, (_, i) => 
                            `<i class="fas fa-star ${i < appointment.rating ? 'text-yellow-400' : 'text-gray-300'}"></i>`
                        ).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
        
        <div class="flex justify-end mt-6">
            <button onclick="closeAppointmentDetail()" class="btn-secondary">Kapat</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeAppointmentDetail() {
    const modal = document.getElementById('appointment-detail-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Profile Management
document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    // Update customer data
    customerData.name = formData.get('name');
    customerData.phone = formData.get('phone');
    customerData.email = formData.get('email');
    customerData.birthdate = formData.get('birthdate');
    customerData.preferences.notes = formData.get('notes');
    
    // Update display
    document.getElementById('customer-name').textContent = customerData.name;
    
    showNotification('Profil bilgileriniz güncellendi', 'success');
});

// Logout
function logout() {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        // Clear session data
        localStorage.removeItem('customer_session');
        
        // Redirect to login or home page
        window.location.href = '../index.html';
    }
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

// Auto-refresh appointments every 5 minutes
setInterval(() => {
    loadAppointments();
}, 5 * 60 * 1000);
