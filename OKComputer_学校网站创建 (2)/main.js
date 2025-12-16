// Main JavaScript for Ishwar International School Website

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initCounterAnimations();
    initCampusTour();
    initAchievementChart();
    initEventCalendar();
    initSmoothScrolling();
    initMobileMenu();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutCubic',
                    delay: anime.stagger(100)
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Animated counters for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.dataset.counter);
                
                anime({
                    targets: { value: 0 },
                    value: finalValue,
                    duration: 2000,
                    easing: 'easeOutCubic',
                    update: function(anim) {
                        target.textContent = Math.round(anim.animatables[0].target.value);
                    }
                });
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Interactive Campus Tour functionality
function initCampusTour() {
    const hotspots = document.querySelectorAll('.campus-hotspot');
    const facilityCards = document.querySelectorAll('.facility-card');
    
    const facilityData = {
        library: {
            title: "Digital Library & Resource Center",
            description: "Our modern library features over 10,000 books, digital resources, and quiet study spaces. Students have access to online databases, e-books, and research materials.",
            image: "https://kimi-web-img.moonshot.cn/img/educationsnapshots.com/5d329fae5bef6e0a52e0336f5eba6460c8d52b7d.jpg"
        },
        labs: {
            title: "Advanced Science Laboratories",
            description: "State-of-the-art physics, chemistry, and biology labs equipped with modern instruments and safety features. Hands-on learning experiences for all students.",
            image: "https://kimi-web-img.moonshot.cn/img/3.files.edl.io/29f80528e0c1dd419fbe3e666d8882a85969035e.jpg"
        },
        sports: {
            title: "Sports & Physical Education Complex",
            description: "Comprehensive sports facilities including cricket ground, basketball courts, swimming pool, and indoor sports arena. Professional coaching available.",
            image: "https://kimi-web-img.moonshot.cn/img/www.deepspacesparkle.com/28f832f1a3fe48eeb2cd810206223e419ff511c8.jpg"
        },
        classrooms: {
            title: "Smart Learning Classrooms",
            description: "Technology-enabled classrooms with interactive whiteboards, projectors, and comfortable seating. Optimal learning environment for all subjects.",
            image: "https://kimi-web-img.moonshot.cn/img/www.artfulmaths.com/7a3a36454078fa7ce1ab80c57e6d9a63b652da2a.jpg"
        }
    };
    
    // Hotspot click handlers
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const facility = this.dataset.facility;
            showFacilityModal(facility, facilityData[facility]);
        });
    });
    
    // Facility card click handlers
    facilityCards.forEach(card => {
        card.addEventListener('click', function() {
            const facility = this.dataset.facility;
            if (facility && facilityData[facility]) {
                showFacilityModal(facility, facilityData[facility]);
            }
        });
    });
    
    // Highlight connected elements
    function highlightConnectedElements(facility) {
        // Remove previous highlights
        document.querySelectorAll('.highlighted').forEach(el => {
            el.classList.remove('highlighted');
        });
        
        // Add highlights to connected elements
        const hotspot = document.querySelector(`[data-facility="${facility}"]`);
        const card = document.querySelector(`.facility-card[data-facility="${facility}"]`);
        
        if (hotspot) hotspot.classList.add('highlighted');
        if (card) card.classList.add('highlighted');
    }
    
    // Show facility modal
    function showFacilityModal(facility, data) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="relative">
                    <img src="${data.image}" alt="${data.title}" class="w-full h-64 object-cover rounded-t-2xl">
                    <button class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors" onclick="this.closest('.fixed').remove()">
                        ✕
                    </button>
                </div>
                <div class="p-8">
                    <h3 class="font-display text-3xl font-bold text-forest-green mb-4">${data.title}</h3>
                    <p class="text-charcoal-gray leading-relaxed mb-6">${data.description}</p>
                    <div class="flex gap-4">
                        <button class="btn-primary px-6 py-3 rounded-full font-semibold" onclick="alert('Virtual tour coming soon!')">
                            Take Virtual Tour
                        </button>
                        <button class="border-2 border-forest-green text-forest-green px-6 py-3 rounded-full font-semibold hover:bg-forest-green hover:text-white transition-all" onclick="this.closest('.fixed').remove()">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate modal appearance
        anime({
            targets: modal.querySelector('.bg-white'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Achievement chart using ECharts
function initAchievementChart() {
    const chartContainer = document.getElementById('achievement-chart');
    if (!chartContainer) return;
    
    const chart = echarts.init(chartContainer);
    
    const option = {
        title: {
            text: 'Academic Performance Overview',
            left: 'center',
            textStyle: {
                color: '#2D5A3D',
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['2020', '2021', '2022', '2023', '2024'],
            axisLabel: {
                color: '#3A3A3A'
            }
        },
        yAxis: {
            type: 'value',
            max: 100,
            axisLabel: {
                color: '#3A3A3A',
                formatter: '{value}%'
            }
        },
        series: [
            {
                name: 'Board Results',
                type: 'bar',
                data: [92, 94, 93, 96, 95],
                itemStyle: {
                    color: '#E07A5F'
                },
                barWidth: '40%'
            },
            {
                name: 'Student Satisfaction',
                type: 'line',
                data: [88, 90, 92, 94, 96],
                itemStyle: {
                    color: '#5B7C99'
                },
                lineStyle: {
                    width: 3
                },
                symbol: 'circle',
                symbolSize: 8
            }
        ],
        legend: {
            data: ['Board Results', 'Student Satisfaction'],
            bottom: 10,
            textStyle: {
                color: '#3A3A3A'
            }
        }
    };
    
    chart.setOption(option);
    
    // Animate chart on scroll
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chart.setOption(option, true);
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    chartObserver.observe(chartContainer);
    
    // Responsive chart
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Event Calendar functionality
function initEventCalendar() {
    const calendarDays = document.querySelectorAll('.calendar-day');
    const events = {
        '16': [
            { title: 'Annual Sports Day', time: '9:00 AM - 4:00 PM', type: 'sports' }
        ],
        '18': [
            { title: 'Science Exhibition', time: '10:00 AM - 2:00 PM', type: 'academic' }
        ],
        '20': [
            { title: 'Parent-Teacher Meeting', time: '2:00 PM - 5:00 PM', type: 'meeting' }
        ],
        '25': [
            { title: 'Christmas Celebration', time: '10:00 AM', type: 'cultural' }
        ]
    };
    
    // Add event indicators
    calendarDays.forEach(day => {
        const dayNumber = day.textContent.trim();
        if (events[dayNumber]) {
            const eventDot = document.createElement('div');
            eventDot.className = 'event-dot';
            day.appendChild(eventDot);
            
            // Add hover effect for events
            day.addEventListener('mouseenter', function() {
                showEventTooltip(this, events[dayNumber]);
            });
            
            day.addEventListener('mouseleave', function() {
                hideEventTooltip();
            });
        }
    });
    
    let tooltip = null;
    
    function showEventTooltip(element, dayEvents) {
        hideEventTooltip();
        
        tooltip = document.createElement('div');
        tooltip.className = 'absolute bg-charcoal-gray text-warm-white p-4 rounded-lg shadow-lg z-50 max-w-xs';
        
        let tooltipContent = '<div class="font-semibold mb-2">Events:</div>';
        dayEvents.forEach(event => {
            tooltipContent += `
                <div class="mb-2">
                    <div class="font-medium">${event.title}</div>
                    <div class="text-sm opacity-75">${event.time}</div>
                </div>
            `;
        });
        
        tooltip.innerHTML = tooltipContent;
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 10) + 'px';
        
        // Animate tooltip
        anime({
            targets: tooltip,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 200,
            easing: 'easeOutCubic'
        });
    }
    
    function hideEventTooltip() {
        if (tooltip) {
            tooltip.remove();
            tooltip = null;
        }
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                anime({
                    targets: document.documentElement,
                    scrollTop: offsetTop,
                    duration: 800,
                    easing: 'easeInOutCubic'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    // Add mobile menu toggle if needed
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutCubic'
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInCubic',
            complete: () => notification.remove()
        });
    }, 3000);
}

// Button click handlers
document.addEventListener('click', function(e) {
    // Handle CTA buttons
    if (e.target.matches('.btn-primary') || e.target.closest('.btn-primary')) {
        const button = e.target.matches('.btn-primary') ? e.target : e.target.closest('.btn-primary');
        const text = button.textContent.trim();
        
        // Add click animation
        anime({
            targets: button,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeInOutQuad'
        });
        
        // Handle different button actions
        if (text.includes('Explore Campus') || text.includes('Take Virtual Tour')) {
            showNotification('Virtual campus tour coming soon!', 'info');
        } else if (text.includes('View Programs') || text.includes('Academic Programs')) {
            window.location.href = 'academics.html';
        } else if (text.includes('Admission') || text.includes('Start Admission')) {
            window.location.href = 'contact.html';
        } else if (text.includes('About')) {
            window.location.href = 'about.html';
        } else {
            showNotification('Feature coming soon!', 'info');
        }
    }
});

// Add floating animation to shapes
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Random delay for each shape
        const delay = index * 1000;
        
        anime({
            targets: shape,
            translateY: [-20, 20],
            rotate: [0, 360],
            duration: 6000 + (index * 1000),
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate',
            delay: delay
        });
    });
}

// Initialize floating shapes when page loads
document.addEventListener('DOMContentLoaded', initFloatingShapes);

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust chart sizes if needed
    const chart = echarts.getInstanceByDom(document.getElementById('achievement-chart'));
    if (chart) {
        chart.resize();
    }
});

// Add loading animation
window.addEventListener('load', function() {
    // Hide any loading screens and animate page entrance
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutCubic'
    });
});

console.log('Ishwar International School website initialized successfully!');