tailwind.config = {
    theme: {
        extend: {
            colors: {
                emerald: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    }
}


// Sample Initial Feed Data
let donations = [
    {
        id: 'item-1',
        title: 'Fresh Bakery Pastries & Loaves',
        category: 'Food',
        quantity: '8 Packs',
        description: 'Assorted fresh croissants, artisan sourdough, and sweet rolls from today’s morning bake.',
        location: 'Downtown Center',
        distance: 0.6,
        urgency: 'Urgent',
        expiry: 'Expires in 3 hours',
        donorName: 'Sarah Jenkins',
        donorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
        timePosted: '15 mins ago',
        bookmarked: false
    },
    {
        id: 'item-2',
        title: 'Kids Winter Jackets & Sweaters (Ages 5-8)',
        category: 'Clothing',
        quantity: '5 Items',
        description: 'Gently used fleece jackets, knit sweaters, and wool beanies. Cleaned and ready to wear.',
        location: 'Westside Community',
        distance: 1.2,
        urgency: 'Normal',
        expiry: null,
        donorName: 'David Miller',
        donorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
        image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600',
        timePosted: '1 hour ago',
        bookmarked: true
    },
    {
        id: 'item-3',
        title: 'Wooden Building Blocks & Puzzle Set',
        category: 'Toys',
        quantity: '1 Box',
        description: 'Complete educational wooden block set and animal jigsaw puzzles for toddlers.',
        location: 'Oakridge Suburb',
        distance: 2.4,
        urgency: 'Normal',
        expiry: null,
        donorName: 'Aisha Khan',
        donorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
        image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=600',
        timePosted: '2 hours ago',
        bookmarked: false
    },
    {
        id: 'item-4',
        title: 'Cooked Veggie Curry & Rice (12 Portions)',
        category: 'Food',
        quantity: '12 Bowls',
        description: 'Surplus catering from lunch gathering. Packed in hygienic disposable containers.',
        location: 'East Park District',
        distance: 0.8,
        urgency: 'Urgent',
        expiry: 'Expires in 4 hours',
        donorName: 'Elena Rostova',
        donorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
        timePosted: '30 mins ago',
        bookmarked: false
    },
    {
        id: 'item-5',
        title: 'High School Textbooks & Math Books',
        category: 'Books',
        quantity: '6 Books',
        description: 'Math, Science, and English literature reference books in great condition.',
        location: 'University Avenue',
        distance: 3.1,
        urgency: 'Normal',
        expiry: null,
        donorName: 'Marcus Vance',
        donorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
        timePosted: '4 hours ago',
        bookmarked: false
    },
    {
        id: 'item-6',
        title: 'Electric Countertop Kettle & Blender',
        category: 'Electronics',
        quantity: '2 Items',
        description: 'Working household appliances. Cleaned, tested, and ready for immediate pickup.',
        location: 'North Hill',
        distance: 4.5,
        urgency: 'Normal',
        expiry: null,
        donorName: 'Chloe Bennett',
        donorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=120',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=600',
        timePosted: '5 hours ago',
        bookmarked: false
    }
];

let activeCategory = 'All';
let currentClaimingItem = null;
let searchQuery = '';
let maxDistanceFilter = 10;

// Render Active Listings Grid
function renderGrid() {
    const grid = document.getElementById('donations-grid');
    const emptyState = document.getElementById('empty-state');

    grid.innerHTML = '';

    const filtered = donations.filter(item => {
        const matchesCategory = (activeCategory === 'All') || 
                                (activeCategory === 'Urgent' ? item.urgency === 'Urgent' : item.category === activeCategory);
        
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDistance = item.distance <= maxDistanceFilter;

        return matchesCategory && matchesSearch && matchesDistance;
    });

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group";

        const isUrgent = item.urgency === 'Urgent';

        card.innerHTML = `
            <div class="relative h-48 overflow-hidden bg-slate-100">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                
                <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/95 text-slate-800 shadow-sm backdrop-blur-sm">
                        ${getCategoryEmoji(item.category)} ${item.category}
                    </span>
                    ${isUrgent ? `
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500 text-white shadow-sm flex items-center gap-1">
                            <i class="fa-solid fa-clock animate-pulse"></i> ${item.expiry || 'Urgent'}
                        </span>
                    ` : ''}
                </div>

                <button onclick="toggleBookmark('${item.id}')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-rose-500 flex items-center justify-center shadow-sm transition-colors">
                    <i class="${item.bookmarked ? 'fa-solid fa-bookmark text-rose-500' : 'fa-regular fa-bookmark'} text-xs"></i>
                </button>

                <div class="absolute bottom-2.5 right-2.5 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-sm">
                    <i class="fa-solid fa-location-dot text-emerald-400"></i> ${item.distance} km
                </div>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                    <div class="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-1">
                        <span>Qty: ${item.quantity}</span>
                        <span>${item.timePosted}</span>
                    </div>
                    <h3 class="font-extrabold text-slate-900 text-base group-hover:text-emerald-600 transition-colors line-clamp-1">${item.title}</h3>
                    <p class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">${item.description}</p>
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <img src="${item.donorAvatar}" class="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200" alt="${item.donorName}">
                        <div>
                            <div class="text-xs font-bold text-slate-800 leading-tight">${item.donorName}</div>
                            <div class="text-[10px] text-slate-400">${item.location}</div>
                        </div>
                    </div>

                    <button onclick="openClaimModal('${item.id}')" class="bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm">
                        Claim Item
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function getCategoryEmoji(cat) {
    switch(cat) {
        case 'Food': return '🍲';
        case 'Clothing': return '👕';
        case 'Toys': return '🧸';
        case 'Books': return '📚';
        case 'Electronics': return '⚡';
        default: return '📦';
    }
}

// Search & Category Handler
function setCategory(cat) {
    activeCategory = cat;
    const buttons = document.querySelectorAll('#category-pills button');
    buttons.forEach(btn => {
        if(btn.innerText.includes(cat) || (cat === 'All' && btn.innerText.includes('All Listings'))) {
            btn.className = "cat-pill active-pill px-4 py-2 rounded-xl text-xs font-bold transition-all bg-emerald-600 text-white shadow-sm shrink-0";
        } else {
            btn.className = "cat-pill px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 shrink-0";
        }
    });
    renderGrid();
}

function syncSearch(val) {
    searchQuery = val;
    renderGrid();
}

function updateDistanceFilter(val) {
    maxDistanceFilter = parseFloat(val);
    document.getElementById('distance-label').innerText = val + " km";
    renderGrid();
}

function resetFilters() {
    searchQuery = '';
    document.getElementById('nav-search-input').value = '';
    document.getElementById('distance-slider').value = 10;
    updateDistanceFilter(10);
    setCategory('All');
}

function toggleBookmark(id) {
    const item = donations.find(d => d.id === id);
    if(item) {
        item.bookmarked = !item.bookmarked;
        showToast(item.bookmarked ? "Saved to your bookmarks!" : "Removed from bookmarks", "info");
        renderGrid();
    }
}

// Post Donation Form Handlers
function openPostModal() {
    document.getElementById('post-modal').classList.remove('hidden');
}

function closePostModal() {
    document.getElementById('post-modal').classList.add('hidden');
}

function toggleFoodFields() {
    const cat = document.getElementById('form-category').value;
    const foodBox = document.getElementById('food-expiry-container');
    if(cat === 'Food') {
        foodBox.classList.remove('hidden');
    } else {
        foodBox.classList.add('hidden');
    }
}

function handlePostSubmit(e) {
    e.preventDefault();
    const category = document.getElementById('form-category').value;
    const title = document.getElementById('form-title').value;
    const quantity = document.getElementById('form-quantity').value;
    const desc = document.getElementById('form-desc').value;
    const location = document.getElementById('form-location').value;
    const urgency = document.getElementById('form-urgency').value;
    const expiry = category === 'Food' ? document.getElementById('form-expiry').value : null;

    const selectedPhoto = document.querySelector('input[name="photo-preset"]:checked').value;
    let imgUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600';
    if(selectedPhoto === 'clothes') imgUrl = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600';
    if(selectedPhoto === 'toys') imgUrl = 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=600';
    if(selectedPhoto === 'books') imgUrl = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600';

    const newItem = {
        id: 'item-' + (donations.length + 1),
        title,
        category,
        quantity,
        description: desc,
        location,
        distance: 0.2,
        urgency,
        expiry,
        donorName: 'Alex Morgan (You)',
        donorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
        image: imgUrl,
        timePosted: 'Just now',
        bookmarked: false
    };

    donations.unshift(newItem);
    renderGrid();
    closePostModal();
    document.getElementById('donation-form').reset();
    
    // Increment stat counter mock
    const donorStat = document.getElementById('stat-donors');
    donorStat.innerText = (parseInt(donorStat.innerText) + 1).toString();

    showToast("Your donation listing has been published!", "success");
}

// Claim Item Dialog Handlers
function openClaimModal(id) {
    if(id === 'item-hero') {
        currentClaimingItem = donations[3];
    } else {
        currentClaimingItem = donations.find(d => d.id === id);
    }
    if(currentClaimingItem) {
        document.getElementById('claim-item-title').innerText = currentClaimingItem.title;
        document.getElementById('claim-item-donor').innerText = "Offered by " + currentClaimingItem.donorName;
        document.getElementById('claim-modal').classList.remove('hidden');
    }
}

function closeClaimModal() {
    document.getElementById('claim-modal').classList.add('hidden');
    currentClaimingItem = null;
}

function handleClaimSubmit(e) {
    e.preventDefault();
    const note = document.getElementById('claim-note').value;
    closeClaimModal();
    showToast("Pickup request sent to " + (currentClaimingItem ? currentClaimingItem.donorName : "donor") + "!", "success");
    document.getElementById('claim-note').value = '';
}

// Profile & Notifications Modals
function openProfileModal() {
    document.getElementById('profile-modal').classList.remove('hidden');
}

function closeProfileModal() {
    document.getElementById('profile-modal').classList.add('hidden');
}

function toggleNotifications() {
    const dropdown = document.getElementById('notif-dropdown');
    dropdown.classList.toggle('hidden');
    document.getElementById('notif-badge').classList.add('hidden');
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Toast Engine
function showToast(message, type = "success") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center gap-3 p-4 rounded-2xl shadow-2xl text-xs font-bold text-white transition-all transform duration-300 translate-y-2 ${
        type === 'success' ? 'bg-emerald-700' : 'bg-slate-800'
    }`;
    
    toast.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <i class="fa-solid ${type === 'success' ? 'fa-check' : 'fa-info'} text-[10px]"></i>
        </div>
        <div class="flex-1">${message}</div>
        <button onclick="this.parentElement.remove()" class="text-white/60 hover:text-white">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.remove('translate-y-2'), 10);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// On Window Load Initializer
window.onload = function() {
    renderGrid();
};
