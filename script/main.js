// ============================================
// 2. UTILITY FUNCTIONS
// ============================================

    function goToProduct(productId) {
        window.location.href = `product_detail.html?id=${productId}`;
    }

// ============================================
// 3. HEADER & NAVIGATION
// ============================================

    function setupHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    function setupNavigationIcons() {
        const iconButtons = document.querySelectorAll('.icon-btn');
        
        // Search button (1st icon)
        if (iconButtons[0]) {
            iconButtons[0].addEventListener('click', () => {
                openSearch();
            });
        }
        
        // Profile button (2nd icon)
        if (iconButtons[1]) {
            iconButtons[1].addEventListener('click', () => {
                window.location.href = 'profile.html';
            });
        }
        
        // Wishlist button (3rd icon)
        if (iconButtons[2]) {
            iconButtons[2].addEventListener('click', () => {
                window.location.href = 'wishlist.html';
            });
        }
        
        // Cart button (4th icon)
        if (iconButtons[3]) {
            iconButtons[3].addEventListener('click', () => {
                window.location.href = 'cart.html';
            });
        }
    }

// ============================================
// 4. SEARCH FUNCTIONALITY
// ============================================

    function openSearch() {
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.getElementById('searchInput');
        
        if (!searchOverlay) return;
        
        showPopularSearches();
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 300);
    }

    function closeSearch() {
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.getElementById('searchInput');
        
        if (!searchOverlay) return;
        
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (searchInput) searchInput.value = '';
        showPopularSearches();
    }

    function performSearch(query) {
        if (!query.trim()) {
            showPopularSearches();
            return;
        }

        const searchTerm = query.toLowerCase();
        const results = [];

        for (const [id, product] of Object.entries(products)) {
            const searchableText = `${product.name} ${product.description} ${product.keywords}`.toLowerCase();
            if (searchableText.includes(searchTerm)) {
                results.push({ id, ...product });
            }
        }

        displayResults(results);
    }

    function displayResults(results) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>No results found</h3>
                    <p>Try searching for something else</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = results.map(product => `
            <div class="search-result-item" onclick="goToProduct('${product.id}')">
                <img src="${product.image}" alt="${product.name}" class="result-image">
                <div class="result-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="result-price">${product.price}</div>
                </div>
            </div>
        `).join('');
    }

    function showPopularSearches() {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        searchResults.innerHTML = `
            <div class="popular-searches">
                <h3>Popular Searches</h3>
                <div class="popular-tags">
                    <span class="popular-tag" data-search="amber">Amber</span>
                    <span class="popular-tag" data-search="oud">Oud</span>
                    <span class="popular-tag" data-search="floral">Floral</span>
                    <span class="popular-tag" data-search="citrus">Citrus</span>
                    <span class="popular-tag" data-search="luxury">Luxury</span>
                    <span class="popular-tag" data-search="rose">Rose</span>
                </div>
            </div>
        `;

        document.querySelectorAll('.popular-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                const searchTerm = this.getAttribute('data-search');
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.value = searchTerm;
                    performSearch(searchTerm);
                }
            });
        });
    }

    function setupSearchListeners() {
        const closeSearchBtn = document.getElementById('closeSearch');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.getElementById('searchInput');

        if (closeSearchBtn) {
            closeSearchBtn.addEventListener('click', closeSearch);
        }

        if (searchOverlay) {
            searchOverlay.addEventListener('click', function(e) {
                if (e.target === searchOverlay) {
                    closeSearch();
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                performSearch(e.target.value);
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });
    }

// ============================================
// 5. CART MANAGEMENT
// ============================================

    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.getElementById('cart-badge');
        
        if (badge) {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    class ShoppingCartManager {
        constructor() {
            this.cart = this.loadCart();
            
            // --- [BARU] Load data diskon tersimpan ---
            const savedDiscount = JSON.parse(localStorage.getItem('cart_discount') || '{"code": "", "percent": 0}');
            this.discount = savedDiscount.percent;
            this.appliedCode = savedDiscount.code;
            // -----------------------------------------

            this.render();
            this.updateBadge();
        }

        loadCart() {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        }

        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateBadge();
        }

        // --- [BARU] Method untuk apply diskon ---
        applyDiscount(code, percent) {
            this.discount = percent;
            this.appliedCode = code;
            
            // Simpan ke storage agar tidak hilang saat refresh
            localStorage.setItem('cart_discount', JSON.stringify({ code, percent }));
            
            this.render();
        }
        // ----------------------------------------

        addToCart(productId, quantity = 1, size = '50ml') {
            const existingItem = this.cart.find(item => item.id === productId && item.size === size);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.cart.push({ id: productId, quantity, size });
            }
            
            this.saveCart();
            this.render();
        }

        updateQuantity(productId, size, newQuantity) {
            const item = this.cart.find(item => item.id === productId && item.size === size);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeFromCart(productId, size);
                } else {
                    item.quantity = newQuantity;
                    this.saveCart();
                    this.render();
                }
            }
        }

        removeFromCart(productId, size) {
            this.cart = this.cart.filter(item => !(item.id === productId && item.size === size));
            this.saveCart();
            this.render();
        }

        clearCart() {
            if (confirm('Are you sure you want to clear your cart?')) {
                this.cart = [];
                // Reset diskon juga saat cart di-clear
                this.discount = 0;
                this.appliedCode = '';
                localStorage.removeItem('cart_discount');
                
                this.saveCart();
                this.render();
            }
        }

        getSubtotal() {
            return this.cart.reduce((total, item) => {
                // [FIX] Logika pengambilan data produk yang lebih aman (seperti fix sebelumnya)
                let product = products[item.id];
                if (!product && typeof allProductsData !== 'undefined') {
                    product = allProductsData[item.id];
                }
                return total + (product ? product.priceNum * item.quantity : 0);
            }, 0);
        }

        // --- [UPDATED] Hitung Total dengan Diskon ---
        getTotal() {
            const subtotal = this.getSubtotal();
            const discountAmount = subtotal * (this.discount / 100);
            const discountedSubtotal = subtotal - discountAmount;
            
            const shipping = subtotal > 0 ? 10 : 0;
            const tax = discountedSubtotal * 0.1; // Pajak dari harga setelah diskon
            
            return discountedSubtotal + shipping + tax;
        }
        // --------------------------------------------

        updateBadge() {
            if (typeof updateCartBadge === 'function') updateCartBadge();
        }

        render() {
            const container = document.getElementById('cart-content');
            if (!container) return;
            
            if (this.cart.length === 0) {
                container.innerHTML = `
                    <div class="empty-cart fade-in">
                        <div class="empty-icon"></div>
                        <h2>Your Cart is Empty</h2>
                        <p>Looks like you haven't added anything to your cart yet</p>
                        <button class="btn-shop-now" onclick="window.location.href='shop.html'">Shop Now</button>
                    </div>
                `;
                return;
            }

            const itemsHtml = this.cart.map(item => {
                let product = products[item.id];
                // Fallback data logic
                if (typeof allProductsData !== 'undefined' && allProductsData[item.id]) {
                    if (!product) product = allProductsData[item.id];
                    else if (!product.image && allProductsData[item.id].mainImage) {
                         product.image = allProductsData[item.id].mainImage;
                    }
                }
                
                if (!product) return '';
                
                const imgSrc = product.image || product.mainImage || 'https://via.placeholder.com/80';
                
                return `
                    <div class="cart-item">
                        <img src="${imgSrc}" alt="${product.name}" class="item-image" onclick="goToProduct('${item.id}')">
                        <div class="item-details">
                            <div class="item-name" onclick="goToProduct('${item.id}')">${product.name}</div>
                            <div class="item-size">Size: ${item.size}</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', '${item.size}', ${item.quantity - 1})">−</button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', '${item.size}', ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <div class="item-actions">
                            <div class="item-price">$${(product.priceNum * item.quantity).toFixed(2)}</div>
                            <button class="remove-item" onclick="cartManager.removeFromCart('${item.id}', '${item.size}')">Remove</button>
                        </div>
                    </div>
                `;
            }).join('');

            // --- PERHITUNGAN UNTUK TAMPILAN ---
            const subtotal = this.getSubtotal();
            const discountAmount = subtotal * (this.discount / 100);
            const discountedSubtotal = subtotal - discountAmount;
            
            const shipping = subtotal > 0 ? 10 : 0;
            const tax = discountedSubtotal * 0.1;
            const total = discountedSubtotal + shipping + tax;
            // ----------------------------------

            container.innerHTML = `
                <div class="cart-content fade-in">
                    <div class="cart-items">
                        ${itemsHtml}
                    </div>
                    
                    <div class="cart-summary">
                        <h2 class="summary-title">Order Summary</h2>
                        
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span>$${subtotal.toFixed(2)}</span>
                        </div>
                        
                        ${this.discount > 0 ? `
                        <div class="summary-row discount" style="color: var(--gold); font-weight: 500;">
                            <span>Discount (${this.appliedCode} - ${this.discount}%)</span>
                            <span>-$${discountAmount.toFixed(2)}</span>
                        </div>
                        ` : ''}
                        
                        <div class="summary-row">
                            <span>Shipping</span>
                            <span>$${shipping.toFixed(2)}</span>
                        </div>
                        
                        <div class="summary-row">
                            <span>Tax (10%)</span>
                            <span>$${tax.toFixed(2)}</span>
                        </div>
                        
                        <div class="summary-row total">
                            <span>Total</span>
                            <span>$${total.toFixed(2)}</span>
                        </div>
                        
                        <div class="promo-code">
                            <input type="text" class="promo-input" placeholder="Enter promo code" id="promoInput">
                            <button class="btn-apply" onclick="applyPromoCode()">Apply Code</button>
                        </div>
                        
                        <button class="btn-checkout" onclick="window.location.href='checkout.html'">Proceed to Checkout</button>
                        <button class="btn-continue" onclick="window.location.href='shop.html'">Continue Shopping</button>
                    </div>
                </div>
            `;
        }
    }

    function applyPromoCode() {
        const input = document.getElementById('promoInput');
        if (!input) return;
        
        const code = input.value.trim().toUpperCase();
        
        const validCodes = {
            'SAVE10': 10,
            'LUXURY20': 20,
            'WELCOME15': 15
        };
        
        if (validCodes[code]) {
            // Cek apakah cartManager tersedia
            if (typeof cartManager !== 'undefined') {
                cartManager.applyDiscount(code, validCodes[code]);
                
                // Gunakan showNotification jika ada, atau alert biasa
                if (typeof showNotification === 'function') {
                    showNotification(`Promo code ${code} applied! You saved ${validCodes[code]}%`, 'success');
                } else {
                    alert(`Promo code applied! You saved ${validCodes[code]}%`);
                }
                
                input.value = '';
            }
        } else if (code) {
            if (typeof showNotification === 'function') {
                showNotification('Invalid promo code. Try SAVE10, LUXURY20, or WELCOME15', 'error');
            } else {
                alert('Invalid promo code. Try SAVE10, LUXURY20, or WELCOME15');
            }
        }
    }

    function checkout() {
        alert('Proceeding to checkout... (This would redirect to checkout page)');
    }

