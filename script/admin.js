// ============================================
// ADMIN DASHBOARD LOGIC (FIXED & FULL VERSION)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Tanggal Hari Ini
    const d = document.getElementById('current-date');
    if(d) {
        d.textContent = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });
    }

    // 2. Load Semua Data Awal
    refreshAll();
});

// Fungsi Utama Refresh Data
function refreshAll() {
    loadStats();
    loadBentoActivity(); 
    
    // Load Tabel untuk setiap halaman
    loadTable('orders-table', 999); // Tabel Orders
    loadUsersTable();               // Tabel Users
    loadApps();                     // Tabel Appointments
    loadCustom();                   // Tabel Bespoke Requests
    loadInv();                      // Tabel Inventory
}

// --- 1. NAVIGATION LOGIC (SWITCH TAB) ---
window.switchTab = function(view, clickedElement) {
    // A. Ganti Tampilan Konten (View)
    document.querySelectorAll('.view-section').forEach(x => x.classList.remove('active'));
    const target = document.getElementById('view-'+view);
    if(target) target.classList.add('active');
    
    // B. Update Sidebar Menu Aktif
    // Cari elemen sidebar yang diklik atau cari berdasarkan atribut onclick
    let sidebarItem = clickedElement;
    if (!clickedElement || !clickedElement.classList.contains('menu-link')) {
        sidebarItem = document.querySelector(`.sidebar-menu .menu-link[onclick*="'${view}'"]`);
    }

    if(sidebarItem) {
        document.querySelectorAll('.menu-link').forEach(x => x.classList.remove('active'));
        sidebarItem.classList.add('active');
        
        // Update Judul Halaman di Topbar
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
};

// --- 2. DASHBOARD WIDGETS (BENTO GRID) ---
function loadBentoActivity() {
    // A. LOAD ORDERS WIDGET
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderBox = document.getElementById('bento-orders');
    if (orderBox) {
        if (orders.length === 0) {
            orderBox.innerHTML = '<p style="color:#666; font-size:0.8rem; padding:1rem;">No recent orders.</p>';
        } else {
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

    // B. LOAD APPOINTMENTS WIDGET
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

    // C. LOAD CUSTOM REQUESTS WIDGET
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

// --- 3. HELPER FUNCTIONS ---

function getStatusColor(status) {
    status = (status || '').toLowerCase();
    if(status === 'confirmed' || status === 'delivered' || status === 'completed') return '#2ecc71'; // Hijau
    if(status === 'shipped' || status === 'pending' || status === 'in review' || status === 'blending') return '#3498db'; // Biru
    if(status === 'cancelled') return '#e74c3c'; // Merah
    return '#f1c40f'; // Kuning (Default/Ordered)
}

function loadStats() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Hitung Revenue (Total Penjualan)
    const rev = orders.reduce((sum, o) => {
        return sum + (parseFloat(String(o.total).replace(/[^0-9.-]+/g,"")) || 0);
    }, 0);
    
    const setText = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    
    setText('stat-revenue', `$${rev.toLocaleString(undefined, {minimumFractionDigits: 2})}`);
    setText('stat-users', users.length);
    setText('stat-appointments', apps.length);
    setText('stat-orders', orders.length);
}

window.clearData = function(k) {
    if(confirm('Are you sure you want to delete all ' + k + ' data? This cannot be undone.')) { 
        localStorage.removeItem(k); 
        if(k === 'orders') localStorage.removeItem('product_sales');
        refreshAll(); 
    }
};

// --- 4. USER MANAGEMENT TABLE ---
function loadUsersTable() {
    const tbody = document.getElementById('users-table');
    if(!tbody) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if(users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:1.5rem; color:#666;">No registered users found.</td></tr>';
        return;
    }

    tbody.innerHTML = users.map((u, index) => {
        const uid = u.id || `user-${index}`;
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
            <td><span class="toggle-icon" id="icon-${uid}">▼</span></td>
        </tr>
        <tr id="detail-${uid}" class="user-detail-row" style="display:none;">
            <td colspan="6">
                <div class="user-detail-content">
                    <div class="detail-grid">
                        <div class="detail-item"><span class="label">User ID</span><span class="value">${uid}</span></div>
                        <div class="detail-item"><span class="label">Postal Code</span><span class="value">${u.postalCode || '-'}</span></div>
                        <div class="detail-item"><span class="label">Phone</span><span class="value">${u.phone || 'Not set'}</span></div>
                        <div class="detail-item"><span class="label">Address</span><span class="value">${u.address || 'Not set'}</span></div>
                    </div>
                    <div class="detail-actions">
                        <button class="btn-danger" onclick="deleteUser('${u.email}')">Delete User</button>
                    </div>
                </div>
            </td>
        </tr>
    `}).join('');
}

window.toggleUserRow = function(uid) {
    const row = document.getElementById(`detail-${uid}`);
    const icon = document.getElementById(`icon-${uid}`);
    if (row.style.display === 'none') {
        row.style.display = 'table-row';
        if(icon) icon.style.transform = 'rotate(180deg)';
    } else {
        row.style.display = 'none';
        if(icon) icon.style.transform = 'rotate(0deg)';
    }
};

window.deleteUser = function(email) {
    if(confirm(`Are you sure you want to delete user ${email}?`)) {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(users));
        refreshAll();
    }
};

// --- 5. ORDER MANAGEMENT TABLE ---
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

// --- 6. APPOINTMENTS (SERVICES) TABLE ---
function loadApps() {
    const t = document.getElementById('appointments-table');
    if(!t) return;
    
    const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    if(apps.length === 0) {
        t.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:1.5rem; color:#666;">No Bookings</td></tr>';
        return;
    }

    t.innerHTML = apps.reverse().map(a => {
        const currentStatus = a.status || 'Confirmed';
        const isSel = (val) => currentStatus === val ? 'selected' : '';
        const statusColor = getStatusColor(currentStatus);

        const statusDropdown = `
            <select class="action-select" onchange="updateAppStatus('${a.id}', this.value)" 
                    style="border-color:${statusColor}; color:${statusColor}">
                <option value="Pending" ${isSel('Pending')}>Pending</option>
                <option value="Confirmed" ${isSel('Confirmed')}>Confirmed</option>
                <option value="Completed" ${isSel('Completed')}>Completed</option>
                <option value="Cancelled" ${isSel('Cancelled')}>Cancelled</option>
            </select>
        `;

        let displayLocation = a.location;
        if (!displayLocation) {
            if (a.topic && a.topic.includes('Workshop')) displayLocation = 'Check Detail'; 
            else displayLocation = 'Virtual Meeting (Zoom)';
        }

        return `
        <tr>
            <td style="font-family:monospace; color:#666; font-size:0.8rem;">${a.id||'-'}</td>
            <td><strong>${a.name}</strong></td>
            <td>${a.date} <br><span style="color:var(--adm-gold); font-size:0.85rem; font-weight:500;">${a.time}</span></td>
            <td>${a.topic}</td>
            <td style="font-size:0.85rem;">${displayLocation}</td>
            <td>${statusDropdown}</td>
        </tr>
    `}).join('');
}

window.updateAppStatus = function(id, newStatus) {
    const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    const index = apps.findIndex(a => a.id === id);
    if(index > -1) {
        apps[index].status = newStatus;
        localStorage.setItem('appointments', JSON.stringify(apps));
        refreshAll();
    }
};

// --- 7. BESPOKE REQUESTS (CUSTOM PARFUM) ---
function loadCustom() {
    const container = document.getElementById('custom-grid');
    if(!container) return;
    
    const reqs = JSON.parse(localStorage.getItem('customRequests') || '[]');
    
    if(reqs.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%; grid-column:1/-1; color:#666; padding: 2rem;">No custom requests found.</p>';
        return;
    }

    container.innerHTML = reqs.reverse().map(r => {
        const currentStatus = r.status || 'Order Placed';
        const isSel = (val) => currentStatus === val ? 'selected' : '';
        const statusColor = getStatusColor(currentStatus);
        const uName = r.customerName || 'Guest User';
        const uEmail = r.customerEmail || '-';

        return `
        <div class="req-card" style="background: #121212; border: 1px solid #333; border-radius: 8px; padding: 1.2rem; display: flex; flex-direction: column; gap: 1rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid #2a2a2a; padding-bottom:10px;">
                <div>
                    <h4 style="margin:0; color:var(--adm-gold); font-size: 1.1rem; font-family: 'Playfair Display', serif;">${r.name}</h4>
                    <span style="color:#666; font-family:monospace; font-size: 0.8rem;">ID: ${r.id}</span>
                </div>
                <div style="text-align:right;">
                    <strong style="display:block; font-size:1.1rem; color: #fff;">${r.price || '$0'}</strong>
                    <small style="color:#888; font-size: 0.75rem;">${new Date(r.date).toLocaleDateString()}</small>
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 10px; border-radius: 6px; border: 1px dashed #333;">
                <div style="color: #eee; font-weight: 600; font-size: 0.9rem; margin-bottom: 2px;">👤 ${uName}</div>
                <div style="color: #888; font-size: 0.8rem;">📧 ${uEmail}</div>
            </div>
            <div style="font-size: 0.85rem; color: #ccc; line-height: 1.6;">
                <div style="display:flex;"><span style="color:#666; width: 60px;">Top:</span> <span>${r.formula.top}</span></div>
                <div style="display:flex;"><span style="color:#666; width: 60px;">Heart:</span> <span>${r.formula.heart}</span></div>
                <div style="display:flex;"><span style="color:#666; width: 60px;">Base:</span> <span>${r.formula.base}</span></div>
                <div style="margin-top: 5px; padding-top:5px; border-top: 1px solid #222; color: #888;">Bottle Size: <span style="color: #fff;">${r.formula.size || '50ml'}</span></div>
            </div>
            <div style="margin-top: auto;">
                <label style="font-size: 0.7rem; color: #555; display: block; margin-bottom: 4px; text-transform:uppercase; letter-spacing:1px;">Update Status</label>
                <select onchange="updateCustomStatus('${r.id}', this.value)" 
                        style="width:100%; padding: 8px 12px; background: #000; border: 1px solid ${statusColor}; color: ${statusColor}; border-radius: 4px; font-weight: 600; cursor: pointer; outline: none;">
                    <option value="Order Placed" ${isSel('Order Placed')}>Order Placed</option>
                    <option value="In Review" ${isSel('In Review')}>In Review</option>
                    <option value="Blending" ${isSel('Blending')}>Blending</option>
                    <option value="Shipped" ${isSel('Shipped')}>Shipped</option>
                    <option value="Delivered" ${isSel('Delivered')}>Delivered</option>
                    <option value="Cancelled" ${isSel('Cancelled')}>Cancelled</option>
                </select>
            </div>
        </div>
    `}).join('');
}

window.updateCustomStatus = function(id, newStatus) {
    const reqs = JSON.parse(localStorage.getItem('customRequests') || '[]');
    const index = reqs.findIndex(r => r.id === id);
    if(index > -1) {
        reqs[index].status = newStatus;
        localStorage.setItem('customRequests', JSON.stringify(reqs));
        refreshAll(); 
    }
};

// --- 8. INVENTORY (STOCK MANAGEMENT) ---
function loadInv() {
    const t = document.getElementById('inventory-table');
    if(!t) return;
    
    // Ambil Data Sales & Stok
    const sales = JSON.parse(localStorage.getItem('product_sales') || '{}');
    const stocks = JSON.parse(localStorage.getItem('product_stock') || '{}'); 

    // Ambil Data Produk (Cek dari main.js atau data.js)
    let list = [];
    if(typeof products !== 'undefined') {
        list = Object.keys(products).map(k => ({id:k, ...products[k]}));
    } else if(typeof allProductsData !== 'undefined') {
        list = Object.keys(allProductsData).map(k => ({id:k, ...allProductsData[k]}));
    }
    
    if (list.length === 0) {
        t.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:1.5rem; color:#666;">No products found in database.<br><small>Pastikan script/main.js sudah di-include di admin.html</small></td></tr>';
        return;
    }
    
    t.innerHTML = list.map(p => {
        const sold = sales[p.id] !== undefined ? sales[p.id] : 2;
        const currentStock = stocks[p.id] !== undefined ? stocks[p.id] : 10;
        
        let stockColor = '#2ecc71'; 
        if(currentStock < 5) stockColor = '#f1c40f'; 
        if(currentStock === 0) stockColor = '#e74c3c'; 

        return `
            <tr>
                <td><img src="${p.image || p.mainImage}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;"></td>
                <td><strong>${p.name}</strong></td>
                <td style="color:#888">${p.brand || 'Lumière'}</td>
                <td style="color:#fff">${p.price}</td>
                <td>
                    <div style="display:flex; align-items:center; gap: 8px;">
                        <span style="color:${stockColor}; font-weight:bold; font-size:1rem; min-width:20px;">${currentStock}</span>
                        <button onclick="editStock('${p.id}', ${currentStock})" 
                                style="background:none; border:none; cursor:pointer; font-size:1.1rem; opacity:0.7;" 
                                title="Edit Stock">✏️</button>
                    </div>
                </td>
                <td>${sold} Sold</td>
            </tr>
        `;
    }).join('');
}

window.editStock = function(productId, oldStock) {
    const newStockStr = prompt(`Update stock for this product:`, oldStock);
    if (newStockStr === null) return; 
    
    const newStock = parseInt(newStockStr);
    if (isNaN(newStock) || newStock < 0) {
        alert("Please enter a valid positive number.");
        return;
    }

    const stocks = JSON.parse(localStorage.getItem('product_stock') || '{}');
    stocks[productId] = newStock;
    localStorage.setItem('product_stock', JSON.stringify(stocks));
    
    // Refresh table
    loadInv();
};