// ============================================
// ADMIN DASHBOARD LOGIC (WITH USER MANAGEMENT)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Date
    const d = document.getElementById('current-date');
    if(d) {
        d.textContent = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });
    }

    // 2. Load Initial Data
    refreshAll();
});

function refreshAll() {
    loadStats();
    
    // GANTI loadTable dashboard lama dengan ini:
    loadBentoActivity(); 
    
    // Load tabel halaman lain tetap sama
    loadTable('orders-table', 999);
    loadUsersTable();
    loadApps();
    loadCustom();
    loadInv();
}

// --- NEW: BENTO DASHBOARD LOADER ---
function loadBentoActivity() {
    // 1. LOAD ORDERS
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderBox = document.getElementById('bento-orders');
    if (orderBox) {
        if (orders.length === 0) {
            orderBox.innerHTML = '<p style="color:#666; font-size:0.8rem; padding:1rem;">No recent orders.</p>';
        } else {
            // Ambil 4 order terbaru
            orderBox.innerHTML = [...orders].reverse().slice(0, 4).map(o => `
                <div class="mini-item">
                    <div class="mini-icon" style="background: rgba(212, 165, 116, 0.1); color: var(--adm-gold);">🛍️</div>
                    <div class="mini-info">
                        <span class="mini-title">Order #${o.orderNumber}</span>
                        <span class="mini-sub">${o.items.length} Items • ${o.total}</span>
                    </div>
                    <span class="mini-status" style="color:${getStatusColor(o.status)}">${o.status}</span>
                </div>
            `).join('');
        }
    }

    // 2. LOAD APPOINTMENTS
    const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appBox = document.getElementById('bento-appointments');
    if (appBox) {
        if (apps.length === 0) {
            appBox.innerHTML = '<p style="color:#666; font-size:0.8rem; padding:1rem;">No upcoming appointments.</p>';
        } else {
            appBox.innerHTML = [...apps].reverse().slice(0, 4).map(a => `
                <div class="mini-item">
                    <div class="mini-icon" style="background: rgba(46, 204, 113, 0.1); color: #2ecc71;">📅</div>
                    <div class="mini-info">
                        <span class="mini-title">${a.name}</span>
                        <span class="mini-sub">${a.date} • ${a.time}</span>
                    </div>
                    <span class="mini-status">Confirmed</span>
                </div>
            `).join('');
        }
    }

    // 3. LOAD CUSTOM REQUESTS
    const reqs = JSON.parse(localStorage.getItem('customRequests') || '[]');
    const reqBox = document.getElementById('bento-custom');
    if (reqBox) {
        if (reqs.length === 0) {
            reqBox.innerHTML = '<p style="color:#666; font-size:0.8rem; padding:1rem;">No new requests.</p>';
        } else {
            reqBox.innerHTML = [...reqs].reverse().slice(0, 4).map(r => `
                <div class="mini-item">
                    <div class="mini-icon" style="background: rgba(155, 89, 182, 0.1); color: #9b59b6;">✨</div>
                    <div class="mini-info">
                        <span class="mini-title">"${r.name}"</span>
                        <span class="mini-sub">ID: ${r.id}</span>
                    </div>
                    <span class="mini-status" style="color:var(--adm-gold)">${r.price || 'Pending'}</span>
                </div>
            `).join('');
        }
    }
}

// Helper warna status sederhana
function getStatusColor(status) {
    status = (status || '').toLowerCase();
    if(status === 'delivered') return '#2ecc71'; // Green
    if(status === 'shipped') return '#3498db'; // Blue
    if(status === 'cancelled') return '#e74c3c'; // Red
    return '#f1c40f'; // Yellow (Ordered)
}