// ============================================
// 6. WISHLIST MANAGEMENT
// ============================================

    function updateWishlistBadge() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const badge = document.getElementById('wishlist-badge');
        
        if (badge) {
            badge.textContent = wishlist.length;
            badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
        }
    }

    class WishlistManager {
        constructor() {
            this.wishlist = this.loadWishlist();
            this.render();
            this.updateBadge();
        }

        loadWishlist() {
            const saved = localStorage.getItem('wishlist');
            return saved ? JSON.parse(saved) : [];
        }

        saveWishlist() {
            localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
            this.updateBadge();
        }

        addToWishlist(productId) {
            if (!this.wishlist.includes(productId)) {
                this.wishlist.push(productId);
                this.saveWishlist();
                this.render();
            }
        }

        removeFromWishlist(productId) {
            this.wishlist = this.wishlist.filter(id => id !== productId);
            this.saveWishlist();
            this.render();
        }

        clearWishlist() {
            {
                this.wishlist = [];
                this.saveWishlist();
                this.render();
            }
        }

        updateBadge() {
            updateWishlistBadge();
        }

        render() {
            const container = document.getElementById('wishlist-content');
            if (!container) return;
            
            if (this.wishlist.length === 0) {
                container.innerHTML = `
                    <div class="empty-wishlist fade-in">
                        <div class="empty-icon">💛</div>
                        <h2>Your Wishlist is Empty</h2>
                        <p>Start adding your favorite fragrances to your wishlist</p>
                        <button class="btn-shop-now" onclick="window.location.href='shop.html'">Shop Now</button>
                    </div>
                `;
                return;
            }

            const productsHtml = this.wishlist.map(productId => {
                const product = products[productId];
                if (!product) return '';
                
                return `
                    <div class="wishlist-item fade-in">
                        <div class="wishlist-image" style="background-image: url('${product.image}');" onclick="goToProduct('${productId}')">
                            <button class="remove-btn" onclick="event.stopPropagation(); wishlistManager.removeFromWishlist('${productId}')">×</button>
                        </div>
                        <div class="wishlist-info">
                            <div class="wishlist-name" onclick="goToProduct('${productId}')">${product.name}</div>
                            <div class="wishlist-rating">
                                <span class="stars">${product.ratingStars}</span>
                                <span class="rating-count">(${product.ratingCount})</span>
                            </div>
                            <div class="wishlist-price">${product.price}</div>
                            <button class="btn-add-to-cart" onclick="addToCartFromWishlist('${productId}')">Add to Cart</button>
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML = `
                <div class="wishlist-actions fade-in">
                    <div class="wishlist-count">
                        <span>${this.wishlist.length} ${this.wishlist.length === 1 ? 'Item' : 'Items'}</span> in your wishlist
                    </div>
                    <button class="btn-clear-all" onclick="wishlistManager.clearWishlist()">Clear All</button>
                </div>
                <div class="wishlist-grid">
                    ${productsHtml}
                </div>
            `;
        }
    }

    function addToCartFromWishlist(productId) {
        const product = products[productId];
        if (!product) return;
        
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1, size: '50ml' });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        
        showNotification(`${product.name} has been added to your cart!`);
    }

// ============================================
// 7. SMOOTH SCROLLING & ANIMATIONS
// ============================================

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if(target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('product-card') || 
                        entry.target.classList.contains('collection-card')) {
                        const cards = Array.from(entry.target.parentNode.children);
                        const cardIndex = cards.indexOf(entry.target);
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, cardIndex * 100);
                    } else {
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });

        const elementsToReveal = document.querySelectorAll('.reveal-on-scroll, .fade-in');
        elementsToReveal.forEach(el => {
            observer.observe(el);
        });
    }

    function setupLoadingAnimation() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
    }

// ============================================
// 8. PRELOADER Animation
// ============================================

    function initPreloaderAnimations() {
        // PRELOADER LOGIC
        // Menghilangkan preloader setelah halaman sepenuhnya dimuat
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    
                    // Mulai animasi teks Hero setelah preloader hilang
                    const heroTitle = document.querySelector('.hero h1');
                    if(heroTitle) heroTitle.style.animationPlayState = 'running';
                }, 1500); // Durasi tampil preloader (1.5 detik)
            }
        });
    }

// ============================================
// 9. PROFILE PAGE FUNCTIONALITY 
// ============================================

    function setupProfilePage() {
        // 1. Setup Edit Profile button
        const editProfileBtn = document.getElementById('btn-edit-profile');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', toggleEditMode);
        }
        
        // 2. Setup Sign Out button
        const signOutBtn = document.getElementById('btn-signout');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if(confirm('Are you sure you want to sign out?')) {
                    // Optional: localStorage.clear(); 
                    window.location.href = 'index.html';
                }
            });
        }
        
        // 3. Load user profile data
        loadUserProfile();
        
        // 4. Load recent orders
        loadRecentOrders();
    }

    function toggleEditMode() {
        const editBtn = document.getElementById('btn-edit-profile');
        const inputs = document.querySelectorAll('#profile-form input, #profile-form textarea');
        
        const isEditing = editBtn.textContent === 'Save Changes';
        
        if (isEditing) {
            // --- SAVE MODE ---
            
            const profileData = {
                firstName: document.getElementById('profile-fname').value,
                lastName: document.getElementById('profile-lname').value,
                email: document.getElementById('profile-email').value,
                phone: document.getElementById('profile-phone').value,
                address: document.getElementById('addr-street').value,
                city: document.getElementById('addr-city').value,
                postalCode: document.getElementById('addr-postal').value, // Ambil input postal code
                country: document.getElementById('addr-country').value,
                bio: document.getElementById('profile-bio').value
            };
            
            // Simpan ke Session Profile
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            
            // Simpan ke Database Users (Untuk Admin)
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const currentSessionEmail = localStorage.getItem('userEmail');
            
            const userIndex = users.findIndex(u => u.email === currentSessionEmail);
            
            if (userIndex !== -1) {
                users[userIndex].name = `${profileData.firstName} ${profileData.lastName}`.trim();
                users[userIndex].email = profileData.email;
                users[userIndex].phone = profileData.phone;
                
                // Simpan Postal Code secara terpisah agar bisa dibaca Admin
                users[userIndex].postalCode = profileData.postalCode; 
                
                const fullAddr = [
                    profileData.address,
                    profileData.city,
                    profileData.country
                ].filter(Boolean).join(', ');
                
                users[userIndex].address = fullAddr;
                
                localStorage.setItem('users', JSON.stringify(users));
                
                if (currentSessionEmail !== profileData.email) {
                    localStorage.setItem('userEmail', profileData.email);
                }
            }
            
            // ... (Kode reset tampilan input & tombol tetap sama) ...
            inputs.forEach(input => {
                input.readOnly = true;
                input.style.borderBottom = '1px solid #333';
            });
            
            editBtn.textContent = 'Edit Profile';
            editBtn.style.background = '';
            editBtn.style.color = '';
            
            updateProfileName(profileData.firstName, profileData.lastName, profileData.email);
            showNotification('Profile updated successfully!', 'success');
            
        } else {
            // ... (Mode Edit tetap sama) ...
            inputs.forEach(input => {
                input.readOnly = false;
                input.style.borderBottom = '1px solid var(--gold)';
            });
            document.getElementById('profile-fname').focus();
            editBtn.textContent = 'Save Changes';
            editBtn.style.background = 'var(--gold)';
            editBtn.style.color = '#000';
        }
    }

    function loadUserProfile() {
        const savedProfile = localStorage.getItem('userProfile');
        // Default data jika pengguna belum pernah edit profile
        const defaultData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@email.com',
            phone: '+62 812-3456-7890',
            address: '',
            city: '',
            postalCode: '',
            country: '',
            bio: ''
        };

        const profile = savedProfile ? JSON.parse(savedProfile) : defaultData;
        
        // Helper function untuk set value jika elemen ada
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if(el) el.value = val || '';
        };

        setVal('profile-fname', profile.firstName);
        setVal('profile-lname', profile.lastName);
        setVal('profile-email', profile.email);
        setVal('profile-phone', profile.phone);
        setVal('addr-street', profile.address);
        setVal('addr-city', profile.city);
        setVal('addr-postal', profile.postalCode);
        setVal('addr-country', profile.country);
        setVal('profile-bio', profile.bio);

        updateProfileName(profile.firstName, profile.lastName, profile.email);
        
        // Pastikan input read-only saat awal load
        const inputs = document.querySelectorAll('#profile-form input, #profile-form textarea');
        inputs.forEach(input => input.readOnly = true);
    }

    function updateProfileName(firstName, lastName, email) {
        const nameElement = document.querySelector('.profile-name');
        const emailElement = document.querySelector('.profile-email');
        
        if (nameElement) nameElement.textContent = `${firstName} ${lastName}`;
        if (emailElement) emailElement.textContent = email;
    }

    function loadRecentOrders() {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderList = document.querySelector('.order-list');
        
        if (!orderList) return;

        // Reset konten
        orderList.innerHTML = '';

        if (orders.length === 0) {
            orderList.innerHTML = `
                <div style="text-align:center; padding: 2rem; color: #666;">
                    <p>No recent orders found.</p>
                    <a href="shop.html" style="color: var(--gold); text-decoration: none; font-size: 0.9rem;">Start Shopping</a>
                </div>`;
            return;
        }
        
        // Ambil 2 order terbaru
        const recentOrders = [...orders].reverse().slice(0, 2);

        // --- DATA PENGGUNA & REVIEW UNTUK PENGECEKAN ---
        const allReviews = JSON.parse(localStorage.getItem('product_reviews') || '{}');
        const userProfile = JSON.parse(localStorage.getItem('userProfile')) || { firstName: 'Customer', lastName: '' };
        const currentUser = `${userProfile.firstName} ${userProfile.lastName}`.trim() || 'Anonymous';
        // -----------------------------------------------
        
        orderList.innerHTML = recentOrders.map(order => {
            const orderDate = new Date(order.date).toLocaleDateString('en-US', { 
                year: 'numeric', month: 'short', day: 'numeric' 
            });
            
            // LOGIKA WARNA HIJAU: Jika status Ordered atau Delivered, tambahkan class 'delivered' (hijau)
            const statusClass = (order.status === 'Delivered' || order.status === 'Ordered') ? 'delivered' : '';

            const itemsHtml = order.items.map(item => {
                const product = products[item.id];
                const img = product ? product.image : 'https://via.placeholder.com/60';
                const name = product ? product.name : 'Unknown Product';
                
                // --- LOGIKA BARU: CEK REVIEW BERDASARKAN ORDER ID ---
                const productReviews = allReviews[item.id] || [];
                
                // Cek: Apakah user ini sudah review produk ini PADA ORDER INI?
                const hasReviewed = productReviews.some(r => r.author === currentUser && r.orderId === order.orderNumber);

                let reviewBtn;
                if (hasReviewed) {
                    // Tampilan jika SUDAH review untuk order ini
                    reviewBtn = `
                        <button disabled 
                                style="margin-top:0.5rem; padding:0.3rem 0.8rem; font-size:0.75rem; 
                                       border:1px solid #444; background:#333; 
                                       color:#888; cursor:not-allowed; border-radius:50px;">
                            Reviewed ✓
                        </button>
                    `;
                } else {
                    // Tampilan jika BELUM review untuk order ini (Kirim Order ID ke fungsi modal)
                    reviewBtn = `
                        <button onclick="openReviewModal('${item.id}', '${name}', '${img}', '${order.orderNumber}')" 
                                style="margin-top:0.5rem; padding:0.3rem 0.8rem; font-size:0.75rem; 
                                       border:1px solid var(--gold); background:transparent; 
                                       color:var(--gold); cursor:pointer; border-radius:50px; transition:0.3s;">
                            Write Review
                        </button>
                    `;
                }
                // -----------------------------------------------

                return `
                    <div class="order-item">
                        <img src="${img}" class="item-img" alt="${name}">
                        <div class="item-info">
                            <h4>${name}</h4>
                            <p>${item.quantity} x ${item.size || '50ml'}</p>
                            ${reviewBtn}
                        </div>
                    </div>
                `;
            }).join('');

            return `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id">Order #${order.orderNumber}</span>
                        <span class="order-status ${statusClass}">${order.status}</span>
                    </div>
                    ${itemsHtml}
                    <div class="order-footer">
                        <span class="order-date">Placed on ${orderDate}</span>
                        <span class="order-total">${order.total}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    function showAllOrders() {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        if (orders.length === 0) {
            showNotification('You have no orders yet!', 'info');
            return;
        }
        
        // --- DATA PENGGUNA & REVIEW UNTUK PENGECEKAN ---
        const allReviews = JSON.parse(localStorage.getItem('product_reviews') || '{}');
        const userProfile = JSON.parse(localStorage.getItem('userProfile')) || { firstName: 'Customer', lastName: '' };
        const currentUser = `${userProfile.firstName} ${userProfile.lastName}`.trim() || 'Anonymous';
        // -----------------------------------------------

        // Create modal for all orders
        const modal = document.createElement('div');
        modal.className = 'order-modal search-overlay active'; 
        modal.style.display = 'flex';
        
        modal.innerHTML = `
            <div class="search-container" style="background: #000; padding: 2rem; border-radius: 20px; border: 1px solid var(--gold-dark); max-height: 80vh; overflow-y: auto;">
                <div class="search-header">
                    <h2>All Orders</h2>
                    <button class="close-search" onclick="closeOrderModal()">×</button>
                </div>
                <div class="order-list">
                    ${[...orders].reverse().map(order => {
                        const orderDate = new Date(order.date).toLocaleDateString('en-US', { 
                            year: 'numeric', month: 'short', day: 'numeric' 
                        });
                        
                        // LOGIKA WARNA HIJAU: Ordered atau Delivered = Hijau
                        const statusClass = (order.status === 'Delivered' || order.status === 'Ordered') ? 'delivered' : '';

                        return `
                            <div class="order-card" style="margin-bottom: 2rem;">
                                <div class="order-header">
                                    <span class="order-id">#${order.orderNumber}</span>
                                    <span class="order-status ${statusClass}">${order.status}</span>
                                </div>
                                ${order.items.map(item => {
                                    const product = products[item.id];
                                    const img = product ? product.image : '';
                                    const name = product ? product.name : 'Unknown';
                                    
                                    // --- LOGIKA REVIEW PER ORDER ---
                                    const productReviews = allReviews[item.id] || [];
                                    const hasReviewed = productReviews.some(r => r.author === currentUser && r.orderId === order.orderNumber);

                                    let reviewBtn;
                                    if (hasReviewed) {
                                        reviewBtn = `<button disabled style="font-size:0.7rem; padding: 2px 8px; border:1px solid #444; background:#333; color:#888; border-radius:4px; margin-top:5px; cursor:not-allowed;">Reviewed ✓</button>`;
                                    } else {
                                        reviewBtn = `<button onclick="openReviewModal('${item.id}', '${name}', '${img}', '${order.orderNumber}')" style="font-size:0.7rem; padding: 2px 8px; border:1px solid var(--gold); background:transparent; color:var(--gold); border-radius:4px; margin-top:5px; cursor:pointer;">Write Review</button>`;
                                    }

                                    return `
                                        <div class="order-item">
                                            <img src="${img}" class="item-img" alt="${name}">
                                            <div class="item-info">
                                                <h4>${name}</h4>
                                                <p>Qty: ${item.quantity}</p>
                                                ${reviewBtn}
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                                <div class="order-footer">
                                    <span class="order-date">${orderDate}</span>
                                    <span class="order-total">${order.total}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }

    function closeOrderModal() {
        const modal = document.querySelector('.order-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ============================================
// 21. PROFILE SERVICES INTEGRATION
// ============================================

// Fungsi untuk ganti Tab di halaman Profile
function switchProfileTab(tabName) {
    // 1. Update State Menu Sidebar
    document.querySelectorAll('.profile-menu a').forEach(el => el.classList.remove('active'));
    
    // 2. Sembunyikan semua View
    document.querySelectorAll('.profile-view').forEach(el => el.style.display = 'none');
    
    // 3. Aktifkan yang dipilih
    if (tabName === 'dashboard') {
        document.getElementById('menu-dashboard').classList.add('active');
        document.getElementById('view-dashboard').style.display = 'block';
        // Pastikan animasi fade-in berjalan ulang
        document.getElementById('view-dashboard').classList.add('fade-in');
    } else if (tabName === 'services') {
        document.getElementById('menu-services').classList.add('active');
        document.getElementById('view-services').style.display = 'block';
        document.getElementById('view-services').classList.add('fade-in');
        
        // Load data terbaru saat tab dibuka
        loadProfileServices();
    }
}

// Fungsi utama untuk memuat data layanan
function loadProfileServices() {
    loadAppointments();
    loadCustomRequests();
}

// Render Jadwal Konsultasi
function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const container = document.getElementById('appointments-list');
    
    if (!container) return;
    
    if (appointments.length === 0) {
        container.innerHTML = `
            <div class="empty-service">
                <p>No upcoming appointments found.</p>
                <a href="service.html" onclick="window.location.href='service.html';">Book a Consultation</a>
            </div>`;
        return;
    }
    
    // Urutkan dari yang terbaru (reverse)
    container.innerHTML = [...appointments].reverse().map(app => {
        
        // --- LOGIKA TANGGAL BARU (Agar support Workshop & Consultation) ---
        let day, month;
        
        // Cek 1: Apakah formatnya teks pendek dengan spasi? (Contoh: "15 Oct")
        if (app.date && app.date.indexOf(' ') > -1) {
            const parts = app.date.split(' ');
            day = parts[0];   // Ambil angka "15"
            month = parts[1]; // Ambil bulan "Oct"
        } 
        // Cek 2: Format standar ISO YYYY-MM-DD (Dari booking konsultasi biasa)
        else {
            const dateObj = new Date(app.date);
            if (!isNaN(dateObj)) {
                day = dateObj.getDate();
                month = dateObj.toLocaleString('default', { month: 'short' });
            } else {
                // Fallback jika tanggal error
                day = "--"; 
                month = "---";
            }
        }
        
        // --- LOGIKA LOKASI (Agar tidak selalu "Virtual Meeting") ---
        let displayLocation = "Virtual Meeting (Zoom)"; // Default Konsultasi
        
        // Jika data lokasi tersimpan, gunakan itu
        if (app.location) {
            displayLocation = app.location;
        }
        // Jika tidak ada lokasi tapi ini Workshop, ganti teksnya
        else if ((app.topic || '').toLowerCase().includes('workshop')) {
            displayLocation = "Event Venue / Store";
        }

        return `
            <div class="service-card">
                <div class="service-header">
                    <span class="service-id">ID: ${app.id}</span>
                    <span class="status-badge status-confirmed">${app.status || 'Confirmed'}</span>
                </div>
                <div class="service-body">
                    <div class="service-date-box">
                        <span class="date-day">${day}</span>
                        <span class="date-month">${month}</span>
                    </div>
                    <div class="service-details">
                        <h4>${app.topic}</h4>
                        <div class="service-meta">
                            <span>🕒 ${app.time}</span>
                            <span>📍 ${displayLocation}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Request Parfum Kustom
// Render Request Parfum Kustom (Updated with Price)
function loadCustomRequests() {
    const container = document.getElementById('custom-requests-list');
    if (!container) return;
    
    // 1. Ambil Data dari LocalStorage
    const requests = JSON.parse(localStorage.getItem('customRequests') || '[]');
    
    // 2. Ambil Email User yang Sedang Login
    const currentUserEmail = localStorage.getItem('userEmail');
    
    // 3. Filter: Hanya tampilkan request milik user ini
    // (Jika user belum login/email kosong, maka list akan kosong untuk keamanan privasi)
    const myRequests = requests.filter(req => req.customerEmail === currentUserEmail);

    // 4. Tampilan Jika Kosong
    if (myRequests.length === 0) {
        container.innerHTML = `
            <div class="empty-service">
                <p>No custom fragrance requests found.</p>
                <a href="service.html" onclick="window.location.href='service.html';">Create Your Scent</a>
            </div>`;
        return;
    }
    
    // 5. Render Daftar Pesanan
    container.innerHTML = [...myRequests].reverse().map(req => {
        // Helper untuk memotong teks panjang
        const trunc = (str) => (str && str.length > 20) ? str.substring(0, 18) + '..' : (str || '-');
        
        // Ambil data formula dengan aman (fallback jika data lama tidak lengkap)
        const f = req.formula || {};
        const top = f.top || '-';
        const heart = f.heart || '-';
        const base = f.base || '-';
        const size = f.size || '50ml';
        const displayPrice = req.price || '';

        return `
            <div class="service-card">
                <div class="service-header">
                    <span class="service-id">ID: ${req.id}</span>
                    <span class="status-badge status-lab">${req.status || 'Order Placed'}</span>
                </div>
                <div class="service-body">
                    <div class="service-date-box" style="border-color: var(--gold); color: var(--gold);">
                        <span class="date-day" style="font-size: 1.5rem;">🧪</span>
                        <span class="date-month" style="font-size: 0.6rem;">BESPOKE</span>
                    </div>
                    
                    <div class="service-details" style="width: 100%;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                            <h4 style="margin: 0; font-size: 1rem; display: flex; align-items: center; gap: 8px;">
                                "${req.name || 'My Signature Scent'}" 
                                <span style="font-size:0.65rem; color:var(--gold); border:1px solid var(--gold); padding:1px 6px; border-radius:4px;">
                                    ${size}
                                </span>
                            </h4>
                            <span style="color: var(--gold); font-weight: 700; font-family: 'Playfair Display', serif;">
                                ${displayPrice}
                            </span>
                        </div>

                        <div class="formula-tags">
                            <span class="formula-tag" title="${top}">T: ${trunc(top)}</span>
                            <span class="formula-tag" title="${heart}">H: ${trunc(heart)}</span>
                            <span class="formula-tag" title="${base}">B: ${trunc(base)}</span>
                        </div>
                        
                        <p style="font-size: 0.75rem; color: #888; margin-top: 0.8rem;">
                            Ordered on: ${new Date(req.date).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// FUNGSI HELPER BARU: UPDATE STATUS KE STORAGE
window.updateCustomStatus = function(id, newStatus) {
    const reqs = JSON.parse(localStorage.getItem('customRequests') || '[]');
    const index = reqs.findIndex(r => r.id === id);
    
    if(index > -1) {
        reqs[index].status = newStatus;
        localStorage.setItem('customRequests', JSON.stringify(reqs));
        
        // Refresh tampilan agar warna dropdown berubah
        loadCustom(); 
        
        // Update statistik dashboard jika ada
        if(typeof loadStats === 'function') loadStats();
        if(typeof loadBentoActivity === 'function') loadBentoActivity();
    }
};

// FUNGSI HELPER BARU UNTUK UPDATE STATUS
window.updateCustomStatus = function(id, newStatus) {
    const reqs = JSON.parse(localStorage.getItem('customRequests') || '[]');
    const index = reqs.findIndex(r => r.id === id);
    
    if(index > -1) {
        reqs[index].status = newStatus;
        localStorage.setItem('customRequests', JSON.stringify(reqs));
        
        // Refresh tampilan agar warna berubah
        loadCustom(); 
        
        // Update juga statistik di dashboard
        if(typeof loadStats === 'function') loadStats();
        if(typeof loadBentoActivity === 'function') loadBentoActivity();
    }
};

// FUNGSI BARU: UPDATE STATUS BESPOKE
window.updateCustomStatus = function(id, newStatus) {
    const reqs = JSON.parse(localStorage.getItem('customRequests') || '[]');
    const index = reqs.findIndex(r => r.id === id);
    
    if(index > -1) {
        reqs[index].status = newStatus;
        localStorage.setItem('customRequests', JSON.stringify(reqs));
        
        // Refresh tampilan dashboard & grid
        refreshAll(); 
        
        // Opsional: Notif kecil (console log)
        console.log(`Custom Request ${id} updated to ${newStatus}`);
    }
};

// Pastikan fungsi global tersedia
window.switchProfileTab = switchProfileTab;

// ============================================
// 22. SERVICE TO PROFILE INTEGRATION (LOGIC)
// ============================================

// --- A. LOGIKA BOOKING KONSULTASI (Appointment) ---

// 1. Fungsi Buka/Tutup Modal Booking
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Auto-fill jika user sudah ada data profile
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile) {
            if(document.getElementById('bookName')) document.getElementById('bookName').value = userProfile.firstName + ' ' + userProfile.lastName;
            if(document.getElementById('bookEmail')) document.getElementById('bookEmail').value = userProfile.email;
        }
        
        // Set tanggal minimal hari ini
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('bookDate');
        if(dateInput) dateInput.setAttribute('min', today);
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 2. Handle Submit Form Booking -> Simpan ke LocalStorage 'appointments'
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. LOGIKA NAMA
            const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            let nameInput = document.getElementById('bookName') || bookingForm.querySelector('input[type="text"]'); // Perbaikan selector ID
            
            let finalName = 'Guest';
            if (nameInput && nameInput.value.trim() !== '') {
                finalName = nameInput.value;
            } else if (userProfile.firstName) {
                finalName = `${userProfile.firstName} ${userProfile.lastName || ''}`;
            }
            finalName = finalName.trim();

            // 2. LOGIKA WAKTU (Ambil dari ID bookTime)
            const timeElement = document.getElementById('bookTime');
            const selectedTime = timeElement ? timeElement.value : '10:00';

            // 3. LOGIKA TOPIC (PERBAIKAN UTAMA DI SINI)
            // Kita mengambil value dari Radio Button yang sedang dipilih (checked)
            const topicElement = bookingForm.querySelector('input[name="topic"]:checked');
            // Jika ada yang dipilih ambil valuenya, jika tidak default ke General Consultation
            const selectedTopic = topicElement ? topicElement.value : 'General Consultation';

            // 4. Ambil Tanggal
            const dateInput = document.getElementById('bookDate');
            const dateVal = dateInput ? dateInput.value : new Date().toLocaleDateString();

            // 5. SIMPAN DATA
            const newApp = {
                id: 'APP-' + Date.now(),
                name: finalName,
                email: document.getElementById('bookEmail') ? document.getElementById('bookEmail').value : (localStorage.getItem('userEmail') || '-'),
                date: dateVal,
                time: selectedTime,
                topic: selectedTopic, // <--- Data ini sekarang sudah benar (Scent Profiling, dll)
                status: 'Confirmed'
            };

            const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
            apps.push(newApp);
            localStorage.setItem('appointments', JSON.stringify(apps));

            // 6. Notifikasi & Tutup Modal
            if (typeof closeBookingModal === 'function') closeBookingModal();
            
            // Tampilkan alert atau notifikasi
            if (typeof showNotification === 'function') {
                showNotification(`Booking Confirmed: ${selectedTopic} for ${finalName}`, 'success');
            } else {
                showNotification(`Booking Confirmed: ${selectedTopic} for ${finalName}`);
            }
            
            bookingForm.reset();
        });
    }
});


// --- B. LOGIKA CUSTOM FRAGRANCE (Bespoke Request) ---

// 1. Fungsi Buka/Tutup Modal Custom
function openCustomModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCustomModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 2. Handle Submit Custom Fragrance -> Simpan ke LocalStorage 'customRequests'
document.addEventListener('DOMContentLoaded', () => {
    const customForm = document.getElementById('customFragranceForm');
    
    // --- 1. LOGIKA KALKULASI HARGA REAL-TIME ---
    if (customForm) {
        const basePriceEl = document.getElementById('displayBasePrice');
        const addonsPriceEl = document.getElementById('displayAddonsPrice');
        const totalPriceEl = document.getElementById('displayTotalPrice');

        // Fungsi Hitung
        const calculateTotal = () => {
            let basePrice = 0;
            let addonsPrice = 0;

            // 1. Cek Ukuran Botol (Radio Button)
            const selectedBottle = customForm.querySelector('input[name="bottleSize"]:checked');
            if (selectedBottle) {
                basePrice = parseInt(selectedBottle.getAttribute('data-price')) || 0;
            }

            // 2. Cek Ingredients (Checkbox)
            const checkboxes = customForm.querySelectorAll('input[type="checkbox"]:checked');
            checkboxes.forEach(cb => {
                addonsPrice += parseInt(cb.getAttribute('data-price')) || 0;
            });

            // 3. Cek Custom Input (Text)
            const textInputs = customForm.querySelectorAll('.custom-note-input');
            textInputs.forEach(input => {
                if (input.value.trim() !== '') {
                    addonsPrice += parseInt(input.getAttribute('data-price')) || 0;
                }
            });

            // 4. Update Tampilan
            if(basePriceEl) basePriceEl.textContent = `$${basePrice}`;
            if(addonsPriceEl) addonsPriceEl.textContent = `+$${addonsPrice}`;
            if(totalPriceEl) totalPriceEl.textContent = `$${basePrice + addonsPrice}`;
            
            return basePrice + addonsPrice;
        };

        // Pasang Event Listener ke semua input form agar update otomatis
        customForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', calculateTotal);
            input.addEventListener('input', calculateTotal); // Untuk text input
        });

        // Hitung saat awal load
        calculateTotal();

        // --- 2. LOGIKA SUBMIT FORM ---
        customForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const totalCost = calculateTotal(); 

            // Helper ambil value checkbox
            const getSelectedValues = (name) => {
                const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
                let values = Array.from(checkboxes).map(cb => cb.value);
                return values.length > 0 ? values.join(', ') : 'Standard Blend';
            };

            const topNotes = getSelectedValues('topNote');
            const topCustom = document.getElementById('topNoteCustom').value;
            const finalTop = topCustom ? `${topNotes} (+ ${topCustom})` : topNotes;

            const heartNotes = getSelectedValues('heartNote');
            const heartCustom = document.getElementById('heartNoteCustom').value;
            const finalHeart = heartCustom ? `${heartNotes} (+ ${heartCustom})` : heartNotes;

            const baseNotes = getSelectedValues('baseNote');
            const baseCustom = document.getElementById('baseNoteCustom').value;
            const finalBase = baseCustom ? `${baseNotes} (+ ${baseCustom})` : baseNotes;
            
            const bottleSize = document.querySelector('input[name="bottleSize"]:checked')?.value || '50ml';
            const creationName = document.getElementById('creationName').value || 'My Signature Scent';
            
            // UI Loading
            const submitBtn = customForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Processing Order...";
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // --- BAGIAN BARU: AMBIL IDENTITAS USER ---
                let userName = 'Guest';
                let userEmail = 'guest@example.com';
                
                try {
                    const profileStr = localStorage.getItem('userProfile');
                    if (profileStr) {
                        const p = JSON.parse(profileStr);
                        if (p.firstName) userName = `${p.firstName} ${p.lastName || ''}`.trim();
                        else if (p.name) userName = p.name;
                        if (p.email) userEmail = p.email;
                    } else {
                        const sessionEmail = localStorage.getItem('userEmail');
                        if (sessionEmail) {
                            userEmail = sessionEmail;
                            userName = sessionEmail.split('@')[0];
                        }
                    }
                } catch (e) { console.error("User data error", e); }
                // -----------------------------------------

                // Simpan Data ke LocalStorage
                const customRequests = JSON.parse(localStorage.getItem('customRequests') || '[]');
                
                customRequests.push({
                    id: 'BESPOKE-' + Math.floor(1000 + Math.random() * 9000),
                    date: new Date().toISOString(),
                    
                    // DATA PENTING: Identitas user disimpan di sini
                    customerName: userName,
                    customerEmail: userEmail,
                    
                    formula: {
                        top: finalTop,
                        heart: finalHeart,
                        base: finalBase,
                        size: bottleSize 
                    },
                    name: creationName,
                    price: `$${totalCost}`, 
                    status: 'Order Placed'
                });
                
                localStorage.setItem('customRequests', JSON.stringify(customRequests));
                
                // Reset & Close
                customForm.reset();
                calculateTotal(); 
                closeCustomModal();
                
                if (typeof showNotification === 'function') {
                    showNotification(`Order placed for "${creationName}"`, 'success');
                } else {
                    showNotification(`Success! Order placed.`);
                }
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Refresh list jika ada di halaman profile
                if (typeof loadCustomRequests === 'function') loadCustomRequests();

            }, 1500);
        });
    }
});

// Pastikan fungsi bisa dipanggil dari HTML (onclick)
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.openCustomModal = openCustomModal;
window.closeCustomModal = closeCustomModal;

// ============================================
// 24. WORKSHOP & EVENTS LOGIC
// ============================================

function openWorkshopModal() {
    const modal = document.getElementById('workshopModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeWorkshopModal() {
    const modal = document.getElementById('workshopModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function registerWorkshop(eventName, eventDate, eventTime, eventLocation) {
    // 1. Cek Login (Opsional)
    // const userLoggedIn = localStorage.getItem('userLoggedIn');
    // if (!userLoggedIn) { alert("Please login first."); return; }

    // 2. Konfirmasi
    if(!confirm(`Confirm registration for "${eventName}" on ${eventDate} (${eventTime}) at ${eventLocation}?`)) return;

    // --- [PERBAIKAN UTAMA DI SINI] ---
    // Kita buat logika pencarian nama yang berlapis
    let finalName = 'Guest'; // Default jika semua gagal
    
    try {
        // Coba ambil dari userProfile (Logic utama)
        const profileStr = localStorage.getItem('userProfile');
        if (profileStr) {
            const p = JSON.parse(profileStr);
            // Cek apakah firstName ada? Jika tidak cek 'name', jika tidak cek 'email'
            if (p.firstName) {
                finalName = `${p.firstName} ${p.lastName || ''}`;
            } else if (p.name) {
                finalName = p.name;
            }
        } 
        // Jika userProfile gagal, coba ambil dari email login
        else {
            const email = localStorage.getItem('userEmail');
            if (email) finalName = email.split('@')[0]; // Ambil nama dari email
        }
    } catch (e) {
        console.error("Error reading user data", e);
        finalName = 'Guest Error';
    }
    
    // Bersihkan spasi berlebih
    finalName = finalName.trim();
    // ---------------------------------

    // 3. Simpan
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    appointments.push({
        id: 'WS-' + Math.floor(1000 + Math.random() * 9000),
        name: finalName, 
        
        // UPDATE DI SINI:
        // Gunakan eventDate sebagai tanggal utama agar muncul benar di admin
        date: eventDate, 
        // Gunakan waktu spesifik yang dikirim dari HTML
        time: eventTime, 
        // Tambahkan properti lokasi
        location: eventLocation, 
        
        topic: `Workshop: ${eventName}`,
        status: 'Registered',
        type: 'Event' // Penanda bahwa ini event
    });
    
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // 4. Tutup & Notif (Kode asli tetap sama)
    if (typeof closeWorkshopModal === 'function') closeWorkshopModal();
    
    if (typeof showNotification === 'function') {
        showNotification(`Success! Registered for ${eventName}.`, 'success');
    } else {
        showNotification(`Success! Registered for ${eventName}.`);
    }
}

// Pastikan fungsi global tersedia
window.openWorkshopModal = openWorkshopModal;
window.closeWorkshopModal = closeWorkshopModal;
window.registerWorkshop = registerWorkshop;

// ============================================
// DYNAMIC REVIEW SYSTEM
// ============================================

// 1. Fungsi Buka Modal Review
// 1. Fungsi Buka Modal Review (Ditambah parameter orderId)
function openReviewModal(productId, productName, productImage, orderId) {
    const modal = document.getElementById('reviewModal');
    if(!modal) return;

    // Set data ke form
    document.getElementById('reviewProductId').value = productId;
    document.getElementById('reviewProductName').textContent = productName;
    document.getElementById('reviewProductImg').src = productImage;
    
    // SIMPAN ORDER ID SECARA SEMENTARA KE DATASET FORM
    // Karena kita tidak mengubah HTML profile.html untuk menambah input hidden orderId,
    // kita tempelkan datanya ke elemen form itu sendiri.
    const form = document.getElementById('reviewForm');
    if(form) {
        form.setAttribute('data-order-id', orderId || '');
    }
    
    // Reset form
    document.getElementById('reviewRatingValue').value = '';
    document.getElementById('reviewText').value = '';
    document.querySelectorAll('.star-rating-input span').forEach(s => s.classList.remove('selected'));

    modal.classList.add('active');
}

// 2. Setup Star Rating & Submit Listener (Update Logika Submit)
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star-rating-input span');
    const ratingInput = document.getElementById('reviewRatingValue');

    if(stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const val = this.getAttribute('data-value');
                ratingInput.value = val;
                stars.forEach(s => {
                    if(s.getAttribute('data-value') <= val) s.classList.add('selected');
                    else s.classList.remove('selected');
                });
            });
        });
    }

    // 3. Handle Submit Review (UPDATED)
    const reviewForm = document.getElementById('reviewForm');
    if(reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const productId = document.getElementById('reviewProductId').value;
            const rating = document.getElementById('reviewRatingValue').value;
            const text = document.getElementById('reviewText').value;
            
            // AMBIL ORDER ID DARI DATASET YANG KITA SET DI openReviewModal
            const orderId = reviewForm.getAttribute('data-order-id');
            
            if(!rating) { showNotification("Please select a star rating."); return; }

            const userProfile = JSON.parse(localStorage.getItem('userProfile')) || { firstName: 'Customer', lastName: '' };
            const authorName = `${userProfile.firstName} ${userProfile.lastName}`.trim() || 'Anonymous';

            // Buat objek review baru dengan Order ID
            const newReview = {
                id: Date.now(), 
                author: authorName,
                avatar: "/images/profile_images/profile_image.webp",
                rating: "★".repeat(rating) + "☆".repeat(5 - rating),
                ratingNum: parseInt(rating),
                body: text,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                orderId: orderId // Simpan ID Order
            };

            const allReviews = JSON.parse(localStorage.getItem('product_reviews') || '{}');
            const existingReviews = allReviews[productId] || [];
            
            // Hanya tolak jika User SAMA dan Order ID SAMA
            const isDuplicate = existingReviews.some(r => r.author === authorName && r.orderId === orderId);

            if (isDuplicate) {
                closeReviewModal();
                return;
            }
            
            if(!allReviews[productId]) {
                allReviews[productId] = [];
            }
            
            allReviews[productId].unshift(newReview);
            localStorage.setItem('product_reviews', JSON.stringify(allReviews));

            showNotification('Review submitted successfully!', 'success');
            closeReviewModal();

            if (typeof loadRecentOrders === 'function') loadRecentOrders(); 
            if (typeof showAllOrders === 'function') {
                // Jika modal 'All Orders' sedang terbuka, kita perlu refresh isinya (opsional/advanced handling)
                const allOrderModal = document.querySelector('.order-modal');
                if(allOrderModal) { 
                    allOrderModal.remove(); // Tutup dulu lalu buka lagi atau biarkan user refresh
                    showAllOrders(); 
                }
            }
            
            if(window.location.pathname.includes('product_detail.html')) {
                location.reload(); 
            }
        });
    }
});

function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if(modal) modal.classList.remove('active');
}

// 2. Setup Star Rating Interactive
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star-rating-input span');
    const ratingInput = document.getElementById('reviewRatingValue');

    if(stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const val = this.getAttribute('data-value');
                ratingInput.value = val;
                
                // Visual update
                stars.forEach(s => {
                    if(s.getAttribute('data-value') <= val) s.classList.add('selected');
                    else s.classList.remove('selected');
                });
            });
        });
    }

    // 3. Handle Submit Review
    const reviewForm = document.getElementById('reviewForm');
    if(reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const productId = document.getElementById('reviewProductId').value;
            const rating = document.getElementById('reviewRatingValue').value;
            const text = document.getElementById('reviewText').value;
            
            if(!rating) { showNotification("Please select a star rating."); return; }

            // Ambil nama user dari profile (jika ada)
            const userProfile = JSON.parse(localStorage.getItem('userProfile')) || { firstName: 'Customer', lastName: '' };
            const authorName = `${userProfile.firstName} ${userProfile.lastName}`.trim() || 'Anonymous';

            // Buat objek review baru
            const newReview = {
                id: Date.now(), // Unique ID
                author: authorName,
                avatar: "/images/profile_images/profile_image.webp",
                rating: "★".repeat(rating) + "☆".repeat(5 - rating),
                ratingNum: parseInt(rating),
                body: text,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            };

            // Simpan ke LocalStorage
            // Struktur: { "productId1": [reviewA, reviewB], "productId2": [...] }
            const allReviews = JSON.parse(localStorage.getItem('product_reviews') || '{}');
            // --- LOGIKA BARU: CEK DUPLIKASI SEBELUM SIMPAN ---
            const existingReviews = allReviews[productId] || [];
            const isDuplicate = existingReviews.some(r => r.author === authorName);

            if (isDuplicate) {
                closeReviewModal();
                return; // Hentikan proses
            }
            
            if(!allReviews[productId]) {
                allReviews[productId] = [];
            }
            
            allReviews[productId].unshift(newReview); // Tambahkan di paling atas
            localStorage.setItem('product_reviews', JSON.stringify(allReviews));

            showNotification('Review submitted successfully!', 'success');
            closeReviewModal();

            // 1. Jika di halaman Profile: Render ulang daftar order 
            // agar tombol langsung berubah jadi "Reviewed" (abu-abu)
            if (typeof loadRecentOrders === 'function') {
                loadRecentOrders(); 
            }
            
            // Jika user sedang di halaman product_detail, refresh review
            if(window.location.pathname.includes('product_detail.html')) {
                location.reload(); 
            }
        });
    }
});

// ============================================
// HELPER: CALCULATE DYNAMIC STATISTICS
// ============================================

function calculateReviewStats(reviews) {
    // 1. Jika tidak ada review, kembalikan default 0
    if (!reviews || reviews.length === 0) {
        return {
            score: "0.0",
            stars: "☆☆☆☆☆",
            recommendation: "0% of reviews recommend this product",
            bars: [
                { label: "5 Stars", width: "0%" },
                { label: "4 Stars", width: "0%" },
                { label: "3 Stars", width: "0%" },
                { label: "2 Stars", width: "0%" },
                { label: "1 Star", width: "0%" }
            ]
        };
    }

    // 2. Hitung Total Bintang & Distribusi
    let totalStars = 0;
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let recommendCount = 0;

    reviews.forEach(r => {
        // Ambil angka rating (misal dari properti ratingNum atau hitung simbol bintang)
        let rating = r.ratingNum;
        if (!rating && r.rating) {
            // Fallback jika data lama hanya punya string "★★★★★"
            rating = (r.rating.match(/★/g) || []).length;
        }
        if (!rating) rating = 5; // Default safety

        // Update hitungan
        totalStars += rating;
        if (counts[rating] !== undefined) counts[rating]++;
        
        // Anggap rating >= 4 sebagai "Recommended"
        if (rating >= 4) recommendCount++;
    });

    // 3. Hitung Rata-rata
    const average = (totalStars / reviews.length).toFixed(1);
    
    // 4. Generate String Bintang (misal 4.5 -> ★★★★☆)
    // Logika sederhana: round ke integer terdekat untuk tampilan bintang
    const roundedAvg = Math.round(average);
    const starString = "★".repeat(roundedAvg) + "☆".repeat(5 - roundedAvg);

    // 5. Hitung Persentase Rekomendasi
    const recommendPercent = Math.round((recommendCount / reviews.length) * 100);

    // 6. Hitung Lebar Bar Chart
    const bars = [5, 4, 3, 2, 1].map(star => {
        const percentage = Math.round((counts[star] / reviews.length) * 100);
        return { label: `${star} Stars`, width: `${percentage}%` };
    });

    return {
        score: average,
        stars: starString,
        recommendation: `${recommendPercent}% of reviews recommend this product`,
        bars: bars
    };
}

// ============================================
// 25. BEAUTIFUL CONFIRMATION LOGIC
// ============================================

// Variabel sementara untuk menyimpan data event yang sedang dipilih
let pendingEventData = null;

function closeConfirmModal() {
    const modal = document.getElementById('workshopConfirmModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    pendingEventData = null; // Reset data
}

// Logic saat tombol "Confirm Registration" ditekan
document.getElementById('btnConfirmReg')?.addEventListener('click', function() {
    if (!pendingEventData) return;

    // 1. Efek Loading pada tombol
    const btn = this;
    const originalText = btn.textContent;
    btn.textContent = "Processing...";
    btn.disabled = true;

    setTimeout(() => {
        // 2. Simpan ke LocalStorage 'appointments'
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        
        appointments.push({
            id: 'WS-' + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toISOString(),
            eventDateDisplay: pendingEventData.date,
            time: 'Check Ticket', // Bisa disesuaikan
            topic: `Workshop: ${pendingEventData.name}`,
            status: 'Registered'
        });
        
        localStorage.setItem('appointments', JSON.stringify(appointments));

        // 3. Tutup Modal Konfirmasi & Modal Workshop Utama
        closeConfirmModal();
        closeWorkshopModal(); // Tutup juga modal list workshop

        // 4. Tampilkan Notifikasi Sukses
        if (typeof showNotification === 'function') {
            showNotification(`Success! Seat reserved for ${pendingEventData.name}.`, 'success');
        } else {
            showNotification(`Success! Seat reserved for ${pendingEventData.name}.`);
        }

        // 5. Reset Tombol
        btn.textContent = originalText;
        btn.disabled = false;

    }, 1200); // Delay sedikit untuk efek proses
});

// Expose fungsi close ke window
window.closeConfirmModal = closeConfirmModal;

// ============================================
// 27. GIFT CONCIERGE LOGIC
// ============================================

function openGiftModal() {
    const modal = document.getElementById('giftModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeGiftModal() {
    const modal = document.getElementById('giftModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const giftForm = document.getElementById('giftForm');
    
    if (giftForm) {
        giftForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const recipient = document.querySelector('input[name="recipient"]:checked')?.value || 'Someone Special';
            const occasion = document.getElementById('giftOccasion').value;
            const budget = document.getElementById('giftBudget').value;
            const message = document.getElementById('giftMessage').value;
            
            // Loading Effect
            const submitBtn = giftForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Curating...";
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Simpan Data
                const giftRequests = JSON.parse(localStorage.getItem('giftRequests') || '[]');
                giftRequests.push({
                    id: 'GIFT-' + Math.floor(1000 + Math.random() * 9000),
                    date: new Date().toISOString(),
                    details: {
                        recipient: recipient,
                        occasion: occasion,
                        budget: budget,
                        message: message
                    },
                    status: 'Curating'
                });
                localStorage.setItem('giftRequests', JSON.stringify(giftRequests));
                
                // Reset & Close
                giftForm.reset();
                closeGiftModal();
                
                if (typeof showNotification === 'function') {
                    showNotification(`We're finding the perfect gift for your ${recipient}!`, 'success');
                } else {
                    showNotification('Gift request submitted successfully!');
                }
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
            }, 1500);
        });
    }
});

// Export Global
window.openGiftModal = openGiftModal;
window.closeGiftModal = closeGiftModal;

// ============================================
// 26. STORE LOCATOR LOGIC
// ============================================


// Open/Close Modal
function openStoreLocator() {
    const modal = document.getElementById('storeLocatorModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderStoreList(storeData); // Render semua toko saat dibuka
    }
}

function closeStoreLocator() {
    const modal = document.getElementById('storeLocatorModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Render List
function renderStoreList(stores) {
    const container = document.getElementById('storeListContainer');
    if (!container) return;

    if (stores.length === 0) {
        container.innerHTML = `<p style="color:#666; text-align:center; margin-top:2rem;">No boutiques found.</p>`;
        return;
    }

    container.innerHTML = stores.map(store => `
        <div class="store-item" onclick="selectStore(${store.id}, this)">
            <div class="store-city">${store.city}</div>
            <div class="store-name" style="color:var(--gold); font-size:0.9rem; margin-bottom:0.5rem;">${store.name}</div>
            <div class="store-address">${store.address}</div>
            <div class="store-status ${store.status === 'Closed' ? 'closed' : ''}">
                ● ${store.status}
            </div>
        </div>
    `).join('');
}

// Filter Function
function filterStores() {
    const query = document.getElementById('storeSearchInput').value.toLowerCase();
    const filtered = storeData.filter(store => 
        store.city.toLowerCase().includes(query) || 
        store.name.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query)
    );
    renderStoreList(filtered);
}

// Select Store & Update Map View
function selectStore(id, element) {
    // 1. Update Active State di List
    document.querySelectorAll('.store-item').forEach(el => el.classList.remove('active'));
    if(element) element.classList.add('active');

    // 2. Ambil Data
    const store = storeData.find(s => s.id === id);
    if (!store) return;

    // 3. Update "Map" Image & Info Overlay
    const mapImg = document.getElementById('storeMapImage');
    const overlay = document.getElementById('mapOverlayInfo');

    // Efek Fade Out -> Ganti Data -> Fade In
    mapImg.style.opacity = '0';
    
    setTimeout(() => {
        mapImg.src = store.image; // Ganti gambar simulasi lokasi
        overlay.innerHTML = `
            <h3>${store.name}</h3>
            <p>${store.address}</p>
            <p style="margin-top:0.5rem; color:var(--gold);">📞 ${store.phone}</p>
            <a href="#" style="display:inline-block; margin-top:1rem; color:#fff; text-decoration:underline; font-size:0.8rem;">Get Directions →</a>
        `;
        mapImg.style.opacity = '0.6';
    }, 300);
}

// Expose functions
window.openStoreLocator = openStoreLocator;
window.closeStoreLocator = closeStoreLocator;
window.filterStores = filterStores;
window.selectStore = selectStore;

// ============================================
// 10. PRODUCT DETAIL PAGE
// ============================================

    const allProductsData = {
        'floral-essence': {
            name: "Floral Essence",
            brand: "Gucci",
            price: "$89.00",
            priceNum: 89.00,
            size: "50ml",
            ratingStars: "★★★★★",
            ratingCount: "198",
            category: "female",
            scent: "floral",
            shortDescription: "A beautiful bouquet of fresh spring flowers, captured in a bottle.",
            mainImage: "https://images.pexels.com/photos/8747310/pexels-photo-8747310.jpeg",
            productDetails: "Floral Essence captures the vibrant, uplifting spirit of a garden in full bloom. It's an elegant and timeless fragrance designed for those who appreciate classic beauty. Light, airy, and unmistakably feminine.",
            overtureTitle: "The Blossom Overture",
            overtureContent: "Floral Essence opens with a fresh, dewy burst of Peony and Freesia. This bright introduction leads gracefully into a heart of classic Rose and Magnolia, creating a sophisticated floral bouquet that is both modern and timeless.",
            keyNotes: [
                { title: "Top Note", notes: "Peony, Freesia", img: "https://plus.unsplash.com/premium_photo-1671379086168-a5d018d583cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJ1aXR8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" },
                { title: "Heart Note", notes: "Rose, Magnolia", img: "https://cdn.pixabay.com/photo/2022/04/17/00/21/white-flower-7137170_960_720.jpg" },
                { title: "Base Note", notes: "Soft Musk, Cedar", img: "https://www.thespruceeats.com/thmb/FYBg5VkZqQ6yHm1HF_nqWVbtqd8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-121141406-5755c349c5a34222b81d72c07a112c76.jpg" }
            ],
            discoverMore: ['royal-rose', 'velvet-petal', 'diamond-aura', 'golden-harmony']
        },
        'amber-nights': {
            name: "Amber Nights",
            brand: "Dior",
            price: "$125.00",
            priceNum: 125.00,
            size: "75ml",
            ratingStars: "★★★★★",
            ratingCount: "214",
            category: "unisex",
            scent: "oriental",
            shortDescription: "A warm, mysterious, and seductive scent for unforgettable evenings.",
            mainImage: "https://images.pexels.com/photos/29801749/pexels-photo-29801749.jpeg",
            productDetails: "Amber Nights wraps you in warmth and mystery. Perfect for evening wear, this sophisticated fragrance combines rich amber with exotic spices and woods.",
            overtureTitle: "The Evening Overture",
            overtureContent: "As dusk falls, Amber Nights reveals its captivating character with warm amber, spicy cardamom, and deep woody notes.",
            keyNotes: [
                { title: "Top Note", notes: "Bergamot, Cardamom", img: "https://plus.unsplash.com/premium_photo-1671379086168-a5d018d583cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJ1aXR8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" },
                { title: "Heart Note", notes: "Amber, Jasmine", img: "https://cdn.pixabay.com/photo/2022/04/17/00/21/white-flower-7137170_960_720.jpg" },
                { title: "Base Note", notes: "Patchouli, Vanilla", img: "https://www.thespruceeats.com/thmb/FYBg5VkZqQ6yHm1HF_nqWVbtqd8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-121141406-5755c349c5a34222b81d72c07a112c76.jpg" }
            ],
            discoverMore: ['amber-elite', 'timeless-oud', 'sapphire-mystique', 'golden-harmony']
        },
        'royal-rose': {
            name: "Royal Rose",
            brand: "Chanel",
            price: "$95.00",
            priceNum: 95.00,
            size: "50ml",
            ratingStars: "★★★★☆",
            ratingCount: "156",
            category: "female",
            scent: "floral",
            shortDescription: "A modern interpretation of a classic rose, elegant and timeless.",
            mainImage: "https://images.pexels.com/photos/724635/pexels-photo-724635.jpeg",
            discoverMore: ['floral-essence', 'velvet-petal', 'diamond-aura', 'golden-aura']
        },
        'golden-aura': {
            name: "Golden Aura",
            brand: "Versace",
            price: "$110.00",
            priceNum: 110.00,
            size: "75ml",
            ratingStars: "★★★★★",
            ratingCount: "187",
            category: "male",
            scent: "oriental",
            shortDescription: "Radiate confidence with this luminous and warm solar fragrance.",
            mainImage: "https://images.pexels.com/photos/20282244/pexels-photo-20282244.jpeg",
            discoverMore: ['diamond-aura', 'citrus-harmony', 'sapphire-mystique', 'golden-harmony']
        },
        'aroma-bliss': {
            name: "Aroma Bliss",
            brand: "Hermes",
            price: "$175.00",
            priceNum: 175.00,
            size: "100ml",
            ratingStars: "★★★★★",
            ratingCount: "203",
            category: "unisex",
            scent: "floral",
            shortDescription: "A calming and therapeutic blend of lavender, chamomile, and sage.",
            mainImage: "https://images.pexels.com/photos/965730/pexels-photo-965730.jpeg",
            discoverMore: ['floral-essence', 'velvet-petal', 'royal-rose', 'citrus-harmony']
        },
        'timeless-oud': {
            name: "Timeless Oud",
            brand: "Tom Ford",
            price: "$225.00",
            priceNum: 225.00,
            size: "100ml",
            ratingStars: "★★★★★",
            ratingCount: "312",
            category: "male",
            scent: "woody",
            shortDescription: "A deep, rich, and sophisticated fragrance built around precious oud wood.",
            mainImage: "https://images.pexels.com/photos/4925692/pexels-photo-4925692.jpeg",
            discoverMore: ['amber-elite', 'amber-nights', 'sapphire-mystique', 'golden-harmony']
        },
        'velvet-petal': {
            name: "Velvet Petal Night",
            brand: "Bvlgari",
            price: "$159.00",
            priceNum: 159.00,
            size: "50ml",
            ratingStars: "★★★★☆",
            ratingCount: "76",
            category: "female",
            scent: "floral",
            shortDescription: "A soft, powdery, and romantic floral scent with a hint of musk.",
            mainImage: "https://images.pexels.com/photos/14496154/pexels-photo-14496154.jpeg",
            discoverMore: ['floral-essence', 'royal-rose', 'aroma-bliss', 'diamond-aura']
        },
        'amber-elite': {
            name: "Amber Elite",
            brand: "Bvlgari",
            price: "$195.00",
            priceNum: 195.00,
            size: "100ml",
            ratingStars: "★★★★★",
            ratingCount: "189",
            category: "male",
            scent: "woody",
            shortDescription: "The ultimate expression of amber, refined with incense and patchouli.",
            mainImage: "https://images.pexels.com/photos/31847826/pexels-photo-31847826.jpeg",
            discoverMore: ['amber-nights', 'timeless-oud', 'golden-harmony', 'sapphire-mystique']
        },
        'diamond-aura': {
            name: "Diamond Aura",
             brand: "Chanel",
            price: "$210.00",
            priceNum: 210.00,
            size: "100ml",
            ratingStars: "★★★★★",
            ratingCount: "245",
            category: "male",
            scent: "fresh",
            shortDescription: "A bright, sparkling, and crisp fragrance that feels effervescent.",
            mainImage: "https://images.pexels.com/photos/28460123/pexels-photo-28460123.jpeg",
            discoverMore: ['golden-aura', 'citrus-harmony', 'floral-essence', 'royal-rose']
        },
        'citrus-harmony': {
            name: "Citrus Harmony",
            brand: "Lumiere Scents",
            price: "$138.00",
            priceNum: 138.00,
            size: "50ml",
            ratingStars: "★★★★☆",
            ratingCount: "92",
            category: "unisex",
            scent: "fresh",
            shortDescription: "A zesty and uplifting chorus of grapefruit, lemon, and vetiver.",
            mainImage: "https://images.pexels.com/photos/12528067/pexels-photo-12528067.jpeg",
            discoverMore: ['diamond-aura', 'golden-aura', 'sapphire-mystique', 'aroma-bliss']
        },
        'sapphire-mystique': {
            name: "Sapphire Mystique",
            brand: "YSL",
            price: "$182.00",
            priceNum: 182.00,
            size: "75ml",
            ratingStars: "★★★★★",
            ratingCount: "167",
            category: "male",
            scent: "fresh",
            shortDescription: "A deep, aquatic, and aromatic fragrance with a touch of spice.",
            mainImage: "https://images.pexels.com/photos/11920479/pexels-photo-11920479.jpeg",
            discoverMore: ['timeless-oud', 'amber-elite', 'golden-harmony', 'citrus-harmony']
        },
        'golden-harmony': {
            name: "Golden Harmony",
            brand: "Versace",
            price: "$205.00",
            priceNum: 205.00,
            size: "100ml",
            ratingStars: "★★★★★",
            ratingCount: "278",
            category: "unisex",
            cent: "woody",
            shortDescription: "A perfectly balanced blend of spice, sweet, and wood.",
            mainImage: "https://images.pexels.com/photos/11711829/pexels-photo-11711829.jpeg",
            discoverMore: ['golden-aura', 'amber-elite', 'timeless-oud', 'diamond-aura']
        },
        'black-mamba': {
            name: "Black Mamba",
            brand: "Chanel",
            price: "$95.00",
            priceNum: 95.00,
            size: "50ml",
            ratingStars: "★★★★☆",
            ratingCount: "253",
            category: "Men",
            scent: "oriental",
            shortdescription: "A Balance Blend Of wood, and spice",
            mainImage: "https://images.pexels.com/photos/9202888/pexels-photo-9202888.jpeg",
            discoverMore: ['golden-aura', 'amber-elite', 'timeless-oud', 'diamond-aura']
       },
       'golden-amber': {
            name: "Golden Amber",
            brand: 'Gucci',
            price: "$250.00",
            priceNum: 250.00,
            size: "100ml",
            ratingStars: "★★★★★",
            ratingCount: "232",
            category: "Unisex",
            scent: "Floral",
            shortdescription: "A Balance Blend Of floral and spice",
            mainImage: "https://perfumedubai.com/cdn/shop/files/54_a9d80a87-1ae2-41fd-a2ed-a5570571b341_1024x1024.png?v=1736493530",
            discoverMore: ['golden-aura', 'amber-elite', 'timeless-oud', 'diamond-aura']
       },
       'spicy-oud': {
        name: "Spicy Oud",
        name: "Spicy Oud",
        price: "$100.00",
        priceNum: 250.00,
        size: "50ml",
        category: "male",
        scent: "oriental",
        shortdescription: "A Strong Blend Of Spice and little ounce of Wood",
        mainImage: "https://media.theperfumeshop.com/medias/sys_master/images/h32/hec/10060882575390/Forhim/Forhim.jpg",
        discoverMore: ['golden-aura', 'amber-elite', 'timeless-oud', 'diamond-aura'],
        ratingStars: "★★★★☆",
        ratingCount: "128"
        },
        'discovery-set': {
        name: "Signature Discovery Set",
        brand: "Lumière",
        price: "$45.00",
        priceNum: 45.00,
        description: "Explore our 5 best-selling scents in 2ml vials.",
        mainImage: "/images/product_images/product_16_Signature_Discovery.jpeg",
        category: "gift-set",
        scent: "fresh",
        ratingStars: "★★★★★",
        ratingCount: "342",
        setItems: [
            { name: "Floral Essence", image: "/images/product_images/product_1_Floral_Essence.jpeg" },
            { name: "Amber Nights", image: "/images/product_images/product_2_Amber_Nights.jpeg" },
            { name: "Royal Rose", image: "/images/product_images/product_3_Royal_Rose.jpeg" },
            { name: "Golden Aura", image: "/images/product_images/product_4_Golden_Aura.jpeg" },
            { name: "Timeless Oud", image: "/images/product_images/product_6_Timeless_Oud.jpeg" }
        ]
        },
        'luxury-gift-box': {
            name: "The Golden Gift Box",
            brand: "Lumière",
            price: "$280.00",
            priceNum: 280.00,
            description: "A luxurious set containing Golden Aura and Amber Nights.",
            mainImage: "/images/product_images/product_17_Golden_Gift.jpeg",
            category: "gift-set",
            scent: "oriental",
            ratingStars: "★★★★★",
            ratingCount: "89",
            setItems: [
                { name: "Golden Aura (100ml)", image: "/images/product_images/product_4_Golden_Aura.jpeg" },
                { name: "Amber Nights (100ml)", image: "/images/product_images/product_2_Amber_Nights.jpeg" }
            ]
        },
        'travel-essentials': {
            name: "Travel Essentials Kit",
            brand: "Dior",
            price: "$115.00",
            priceNum: 115.00,
            description: "Three 10ml sprays of your choice in a leather travel case.",
            mainImage: "/images/product_images/product_18_Travel_Essential.jpeg",
            category: "gift-set",
            scent: "woody",
            ratingStars: "★★★★☆",
            ratingCount: "120",
            setItems: [
                { name: "Floral Essence (100ml)", image: "/images/product_images/product_1_Floral_Essence.jpeg" },
                { name: "Citrus Harmony (100ml)", image: "/images/product_images/product_10_Citrus_Harmony.jpeg" },
                { name: "Sapphire Mystique (100ml)", image: "/images/product_images/product_11_Sapphire_Mystique.jpeg" }
            ]
        }
    };

    // Default data untuk produk yang tidak memiliki data lengkap
    const defaultProductData = {
        productDetails: "This exquisite fragrance is crafted with the finest ingredients to create a unique and memorable scent experience.",
        overtureTitle: "The Signature Overture",
        overtureContent: "This fragrance opens with captivating notes that evolve into a sophisticated heart, settling into a lasting base that leaves an unforgettable impression.",
        keyNotes: [
            { title: "Top Note", notes: "Fresh & Vibrant", img: "https://plus.unsplash.com/premium_photo-1671379086168-a5d018d583cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJ1aXR8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" },
            { title: "Heart Note", notes: "Elegant & Refined", img: "https://cdn.pixabay.com/photo/2022/04/17/00/21/white-flower-7137170_960_720.jpg" },
            { title: "Base Note", notes: "Warm & Lasting", img: "https://www.thespruceeats.com/thmb/FYBg5VkZqQ6yHm1HF_nqWVbtqd8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-121141406-5755c349c5a34222b81d72c07a112c76.jpg" }
        ],
        reviewSummary: {
            score: "4.5",
            stars: "★★★★☆",
            recommendation: "85% of reviews recommend this product",
            bars: [
                { label: "5 Stars", width: "65%" },
                { label: "4 Stars", width: "20%" },
                { label: "3 Stars", width: "10%" },
                { label: "2 Stars", width: "3%" },
                { label: "1 Star", width: "2%" }
            ]
        },
        reviews: [
            { author: "John D.", avatar: "https://i.pravatar.cc/150?img=12", rating: "★★★★★", body: "Absolutely love this fragrance! It's become my signature scent.", date: "November 10, 2025" },
            { author: "Emily R.", avatar: "https://i.pravatar.cc/150?img=45", rating: "★★★★☆", body: "Great quality and long-lasting. Highly recommend!", date: "November 5, 2025" }
        ]
    };

   function loadProductData() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || 'luxurious-elixir';
        const product = allProductsData[productId] || products[productId]; // Cek di kedua sumber data

        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        // Update page title
        document.title = `${product.name} - Local Face`;

        // Update breadcrumb
        const breadcrumbName = document.getElementById('breadcrumb-product-name');
        if (breadcrumbName) breadcrumbName.textContent = product.name;

        // Update main product info
        const mainImage = document.getElementById('product-main-image');
        if (mainImage) {
            mainImage.src = product.mainImage;
            mainImage.alt = product.name;
        }

        const productName = document.getElementById('product-name');
        if (productName) productName.textContent = product.name;

        const productDescShort = document.getElementById('product-description-short');
        if (productDescShort) productDescShort.textContent = product.shortDescription || product.productDetails || defaultProductData.productDetails;

        const productStars = document.getElementById('product-stars');
        if (productStars) productStars.textContent = product.ratingStars;

        

        const productPrice = document.getElementById('product-price');
        if (productPrice) productPrice.textContent = product.price;

        const productSize = document.getElementById('product-size');
        if (productSize) {
            // Gunakan data size dari produk, atau default '50ml' jika kosong
            productSize.textContent = "Size: " + (product.size || "50ml"); 
        }

        // Update product details sections
        const detailsContent = document.getElementById('product-details-content');
        if (detailsContent) detailsContent.textContent = product.productDetails || defaultProductData.productDetails;

        const overtureTitle = document.getElementById('product-overture-title');
        if (overtureTitle) overtureTitle.textContent = product.overtureTitle || defaultProductData.overtureTitle;

        const overtureContent = document.getElementById('product-overture-content');
        if (overtureContent) overtureContent.textContent = product.overtureContent || defaultProductData.overtureContent;

        // === LOGIKA BARU UNTUK GAMBAR GIFT SET ===
        const mainImageWrapper = document.querySelector('.main-image-wrapper');
        
        if (mainImageWrapper) {
            // Cek apakah ini Gift Set DAN punya data setItems
            if (product.category === 'gift-set' && product.setItems) {
                
                // [FIX] Gunakan fallback: Cek 'image' lalu 'mainImage'
                const giftMainImg = product.image || product.mainImage || 'https://via.placeholder.com/500';

                // Render Tampilan Khusus Gift Set
                mainImageWrapper.className = 'main-image-wrapper gift-set-mode'; 
                mainImageWrapper.innerHTML = `
                    <div class="gift-display-container">
                        <div class="gift-main-view">
                            <img src="${giftMainImg}" alt="${product.name}" id="gift-main-img">
                            <span class="gift-label">GIFT SET CONTENTS</span>
                        </div>
                        
                        <div class="gift-contents-grid">
                            ${product.setItems.map(item => `
                                <div class="gift-item-card">
                                    <div class="gift-item-thumb">
                                        <img src="${item.image || item.mainImage || ''}" alt="${item.name}">
                                    </div>
                                    <span class="gift-item-name">${item.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                // Tampilan Produk Biasa (Standar)
                mainImageWrapper.className = 'main-image-wrapper'; 
                mainImageWrapper.innerHTML = `<img src="${product.image || product.mainImage}" alt="${product.name}" id="product-main-image">`;
            }
        }

        // Render key notes
        renderKeyNotes(product.keyNotes || defaultProductData.keyNotes);

        // Render review summary
        renderReviewSummary(product.reviewSummary || defaultProductData.reviewSummary);

        // --- LOGIKA BARU: GABUNGKAN REVIEW STATIS & DINAMIS ---
        
        // 1. Ambil review statis (bawaan file)
        const staticReviews = product.reviews || defaultProductData.reviews;
        
        // 2. Ambil review dinamis dari LocalStorage
        const storedReviewsData = JSON.parse(localStorage.getItem('product_reviews') || '{}');
        const dynamicReviews = storedReviewsData[productId] || [];
        
        // 3. Gabungkan (Dinamis ditaruh di atas)
        const combinedReviews = [...dynamicReviews, ...staticReviews];

        // Hitung statistik baru berdasarkan combinedReviews
        const dynamicSummary = calculateReviewStats(combinedReviews);

        // Render Review Summary dengan data baru, BUKAN data statis product.reviewSummary
        renderReviewSummary(dynamicSummary);
        
        // 4. Update Jumlah Review di Header Produk
        const productReviewCount = document.getElementById('product-review-count');
        if (productReviewCount) {
             productReviewCount.textContent = `(${combinedReviews.length} Reviews)`;
        }

        // --- SOLD COUNT DI DETAIL PRODUK ---
             const salesData = JSON.parse(localStorage.getItem('product_sales') || '{}');
             const soldCount = (salesData[productId] || 0) + 2; // Default 2 terjual

             // Cek apakah elemen sold sudah ada (agar tidak duplikat)
             let soldEl = document.getElementById('detail-sold-count');
             
             if (!soldEl) {
                 // Jika belum ada, buat elemen baru via JS
                 soldEl = document.createElement('span');
                 soldEl.id = 'detail-sold-count';
                 
                 // Styling sederhana agar rapi
                 soldEl.style.marginLeft = '10px';
                 soldEl.style.paddingLeft = '10px';
                 soldEl.style.borderLeft = '1px solid #ccc';
                 soldEl.style.color = '#666';
                 soldEl.style.fontSize = '0.9rem';
                 soldEl.style.fontWeight = '500';
                 
                 // Masukkan elemen ini ke dalam container rating (setelah review count)
                 productReviewCount.parentNode.appendChild(soldEl);
                }
             
             soldEl.textContent = `${soldCount} Sold`;
        
        // Update juga Bintang Utama di sebelah nama produk (atas halaman)
        const productMainStars = document.getElementById('product-stars');
        if (productMainStars) {
            productMainStars.textContent = dynamicSummary.stars;
        }

        // 5. Render Hasil Gabungan
        renderReviews(combinedReviews);

        // Render discover more
        renderDiscoverMore(product.discoverMore || ['amber-elite', 'aroma-bliss', 'timeless-oud', 'golden-harmony']);
    }

    function renderKeyNotes(keyNotes) {
        const container = document.getElementById('key-notes-container');
        if (!container) return;

        container.innerHTML = keyNotes.map(note => `
            <div class="key-note-item">
                <h3>${note.title}</h3>
                <p>${note.notes}</p>
                <img src="${note.img}" alt="${note.title}">
            </div>
        `).join('');
    }

// ============================================
// 11. UPDATE: renderReviewSummary
// ============================================
    function renderReviewSummary(summary) {
        const container = document.getElementById('reviews-summary-container');
        if (!container) return;

        container.innerHTML = `
            <div class="review-summary-score">
                <div class="score-number">${summary.score}</div>
                <div class="stars">${summary.stars}</div>
                <p>${summary.recommendation}</p>
            </div>
            
            <div class="review-bars">
                ${summary.bars.map(bar => `
                    <div class="bar-item">
                        <span class="bar-label">${bar.label}</span>
                        <div class="bar-container">
                            <div class="bar-fill" style="width: ${bar.width};"></div>
                        </div>
                        <span style="font-size: 0.8rem; color: #666; width: 35px;">${bar.width}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

// ============================================
// 12. UPDATE: renderReviews
// ============================================
    function renderReviews(reviews) {
        const container = document.getElementById('review-list-container');
        if (!container) return;

        container.innerHTML = reviews.map(review => `
            <div class="review-card fade-in">
                <div class="review-header">
                    <div class="review-author">
                        <img src="${review.avatar}" alt="${review.author}">
                        <div class="author-info">
                            <span class="author-name">${review.author}</span>
                            <span class="review-date">${review.date}</span>
                        </div>
                    </div>
                    <div class="review-rating">
                        <span class="stars">${review.rating}</span>
                    </div>
                </div>
                <div class="review-body">
                    "${review.body}"
                </div>
            </div>
        `).join('');
    }

    function renderDiscoverMore(productIds) {
        const container = document.getElementById('discover-more-grid');
        if (!container) return;

        container.innerHTML = productIds.map(id => {
            const product = allProductsData[id];
            if (!product) return '';
            
            return `
                <div class="product-card" onclick="goToProduct('${id}')">
                    <div class="product-image" style="background-image: url('${product.mainImage}');"></div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-rating">
                            <span class="stars">${product.ratingStars}</span>
                            <span class="rating-count">(${product.ratingCount})</span>
                        </div>
                        <div class="product-price">${product.price}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function setupQuantityButtons() {
        const qtyDisplay = document.getElementById('qty-display');
        const increaseBtn = document.getElementById('increase-qty');
        const decreaseBtn = document.getElementById('decrease-qty');
        
        if (!qtyDisplay || !increaseBtn || !decreaseBtn) return;
        
        let quantity = 1;

        increaseBtn.addEventListener('click', () => {
            quantity++;
            qtyDisplay.textContent = quantity;
        });
        
        decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                qtyDisplay.textContent = quantity;
            }
        });
    }

    function setupAddToBagButton() {
        const addToBagBtn = document.querySelector('.btn-add-to-bag');
        if (!addToBagBtn) return;

        addToBagBtn.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id') || 'luxurious-elixir';
            const qtyDisplay = document.getElementById('qty-display');
            const quantity = qtyDisplay ? parseInt(qtyDisplay.textContent) : 1;
            
            // Load cart
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            
            // Check if product already exists
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ id: productId, quantity: quantity, size: '50ml' });
            }
            
            // Save cart
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update badge
            updateCartBadge();
            
            // Show notification
            const product = allProductsData[productId];
            if (product) {
                showNotification(`${product.name} has been added to your cart!`); 
            }
        });
    }

    function setupWishlistButton() {
        const wishlistBtn = document.querySelector('.btn-wishlist');
        if (!wishlistBtn) return;

        wishlistBtn.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id') || 'luxurious-elixir';
            
            // Load wishlist
            let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            
            // Toggle wishlist
            if (wishlist.includes(productId)) {
                wishlist = wishlist.filter(id => id !== productId);
                showNotification('Removed from wishlist');
                wishlistBtn.textContent = '🤍';
            } else {
                wishlist.push(productId);
                showNotification('Added to wishlist');
                wishlistBtn.textContent = '❤️';
            }
            
            // Save wishlist
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            
            // Update badge
            updateWishlistBadge();
        });
        
        // Set initial state
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || 'luxurious-elixir';
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        
        if (wishlist.includes(productId)) {
            wishlistBtn.textContent = '❤️';
        } else {
            wishlistBtn.textContent = '🤍';
        }
    }

// ============================================
// 13. INITIALIZATION
// ============================================

    let cartManager;
    let wishlistManager;

    document.addEventListener('DOMContentLoaded', () => {
        // Initialize basic functionality
        setupHeaderScroll();
        setupNavigationIcons();
        setupSearchListeners();
        setupSmoothScroll();
        setupScrollAnimations();
        setupLoadingAnimation();
        initShopFilters();
        initPreloaderAnimations();
        setupAuthPage();
        startCountdown();
        initShopFilters(); // New Filter Logic
        initBestSellerSlider(); 
        initOfferSlider();

        // Update badges
        updateCartBadge();
        updateWishlistBadge();
        
        // Initialize cart manager if on cart page
        if (document.getElementById('cart-content')) {
            cartManager = new ShoppingCartManager();
        }
        
        // Initialize wishlist manager if on wishlist page
        if (document.getElementById('wishlist-content')) {
            wishlistManager = new WishlistManager();
        }
        
        // Initialize product detail page if on product detail page
        if (document.getElementById('product-main-image')) {
            loadProductData();
            setupQuantityButtons();
            setupAddToBagButton();
            setupWishlistButton();
        }

        // Initialize profile page if on profile page
        if (document.querySelector('.profile-container')) {
            setupProfilePage();
        }

        if (document.getElementById('checkoutForm')) {
            loadOrderSummary();
        }

        // Mobile Toggle Logic
        const filterToggleBtn = document.getElementById('mobile-filter-toggle');
        const shopSidebar = document.getElementById('shopSidebar');
        if (filterToggleBtn && shopSidebar) {
            filterToggleBtn.addEventListener('click', () => {
                shopSidebar.classList.toggle('active');
                const isClosed = !shopSidebar.classList.contains('active');
                const spanText = filterToggleBtn.querySelector('span');
                if(spanText) spanText.textContent = isClosed ? 'Filter Products' : 'Close Filters';
            });
        }
    });

// ============================================
// UPDATE: Load Order Summary (Checkout Page)
// ============================================

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const orderItems = document.getElementById('orderItems');
    
    // 1. Ambil Data Diskon yang tersimpan dari Cart
    const savedDiscount = JSON.parse(localStorage.getItem('cart_discount') || '{"code": "", "percent": 0}');
    const discountPercent = savedDiscount.percent || 0;
    const discountCode = savedDiscount.code || '';

    if (cart.length === 0) {
        // Jika cart kosong, kembalikan ke halaman cart
        window.location.href = 'cart.html';
        return;
    }

    // 2. Render Item Produk (dengan Fallback Data)
    orderItems.innerHTML = cart.map(item => {
        // Cek data di 'products' dulu, jika tidak ada cari di 'allProductsData'
        let product = products[item.id];
        if (!product && typeof allProductsData !== 'undefined') {
            product = allProductsData[item.id];
        }
        
        if (!product) return '';
        
        // Pastikan gambar ada (fallback jika kosong)
        const imgSrc = product.image || product.mainImage || 'https://via.placeholder.com/80';
        
        return `
            <div class="order-item">
                <img src="${imgSrc}" alt="${product.name}" class="item-image">
                <div class="item-details">
                    <div class="item-name">${product.name}</div>
                    <div class="item-size">Size: ${item.size}</div>
                    <div class="item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="item-price">$${(product.priceNum * item.quantity).toFixed(2)}</div>
            </div>
        `;
    }).join('');

    // 3. Hitung Subtotal
    const subtotal = cart.reduce((total, item) => {
        let product = products[item.id];
        if (!product && typeof allProductsData !== 'undefined') {
            product = allProductsData[item.id];
        }
        return total + (product ? product.priceNum * item.quantity : 0);
    }, 0);

    // 4. Hitung Diskon & Total
    const discountAmount = subtotal * (discountPercent / 100);
    const discountedSubtotal = subtotal - discountAmount;
    
    const shipping = subtotal > 0 ? 10 : 0;
    const tax = discountedSubtotal * 0.1; // Pajak 10% dihitung dari harga setelah diskon
    const total = discountedSubtotal + shipping + tax;

    // 5. Update Tampilan Angka
    const elSubtotal = document.getElementById('summarySubtotal');
    const elShipping = document.getElementById('summaryShipping');
    const elTax = document.getElementById('summaryTax');
    const elTotal = document.getElementById('summaryTotal');

    if (elSubtotal) elSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (elShipping) elShipping.textContent = `$${shipping.toFixed(2)}`;
    if (elTax) elTax.textContent = `$${tax.toFixed(2)}`;
    if (elTotal) elTotal.textContent = `$${total.toFixed(2)}`;

    // 6. Tampilkan Baris Diskon (Jika ada)
    // Hapus baris diskon lama jika ada (untuk mencegah duplikasi saat reload)
    const oldDiscountRow = document.getElementById('summaryDiscountRow');
    if(oldDiscountRow) oldDiscountRow.remove();

    if (discountPercent > 0) {
        const discountRow = document.createElement('div');
        discountRow.className = 'summary-row';
        discountRow.id = 'summaryDiscountRow';
        // Styling agar sesuai tema Gold
        discountRow.style.color = 'var(--gold)'; 
        discountRow.style.fontWeight = '500';
        
        discountRow.innerHTML = `
            <span>Discount (${discountCode} - ${discountPercent}%)</span>
            <span>-$${discountAmount.toFixed(2)}</span>
        `;
        
        // Sisipkan baris diskon SEBELUM baris Shipping
        if (elShipping && elShipping.parentElement) {
            elShipping.parentElement.before(discountRow);
        }
    }
}

        // Form submission
        // Form submission (Checkout) - UPDATED WITH SALES TRACKING
        document.getElementById('placeOrderBtn')?.addEventListener('click', function(e) {
            e.preventDefault();
            
            const form = document.getElementById('checkoutForm');
            const selectedPayment = document.querySelector('.payment-option.selected');
            
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            if (!selectedPayment) {
                alert('Please select a payment method');
                return;
            }
            
            // Simulate processing UI
            this.disabled = true;
            this.textContent = 'Processing...';
            
            setTimeout(() => {
                const orderNum = 'LF-' + Math.floor(100000 + Math.random() * 900000);
                const orderNumEl = document.getElementById('orderNumber');
                if(orderNumEl) orderNumEl.textContent = 'Order #' + orderNum;
                
                // 1. AMBIL data cart untuk diproses
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const stocks = JSON.parse(localStorage.getItem('product_stock') || '{}');
                const sales = JSON.parse(localStorage.getItem('product_sales') || '{}');
                
                // 2. Update Stok & Sales Tracking
                cart.forEach(item => {
                    let currentStock = stocks[item.id] !== undefined ? stocks[item.id] : 10;
                    let newStock = currentStock - item.quantity;
                    if (newStock < 0) newStock = 0; 
                    stocks[item.id] = newStock;
                    
                    let currentSold = sales[item.id] !== undefined ? sales[item.id] : 2;
                    sales[item.id] = currentSold + item.quantity;
                });

                localStorage.setItem('product_stock', JSON.stringify(stocks));
                localStorage.setItem('product_sales', JSON.stringify(sales));
                
                // 3. Simpan ke Riwayat Order
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                
                // Cek fitur Gift
                const isGift = document.getElementById('isGift')?.checked;
                const giftMsg = document.getElementById('giftMessageInput')?.value;
                const hidePrice = document.getElementById('hidePrice')?.checked;
                const giftDetails = isGift ? { isGift: true, message: giftMsg, hidePrice: hidePrice } : null;

                const totalEl = document.getElementById('summaryTotal');
                const totalText = totalEl ? totalEl.textContent : '$0.00';

                orders.push({
                    orderNumber: orderNum,
                    date: new Date().toISOString(),
                    items: cart, // Simpan item yang dibeli
                    total: totalText,
                    status: 'Ordered',
                    giftDetails: giftDetails
                });
                
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // --- [PERBAIKAN] KOSONGKAN KERANJANG SETELAH PESANAN SUKSES ---
                localStorage.removeItem('cart');          // Hapus item cart
                localStorage.removeItem('cart_discount'); // Hapus kode promo
                
                // Update badge cart di header jadi 0
                if (typeof updateCartBadge === 'function') {
                    updateCartBadge();
                }
                // -------------------------------------------------------------
                
                // Show success modal
                const successModal = document.getElementById('successModal');
                if(successModal) successModal.classList.add('active');
                
            }, 2000);
        });

// ============================================
// 28. CHECKOUT GIFT LOGIC
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Toggle Tampilan Gift Details
    const giftCheckbox = document.getElementById('isGift');
    const giftDetails = document.getElementById('giftDetails');
    
    if (giftCheckbox && giftDetails) {
        giftCheckbox.addEventListener('change', function() {
            if (this.checked) {
                giftDetails.style.display = 'block';
                // Otomatis fokus ke input pesan
                document.getElementById('giftMessageInput')?.focus();
            } else {
                giftDetails.style.display = 'none';
            }
        });
    }

    // 2. Update Logika Submit Order (Menimpa logic lama agar data kado masuk)
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    if (placeOrderBtn) {
        // Hapus listener lama dengan cara clone node (trik cepat) atau timpa logic di dalamnya
        // Di sini kita akan membiarkan logic lama berjalan tapi kita tambahkan data kado ke 'orders' storage manual
        
        placeOrderBtn.addEventListener('click', function() {
            // Ambil data kado segera saat tombol diklik
            const isGift = document.getElementById('isGift')?.checked;
            const giftMsg = document.getElementById('giftMessageInput')?.value;
            const hidePrice = document.getElementById('hidePrice')?.checked;
            
            // Kita gunakan timeout kecil untuk menunggu logic pesanan utama (yang ada di main.js sebelumnya) selesai menulis ke localStorage
            setTimeout(() => {
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                
                if (orders.length > 0) {
                    // Ambil order terakhir (yang baru saja dibuat)
                    const lastOrder = orders[orders.length - 1];
                    
                    // Tambahkan data kado ke order tersebut
                    if (isGift) {
                        lastOrder.giftDetails = {
                            isGift: true,
                            message: giftMsg,
                            hidePrice: hidePrice
                        };
                        // Simpan kembali
                        localStorage.setItem('orders', JSON.stringify(orders));
                    }
                }
            }, 100); // Delay 100ms setelah order dibuat
        });
    }
});        

// ============================================
// FILTER LOGIC & VIEW TOGGLE
// ============================================

function initShopFilters() {
    // 1. SELECTORS & STATE SETUP
    const grid = document.getElementById('shopProductGrid');
    const resultCount = document.getElementById('result-count');
    const sortSelect = document.getElementById('sort-select');
    const viewButtons = document.querySelectorAll('.view-btn');
    const filterBtn = document.getElementById('apply-price-filter');
    const resetBtn = document.getElementById('reset-filters');
    const paginationContainer = document.getElementById('pagination-controls');
    
    // Group Checkboxes
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
    const scentCheckboxes = document.querySelectorAll('input[name="scent"]'); 
    
    // --- SELECTOR SIZE (BARU) ---
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    
    const ratingCheckboxes = document.querySelectorAll('input[name="rating"]');
    
    // Price Inputs
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    if (!grid) return; 

    // State Variables
    let currentPage = 1;
    let itemsPerPage = 6; 
    let currentFilteredProducts = []; 

    // Konversi Data: Gunakan allProductsData agar Brand & Size terbaca
    // Fallback ke variable 'products' jika allProductsData belum ter-load
    const sourceData = (typeof allProductsData !== 'undefined') ? allProductsData : products;
    
    // Ubah object menjadi array untuk memudahkan filtering
    const productArray = Object.entries(sourceData).map(([id, item]) => ({ id, ...item }));

    // --- 2. LOGIKA GANTI TAMPILAN (GRID / LIST) ---
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const viewType = btn.getAttribute('data-view');
            if (viewType === 'list') {
                grid.classList.add('list-view');
                itemsPerPage = 4; 
            } else {
                grid.classList.remove('list-view');
                itemsPerPage = 6; 
            }
            currentPage = 1; 
            renderGrid();
        });
    });

    // --- 3. FUNGSI RENDER GRID UTAMA ---
    function renderGrid() {
        const totalItems = currentFilteredProducts.length;
        if (resultCount) resultCount.textContent = `Showing ${totalItems} results`;

        // Empty State
        if (totalItems === 0) {
            grid.innerHTML = `<div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #888;"><h3>No products found matching your selection.</h3></div>`;
            paginationContainer.innerHTML = '';
            return;
        }

        // Pagination Logic
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToDisplay = currentFilteredProducts.slice(startIndex, endIndex);
        
        // Data Pendukung (Wishlist & Reviews)
        const currentWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const storedReviewsData = JSON.parse(localStorage.getItem('product_reviews') || '{}');

        // Render HTML
        grid.innerHTML = productsToDisplay.map((product, index) => {
            // Badge Diskon / New
            const isDiscount = product.priceNum > 150;
            const oldPrice = isDiscount ? (product.priceNum * 1.2).toFixed(2) : null;
            const badgeHtml = isDiscount 
                ? `<span class="card-badge">-20%</span>` 
                : (index % 3 === 0 ? `<span class="card-badge new">NEW</span>` : '');

            // Status Wishlist
            const isWishlisted = currentWishlist.includes(product.id);
            const activeClass = isWishlisted ? 'active' : '';

            // --- Logika Review (Sync) ---
            let displayStars = product.ratingStars || '★★★★★';
            let displayCount = product.ratingCount || 0;
            
            const dynamicReviews = storedReviewsData[product.id] || [];
            let staticReviews = product.reviews || [];
            
            // Fallback default jika kosong
            if (staticReviews.length === 0 && typeof defaultProductData !== 'undefined') {
                 staticReviews = defaultProductData.reviews || [];
            }

            const combinedReviews = [...dynamicReviews, ...staticReviews];
            
            if (combinedReviews.length > 0) {
                 if (typeof calculateReviewStats === 'function') {
                    const stats = calculateReviewStats(combinedReviews);
                    displayStars = stats.stars;
                    displayCount = combinedReviews.length;
                }
            }

            // Tampilkan Size di Card
            const sizeLabel = product.size ? `<div style="font-size:0.75rem; color:#888; margin-top:4px;">${product.size}</div>` : '';

            // --- TAMBAHAN BARU: SOLD COUNT ---
            // Ambil data penjualan, jika tidak ada anggap 0, lalu tambah default 2
            const salesData = JSON.parse(localStorage.getItem('product_sales') || '{}');
            const soldCount = (salesData[product.id] || 0) + 2; 

            return `
            <div class="product-card fade-in-up" style="animation-delay: ${index * 0.05}s;" onclick="goToProduct('${product.id}')">
                <div class="product-image-wrapper">
                    ${badgeHtml}
                    
                    <button class="card-wishlist-btn ${activeClass}" onclick="event.stopPropagation(); toggleWishlist('${product.id}', this)" title="Add to Wishlist">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>

                    <button class="card-quick-add-btn" onclick="event.stopPropagation(); quickAddToCart('${product.id}')" title="Quick Add to Cart">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                            <line x1="12" y1="12" x2="12" y2="16"></line> <line x1="10" y1="14" x2="14" y2="14"></line>
                        </svg>
                    </button>

                    <div class="product-image" style="background-image: url('${product.image || product.mainImage}');"></div>
                </div>
                <div class="product-info">
                    <span class="product-brand">${product.brand || 'Lumière Scents'}</span>
                    <h3 class="product-name">${product.name}</h3>
                    ${sizeLabel}
                    
                    <div class="product-rating">
                        <span class="stars">${displayStars}</span>
                        <span class="rating-count">(${displayCount})</span>
                    </div>

                    <div class="product-sold" style="font-size: 0.75rem; color: #888; margin-top: 2px;">
                        ${soldCount} sold
                    </div>
                    <div class="product-price-box">
                        <span class="current-price">${product.price}</span>
                        ${oldPrice ? `<span class="old-price">$${oldPrice}</span>` : ''}
                    </div>
                </div>
            </div>
            `;

            return `
            <div class="product-card fade-in-up" style="animation-delay: ${index * 0.05}s;" onclick="goToProduct('${product.id}')">
                <div class="product-image-wrapper">
                    ${badgeHtml}
                    
                    <button class="card-wishlist-btn ${activeClass}" onclick="event.stopPropagation(); toggleWishlist('${product.id}', this)" title="Add to Wishlist">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>

                    <button class="card-quick-add-btn" onclick="event.stopPropagation(); quickAddToCart('${product.id}')" title="Quick Add to Cart">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                            <line x1="12" y1="12" x2="12" y2="16"></line> <line x1="10" y1="14" x2="14" y2="14"></line>
                        </svg>
                    </button>

                    <div class="product-image" style="background-image: url('${product.image || product.mainImage}');"></div>
                </div>
                <div class="product-info">
                    <span class="product-brand">${product.brand || 'Lumière Scents'}</span>
                    <h3 class="product-name">${product.name}</h3>
                    ${sizeLabel}
                    <div class="product-rating">
                        <span class="stars">${displayStars}</span>
                        <span class="rating-count">(${displayCount})</span>
                    </div>
                    <div class="product-price-box">
                        <span class="current-price">${product.price}</span>
                        ${oldPrice ? `<span class="old-price">$${oldPrice}</span>` : ''}
                    </div>
                </div>
            </div>
            `;
        }).join('');

        renderPagination(totalPages);
    }

    // --- 4. RENDER PAGINASI ---
    function renderPagination(totalPages) {
        if (!paginationContainer) return;
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let html = '';
        if (currentPage > 1) {
            html += `<button class="page-btn prev-page" onclick="changePage(${currentPage - 1})"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`;
        } else { 
            html += `<div style="width: 45px;"></div>`; 
        }
        
        html += `<span class="page-info">Page ${currentPage} of ${totalPages}</span>`;
        
        if (currentPage < totalPages) {
            html += `<button class="page-btn next-page" onclick="changePage(${currentPage + 1})"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`;
        } else { 
            html += `<div style="width: 45px;"></div>`; 
        }
        
        paginationContainer.innerHTML = html;
    }

    // --- 5. LOGIKA FILTER UTAMA ---
    function applyFilters() {
        let filtered = [...productArray];

        // --- [BARU] FILTER STOK KOSONG ---
        // Ambil data stok dari LocalStorage
        const stocks = JSON.parse(localStorage.getItem('product_stock') || '{}');

        filtered = filtered.filter(p => {
            // Ambil stok produk ini (Default 10 jika belum ada data di admin)
            const currentStock = stocks[p.id] !== undefined ? stocks[p.id] : 10;
            
            // Hanya kembalikan produk yang stoknya LEBIH DARI 0
            return currentStock > 0;
        });

        // A. Filter Category
        const checkedCats = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        if (checkedCats.length > 0) {
            filtered = filtered.filter(p => checkedCats.includes((p.category || '').toLowerCase()));
        }

        // B. Filter Brand
        const checkedBrands = Array.from(brandCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        if (checkedBrands.length > 0) {
            filtered = filtered.filter(p => checkedBrands.includes((p.brand || '').toLowerCase()));
        }

        // C. Filter Scent
        const checkedScents = Array.from(scentCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        if (checkedScents.length > 0) {
            filtered = filtered.filter(p => checkedScents.includes((p.scent || '').toLowerCase()));
        }

        // D. Filter Size (Ukuran Botol)
        const checkedSizes = Array.from(sizeCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        if (checkedSizes.length > 0) {
            filtered = filtered.filter(p => {
                const productSize = (p.size || '50ml').toLowerCase(); // Default 50ml jika kosong
                return checkedSizes.includes(productSize);
            });
        }

        // E. Filter Rating (Bintang Real-time)
        const checkedRatings = Array.from(ratingCheckboxes).filter(cb => cb.checked).map(cb => parseInt(cb.value));
        if (checkedRatings.length > 0) {
            filtered = filtered.filter(p => {
                // Hitung bintang aktual
                const dynamicReviews = (JSON.parse(localStorage.getItem('product_reviews') || '{}'))[p.id] || [];
                const staticReviews = p.reviews || (typeof defaultProductData !== 'undefined' ? defaultProductData.reviews : []) || [];
                const combined = [...dynamicReviews, ...staticReviews];
                
                let starCount = 5; 
                if (combined.length > 0) {
                     let total = 0;
                     combined.forEach(r => {
                        let n = r.ratingNum;
                        if (!n && r.rating) n = (r.rating.match(/★/g) || []).length;
                        total += (n || 5);
                     });
                     starCount = Math.round(total / combined.length);
                }
                return checkedRatings.includes(starCount);
            });
        }

        // F. Filter Harga
        const min = parseFloat(minPriceInput.value) || 0;
        const max = parseFloat(maxPriceInput.value) || 10000;
        filtered = filtered.filter(p => p.priceNum >= min && p.priceNum <= max);

        // G. Sorting
        const sortVal = sortSelect ? sortSelect.value : 'default';
        if (sortVal === 'price-low') filtered.sort((a, b) => a.priceNum - b.priceNum);
        else if (sortVal === 'price-high') filtered.sort((a, b) => b.priceNum - a.priceNum);
        else if (sortVal === 'rating') {
            filtered.sort((a, b) => {
                 // Sort rating sederhana berdasarkan jumlah count
                 return (parseFloat(b.ratingCount||0)) - (parseFloat(a.ratingCount||0));
            });
        }

        currentFilteredProducts = filtered;
        currentPage = 1; 
        renderGrid();
    }

    // --- 6. EVENT LISTENERS & HELPERS ---
    
    window.changePage = function(newPage) {
        currentPage = newPage;
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        renderGrid();
    }

    function resetFilters() {
        categoryCheckboxes.forEach(cb => cb.checked = false);
        brandCheckboxes.forEach(cb => cb.checked = false);
        scentCheckboxes.forEach(cb => cb.checked = false);
        sizeCheckboxes.forEach(cb => cb.checked = false); // Reset Size
        ratingCheckboxes.forEach(cb => cb.checked = false);
        
        minPriceInput.value = '';
        maxPriceInput.value = '';
        if(sortSelect) sortSelect.value = 'default';
        
        applyFilters();
    }

    // Attach Listeners
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
    brandCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
    scentCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
    sizeCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters)); // Size Listener
    ratingCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));

    if (filterBtn) filterBtn.addEventListener('click', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);

    // --- 7. URL PARAMETER HANDLING ---
    const urlParams = new URLSearchParams(window.location.search);
    let hasActiveFilter = false;

    const checkAndFilter = (paramName, checkboxList) => {
        const param = urlParams.get(paramName);
        if (param) {
            checkboxList.forEach(cb => {
                if(cb.value.toLowerCase() === param.toLowerCase()) {
                    cb.checked = true;
                    hasActiveFilter = true;
                }
            });
        }
    };

    checkAndFilter('category', categoryCheckboxes);
    checkAndFilter('search', scentCheckboxes); // 'search' param maps to scents/tags
    checkAndFilter('brand', brandCheckboxes);

    // Jalankan filter pertama kali
    applyFilters();

    // Auto-scroll jika ada filter dari URL
    if (hasActiveFilter) {
        setTimeout(() => {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800);
    }
}

// Fungsi Global untuk Toggle Wishlist dari Shop Grid
function toggleWishlist(productId, btnElement) {
    // 1. Ambil data wishlist saat ini
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const index = wishlist.indexOf(productId);
    const product = products[productId]; // Mengambil data produk dari objek global 'products'

    if (index === -1) {
        // KASUS: Belum ada di wishlist -> Tambahkan
        wishlist.push(productId);
        btnElement.classList.add('active'); // Tambah efek visual
        
        // Tampilkan notifikasi
        const msg = product ? `${product.name} added to wishlist` : 'Added to wishlist';
        showNotification(msg, 'success');
        
    } else {
        // KASUS: Sudah ada -> Hapus
        wishlist.splice(index, 1);
        btnElement.classList.remove('active'); // Hapus efek visual
        
        // Tampilkan notifikasi
        const msg = product ? `${product.name} removed from wishlist` : 'Removed from wishlist';
        showNotification(msg, 'info');
    }

    // 2. Simpan kembali ke LocalStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // 3. Update Badge di Header (jika fungsi tersedia)
    if (typeof updateWishlistBadge === 'function') {
        updateWishlistBadge();
    } else if (window.wishlistManager) {
        window.wishlistManager.updateBadge();
    }
}

// ============================================
// 16. WISHLIST MODAL
// ============================================

    function showWishlistModal() {
        // 1. Ambil data wishlist
        const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
        
        if (wishlistIds.length === 0) {
            showNotification('Your wishlist is currently empty.', 'info');
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'wishlist-modal search-overlay active'; 
        modal.style.display = 'flex';
        
        // 2. Generate Konten HTML (Produk)
        const itemsHtml = wishlistIds.map(id => {
            let product = products[id];
            
            // Fallback cari di allProductsData jika di products tidak ada
            if (!product && typeof allProductsData !== 'undefined') {
                product = allProductsData[id];
            }

            if (!product) return ''; 

            // Fallback gambar
            const imgSrc = product.image || product.mainImage || 'https://via.placeholder.com/80';

            return `
                <div class="order-card" style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-bottom: 1px solid #222; padding-bottom: 1rem;">
                    
                    <div style="display: flex; align-items: center; gap: 1rem; flex: 1;">
                        <img src="${imgSrc}" class="item-img" alt="${product.name}" 
                            onclick="window.location.href='product_detail.html?id=${id}'" 
                            style="cursor: pointer; width: 70px; height: 70px; object-fit: cover; border-radius: 8px;">
                        
                        <div class="item-info">
                            <h4 onclick="window.location.href='product_detail.html?id=${id}'" 
                                style="cursor: pointer; font-size: 1rem; margin-bottom: 0.2rem; color: #fff;">
                                ${product.name}
                            </h4>
                            <p style="color: var(--gold); margin-bottom: 0.3rem; font-weight:500;">${product.price}</p>
                            <div style="font-size: 0.75rem; color: #888;">${product.ratingStars || '★★★★★'}</div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-end;">
                        <button onclick="quickAddToCart('${id}')" 
                                style="background: var(--gold); color: #000; border: none; padding: 0.4rem 0.8rem; border-radius: 50px; cursor: pointer; font-weight: 600; font-size: 0.75rem; min-width: 90px;">
                            Add to Cart
                        </button>
                        <button onclick="removeFromWishlistModal('${id}', this)" 
                                style="background: transparent; border: 1px solid #444; color: #888; padding: 0.3rem 0.8rem; border-radius: 50px; cursor: pointer; font-size: 0.7rem; min-width: 90px; transition: 0.3s;">
                            Remove
                        </button>
                    </div>

                </div>
            `;
        }).join('');

        // 3. Susun Struktur Modal (PERBAIKAN LAYOUT SCROLL)
        // Menggunakan Flex Column: Header tetap, Body yang scroll
        modal.innerHTML = `
            <div class="search-container" style="background: #000; padding: 0; border-radius: 20px; border: 1px solid var(--gold-dark); max-height: 80vh; width: 100%; max-width: 600px; display: flex; flex-direction: column; overflow: hidden;">
                
                <div class="search-header" style="padding: 1.5rem 2rem; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items: center; background: #000; flex-shrink: 0;">
                    <h2 style="font-family: 'Playfair Display', serif; color: var(--gold); margin: 0; font-size: 1.5rem;">My Wishlist</h2>
                    <button class="close-search" onclick="closeWishlistModal()" style="background: transparent; border: none; color: #fff; font-size: 2rem; cursor: pointer; line-height: 1; padding: 0;">×</button>
                </div>

                <div class="search-body" style="overflow-y: auto; padding: 1.5rem 2rem; flex: 1;">
                    <div class="order-list">
                        ${itemsHtml}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; 
    }

    // Fungsi Menutup Modal
    function closeWishlistModal() {
        const modal = document.querySelector('.wishlist-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }

    // Helper: Add to Cart langsung dari Modal
    // Helper: Add to Cart langsung dari Modal (VERSI PERBAIKAN)
    function quickAddToCart(productId) {
        // 1. Cek apakah data produk ada
        const product = products[productId];
        if (!product) {
            console.error("Product not found");
            return;
        }

        // 2. Ambil data keranjang saat ini dari penyimpanan browser (LocalStorage)
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // 3. Cek apakah produk sudah ada di keranjang (default size 50ml)
        const existingItem = cart.find(item => item.id === productId && item.size === '50ml');

        if (existingItem) {
            // Jika ada, tambah jumlahnya
            existingItem.quantity += 1;
        } else {
            // Jika belum ada, masukkan sebagai item baru
            cart.push({ 
                id: productId, 
                quantity: 1, 
                size: '50ml' 
            });
        }

        // 4. Simpan kembali ke penyimpanan browser
        localStorage.setItem('cart', JSON.stringify(cart));

        // 5. Update angka merah (Badge) di icon keranjang header
        if (typeof updateCartBadge === 'function') {
            updateCartBadge();
        } else if (window.cartManager) {
            window.cartManager.updateBadge();
        }

        // 6. Berikan notifikasi sukses
        // Jika Anda punya fungsi showNotification (custom), gunakan itu. Jika tidak, pakai alert biasa.
        if (typeof showNotification === 'function') {
            showNotification(`${product.name} has been added to your cart!`, 'success');
        } else {
            alert(`${product.name} has been added to your cart!`);
        }
    }

    // Helper: Hapus dari Wishlist & Update Tampilan Modal
    function removeFromWishlistModal(productId, btnElement) {
        // 1. Hapus dari localStorage
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        wishlist = wishlist.filter(id => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        // 2. Update visual badge
        if(window.wishlistManager) window.wishlistManager.updateBadge();
        else updateWishlistBadge(); // Fallback

        // 3. Hapus elemen kartu dari modal secara visual
        // Mencari elemen pembungkus .order-card terdekat dan menghapusnya
        const card = btnElement.closest('.order-card');
        if(card) {
            card.style.opacity = '0';
            setTimeout(() => {
                card.remove();
                // Jika habis, tutup modal
                if(wishlist.length === 0) closeWishlistModal();
            }, 300);
        }
    }

// ============================================
// 17. LOGIN & SIGN UP FUNCTIONALITY
// ============================================

    function setupAuthPage() {
        // Check if we're on auth page
        const authContainer = document.querySelector('.auth-container');
        if (!authContainer) return;

        // Tab Switching
        const tabs = document.querySelectorAll('.auth-tab');
        const forms = document.querySelectorAll('.auth-form');
        const footerText = document.getElementById('footerText');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });

        // Login Form Submit
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        // Sign Up Form Submit
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', handleSignup);
        }
    }

    function switchTab(targetTab) {
        const tabs = document.querySelectorAll('.auth-tab');
        const forms = document.querySelectorAll('.auth-form');
        const footerText = document.getElementById('footerText');

        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        const targetTabElement = document.querySelector(`[data-tab="${targetTab}"]`);
        if (targetTabElement) {
            targetTabElement.classList.add('active');
        }

        // Update forms
        forms.forEach(f => f.classList.remove('active'));
        const targetForm = document.getElementById(`${targetTab}Form`);
        if (targetForm) {
            targetForm.classList.add('active');
        }

        // Update footer text
        if (footerText) {
            if (targetTab === 'login') {
                footerText.innerHTML = 'Don\'t have an account? <a href="#" onclick="switchTab(\'signup\')">Sign up</a>';
            } else {
                footerText.innerHTML = 'Already have an account? <a href="#" onclick="switchTab(\'login\')">Sign in</a>';
            }
        }
    }

    function togglePassword(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
    }

    function handleLogin(e) {
        e.preventDefault();
        
        const emailEl = document.getElementById('loginEmail');
        const passEl = document.getElementById('loginPassword');

        if (!emailEl || !passEl) return;

        const emailInput = emailEl.value.trim();
        const passwordInput = passEl.value;
        
        // Ambil data users dari database lokal
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // --- 1. CEK KHUSUS ADMIN (MASTER LOGIN) ---
        // Ini memastikan Anda BISA login sebagai admin meskipun belum terdaftar di database
        if (emailInput === 'admin@lumiere.com' && passwordInput === 'admin123') {
            
            // Cek apakah data admin ini sudah tersimpan di 'users'?
            // Jika belum, kita tambahkan otomatis agar muncul di User Management
            let adminIndex = users.findIndex(u => u.email === 'admin@lumiere.com');
            
            if (adminIndex === -1) {
                const newAdmin = {
                    id: 'ADMIN-MASTER',
                    name: 'Super Admin',
                    email: 'admin@lumiere.com',
                    password: 'admin123',
                    role: 'Admin', // Role penting!
                    joinedDate: new Date().toLocaleDateString(),
                    lastLogin: new Date().toLocaleString()
                };
                users.push(newAdmin);
            } else {
                // Jika sudah ada, update last login-nya saja
                users[adminIndex].lastLogin = new Date().toLocaleString();
            }
            
            // Simpan perubahan ke database
            localStorage.setItem('users', JSON.stringify(users));
            
            // SET SESI LOGIN
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', 'admin@lumiere.com');
            localStorage.setItem('userProfile', JSON.stringify({
                firstName: 'Super',
                lastName: 'Admin',
                email: 'admin@lumiere.com',
                role: 'Admin'
            }));

            // NOTIFIKASI & REDIRECT
            if (typeof showNotification === 'function') {
                showNotification('Welcome, Administrator!', 'success');
            } else {
                alert('Welcome, Administrator!');
            }
            
            setTimeout(() => {
                // Deteksi folder untuk redirect yang benar
                if (window.location.pathname.includes('/pages/')) {
                    window.location.href = 'admin.html'; // Jika di folder pages
                } else {
                    window.location.href = 'pages/admin.html'; // Jika di root
                }
            }, 1000);
            
            return; // Berhenti di sini, tidak perlu cek user biasa
        }

        // --- 2. CEK USER BIASA ---
        const userIndex = users.findIndex(u => u.email === emailInput && u.password === passwordInput);

        if (userIndex !== -1) {
            const validUser = users[userIndex];
            
            // Update Last Login User
            users[userIndex].lastLogin = new Date().toLocaleString('en-US', { 
                day: 'numeric', month: 'short', year: 'numeric', 
                hour: '2-digit', minute: '2-digit' 
            });
            localStorage.setItem('users', JSON.stringify(users));

            // Set Session
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', emailInput);
            
            const fullName = validUser.name || 'User';
            const nameParts = fullName.split(' ');
            
            const profileData = {
                firstName: nameParts[0],
                lastName: nameParts.slice(1).join(' ') || '',
                email: validUser.email,
                phone: validUser.phone || '', 
                address: validUser.address || '', 
                city: '', postalCode: validUser.postalCode || '', country: '', bio: ''
            };
            
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            
            if (typeof showNotification === 'function') {
                showNotification(`Welcome back, ${nameParts[0]}!`, 'success');
            } else {
                alert(`Welcome back, ${nameParts[0]}!`);
            }
            
            setTimeout(() => {
                // Cek apakah user ini punya role Admin di databasenya (jika ada admin lain)
                if (validUser.role === 'Admin' || validUser.email.toLowerCase().includes('admin')) {
                    if (window.location.pathname.includes('/pages/')) window.location.href = 'admin.html'; 
                    else window.location.href = 'pages/admin.html';
                } else {
                    if (window.location.pathname.includes('/pages/')) window.location.href = 'index.html';
                    else window.location.href = 'index.html';
                }
            }, 1500);
            
        } else {
            if (typeof showNotification === 'function') {
                showNotification('Invalid email or password!', 'error');
            } else {
                alert('Invalid email or password!');
            }
        }
    }

    function handleSignup(e) {
        e.preventDefault();
        
        // 1. Ambil value dari form
        const nameEl = document.getElementById('signupName');
        const emailEl = document.getElementById('signupEmail');
        const passEl = document.getElementById('signupPassword');
        const confirmEl = document.getElementById('confirmPassword');

        // Fallback selector jika ID tidak ditemukan
        const fullName = nameEl ? nameEl.value : e.target.querySelector('input[type="text"]').value;
        const email = emailEl ? emailEl.value : e.target.querySelector('input[type="email"]').value;
        const password = passEl ? passEl.value : document.getElementById('signupPassword').value;
        const confirmPassword = confirmEl ? confirmEl.value : document.getElementById('confirmPassword').value;
        
        // 2. Validasi Password
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        if (password.length < 3) {
            showNotification('Password must be at least 3 characters!', 'error');
            return;
        }

        // 3. Cek Email Duplikat
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === email)) {
            showNotification('Email is already registered!', 'error');
            return;
        }

        // 4. Simpan Data User Baru
        const newUser = {
            id: 'USER-' + Date.now(),
            name: fullName,
            email: email,
            password: password, // Password disimpan untuk login nanti
            role: 'Customer',
            joinedDate: new Date().toLocaleDateString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // 5. PENTING: Jangan auto-login.
        // Kita tidak menyimpan 'userLoggedIn' di sini agar user harus login manual.
        
        // 6. Tampilkan Notifikasi & Redirect ke signup.html
        showNotification('Account created! Redirecting to login...', 'success');
        
        setTimeout(() => {
            // Mengarahkan kembali ke halaman ini (signup.html) agar user bisa Login
            window.location.href = 'signup.html';
        }, 1500);
    }

// ============================================
// Countdown Timer
// ============================================    

    function startCountdown() {
        // Tentukan tanggal akhir promo (contoh: Black Friday, 24 November 2025 jam 23:59:59)
        // Sesuaikan tanggal ini sesuai tanggal promo yang Anda inginkan
        const endDate = new Date("Jan 10, 2026 23:59:59").getTime();
        
        // Cek apakah elemen countdown ada di halaman (hanya berlaku di index.html)
        if (!document.getElementById("days")) return;

        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = endDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Pastikan elemen ada sebelum mencoba mengubah innerHTML
            if(document.getElementById("days")) {
                document.getElementById("days").innerHTML = (days < 10 ? '0' : '') + days;
                document.getElementById("hours").innerHTML = (hours < 10 ? '0' : '') + hours;
                document.getElementById("minutes").innerHTML = (minutes < 10 ? '0' : '') + minutes;
                document.getElementById("seconds").innerHTML = (seconds < 10 ? '0' : '') + seconds;
            }

            // Jika hitungan selesai
            if (distance < 0) {
                clearInterval(x);
                if(document.getElementById("days")) {
                    document.getElementById("days").innerHTML = "00";
                    document.getElementById("hours").innerHTML = "00";
                    document.getElementById("minutes").innerHTML = "00";
                    document.getElementById("seconds").innerHTML = "00";
                }
            }
        }, 1000);
    }

// ============================================
// STICKY BOTTOM NAV LOGIC (Update di main.js)
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.bottom-nav-item');

    // 1. Highlight Menu Aktif
    navItems.forEach(item => {
        item.classList.remove('active');
        
        const href = item.getAttribute('href');
        // Cek kecocokan URL
        if (href && currentPath.includes(href)) {
            item.classList.add('active');
        }
    });
    
    // Khusus Homepage
    if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
        const homeNav = document.getElementById('nav-home');
        if(homeNav) homeNav.classList.add('active');
    }

    // 2. Update Badge Cart (Hanya untuk Header Desktop/Atas)
    // Karena icon cart bawah dihapus, kita kembalikan fungsi updateCartBadge ke default
    // atau pastikan pengecekan elemen ada sebelum update.
    const originalUpdateBadge = window.updateCartBadge;
    
    if (typeof originalUpdateBadge === "function") {
        window.updateCartBadge = function() {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            // Update badge atas (desktop/header) - Wajib ada
            const badgeTop = document.getElementById('cart-badge');
            if (badgeTop) {
                badgeTop.textContent = totalItems;
                badgeTop.style.display = totalItems > 0 ? 'flex' : 'none';
            }
        };
        // Jalankan sekali
        window.updateCartBadge();
    }
});

// ============================================
// DYNAMIC BEST SELLER SLIDER (SALES BASED)
// ============================================
function initBestSellerSlider() {
    const track = document.getElementById('bs-track');
    if (!track) return;

    // --- 1. AMBIL TOP PRODUK TERLARIS ---
    const salesData = JSON.parse(localStorage.getItem('product_sales') || '{}');
    
    // Konversi object sales ke array dan urutkan dari terbesar
    let sortedSales = Object.keys(salesData).map(id => ({
        id: id,
        count: salesData[id]
    }));
    sortedSales.sort((a, b) => b.count - a.count); // Descending

    // Ambil ID produk teratas
    let topProductIds = sortedSales.map(s => s.id);
    
    // Fallback Default
    const defaultBestSellers = ['floral-essence', 'amber-nights', 'royal-rose', 'golden-aura', 'timeless-oud'];
    
    // Gabungkan semua kandidat (Sales + Default)
    let combinedIds = [...new Set([...topProductIds, ...defaultBestSellers])];

    // --- [BARU] FILTER STOCK KOSONG ---
    // Jangan tampilkan produk jika stoknya 0
    const stocks = JSON.parse(localStorage.getItem('product_stock') || '{}');
    
    combinedIds = combinedIds.filter(id => {
        // Default stok 10 jika belum ada data
        const currentStock = stocks[id] !== undefined ? stocks[id] : 10;
        return currentStock > 0;
    });
    // ----------------------------------

    // Ambil maksimal 5 produk SETELAH difilter
    topProductIds = combinedIds.slice(0, 5);

    // --- 2. GENERATE HTML SECARA DINAMIS ---
    track.innerHTML = ''; 

    // Siapkan data review & fallback
    const storedReviewsData = JSON.parse(localStorage.getItem('product_reviews') || '{}');
    const fallbackDefaultReviews = [
        { rating: "★★★★★", ratingNum: 5 },
        { rating: "★★★★☆", ratingNum: 4 }
    ];

    topProductIds.forEach(id => {
        // Ambil data detail produk dari allProductsData
        const product = (typeof allProductsData !== 'undefined' && allProductsData[id]) ? allProductsData[id] : null;
        
        if (!product) return; 

        // --- Logika Hitung Bintang ---
        const dynamicReviews = storedReviewsData[id] || [];
        let staticReviews = product.reviews || [];
        
        if (staticReviews.length === 0 && typeof defaultProductData !== 'undefined') {
             staticReviews = defaultProductData.reviews || fallbackDefaultReviews;
        }

        const combinedReviews = [...dynamicReviews, ...staticReviews];
        
        let starsStr = "★★★★★";
        let reviewCountDisplay = "(0 Reviews)";

        if (combinedReviews.length > 0) {
            let totalStars = 0;
            combinedReviews.forEach(r => {
                let rNum = r.ratingNum;
                if (!rNum && r.rating) rNum = (r.rating.match(/★/g) || []).length;
                if (!rNum) rNum = 5;
                totalStars += rNum;
            });
            const avg = Math.round(totalStars / combinedReviews.length);
            starsStr = "★".repeat(avg) + "☆".repeat(5 - avg);
            reviewCountDisplay = `(${combinedReviews.length} Reviews)`;
        }

        // Hitung Terjual
        const soldCount = (salesData[id] || 0) + 2; 
        
        // Label Kategori
        let categoryLabel = "Best Seller";
        if(id.includes('floral')) categoryLabel = "Floral • Fresh • Iconic";
        else if(id.includes('amber')) categoryLabel = "Amber • Spicy • Warm";
        else if(id.includes('oud')) categoryLabel = "Woody • Rich • Royal";
        else if(id.includes('rose')) categoryLabel = "Rose • Musk • Timeless";
        
        const cardHTML = `
            <div class="wide-product-card">
                <div class="wide-card-image" style="background-image: url('${product.mainImage || product.image}');"></div>
                <div class="wide-card-content">
                    <span class="scent-category">${categoryLabel}</span>
                    <h3 class="wide-product-name">${product.name}</h3>
                    <p class="wide-product-desc">${product.shortDescription || product.productDetails?.substring(0, 100) + '...' || ''}</p>
                    
                    <div class="wide-meta">
                        <span class="price">${product.price}</span>
                        <div class="rating">
                            <span class="stars">${starsStr}</span>
                            <span class="count">${reviewCountDisplay}</span>
                        </div>
                        
                        <div class="bs-sold-count" style="font-size: 0.8rem; color: #888; margin-top: 5px; font-weight: 500;">
                            ${soldCount} Sold
                        </div>
                    </div>

                    <div class="wide-actions">
                        <button class="btn-primary" onclick="quickAddToCart('${id}')">Add to Bag</button>
                        <a href="product_detail.html?id=${id}" class="btn-details">View Details</a>
                    </div>
                </div>
            </div>
        `;
        track.insertAdjacentHTML('beforeend', cardHTML);
    });

    // --- 3. INISIALISASI SLIDER LOGIC ---
    
    let slides = track.querySelectorAll('.wide-product-card');
    const nextBtn = document.getElementById('bs-next');
    const prevBtn = document.getElementById('bs-prev');
    const dotsContainer = document.getElementById('bs-dots');

    // Jika tidak ada slide (karena semua stok habis), sembunyikan container slider atau biarkan kosong
    if (slides.length === 0) {
        if(dotsContainer) dotsContainer.innerHTML = '';
        return;
    }

    // Setup Dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(idx + 1)); 
            dotsContainer.appendChild(dot);
        });
    }
    const dots = document.querySelectorAll('#bs-dots .dot');

    // Cloning (Infinite Loop Logic)
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.id = 'bs-first-clone';
    lastClone.id = 'bs-last-clone';

    track.append(firstClone);
    track.prepend(lastClone);

    const allSlides = track.querySelectorAll('.wide-product-card'); 
    let counter = 1;
    let isTransitioning = false;
    const size = 100;

    track.style.transform = `translateX(${-size * counter}%)`;

    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        track.style.transform = `translateX(${-size * counter}%)`;
        updateDots();
    }

    function updateDots() {
        if (!dotsContainer) return;
        dots.forEach(d => d.classList.remove('active'));
        
        let dotIndex = counter - 1;
        if (counter === 0) dotIndex = slides.length - 1; 
        if (counter === allSlides.length - 1) dotIndex = 0; 
        
        if(dots[dotIndex]) dots[dotIndex].classList.add('active');
    }

    function moveToSlide(index) {
        if (isTransitioning) return;
        counter = index;
        updateSlider();
    }

    // Event Listeners (Hapus listener lama jika perlu, tapi overwrite function aman)
    // Clone node trick untuk menghapus event listener lama
    if (nextBtn) {
        const newNext = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);
        newNext.addEventListener('click', () => {
            if (isTransitioning) return;
            if (counter >= allSlides.length - 1) return;
            counter++;
            updateSlider();
        });
    }

    if (prevBtn) {
        const newPrev = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        newPrev.addEventListener('click', () => {
            if (isTransitioning) return;
            if (counter <= 0) return;
            counter--;
            updateSlider();
        });
    }

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (allSlides[counter].id === 'bs-last-clone') {
            track.style.transition = 'none';
            counter = allSlides.length - 2;
            track.style.transform = `translateX(${-size * counter}%)`;
        }
        if (allSlides[counter].id === 'bs-first-clone') {
            track.style.transition = 'none';
            counter = 1;
            track.style.transform = `translateX(${-size * counter}%)`;
        }
    });
}function initBestSellerSlider() {
    const track = document.getElementById('bs-track');
    if (!track) return;

    // 1. SIAPKAN DATA
    // Ambil semua ID produk dari database utama
    const allIds = (typeof allProductsData !== 'undefined') ? Object.keys(allProductsData) : [];
    
    // Ambil data penjualan & stok terkini
    const salesData = JSON.parse(localStorage.getItem('product_sales') || '{}');
    const stocks = JSON.parse(localStorage.getItem('product_stock') || '{}');

    // 2. BUAT DAFTAR KANDIDAT LENGKAP
    // Petakan setiap produk dengan jumlah penjualannya
    let candidates = allIds.map(id => {
        return {
            id: id,
            // Jika tidak ada data sales, anggap 0. 
            // Kita tambah sedikit random (0-0.9) agar urutan produk 0 sales tidak selalu sama (opsional)
            sales: (salesData[id] || 0), 
            // Cek stok (Default 10 jika belum di-set admin)
            stock: (stocks[id] !== undefined ? stocks[id] : 10)
        };
    });

    // 3. SORTING: URUTKAN BERDASARKAN PENJUALAN TERTINGGI
    candidates.sort((a, b) => b.sales - a.sales);

    // 4. FILTER: HANYA PRODUK DENGAN STOK > 0
    // Ini langkah kuncinya: produk kosong langsung dibuang dari antrian
    const availableCandidates = candidates.filter(p => p.stock > 0);

    // 5. AMBIL TOP 5
    // Karena sudah disortir & difilter, ini otomatis mengambil 
    // "5 produk terlaris yang stoknya ada"
    const topProductIds = availableCandidates.slice(0, 5).map(p => p.id);

    // --- GENERATE HTML (Sama seperti sebelumnya) ---
    track.innerHTML = ''; 

    // Jika tidak ada produk sama sekali (semua stok habis)
    if (topProductIds.length === 0) {
        track.innerHTML = '<div style="text-align:center; width:100%; padding:2rem;">All items sold out!</div>';
        return;
    }

    const storedReviewsData = JSON.parse(localStorage.getItem('product_reviews') || '{}');
    // Fallback review statis
    const fallbackDefaultReviews = [
        { rating: "★★★★★", ratingNum: 5 },
        { rating: "★★★★☆", ratingNum: 4 }
    ];

    topProductIds.forEach(id => {
        const product = allProductsData[id];
        if (!product) return; 

        // Hitung Bintang
        const dynamicReviews = storedReviewsData[id] || [];
        let staticReviews = product.reviews || [];
        if (staticReviews.length === 0 && typeof defaultProductData !== 'undefined') {
             staticReviews = defaultProductData.reviews || fallbackDefaultReviews;
        }
        const combinedReviews = [...dynamicReviews, ...staticReviews];
        
        let starsStr = "★★★★★";
        let reviewCountDisplay = "(0 Reviews)";

        if (combinedReviews.length > 0) {
            let totalStars = 0;
            combinedReviews.forEach(r => {
                let rNum = r.ratingNum;
                if (!rNum && r.rating) rNum = (r.rating.match(/★/g) || []).length;
                if (!rNum) rNum = 5;
                totalStars += rNum;
            });
            const avg = Math.round(totalStars / combinedReviews.length);
            starsStr = "★".repeat(avg) + "☆".repeat(5 - avg);
            reviewCountDisplay = `(${combinedReviews.length} Reviews)`;
        }

        // Tampilkan 'Sold' count (Data asli + angka pemanis biar terlihat ramai)
        const soldCount = (salesData[id] || 0) + (id.length % 5); 

        // Tentukan Label Kategori secara dinamis
        let categoryLabel = "Best Seller";
        const cat = (product.category || '').toLowerCase();
        if(cat.includes('floral')) categoryLabel = "Floral • Fresh • Iconic";
        else if(cat.includes('amber')) categoryLabel = "Amber • Spicy • Warm";
        else if(cat.includes('wood') || cat.includes('oud')) categoryLabel = "Woody • Rich • Royal";
        else categoryLabel = "Signature Scent";
        
        const cardHTML = `
            <div class="wide-product-card">
                <div class="wide-card-image" style="background-image: url('${product.mainImage || product.image}');"></div>
                <div class="wide-card-content">
                    <span class="scent-category">${categoryLabel}</span>
                    <h3 class="wide-product-name">${product.name}</h3>
                    <p class="wide-product-desc">${product.shortDescription || (product.productDetails||'').substring(0, 80) + '...'}</p>
                    
                    <div class="wide-meta">
                        <span class="price">${product.price}</span>
                        <div class="rating">
                            <span class="stars">${starsStr}</span>
                            <span class="count">${reviewCountDisplay}</span>
                        </div>
                        <div class="bs-sold-count" style="font-size: 0.8rem; color: #666; margin-top: 5px;">
                            🔥 ${soldCount} Sold recently
                        </div>
                    </div>

                    <div class="wide-actions">
                        <button class="btn-primary" onclick="quickAddToCart('${id}')">Add to Bag</button>
                        <a href="product_detail.html?id=${id}" class="btn-details">View Details</a>
                    </div>
                </div>
            </div>
        `;
        track.insertAdjacentHTML('beforeend', cardHTML);
    });

    // --- INISIALISASI SLIDER (Logic Geser) ---
    // Pastikan kode di bawah ini ada untuk mengaktifkan fungsi geser (Next/Prev)
    
    let slides = track.querySelectorAll('.wide-product-card');
    const nextBtn = document.getElementById('bs-next');
    const prevBtn = document.getElementById('bs-prev');
    const dotsContainer = document.getElementById('bs-dots');

    if (slides.length === 0) return;

    // Reset Dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(idx + 1)); 
            dotsContainer.appendChild(dot);
        });
    }
    const dots = document.querySelectorAll('#bs-dots .dot');

    // Clone untuk efek infinite loop
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    firstClone.id = 'bs-first-clone';
    lastClone.id = 'bs-last-clone';
    track.append(firstClone);
    track.prepend(lastClone);

    const allSlides = track.querySelectorAll('.wide-product-card'); 
    let counter = 1;
    let isTransitioning = false;
    const size = 100;

    track.style.transform = `translateX(${-size * counter}%)`;

    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        track.style.transform = `translateX(${-size * counter}%)`;
        
        // Update dots visual
        if (dotsContainer) {
            dots.forEach(d => d.classList.remove('active'));
            let realIdx = counter - 1;
            if(counter === 0) realIdx = slides.length - 1;
            if(counter === allSlides.length - 1) realIdx = 0;
            if(dots[realIdx]) dots[realIdx].classList.add('active');
        }
    }

    function moveToSlide(index) {
        if (isTransitioning) return;
        counter = index;
        updateSlider();
    }

    // Refresh Event Listeners (Clone node trick)
    if (nextBtn) {
        const newNext = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);
        newNext.addEventListener('click', () => {
            if (isTransitioning) return;
            if (counter >= allSlides.length - 1) return;
            counter++;
            updateSlider();
        });
    }

    if (prevBtn) {
        const newPrev = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        newPrev.addEventListener('click', () => {
            if (isTransitioning) return;
            if (counter <= 0) return;
            counter--;
            updateSlider();
        });
    }

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (allSlides[counter].id === 'bs-last-clone') {
            track.style.transition = 'none';
            counter = allSlides.length - 2;
            track.style.transform = `translateX(${-size * counter}%)`;
        }
        if (allSlides[counter].id === 'bs-first-clone') {
            track.style.transition = 'none';
            counter = 1;
            track.style.transform = `translateX(${-size * counter}%)`;
        }
    });
}

// ============================================
// OFFER SLIDER (Untuk Halaman Shop)
// ============================================

function initOfferSlider() {
    const track = document.getElementById('offer-track');
    if (!track) return;

    // --- 1. DATA DEFAULT MANUAL (Jaga-jaga) ---
    const fallbackDefaultReviews = [
        { rating: "★★★★★", ratingNum: 5 },
        { rating: "★★★★☆", ratingNum: 4 }
    ];

    // --- 2. UPDATE KARTU (SEBELUM CLONING) ---
    const rawSlides = track.querySelectorAll('.wide-product-card');
    const storedReviewsData = JSON.parse(localStorage.getItem('product_reviews') || '{}');
    const salesData = JSON.parse(localStorage.getItem('product_sales') || '{}');

    rawSlides.forEach(card => {
        let productId = null;

        // PERBAIKAN 1: Cara mengambil Product ID di Slider
        // Cek tombol 'Add to Bag' karena ID ada di fungsi quickAddToCart('id-nya')
        const addBtn = card.querySelector('button[onclick*="quickAddToCart"]');
        if (addBtn) {
            const match = addBtn.getAttribute('onclick').match(/quickAddToCart\(['"]([^'"]+)['"]\)/);
            if (match) productId = match[1];
        }

        // Fallback: Jika tidak ketemu, cek link 'View Details'
        if (!productId) {
            const linkBtn = card.querySelector('a.btn-details');
            if (linkBtn && linkBtn.href.includes('id=')) {
                productId = linkBtn.href.split('id=')[1];
            }
        }

        if (!productId) return; // Skip jika ID tetap tidak ketemu

        // --- PROSES DATA REVIEW ---
        const dynamicReviews = storedReviewsData[productId] || [];
        let staticReviews = [];

        // Cek Data Global
        if (typeof allProductsData !== 'undefined' && allProductsData[productId] && allProductsData[productId].reviews) {
            staticReviews = allProductsData[productId].reviews;
        } else if (typeof defaultProductData !== 'undefined' && defaultProductData.reviews) {
            staticReviews = defaultProductData.reviews;
        } else {
            staticReviews = fallbackDefaultReviews;
        }

        const combinedReviews = [...dynamicReviews, ...staticReviews];

        // --- PERBAIKAN 2: Selector CSS (.count bukan .rating-count) ---
        if (combinedReviews.length > 0) {
            // Hitung Bintang
            let totalStars = 0;
            combinedReviews.forEach(r => {
                let rNum = r.ratingNum;
                if (!rNum && r.rating) rNum = (r.rating.match(/★/g) || []).length;
                if (!rNum) rNum = 5;
                totalStars += rNum;
            });

            const avg = Math.round(totalStars / combinedReviews.length);
            const starsStr = "★".repeat(avg) + "☆".repeat(5 - avg);

            // Update DOM
            const starEl = card.querySelector('.stars');
            
            // Perhatikan selector ini: Di shop.html slider menggunakan class "count", bukan "rating-count"
            const countEl = card.querySelector('.count') || card.querySelector('.rating-count');

            if (starEl) starEl.textContent = starsStr;
            if (countEl) countEl.textContent = `(${combinedReviews.length} Reviews)`;
        }

        // --- [BARU] UPDATE SOLD COUNT (OFFER SLIDER) ---
        const soldCount = (salesData[productId] || 0) + 2; 
        
        // Cek apakah elemen sold sudah ada di card ini
        let soldEl = card.querySelector('.offer-sold-count');
        
        if (!soldEl) {
            // Jika belum ada, buat baru via JS
            soldEl = document.createElement('div');
            soldEl.className = 'offer-sold-count';
            
            // Styling agar sesuai tampilan Offer (background gelap)
            soldEl.style.fontSize = '0.85rem';
            soldEl.style.color = 'rgba(255, 255, 255, 0.6)'; // Warna abu terang
            soldEl.style.marginTop = '5px';
            soldEl.style.fontWeight = '500';
            
            // Masukkan elemen ini tepat setelah elemen .rating
            const ratingContainer = card.querySelector('.rating');
            if (ratingContainer && ratingContainer.parentNode) {
                ratingContainer.parentNode.insertBefore(soldEl, ratingContainer.nextSibling);
            }
        }
        
        // Set teks terjual
        soldEl.textContent = `${soldCount} sold`;
    });
    // --- 3. LOGIKA SLIDER (Sama seperti sebelumnya) ---
    let slides = track.querySelectorAll('.wide-product-card');
    const nextBtn = document.getElementById('offer-next');
    const prevBtn = document.getElementById('offer-prev');
    
    if (slides.length === 0) return;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.id = 'offer-first-clone';
    lastClone.id = 'offer-last-clone';

    track.append(firstClone);
    track.prepend(lastClone);

    const allSlides = track.querySelectorAll('.wide-product-card');
    let counter = 1;
    let isTransitioning = false;
    const size = 100;
    let slideInterval; 

    track.style.transform = `translateX(${-size * counter}%)`;

    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        track.style.transform = `translateX(${-size * counter}%)`;
    }

    function nextSlide() {
        if (counter >= allSlides.length - 1) return;
        counter++;
        updateSlider();
    }

    function prevSlide() {
        if (counter <= 0) return;
        counter--;
        updateSlider();
    }

    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            nextSlide();
        }, 3500); 
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });
    }

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (allSlides[counter].id === 'offer-last-clone') {
            track.style.transition = 'none';
            counter = allSlides.length - 2;
            track.style.transform = `translateX(${-size * counter}%)`;
        }
        if (allSlides[counter].id === 'offer-first-clone') {
            track.style.transition = 'none';
            counter = 1;
            track.style.transform = `translateX(${-size * counter}%)`;
        }
    });

    const sliderContainer = track.parentElement;
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    startAutoSlide();
}

// Pastikan fungsi di-export ke window agar bisa dipanggil dari HTML onclick
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;

// --- LOGIKA SIGN UP (PENDAFTARAN) ---
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah reload halaman

            // 1. Ambil nilai dari input
            const nameVal = document.getElementById('signupName').value;
            const emailVal = document.getElementById('signupEmail').value;
            const passVal = document.getElementById('signupPassword').value;

            // 2. Buat Objek User Baru
            const newUser = {
                id: 'USER-' + Date.now(), // ID Unik
                name: nameVal,
                email: emailVal,
                password: passVal,
                role: 'Customer', // Default role
                joinedDate: new Date().toLocaleDateString()
            };

            // 3. Ambil data 'users' yang sudah ada di LocalStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Cek apakah email sudah terdaftar (Opsional)
            const exists = users.find(u => u.email === emailVal);
            if (exists) {
                showNotification('Email is already registered!');
                return;
            }

            // 4. Tambahkan user baru ke array
            users.push(newUser);

            // 5. Simpan kembali ke LocalStorage (INI YANG PENTING UNTUK ADMIN)
            localStorage.setItem('users', JSON.stringify(users));

            // 6. Set user yang sedang login (Session)
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            // 7. Redirect ke halaman Profile atau Home
            showNotification('Account created successfully!');
            window.location.href = 'signup.html'; 
        });
    }

    // --- LOGIKA LOGIN (OPSIONAL: Agar User bisa masuk setelah logout) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Sesuaikan ID input login Anda di html
            const emailInput = document.getElementById('loginEmail').value; 
            const passInput = document.getElementById('loginPassword').value;

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Cari user yang cocok
            const validUser = users.find(u => u.email === emailInput && u.password === passInput);

            if (validUser) {
                localStorage.setItem('currentUser', JSON.stringify(validUser));
                
                // Cek Role (Jika Admin ke halaman Admin, jika Customer ke Profile)
                if(validUser.email.includes('admin')) { // Logika sederhana cek admin
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                showNotification('Invalid email or password!');
            }
        });
    }

// ============================================
// 20. CUSTOM FRAGRANCE WIZARD
// ============================================

function openCustomModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCustomModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Export functions
window.openCustomModal = openCustomModal;
window.closeCustomModal = closeCustomModal;

// Pastikan fungsi bisa dipanggil dari HTML (onclick)
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.openCustomModal = openCustomModal;
window.closeCustomModal = closeCustomModal;

// ============================================
// 18. EXPORT FUNCTIONS TO WINDOW
// ============================================
    window.switchTab = switchTab;
    window.togglePassword = togglePassword;
    window.socialLogin = socialLogin;
    window.showWishlistModal = showWishlistModal;
    window.closeWishlistModal = closeWishlistModal;
    window.quickAddToCart = quickAddToCart;
    window.removeFromWishlistModal = removeFromWishlistModal;
    window.resetFilters = resetFilters;
    window.goToProduct = goToProduct;
    window.openSearch = openSearch;
    window.closeSearch = closeSearch;
    window.applyPromoCode = applyPromoCode;
    window.checkout = checkout;
    window.addToCartFromWishlist = addToCartFromWishlist;
    window.showAllOrders = showAllOrders;
    window.ShoppingCartManager = ShoppingCartManager;
    window.WishlistManager = WishlistManager;
    window.toggleWishlist = toggleWishlist;
    
function switchDiscovery(type, btnElement) {
    // 1. Sembunyikan SEMUA panel
    const allPanels = document.querySelectorAll('.discovery-panel');
    allPanels.forEach(panel => {
        panel.style.display = 'none';
        panel.classList.remove('active');
    });

    // 2. Hapus class 'active' dari SEMUA tombol
    const allButtons = document.querySelectorAll('.discovery-tabs .tab-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Tampilkan panel yang dipilih
    const targetPanel = document.getElementById(`panel-${type}`);
    if (targetPanel) {
        targetPanel.style.display = 'block';
        // Timeout kecil untuk memastikan transisi CSS berjalan (jika ada fade-in)
        setTimeout(() => {
            targetPanel.classList.add('active');
        }, 10);
    }

    // 4. Aktifkan tombol yang diklik
    if (btnElement) {
        btnElement.classList.add('active');
    }
}