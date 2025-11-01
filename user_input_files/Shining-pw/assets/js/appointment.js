// Appointment System JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAppointmentSystem();
});

let appointmentData = {
    service: null,
    staff: null,
    date: null,
    time: null,
    customer: {}
};

let currentStep = 1;
const totalSteps = 5;

function initAppointmentSystem() {
    initServiceSelection();
    initStaffSelection();
    initCalendar();
    initTimeSlots();
    initCustomerForm();
    createProgressIndicator();
}

function showAppointmentForm() {
    document.getElementById('appointment-modal').classList.remove('hidden');
    document.getElementById('appointment-modal').classList.add('flex');
    document.body.style.overflow = 'hidden';
    showStep(1);
}

function closeAppointmentForm() {
    document.getElementById('appointment-modal').classList.add('hidden');
    document.getElementById('appointment-modal').classList.remove('flex');
    document.body.style.overflow = '';
    resetAppointment();
}

function createProgressIndicator() {
    const stepsContainer = document.getElementById('appointment-steps');
    const progressDiv = document.createElement('div');
    progressDiv.className = 'progress-indicator';
    progressDiv.innerHTML = Array.from({length: totalSteps}, (_, i) => 
        `<div class="progress-step ${i === 0 ? 'active' : ''}">${i + 1}</div>`
    ).join('');
    stepsContainer.insertBefore(progressDiv, stepsContainer.firstChild);
}

function updateProgressIndicator() {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.appointment-step').forEach(s => {
        s.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
    updateProgressIndicator();
}

function nextStep() {
    if (currentStep < totalSteps) {
        showStep(currentStep + 1);
    }
}

function previousStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

// Service Selection
function initServiceSelection() {
    const serviceOptions = document.querySelectorAll('.service-option');
    const nextBtn = document.getElementById('next-step-1');
    
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selection
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Select current
            this.classList.add('selected');
            
            // Store data
            appointmentData.service = {
                id: this.dataset.service,
                duration: parseInt(this.dataset.duration),
                price: parseInt(this.dataset.price),
                name: this.querySelector('h4').textContent
            };
            
            // Enable next button
            nextBtn.disabled = false;
        });
    });
    
    nextBtn.addEventListener('click', () => nextStep());
}

// Staff Selection
function initStaffSelection() {
    const staffOptions = document.querySelectorAll('.staff-option');
    const nextBtn = document.getElementById('next-step-2');
    
    staffOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selection
            staffOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Select current
            this.classList.add('selected');
            
            // Store data
            appointmentData.staff = {
                id: this.dataset.staff,
                name: this.querySelector('h4').textContent,
                title: this.querySelector('p').textContent
            };
            
            // Enable next button
            nextBtn.disabled = false;
        });
    });
    
    nextBtn.addEventListener('click', () => {
        generateCalendar();
        generateTimeSlots();
        nextStep();
    });
}

// Calendar System
function initCalendar() {
    generateCalendar();
}

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    calendar.innerHTML = `
        <div class="calendar-nav">
            <button onclick="changeMonth(-1)">‹</button>
            <h4>${getMonthName(currentMonth)} ${currentYear}</h4>
            <button onclick="changeMonth(1)">›</button>
        </div>
        <div class="calendar-header">
            <div class="calendar-header-day">Pzt</div>
            <div class="calendar-header-day">Sal</div>
            <div class="calendar-header-day">Çar</div>
            <div class="calendar-header-day">Per</div>
            <div class="calendar-header-day">Cum</div>
            <div class="calendar-header-day">Cmt</div>
            <div class="calendar-header-day">Paz</div>
        </div>
        <div class="calendar-grid" id="calendar-days">
        </div>
    `;
    
    generateCalendarDays(currentYear, currentMonth);
}

function generateCalendarDays(year, month) {
    const calendarDays = document.getElementById('calendar-days');
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    
    // Get first Monday
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1));
    
    calendarDays.innerHTML = '';
    
    for (let i = 0; i < 42; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = currentDate.getDate();
        
        // Add classes
        if (currentDate.getMonth() !== month) {
            dayElement.classList.add('other-month');
        }
        
        if (currentDate < today) {
            dayElement.classList.add('disabled');
        }
        
        if (currentDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        // Add click handler
        if (!dayElement.classList.contains('disabled') && !dayElement.classList.contains('other-month')) {
            dayElement.addEventListener('click', function() {
                document.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('selected');
                });
                this.classList.add('selected');
                
                appointmentData.date = currentDate.toISOString().split('T')[0];
                generateTimeSlots();
                checkStep3Complete();
            });
        }
        
        calendarDays.appendChild(dayElement);
    }
}