function switchTab(view, clickedElement) {
    // 1. Ganti Tampilan Konten (View)
    document.querySelectorAll('.view-section').forEach(x => x.classList.remove('active'));
    const target = document.getElementById('view-'+view);
    if(target) target.classList.add('active');
    
    // 2. --- PERBAIKAN LOGIKA SIDEBAR ---
    // Tentukan elemen sidebar mana yang harus aktif.
    let sidebarItem = clickedElement;

    // Jika yang diklik BUKAN menu sidebar (misal: tombol panah di dashboard),
    // maka kita cari manual menu sidebar yang cocok.
    if (!clickedElement || !clickedElement.classList.contains('menu-link')) {
        // Cari elemen <a> di dalam .sidebar-menu yang memiliki onclick="switchTab('viewname'...)"
        sidebarItem = document.querySelector(`.sidebar-menu .menu-link[onclick*="'${view}'"]`);
    }

    // 3. Update Class Active di Sidebar
    if(sidebarItem) {
        document.querySelectorAll('.menu-link').forEach(x => x.classList.remove('active'));
        sidebarItem.classList.add('active');
        
        // Update Judul Halaman
        const titles = {
            'dashboard':'Overview', 
            'users': 'User Management',
            'orders':'Order Management', 
            'services':'Appointments', 
            'custom':'Bespoke Requests', 
            'products':'Inventory'
        };
        const heading = document.getElementById('page-heading');
        if(heading) heading.textContent = titles[view] || 'Dashboard';
    }
}

// --- DATA LOADERS ---

function loadStats() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Revenue Calc
    const rev = orders.reduce((sum, o) => {
        return sum + (parseFloat(String(o.total).replace(/[^0-9.-]+/g,"")) || 0);
    }, 0);
    
    const setText = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    
    setText('stat-revenue', `$${rev.toLocaleString(undefined, {minimumFractionDigits: 2})}`);
    setText('stat-users', users.length); // Update User Count
    setText('stat-appointments', apps.length);
    setText('stat-orders', orders.length);
}

// --- LOAD USERS (NEW FUNCTION) ---
// --- LOAD USERS (UPDATED WITH EXPANDABLE DETAILS) ---
function loadUsersTable() {
    const tbody = document.getElementById('users-table');
    if(!tbody) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if(users.length === 0) {
        // Update colspan jadi 6 agar rapi jika kosong
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:1.5rem; color:#666;">No registered users found.</td></tr>';
        return;
    }

    tbody.innerHTML = users.map((u, index) => {
        const uid = u.id || `user-${index}`;
        
        // Format tampilan Last Online
        const onlineStatus = u.lastLogin 
            ? `<span style="color:var(--adm-gold); font-size:0.85rem;">${u.lastLogin}</span>` 
            : `<span style="color:#666; font-size:0.8rem;">Never</span>`;

        return `
        <tr class="user-main-row" onclick="toggleUserRow('${uid}')">
            <td>
                <div style="display:flex; align-items:center; gap:10px;">
                    <strong>${u.name || 'User'}</strong>
                </div>
            </td>
            <td>${u.email || '-'}</td>
            <td><span class="status-badge status-shipped">${u.role || 'Customer'}</span></td>
            <td style="color:#888">${u.joinedDate || 'Unknown'}</td>
            
            <td>${onlineStatus}</td>
            
            <td>
                <span class="toggle-icon" id="icon-${uid}">▼</span>
            </td>
        </tr>
        
        <tr id="detail-${uid}" class="user-detail-row" style="display:none;">
            <td colspan="6">
                <div class="user-detail-content">
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="label">User ID</span>
                            <span class="value">${uid}</span>
                        </div>
                        
                        
                        <div class="detail-item">
                            <span class="label">Postal Code</span>
                            <span class="value">${u.postalCode || '-'}</span>
                        </div>

                        <div class="detail-item">
                            <span class="label">Phone</span>
                            <span class="value">${u.phone || 'Not set'}</span>
                        </div>
                         <div class="detail-item">
                            <span class="label">Address</span>
                            <span class="value">${u.address || 'Not set'}</span>
                        </div>
                    </div>
                    
                    <div class="detail-actions">
                        <button class="btn-danger" onclick="deleteUser('${u.email}')">Delete User</button>
                    </div>
                </div>
            </td>
        </tr>
    `}).join('');
}

// FUNGSI TOGGLE (BUKA/TUTUP)
window.toggleUserRow = function(uid) {
    const row = document.getElementById(`detail-${uid}`);
    const icon = document.getElementById(`icon-${uid}`);
    
    if (row.style.display === 'none') {
        row.style.display = 'table-row'; // Munculkan
        if(icon) icon.style.transform = 'rotate(180deg)'; // Putar panah
    } else {
        row.style.display = 'none'; // Sembunyikan
        if(icon) icon.style.transform = 'rotate(0deg)'; // Reset panah
    }
};

// Fungsi Hapus User
window.deleteUser = function(email) {
    if(confirm(`Are you sure you want to delete user ${email}?`)) {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        // Filter user yang tidak sama emailnya
        users = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(users));
        refreshAll();
        showNotification('User deleted.');
    }
};

function loadTable(id, limit) {
    const tbody = document.getElementById(id);
    if(!tbody) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    if(orders.length === 0) { 
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:1.5rem; color:#666;">No Data Found</td></tr>'; 
        return; 
    }
    
    const data = [...orders].reverse().slice(0, limit);
    
    tbody.innerHTML = data.map(o => {
        const currentStatus = o.status || 'Ordered';
        const isSel = (val) => currentStatus === val ? 'selected' : '';

        const dropdown = `
            <select class="action-select" onchange="updStat('${o.orderNumber}', this.value)">
                <option value="Ordered" ${isSel('Ordered')}>Ordered</option>
                <option value="Shipped" ${isSel('Shipped')}>Shipped</option>
                <option value="Delivered" ${isSel('Delivered')}>Delivered</option>
                <option value="Cancelled" ${isSel('Cancelled')}>Cancelled</option>
            </select>
        `;
        const actionColumn = id === 'orders-table' ? `<td>${dropdown}</td>` : '';

        return `
        <tr>
            <td><strong>#${o.orderNumber}</strong></td>
            <td>${id === 'orders-table' ? `Guest<br><small style="color:#666">${new Date(o.date).toLocaleDateString()}</small>` : new Date(o.date).toLocaleDateString()}</td>
            <td>${o.items ? o.items.length : 0} Items</td>
            <td style="color:var(--adm-gold)">${o.total}</td>
            <td><span class="status-badge status-${currentStatus.toLowerCase()}">${currentStatus}</span></td>
            ${actionColumn}
        </tr>
    `}).join('');
}

window.updStat = function(id, val) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const idx = orders.findIndex(o => String(o.orderNumber) === String(id));
    
    if(idx > -1) {
        orders[idx].status = val;
        localStorage.setItem('orders', JSON.stringify(orders));
        refreshAll();
    }
};

function loadApps() {
    const t = document.getElementById('appointments-table');
    if(!t) return;
    
    const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    if(apps.length === 0) {
        // Update colspan jadi 7 karena ada kolom baru
        t.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:1.5rem; color:#666;">No Bookings</td></tr>';
        return;
    }

    t.innerHTML = apps.reverse().map(a => {
        // Tentukan status saat ini
        const currentStatus = a.status || 'Confirmed';
        const isSel = (val) => currentStatus === val ? 'selected' : '';

        // Logika Lokasi: Jika data lama tidak punya lokasi, anggap Virtual (untuk Consultation)
        let displayLocation = a.location;
        if (!displayLocation) {
            // Jika Topic mengandung 'Workshop', tapi location kosong (data lama)
            if (a.topic && a.topic.includes('Workshop')) {
                displayLocation = 'Check Detail'; 
            } else {
                // Default untuk Consultation
                displayLocation = 'Virtual Meeting (Zoom)';
            }
        }

        const statusDropdown = `
            <select class="action-select" onchange="updateAppStatus('${a.id}', this.value)" 
                    style="border-color:${getStatusColor(currentStatus)}; color:${getStatusColor(currentStatus)}">
                <option value="Pending" ${isSel('Pending')}>Pending</option>
                <option value="Confirmed" ${isSel('Confirmed')}>Confirmed</option>
                <option value="Completed" ${isSel('Completed')}>Completed</option>
                <option value="Cancelled" ${isSel('Cancelled')}>Cancelled</option>
            </select>
        `;

        // Kolom DATE & TIME digabung agar rapi seperti request, dan kolom LOCATION ditambahkan
        return `
        <tr>
            <td style="font-family:monospace; color:#666; font-size:0.8rem;">${a.id||'-'}</td>
            <td><strong>${a.name}</strong></td>
            
            <td>
                ${a.date} 
                <br>
                <span style="color:var(--adm-gold); font-size:0.85rem; font-weight:500;">${a.time}</span>
            </td>
            
            <td>${a.topic}</td>
            
            <td style="font-size:0.85rem;">${displayLocation}</td>
            
            <td>${statusDropdown}</td>
            
            <td>
                <button class="btn-link" onclick="alert('Details sent to ${a.name}')">Send Info</button>
            </td>
        </tr>
    `}).join('');
}