// Time Slots
function initTimeSlots() {
    generateTimeSlots();
}

function generateTimeSlots() {
    const timeSlotsContainer = document.getElementById('time-slots');
    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
        '18:00', '18:30', '19:00', '19:30'
    ];
    
    timeSlotsContainer.innerHTML = '';
    
    timeSlots.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;
        
        // Simulate some slots being unavailable
        if (Math.random() < 0.3) {
            timeSlot.classList.add('disabled');
        } else {
            timeSlot.addEventListener('click', function() {
                document.querySelectorAll('.time-slot').forEach(slot => {
                    slot.classList.remove('selected');
                });
                this.classList.add('selected');
                
                appointmentData.time = time;
                checkStep3Complete();
            });
        }
        
        timeSlotsContainer.appendChild(timeSlot);
    });
}

function checkStep3Complete() {
    const nextBtn = document.getElementById('next-step-3');
    nextBtn.disabled = !(appointmentData.date && appointmentData.time);
    
    if (!nextBtn.disabled) {
        nextBtn.onclick = () => nextStep();
    }
}

// Customer Form
function initCustomerForm() {
    const nextBtn = document.getElementById('next-step-4');
    const form = document.getElementById('appointment-form');
    
    nextBtn.addEventListener('click', function() {
        const formData = new FormData(form);
        appointmentData.customer = {
            name: formData.get('customer_name'),
            phone: formData.get('customer_phone'),
            email: formData.get('customer_email'),
            age: formData.get('customer_age'),
            notes: formData.get('notes')
        };
        
        generateSummary();
        nextStep();
    });
}

function generateSummary() {
    const summaryContainer = document.getElementById('appointment-summary');
    
    summaryContainer.innerHTML = `
        <div class="summary-item">
            <span class="summary-label">Hizmet:</span>
            <span class="summary-value">${appointmentData.service.name}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Uzman:</span>
            <span class="summary-value">${appointmentData.staff.name}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Tarih:</span>
            <span class="summary-value">${formatDate(appointmentData.date)}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Saat:</span>
            <span class="summary-value">${appointmentData.time}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Süre:</span>
            <span class="summary-value">${appointmentData.service.duration} dakika</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Müşteri:</span>
            <span class="summary-value">${appointmentData.customer.name}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Telefon:</span>
            <span class="summary-value">${appointmentData.customer.phone}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Toplam Ücret:</span>
            <span class="summary-value">₺${appointmentData.service.price}</span>
        </div>
    `;
}

function confirmAppointment() {
    // Show loading
    const confirmBtn = event.target;
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<span class="spinner"></span> Kaydediliyor...';
    confirmBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success
        document.getElementById('step-5').innerHTML = `
            <div class="text-center">
                <div class="success-checkmark"></div>
                <h3 class="text-2xl font-bold text-green-600 mb-4">Randevunuz Onaylandı!</h3>
                <p class="text-gray-600 mb-6">
                    Randevu detaylarınız SMS ve e-posta ile gönderilecektir.
                    <br>Randevu numaranız: <strong>RV${Date.now().toString().slice(-6)}</strong>
                </p>
                <div class="space-y-4">
                    <button onclick="closeAppointmentForm()" class="btn-primary">Tamam</button>
                    <button onclick="addToCalendar()" class="btn-secondary">Takvime Ekle</button>
                </div>
            </div>
        `;
        
        // Send notification
        showNotification('Randevunuz başarıyla oluşturuldu!', 'success');
        
        // Reset after 3 seconds
        setTimeout(() => {
            closeAppointmentForm();
        }, 3000);
        
    }, 2000);
}

function addToCalendar() {
    const startDate = new Date(`${appointmentData.date}T${appointmentData.time}`);
    const endDate = new Date(startDate.getTime() + appointmentData.service.duration * 60000);
    
    const event = {
        title: `${appointmentData.service.name} - Shining Beauty`,
        start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        description: `Uzman: ${appointmentData.staff.name}\\nTelefon: +90 505 071 95 01`
    };
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}`;
    
    window.open(googleCalendarUrl, '_blank');
}

function resetAppointment() {
    appointmentData = {
        service: null,
        staff: null,
        date: null,
        time: null,
        customer: {}
    };
    currentStep = 1;
    
    // Reset form
    document.getElementById('appointment-form').reset();
    
    // Reset selections
    document.querySelectorAll('.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Reset buttons
    document.querySelectorAll('#appointment-steps button[id^="next-step"]').forEach(btn => {
        btn.disabled = true;
    });
}

// Utility functions
function getMonthName(month) {
    const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return months[month];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function changeMonth(direction) {
    // Calendar month navigation implementation
    showNotification('Takvim navigasyonu aktif olacak', 'info');
}