// 2. TAMBAHKAN FUNGSI BARU INI DI BAWAHNYA:
window.updateAppStatus = function(id, newStatus) {
    const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Cari index appointment berdasarkan ID
    const index = apps.findIndex(a => a.id === id);
    
    if(index > -1) {
        // Update status
        apps[index].status = newStatus;
        
        // Simpan kembali ke LocalStorage
        localStorage.setItem('appointments', JSON.stringify(apps));
        
        // Refresh tampilan agar warna dropdown berubah sesuai status
        refreshAll(); 
        
        // Opsional: Log ke console
        console.log(`Appointment ${id} status changed to ${newStatus}`);
    }
};

// (Pastikan fungsi helper getStatusColor sudah ada di file Anda, jika belum, tambahkan ini juga:)
function getStatusColor(status) {
    status = (status || '').toLowerCase();
    if(status === 'confirmed' || status === 'delivered' || status === 'completed') return '#2ecc71'; // Hijau
    if(status === 'shipped' || status === 'pending') return '#3498db'; // Biru
    if(status === 'cancelled') return '#e74c3c'; // Merah
    return '#f1c40f'; // Kuning (Default)
}

function loadCustom() {
    const c = document.getElementById('custom-grid');
    if(!c) return;
    const reqs = JSON.parse(localStorage.getItem('customRequests') || '[]');
    
    if(reqs.length === 0) {
        c.innerHTML = '<p style="text-align:center; width:100%; grid-column:1/-1; color:#666;">No custom requests found.</p>';
        return;
    }

    c.innerHTML = reqs.reverse().map(r => `
        <div class="req-card">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <h4 style="margin:0;">${r.name}</h4>
                <small style="color:#666">ID: ${r.id}</small>
            </div>
            <p style="color:#aaa; font-size:0.85rem; line-height:1.6; margin-bottom:15px;">
                <strong>Top:</strong> ${r.formula.top}<br>
                <strong>Heart:</strong> ${r.formula.heart}<br>
                <strong>Base:</strong> ${r.formula.base}
            </p>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="status-badge status-ordered">${r.status||'Placed'}</span>
                <span style="color:var(--adm-gold); font-weight:bold;">${r.price||'Pending'}</span>
            </div>
        </div>
    `).join('');
}

function loadInv() {
    const t = document.getElementById('inventory-table');
    if(!t) return;
    
    // 1. Ambil Data Sales & Data Stock
    const sales = JSON.parse(localStorage.getItem('product_sales') || '{}');
    const stocks = JSON.parse(localStorage.getItem('product_stock') || '{}'); 

    let list = [];
    if(typeof products !== 'undefined') list = Object.keys(products).map(k => ({id:k, ...products[k]}));
    else if(typeof allProductsData !== 'undefined') list = Object.keys(allProductsData).map(k => ({id:k, ...allProductsData[k]}));
    
    t.innerHTML = list.map(p => {
        // PERUBAHAN DISINI: Default jadi 2 jika belum ada data
        const sold = sales[p.id] !== undefined ? sales[p.id] : 2;
        
        // Cek stok (Default 10)
        const currentStock = stocks[p.id] !== undefined ? stocks[p.id] : 10;
        const stockColor = currentStock === 0 ? '#e74c3c' : (currentStock < 5 ? '#f1c40f' : 'var(--adm-gold)');

        return `
            <tr>
                <td><img src="${p.image||p.mainImage}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;"></td>
                <td><strong>${p.name}</strong></td>
                <td style="color:#888">${p.brand}</td>
                <td style="color:#fff">${p.price}</td>
                <td style="color:${stockColor}; font-weight:bold;">${currentStock}</td>
                
                <td>${sold} Sold</td>
            </tr>
        `;
    }).join('');
}

window.clearData = function(k) {
    if(confirm('Are you sure you want to delete all ' + k + ' data? This cannot be undone.')) { 
        localStorage.removeItem(k); 
        if(k === 'orders') localStorage.removeItem('product_sales');
        refreshAll(); 
    }
};

