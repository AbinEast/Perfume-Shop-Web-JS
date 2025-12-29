// ============================================
// 1. GLOBAL VARIABLES & CONFIGURATION
// ============================================

const products = {
    'floral-essence': {
        name: "Floral Essence",
        brand: "Gucci",
        price: "$89.00",
        priceNum: 89.00,
        description: "A beautiful bouquet of fresh spring flowers",
        image: "/images/product_images/product_1_Floral_Essence.jpeg",
        category: "female",
        scent: "floral",
        ratingStars: "★★★★★",
        ratingCount: "198"
    },
    'amber-nights': {
        name: "Amber Nights",
        brand: "Dior",
        price: "$125.00",
        priceNum: 125.00,
        description: "A warm, mysterious, and seductive scent",
        image: "/images/product_images/product_2_Amber_Nights.jpeg",
        category: "unisex",
        scent: "oriental",
        ratingStars: "★★★★★",
        ratingCount: "214"
    },
    'royal-rose': {
        name: "Royal Rose",
        brand: "Chanel",
        price: "$95.00",
        priceNum: 95.00,
        description: "A modern interpretation of a classic rose",
        image: "/images/product_images/product_3_Royal_Rose.jpeg",
        category: "female",
        scent: "floral",
        ratingStars: "★★★★☆",
        ratingCount: "156"
    },
    'golden-aura': {
        name: "Golden Aura",
        brand: "Versace",
        price: "$110.00",
        priceNum: 110.00,
        description: "Radiate confidence with this luminous fragrance",
        image: "/images/product_images/product_4_Golden_Aura.jpeg",
        category: "male",
        scent: "oriental",
        ratingStars: "★★★★★",
        ratingCount: "187"
    },
    'aroma-bliss': {
        name: "Aroma Bliss",
        brand: "Hermes",
        price: "$175.00",
        priceNum: 175.00,
        description: "A calming and therapeutic blend",
        image: "/images/product_images/product_5_Aroma_Bliss.jpeg",
        category: "unisex",
        scent: "floral",
        ratingStars: "★★★★★",
        ratingCount: "203"
    },
    'timeless-oud': {
        name: "Timeless Oud",
        brand: "Tom Ford",
        price: "$225.00",
        priceNum: 225.00,
        description: "Deep, rich, and sophisticated oud wood",
        image: "/images/product_images/product_6_Timeless_Oud.jpeg",
        category: "male",
        scent: "woody",
        ratingStars: "★★★★★",
        ratingCount: "312"
    },
    'velvet-petal': {
        name: "Velvet Petal",
        brand: "Bvlgari",
        price: "$159.00",
        priceNum: 159.00,
        description: "A soft, powdery, and romantic floral scent",
        image: "/images/product_images/product_7_Velvet_Petal.jpeg",
        category: "female",
        scent: "floral",
        ratingStars: "★★★★☆",
        ratingCount: "76"
    },
    'amber-elite': {
        name: "Amber Elite",
        brand: "Bvlgari",
        price: "$195.00",
        priceNum: 195.00,
        description: "The ultimate expression of amber",
        image: "/images/product_images/product_8_Amber_Elite.jpeg",
        category: "male",
        scent: "woody",
        ratingStars: "★★★★★",
        ratingCount: "189"
    },
    'diamond-aura': {
        name: "Diamond Aura",
        brand: "Chanel",
        price: "$210.00",
        priceNum: 210.00,
        description: "A bright, sparkling, and crisp fragrance",
        image: "/images/product_images/product_9_Diamond_Aura.jpeg",
        category: "male",
        scent: "fresh",
        ratingStars: "★★★★★",
        ratingCount: "245"
    },
    'citrus-harmony': {
        name: "Citrus Harmony",
        brand: "Dior",
        price: "$138.00",
        priceNum: 138.00,
        description: "Zesty and uplifting grapefruit and lemon",
        image: "/images/product_images/product_10_Citrus_Harmony.jpeg",
        category: "unisex",
        scent: "fresh",
        ratingStars: "★★★★☆",
        ratingCount: "92"
    },
    'sapphire-mystique': {
        name: "Sapphire Mystique",
        brand: "YSL",
        price: "$182.00",
        priceNum: 182.00,
        description: "Deep, aquatic, and aromatic fragrance",
        image: "/images/product_images/product_11_Sapphire_Mystique.jpeg",
        category: "male",
        scent: "fresh",
        ratingStars: "★★★★★",
        ratingCount: "167"
    },
    'golden-harmony': {
        name: "Golden Harmony",
        brand: "Versace",
        price: "$205.00",
        priceNum: 205.00,
        description: "A balanced blend of spice, sweet, and wood",
        image: "/images/product_images/product_12_Golden_Harmony.jpeg",
        category: "unisex",
        scent: "woody",
        ratingStars: "★★★★★",
        ratingCount: "278"
    },
    'black-mamba': {
        name: "Black Mamba",
        brand: "Chanel",
        price: "$155.00",
        priceNum: 155.00,
        description: "A Balance Blend Of wood, and spice",
        image: "/images/product_images/product_13_Black_Mamba.jpeg",
        category: "Men",
        scent: "oriental",
        ratingStars: "★★★★★",
        ratingCount: "253"
    },
    'golden-amber': {
        name: "Golden Amber",
        brand: 'Gucci',
        price: "$250.00",
        priceNum: 250.00,
        description: "A Balance Blend Of floral and spice",
        image: "/images/product_images/product_14_Golden_Amber.png",
        category: "Unisex",
        scent: "Floral",
        ratingStars: "★★★★★",
        ratingCount: "232"
    },
    'spicy-oud': {
        name: "Spicy Oud",
        brand: 'Versace',
        price: "$100.00",
        priceNum: 250.00,
        description: "A Strong Blend Of Spice and little ounce of Wood",
        image: "/images/product_images/product_15_Spicy_Oud.jpg",
        category: "male",
        scent: "oriental",
        ratingStars: "★★★★☆",
        ratingCount: "128"
    },
    'discovery-set': {
        name: "Signature Discovery Set",
        brand: "Lumière",
        price: "$45.00",
        priceNum: 45.00,
        description: "Explore our 5 best-selling scents in 2ml vials.",
        image: "/images/product_images/product_16_Signature_Discovery.jpeg",
        category: "gift-set",
        scent: "fresh",
        ratingStars: "★★★★★",
        ratingCount: "342",
        // TAMBAHAN BARU: Definisi Isi Paket
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
        image: "/images/product_images/product_17_Golden_Gift.jpeg",
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
        image: "/images/product_images/product_18_Travel_Essential.jpeg",
        category: "gift-set",
        scent: "woody",
        ratingStars: "★★★★☆",
        ratingCount: "120",
        setItems: [
            { name: "Floral Essence (100ml)", image: "/images/product_images/product_1_Floral_Essence.jpeg" },
            { name: "Citrus Harmony (100ml)", image: "/images/product_images/product_10_Citrus_Harmony.jpeg" },
            { name: "Sapphire Mystique (100ml)", image: "/images/product_images/product_11_Sapphire_Mystique.jpeg" }
        ]
    },
};

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
                this.saveCart();
                this.render();
            }
        }

        getSubtotal() {
            return this.cart.reduce((total, item) => {
                const product = products[item.id];
                return total + (product ? product.priceNum * item.quantity : 0);
            }, 0);
        }

        getTotal() {
            const subtotal = this.getSubtotal();
            const shipping = subtotal > 0 ? 10 : 0;
            const tax = subtotal * 0.1;
            return subtotal + shipping + tax;
        }

        updateBadge() {
            updateCartBadge();
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
                const product = products[item.id];
                if (!product) return '';
                
                return `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.name}" class="item-image" onclick="goToProduct('${item.id}')">
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

            const subtotal = this.getSubtotal();
            const shipping = subtotal > 0 ? 10 : 0;
            const tax = subtotal * 0.1;
            const total = this.getTotal();

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
            alert(`Promo code applied! You saved ${validCodes[code]}%`);
            input.value = '';
        } else if (code) {
            alert('Invalid promo code. Try SAVE10, LUXURY20, or WELCOME15');
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
                postalCode: document.getElementById('addr-postal').value,
                country: document.getElementById('addr-country').value,
                bio: document.getElementById('profile-bio').value
            };
            
            // Simpan ke localStorage
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            
            // Disable inputs kembali
            inputs.forEach(input => input.readOnly = true);
            inputs.forEach(input => input.style.borderBottom = '1px solid #333'); // Reset style
            
            // Ubah tombol kembali ke Edit
            editBtn.textContent = 'Edit Profile';
            editBtn.style.background = '';
            editBtn.style.color = '';
            
            // Update tampilan nama di Sidebar secara realtime
            updateProfileName(profileData.firstName, profileData.lastName, profileData.email);
            
            showNotification('Profile updated successfully!', 'success');
            
        } else {
            // --- EDIT MODE ---
            inputs.forEach(input => {
                input.readOnly = false;
                input.style.borderBottom = '1px solid var(--gold)'; // Visual cue
            });
            
            // Fokus ke nama depan
            document.getElementById('profile-fname').focus();
            
            // Ubah tombol menjadi Save
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
            
            const itemsHtml = order.items.map(item => {
                const product = products[item.id];
                const img = product ? product.image : 'https://via.placeholder.com/60';
                const name = product ? product.name : 'Unknown Product';
                
                // --- LOGIKA BARU: CEK APAKAH SUDAH DI-REVIEW ---
                const productReviews = allReviews[item.id] || [];
                const hasReviewed = productReviews.some(r => r.author === currentUser);

                let reviewBtn;
                if (hasReviewed) {
                    // Tampilan jika SUDAH review (Tombol Mati/Disabled)
                    reviewBtn = `
                        <button disabled 
                                style="margin-top:0.5rem; padding:0.3rem 0.8rem; font-size:0.75rem; 
                                       border:1px solid #444; background:#333; 
                                       color:#888; cursor:not-allowed; border-radius:50px;">
                            Reviewed ✓
                        </button>
                    `;
                } else {
                    // Tampilan jika BELUM review (Tombol Aktif)
                    reviewBtn = `
                        <button onclick="openReviewModal('${item.id}', '${name}', '${img}')" 
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
                        <span class="order-status ${order.status === 'Delivered' ? 'delivered' : ''}">${order.status}</span>
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
        
        // Create modal for all orders
        const modal = document.createElement('div');
        modal.className = 'order-modal search-overlay active'; // Use search-overlay styles for consistency
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
                        
                        return `
                            <div class="order-card" style="margin-bottom: 2rem;">
                                <div class="order-header">
                                    <span class="order-id">#${order.orderNumber}</span>
                                    <span class="order-status">${order.status}</span>
                                </div>
                                ${order.items.map(item => {
                                    const product = products[item.id];
                                    const img = product ? product.image : '';
                                    const name = product ? product.name : 'Unknown';
                                    return `
                                        <div class="order-item">
                                            <img src="${img}" class="item-img" alt="${name}">
                                            <div class="item-info">
                                                <h4>${name}</h4>
                                                <p>Qty: ${item.quantity}</p>
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
        // Format Tanggal Cantik (Contoh: "24 DEC")
        const dateObj = new Date(app.date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'short' });
        
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
                        <h4>${app.topic} Session</h4>
                        <div class="service-meta">
                            <span>🕒 ${app.time}</span>
                            <span>📍 Virtual Meeting (Zoom)</span>
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
    const requests = JSON.parse(localStorage.getItem('customRequests') || '[]');
    const container = document.getElementById('custom-requests-list');
    
    if (!container) return;
    
    if (requests.length === 0) {
        container.innerHTML = `
            <div class="empty-service">
                <p>No custom fragrance requests yet.</p>
                <a href="service.html" onclick="window.location.href='service.html';">Create Your Scent</a>
            </div>`;
        return;
    }
    
    container.innerHTML = [...requests].reverse().map(req => {
        // Format Formula Display
        let formulaHtml = '';
        if (req.formula) {
            // Kita potong string agar tidak terlalu panjang di kartu
            const trunc = (str) => str && str.length > 20 ? str.substring(0, 18) + '..' : str;
            formulaHtml = `
                <span class="formula-tag">T: ${trunc(req.formula.top)}</span>
                <span class="formula-tag">H: ${trunc(req.formula.heart)}</span>
                <span class="formula-tag">B: ${trunc(req.formula.base)}</span>
            `;
        }

        const sizeDisplay = req.formula?.size || '50ml';
        // Ambil harga (fallback ke kosong jika data lama belum ada harga)
        const priceDisplay = req.price ? req.price : '';

        return `
            <div class="service-card">
                <div class="service-header">
                    <span class="service-id">ID: ${req.id}</span>
                    <span class="status-badge status-lab">${req.status}</span>
                </div>
                <div class="service-body">
                    <div class="service-date-box" style="border-color: var(--gold);">
                        <span class="date-day" style="font-size: 1.5rem;">🧪</span>
                        <span class="date-month">BESPOKE</span>
                    </div>
                    <div class="service-details" style="width: 100%;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                            <h4 style="margin: 0; display: flex; align-items: center; gap: 8px;">
                                "${req.name}" 
                                <span style="font-size:0.7rem; color:var(--gold); border:1px solid var(--gold); padding:1px 6px; border-radius:4px;">
                                    ${sizeDisplay}
                                </span>
                            </h4>
                            
                            ${priceDisplay ? `
                                <span style="color: var(--gold); font-weight: 700; font-size: 1.1rem; font-family: 'Playfair Display', serif;">
                                    ${priceDisplay}
                                </span>
                            ` : ''}
                        </div>

                        <div class="formula-tags">
                            ${formulaHtml}
                        </div>
                        <p style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">
                            Submitted: ${new Date(req.date).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

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
            
            // Ambil data dari input
            const date = document.getElementById('bookDate').value;
            const time = document.getElementById('bookTime').value;
            const topicEl = document.querySelector('input[name="topic"]:checked');
            const topic = topicEl ? topicEl.value : 'General Consultation';
            
            // Efek Loading
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Booking Confirmed!";
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // --- INTI LOGIKA PENYIMPANAN ---
                const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
                
                appointments.push({
                    id: 'BK-' + Math.floor(1000 + Math.random() * 9000), // ID Unik
                    date: date,
                    time: time,
                    topic: topic,
                    status: 'Confirmed' // Status awal
                });
                
                localStorage.setItem('appointments', JSON.stringify(appointments));
                // --------------------------------
                
                // Reset & Tutup
                bookingForm.reset();
                closeBookingModal();
                
                if (typeof showNotification === 'function') {
                    showNotification(`Appointment booked for ${date} at ${time}`, 'success');
                } else {
                    alert('Appointment booked successfully!');
                }
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
            }, 1000);
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
            
            const totalCost = calculateTotal(); // Ambil total akhir

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
                // Simpan Data
                const customRequests = JSON.parse(localStorage.getItem('customRequests') || '[]');
                
                customRequests.push({
                    id: 'BESPOKE-' + Math.floor(1000 + Math.random() * 9000),
                    date: new Date().toISOString(),
                    formula: {
                        top: finalTop,
                        heart: finalHeart,
                        base: finalBase,
                        size: bottleSize 
                    },
                    name: creationName,
                    price: `$${totalCost}`, // Simpan harga
                    status: 'Order Placed'
                });
                
                localStorage.setItem('customRequests', JSON.stringify(customRequests));
                
                // Reset & Close
                customForm.reset();
                calculateTotal(); // Reset tampilan harga ke default
                closeCustomModal();
                
                if (typeof showNotification === 'function') {
                    showNotification(`Order placed for "${creationName}" ($${totalCost})`, 'success');
                } else {
                    alert(`Success! Total: $${totalCost}`);
                }
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Jika sedang di halaman profile, refresh tab service agar pesanan muncul
                if (typeof loadCustomRequests === 'function') {
                    loadCustomRequests();
                }

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

function registerWorkshop(eventName, eventDate) {
    // 1. Cek apakah user sudah login (Opsional, tapi disarankan)
    // const userLoggedIn = localStorage.getItem('userLoggedIn');
    // if (!userLoggedIn) { alert("Please login first."); return; }

    // 2. Konfirmasi User
    if(!confirm(`Confirm registration for "${eventName}" on ${eventDate}?`)) return;

    // 3. Simpan ke LocalStorage 'appointments' (Digabung dengan booking konsultasi)
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    appointments.push({
        id: 'WS-' + Math.floor(1000 + Math.random() * 9000), // ID Khusus Workshop
        date: new Date().toISOString(), // Tanggal booking dibuat
        eventDateDisplay: eventDate, // Tanggal acara (string)
        time: 'Check Ticket',
        topic: `Workshop: ${eventName}`,
        status: 'Registered'
    });
    
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // 4. Tutup Modal & Beri Notifikasi
    closeWorkshopModal();
    
    if (typeof showNotification === 'function') {
        showNotification(`Success! You are registered for ${eventName}.`, 'success');
    } else {
        alert(`Success! You are registered for ${eventName}.`);
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
function openReviewModal(productId, productName, productImage) {
    const modal = document.getElementById('reviewModal');
    if(!modal) return;

    // Set data ke form
    document.getElementById('reviewProductId').value = productId;
    document.getElementById('reviewProductName').textContent = productName;
    document.getElementById('reviewProductImg').src = productImage;
    
    // Reset form
    document.getElementById('reviewRatingValue').value = '';
    document.getElementById('reviewText').value = '';
    document.querySelectorAll('.star-rating-input span').forEach(s => s.classList.remove('selected'));

    modal.classList.add('active');
}

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
            
            if(!rating) { alert("Please select a star rating."); return; }

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
                alert("You have already reviewed this product.");
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

function registerWorkshop(eventName, eventDate) {
    // 1. Simpan data ke variabel global sementara
    pendingEventData = { name: eventName, date: eventDate };

    // 2. Update isi teks Modal secara dinamis
    document.getElementById('confirmEventName').textContent = eventName;
    document.getElementById('confirmEventDate').textContent = eventDate;

    // 3. Tampilkan Modal Konfirmasi
    const modal = document.getElementById('workshopConfirmModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

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
            alert(`Success! Seat reserved for ${pendingEventData.name}.`);
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
                    alert('Gift request submitted successfully!');
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

// Data Dummy Toko
const storeData = [
    {
        id: 1,
        city: "Paris",
        name: "Lumière Flagship",
        address: "125 Avenue des Champs-Élysées, 75008 Paris, France",
        status: "Open Now",
        phone: "+33 1 40 70 12 34",
        image: "https://images.pexels.com/photos/10003534/pexels-photo-10003534.jpeg"
    },
    {
        id: 2,
        city: "New York",
        name: "SoHo Boutique",
        address: "102 Prince Street, New York, NY 10012, USA",
        status: "Open Now",
        phone: "+1 212-555-0199",
        image: "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg"
    },
    {
        id: 3,
        city: "Tokyo",
        name: "Ginza Six",
        address: "6-10-1 Ginza, Chuo City, Tokyo 104-0061, Japan",
        status: "Closed",
        phone: "+81 3-1234-5678",
        image: "https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg"
    },
    {
        id: 4,
        city: "Jakarta",
        name: "Plaza Indonesia",
        address: "Jl. M.H. Thamrin No.28-30, Jakarta Pusat 10350",
        status: "Open Now",
        phone: "+62 21 2992 1234",
        image: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg"
    },
    {
        id: 5,
        city: "London",
        name: "Bond Street",
        address: "45 Old Bond St, Mayfair, London W1S 4QT, UK",
        status: "Open Now",
        phone: "+44 20 7123 4567",
        image: "https://images.pexels.com/photos/2954405/pexels-photo-2954405.jpeg"
    }
];

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
        'luxurious-elixir': {
            name: "Luxurious Elixir",
            price: "$250.00",
            priceNum: 250.00,
            ratingStars: "★★★★★",
            ratingCount: "124",
            shortDescription: "Step into a world of unparalleled opulence with Luxurious Elixir, an exquisite fragrance that captures the enchanting brilliance of gold and gemstones.",
            mainImage: "https://images.pexels.com/photos/8823444/pexels-photo-8823444.jpeg",
            productDetails: "Step into a world of unparalleled opulence with Luxurious Elixir, an exquisite fragrance that evokes the enchanting brilliance of gold and gemstones. This masterful blend opens with a radiant burst of citrus and sweet fruits, leading into a heart of golden gardenia and velvety silicone. The base notes of rich amber, creamy sandalwood, and mystical oudwood create a lasting impression of warmth, sophistication, and spirit.",
            overtureTitle: "The Golden Overture",
            overtureContent: "Luxurious Elixir opens with a grand flourish of radiant citrus and sun-kissed fruits, reminiscent of golden rays caressing your senses. This luminous beginning sets the stage for a heart of velvety gardenia and innovative silicone, adding a modern, smooth texture. As it settles, a harmonious blend of warm amber, creamy sandalwood, and exotic oudwood unfurls, enveloping you in a serene embrace of ultimate luxury and refinement.",
            keyNotes: [
                { title: "Top Note", notes: "Citrus Accord, Sweetened Fruits", img: "https://plus.unsplash.com/premium_photo-1671379086168-a5d018d583cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJ1aXR8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" },
                { title: "Heart Note", notes: "Golden Gardenia, Silicone", img: "https://cdn.pixabay.com/photo/2022/04/17/00/21/white-flower-7137170_960_720.jpg" },
                { title: "Base Note", notes: "Amber, Sandalwood, Oudwood", img: "https://www.thespruceeats.com/thmb/FYBg5VkZqQ6yHm1HF_nqWVbtqd8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-121141406-5755c349c5a34222b81d72c07a112c76.jpg" }
            ],
            reviewSummary: {
                score: "4.5",
                stars: "★★★★☆",
                recommendation: "90% of reviews recommend this product",
                bars: [
                    { label: "5 Stars", width: "75%" },
                    { label: "4 Stars", width: "15%" },
                    { label: "3 Stars", width: "5%" },
                    { label: "2 Stars", width: "3%" },
                    { label: "1 Star", width: "2%" }
                ]
            },
            reviews: [
                { author: "Jessica M.", avatar: "https://i.pravatar.cc/150?img=11", rating: "★★★★★", body: "This is wonderful. I was interested in this selection, looking for a combination of sweetness and elegance in a perfume. I like this perfume, and this scent is lovely.", date: "October 30, 2025" },
                { author: "David K.", avatar: "https://i.pravatar.cc/150?img=25", rating: "★★★☆☆", body: "The scent is ok, and nice way to finish it's not overpowering. Just pleasant scent. I am happy with purchase.", date: "October 28, 2025" },
                { author: "Sarah L.", avatar: "https://i.pravatar.cc/150?img=33", rating: "★★★★★", body: "I had a sample and fell in love with this fragrance so I had to buy my first bottle. This fragrance is my treat for me. Makes me create a game to get my things done to get this treat.", date: "October 24, 2025" }
            ],
            discoverMore: ['amber-elite', 'aroma-bliss', 'timeless-oud', 'golden-harmony']
        },
        'floral-essence': {
            name: "Floral Essence",
            price: "$89.00",
            priceNum: 89.00,
            ratingStars: "★★★★★",
            ratingCount: "198",
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
            price: "$125.00",
            priceNum: 125.00,
            ratingStars: "★★★★★",
            ratingCount: "214",
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
            price: "$95.00",
            priceNum: 95.00,
            ratingStars: "★★★★☆",
            ratingCount: "156",
            shortDescription: "A modern interpretation of a classic rose, elegant and timeless.",
            mainImage: "https://images.pexels.com/photos/724635/pexels-photo-724635.jpeg",
            discoverMore: ['floral-essence', 'velvet-petal', 'diamond-aura', 'golden-aura']
        },
        'golden-aura': {
            name: "Golden Aura",
            price: "$110.00",
            priceNum: 110.00,
            ratingStars: "★★★★★",
            ratingCount: "187",
            shortDescription: "Radiate confidence with this luminous and warm solar fragrance.",
            mainImage: "https://images.pexels.com/photos/20282244/pexels-photo-20282244.jpeg",
            discoverMore: ['diamond-aura', 'citrus-harmony', 'sapphire-mystique', 'golden-harmony']
        },
        'aroma-bliss': {
            name: "Aroma Bliss",
            price: "$175.00",
            priceNum: 175.00,
            ratingStars: "★★★★★",
            ratingCount: "203",
            shortDescription: "A calming and therapeutic blend of lavender, chamomile, and sage.",
            mainImage: "https://images.pexels.com/photos/965730/pexels-photo-965730.jpeg",
            discoverMore: ['floral-essence', 'velvet-petal', 'royal-rose', 'citrus-harmony']
        },
        'timeless-oud': {
            name: "Timeless Oud",
            price: "$225.00",
            priceNum: 225.00,
            ratingStars: "★★★★★",
            ratingCount: "312",
            shortDescription: "A deep, rich, and sophisticated fragrance built around precious oud wood.",
            mainImage: "https://images.pexels.com/photos/4925692/pexels-photo-4925692.jpeg",
            discoverMore: ['amber-elite', 'amber-nights', 'sapphire-mystique', 'golden-harmony']
        },
        'velvet-petal': {
            name: "Velvet Petal Night",
            price: "$159.00",
            priceNum: 159.00,
            ratingStars: "★★★★☆",
            ratingCount: "76",
            shortDescription: "A soft, powdery, and romantic floral scent with a hint of musk.",
            mainImage: "https://images.pexels.com/photos/14496154/pexels-photo-14496154.jpeg",
            discoverMore: ['floral-essence', 'royal-rose', 'aroma-bliss', 'diamond-aura']
        },
        'amber-elite': {
            name: "Amber Elite",
            price: "$195.00",
            priceNum: 195.00,
            ratingStars: "★★★★★",
            ratingCount: "189",
            shortDescription: "The ultimate expression of amber, refined with incense and patchouli.",
            mainImage: "https://images.pexels.com/photos/31847826/pexels-photo-31847826.jpeg",
            discoverMore: ['amber-nights', 'timeless-oud', 'golden-harmony', 'sapphire-mystique']
        },
        'diamond-aura': {
            name: "Diamond Aura",
            price: "$210.00",
            priceNum: 210.00,
            ratingStars: "★★★★★",
            ratingCount: "245",
            shortDescription: "A bright, sparkling, and crisp fragrance that feels effervescent.",
            mainImage: "https://images.pexels.com/photos/28460123/pexels-photo-28460123.jpeg",
            discoverMore: ['golden-aura', 'citrus-harmony', 'floral-essence', 'royal-rose']
        },
        'citrus-harmony': {
            name: "Citrus Harmony",
            price: "$138.00",
            priceNum: 138.00,
            ratingStars: "★★★★☆",
            ratingCount: "92",
            shortDescription: "A zesty and uplifting chorus of grapefruit, lemon, and vetiver.",
            mainImage: "https://images.pexels.com/photos/12528067/pexels-photo-12528067.jpeg",
            discoverMore: ['diamond-aura', 'golden-aura', 'sapphire-mystique', 'aroma-bliss']
        },
        'sapphire-mystique': {
            name: "Sapphire Mystique",
            price: "$182.00",
            priceNum: 182.00,
            ratingStars: "★★★★★",
            ratingCount: "167",
            shortDescription: "A deep, aquatic, and aromatic fragrance with a touch of spice.",
            mainImage: "https://images.pexels.com/photos/11920479/pexels-photo-11920479.jpeg",
            discoverMore: ['timeless-oud', 'amber-elite', 'golden-harmony', 'citrus-harmony']
        },
        'golden-harmony': {
            name: "Golden Harmony",
            price: "$205.00",
            priceNum: 205.00,
            ratingStars: "★★★★★",
            ratingCount: "278",
            shortDescription: "A perfectly balanced blend of spice, sweet, and wood.",
            mainImage: "https://images.pexels.com/photos/11711829/pexels-photo-11711829.jpeg",
            discoverMore: ['golden-aura', 'amber-elite', 'timeless-oud', 'diamond-aura']
        },
        'black-mamba': {
            name: "Black Mamba",
            price: "$95.00",
            priceNum: 95.00,
            ratingStars: "★★★★☆",
            ratingCount: "253",
            shortdescription: "A Balance Blend Of wood, and spice",
            mainImage: "https://images.pexels.com/photos/9202888/pexels-photo-9202888.jpeg",
            discoverMore: ['golden-aura', 'amber-elite', 'timeless-oud', 'diamond-aura']
       },
       'golden-amber': {
            name: "Golden Amber",
            price: "$250.00",
            priceNum: 250.00,
            ratingStars: "★★★★★",
            ratingCount: "232",
            shortdescription: "A Balance Blend Of floral and spice",
            mainImage: "https://perfumedubai.com/cdn/shop/files/54_a9d80a87-1ae2-41fd-a2ed-a5570571b341_1024x1024.png?v=1736493530",
            discoverMore: ['golden-aura', 'amber-elite', 'timeless-oud', 'diamond-aura']
       },
       'spicy-oud': {
        name: "Spicy Oud",
        price: "$100.00",
        priceNum: 250.00,
        shortdescription: "A Strong Blend Of Spice and little ounce of Wood",
        mainImage: "https://media.theperfumeshop.com/medias/sys_master/images/h32/hec/10060882575390/Forhim/Forhim.jpg",
        discoverMore: ['golden-aura', 'amber-elite', 'timeless-oud', 'diamond-aura'],
        ratingStars: "★★★★☆",
        ratingCount: "128"
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
                
                // Render Tampilan Khusus Gift Set
                mainImageWrapper.className = 'main-image-wrapper gift-set-mode'; // Tambah class khusus
                mainImageWrapper.innerHTML = `
                    <div class="gift-display-container">
                        <div class="gift-main-view">
                            <img src="${product.image}" alt="${product.name}" id="gift-main-img">
                            <span class="gift-label">GIFT SET CONTENTS</span>
                        </div>
                        
                        <div class="gift-contents-grid">
                            ${product.setItems.map(item => `
                                <div class="gift-item-card">
                                    <div class="gift-item-thumb">
                                        <img src="${item.image}" alt="${item.name}">
                                    </div>
                                    <span class="gift-item-name">${item.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                // Tampilan Produk Biasa (Standar)
                mainImageWrapper.className = 'main-image-wrapper'; // Reset class
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
// 14. Checkout
// ============================================
 // Load cart and display order summary
        function loadOrderSummary() {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const orderItems = document.getElementById('orderItems');
            
            if (cart.length === 0) {
                window.location.href = 'cart.html';
                return;
            }

            // Display items
            orderItems.innerHTML = cart.map(item => {
                const product = products[item.id];
                if (!product) return '';
                
                return `
                    <div class="order-item">
                        <img src="${product.image}" alt="${product.name}" class="item-image">
                        <div class="item-details">
                            <div class="item-name">${product.name}</div>
                            <div class="item-size">Size: ${item.size}</div>
                            <div class="item-quantity">Qty: ${item.quantity}</div>
                        </div>
                        <div class="item-price">$${(product.priceNum * item.quantity).toFixed(2)}</div>
                    </div>
                `;
            }).join('');

            // Calculate totals
            const subtotal = cart.reduce((total, item) => {
                const product = products[item.id];
                return total + (product ? product.priceNum * item.quantity : 0);
            }, 0);

            const shipping = 10;
            const tax = subtotal * 0.1;
            const total = subtotal + shipping + tax;

            document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('summaryShipping').textContent = `$${shipping.toFixed(2)}`;
            document.getElementById('summaryTax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('summaryTotal').textContent = `$${total.toFixed(2)}`;
        }

        // Payment method selection logic
        document.querySelectorAll('.payment-option').forEach(option => {
            option.addEventListener('click', function() {
                // 1. Hapus kelas 'selected' dari semua opsi
                document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
                
                // 2. Tambahkan kelas 'selected' ke opsi yang diklik
                this.classList.add('selected');
                
                const method = this.getAttribute('data-method');
                const cardDetails = document.getElementById('cardDetails');
                const paypalDetails = document.getElementById('paypalDetails');
                
                // Reset tampilan & validasi dulu (sembunyikan semua)
                cardDetails.style.display = 'none';
                paypalDetails.style.display = 'none';
                
                // Reset required inputs (agar form tidak error saat submit)
                if(document.getElementById('cardNumber')) document.getElementById('cardNumber').required = false;
                if(document.getElementById('expiryDate')) document.getElementById('expiryDate').required = false;
                if(document.getElementById('cvv')) document.getElementById('cvv').required = false;
                if(document.getElementById('paypalEmail')) document.getElementById('paypalEmail').required = false;

                // 3. Tampilkan input sesuai metode yang dipilih
                if (method === 'credit-card' || method === 'debit-card') {
                    // Jika Kartu Kredit/Debit
                    cardDetails.style.display = 'block';
                    document.getElementById('cardNumber').required = true;
                    document.getElementById('expiryDate').required = true;
                    document.getElementById('cvv').required = true;
                } else if (method === 'paypal') {
                    // ⭐ Jika PayPal
                    paypalDetails.style.display = 'block';
                    document.getElementById('paypalEmail').required = true;
                }
            });
        });

        // Card number formatting
        document.getElementById('cardNumber')?.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });

        // Expiry date formatting
        document.getElementById('expiryDate')?.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });

        // CVV validation
        document.getElementById('cvv')?.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        // Form submission
        document.getElementById('placeOrderBtn').addEventListener('click', function(e) {
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
            
            // Simulate processing
            this.disabled = true;
            this.textContent = 'Processing...';
            
            setTimeout(() => {
                // Generate order number
                const orderNum = 'LF-' + Math.floor(100000 + Math.random() * 900000);
                document.getElementById('orderNumber').textContent = 'Order #' + orderNum;
                
                // --- PERBAIKAN DIMULAI DI SINI ---
                
                // 1. AMBIL data cart dulu SEBELUM dihapus
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                
                // 2. BARU Hapus cart dari storage
                localStorage.removeItem('cart');
                
                // 3. Simpan ke riwayat order (menggunakan variabel 'cart' yang sudah diamankan di langkah 1)
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                
                orders.push({
                    orderNumber: orderNum,
                    date: new Date().toISOString(),
                    items: cart, // Sekarang data ini tidak akan kosong
                    total: document.getElementById('summaryTotal').textContent,
                    status: 'Processing'
                });
                
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // --- PERBAIKAN SELESAI ---

                // Show success modal
                document.getElementById('successModal').classList.add('active');
                
            }, 2000);
        });

        // Load order summary on page load
        window.addEventListener('DOMContentLoaded', loadOrderSummary);

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
// 15. UPDATED FILTER LOGIC & VIEW TOGGLE
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
    const ratingCheckboxes = document.querySelectorAll('input[name="rating"]');
    
    // Price Inputs
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    if (!grid) return; // Guard clause jika elemen tidak ada

    // State Variables
    let currentPage = 1;
    let itemsPerPage = 6; 
    let currentFilteredProducts = []; 

    // Konversi object 'products' global menjadi array agar mudah difilter
    const productArray = Object.entries(products).map(([id, item]) => ({ id, ...item }));

    // --- 2. LOGIKA GANTI TAMPILAN (GRID / LIST) ---
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            viewButtons.forEach(b => b.classList.remove('active'));
            // Tambahkan class active ke tombol yang diklik
            btn.classList.add('active');
            
            const viewType = btn.getAttribute('data-view');
            if (viewType === 'list') {
                grid.classList.add('list-view');
                itemsPerPage = 4; // List view lebih besar, kurangi item per halaman
            } else {
                grid.classList.remove('list-view');
                itemsPerPage = 6; // Grid view default
            }
            currentPage = 1; // Reset ke halaman 1
            renderGrid();
        });
    });

    // --- 3. FUNGSI RENDER GRID UTAMA ---
    function renderGrid() {
        const totalItems = currentFilteredProducts.length;
        if (resultCount) resultCount.textContent = `Showing ${totalItems} results`;

        // Empty State (Jika tidak ada produk)
        if (totalItems === 0) {
            grid.innerHTML = `<div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #888;"><h3>No products found matching your selection.</h3></div>`;
            paginationContainer.innerHTML = '';
            return;
        }

        // Logika Paginasi
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToDisplay = currentFilteredProducts.slice(startIndex, endIndex);
        
        // Ambil data wishlist untuk menandai hati merah/putih
        const currentWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

        // Generate HTML
        grid.innerHTML = productsToDisplay.map((product, index) => {
            // Logika Badge Diskon / Baru
            const isDiscount = product.priceNum > 150;
            const oldPrice = isDiscount ? (product.priceNum * 1.2).toFixed(2) : null;
            const badgeHtml = isDiscount 
                ? `<span class="card-badge">-20%</span>` 
                : (index % 3 === 0 ? `<span class="card-badge new">NEW</span>` : '');

            // Cek apakah produk ada di wishlist
            const isWishlisted = currentWishlist.includes(product.id);
            const activeClass = isWishlisted ? 'active' : '';

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

                    <div class="product-image" style="background-image: url('${product.image}');"></div>
                </div>
                <div class="product-info">
                    <span class="product-brand">${product.brand}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <span class="stars">${product.ratingStars || '★★★★★'}</span>
                        <span class="rating-count">(${product.ratingCount || 50})</span>
                    </div>
                    <div class="product-price-box">
                        <span class="current-price">$${product.priceNum}</span>
                        ${oldPrice ? `<span class="old-price">$${oldPrice}</span>` : ''}
                    </div>
                </div>
            </div>
            `;
        }).join('');

        renderPagination(totalPages);
    }

    // --- 4. RENDER KONTROL PAGINASI ---
    function renderPagination(totalPages) {
        if (!paginationContainer) return;
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let html = '';
        
        // Tombol Prev
        if (currentPage > 1) {
            html += `<button class="page-btn prev-page" onclick="changePage(${currentPage - 1})"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`;
        } else { 
            html += `<div style="width: 45px;"></div>`; // Spacer agar layout tetap rapi
        }
        
        // Info Halaman
        html += `<span class="page-info">Page ${currentPage} of ${totalPages}</span>`;
        
        // Tombol Next
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

        // A. Filter Kategori
        const checkedCats = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        if (checkedCats.length > 0) {
            filtered = filtered.filter(p => checkedCats.includes(p.category.toLowerCase()));
        }

        // B. Filter Brand
        const checkedBrands = Array.from(brandCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        if (checkedBrands.length > 0) {
            filtered = filtered.filter(p => checkedBrands.includes(p.brand.toLowerCase()));
        }

        // C. Filter Scent (Wangi)
        const checkedScents = Array.from(scentCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        if (checkedScents.length > 0) {
            filtered = filtered.filter(p => checkedScents.includes(p.scent.toLowerCase()));
        }

        // D. Filter Rating (Exact Match)
        const checkedRatings = Array.from(ratingCheckboxes).filter(cb => cb.checked).map(cb => parseInt(cb.value));
        if (checkedRatings.length > 0) {
            filtered = filtered.filter(p => {
                const starCount = (p.ratingStars.match(/★/g) || []).length;
                return checkedRatings.includes(starCount);
            });
        }

        // E. Filter Harga
        const min = parseFloat(minPriceInput.value) || 0;
        const max = parseFloat(maxPriceInput.value) || 10000;
        filtered = filtered.filter(p => p.priceNum >= min && p.priceNum <= max);

        // F. Sorting (Urutan)
        const sortVal = sortSelect ? sortSelect.value : 'default';
        if (sortVal === 'price-low') filtered.sort((a, b) => a.priceNum - b.priceNum);
        else if (sortVal === 'price-high') filtered.sort((a, b) => b.priceNum - a.priceNum);
        else if (sortVal === 'rating') filtered.sort((a, b) => parseFloat(b.ratingCount || 0) - parseFloat(a.ratingCount || 0));

        currentFilteredProducts = filtered;
        currentPage = 1; 
        renderGrid();
    }

    // --- 6. FUNGSI BANTUAN (RESET & PINDAH HALAMAN) ---
    
    // Fungsi Global agar bisa dipanggil dari onclick HTML
    window.changePage = function(newPage) {
        currentPage = newPage;
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        renderGrid();
    }

    function resetFilters() {
        // Uncheck semua checkbox
        categoryCheckboxes.forEach(cb => cb.checked = false);
        brandCheckboxes.forEach(cb => cb.checked = false);
        scentCheckboxes.forEach(cb => cb.checked = false);
        ratingCheckboxes.forEach(cb => cb.checked = false);
        
        // Reset input harga & sorting
        minPriceInput.value = '';
        maxPriceInput.value = '';
        if(sortSelect) sortSelect.value = 'default';
        
        applyFilters();
    }

    // --- 7. EVENT LISTENERS ---
    // Pasang listener 'change' ke semua input agar filter langsung aktif saat diklik
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
    brandCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
    scentCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
    ratingCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));

    if (filterBtn) filterBtn.addEventListener('click', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);

    // --- 8. PENANGANAN URL PARAMETER (Bagian "Magic") ---
    // Ini menangani request user: Klik kategori di home -> Filter otomatis aktif di shop
    const urlParams = new URLSearchParams(window.location.search);
    let hasActiveFilter = false;

    // Handle ?category=male
    const catParam = urlParams.get('category');
    if (catParam) {
        categoryCheckboxes.forEach(cb => {
            if(cb.value.toLowerCase() === catParam.toLowerCase()) {
                cb.checked = true;
                hasActiveFilter = true;
            }
        });
    }

    // Handle ?search=amber (misal dari popular tags)
    const searchParam = urlParams.get('search');
    if (searchParam) {
        scentCheckboxes.forEach(cb => {
            if(cb.value.toLowerCase() === searchParam.toLowerCase()) {
                cb.checked = true;
                hasActiveFilter = true;
            }
        });
    }

    // Handle ?brand=dior
    const brandParam = urlParams.get('brand');
    if (brandParam) {
        brandCheckboxes.forEach(cb => {
            if(cb.value.toLowerCase() === brandParam.toLowerCase()) {
                cb.checked = true;
                hasActiveFilter = true;
            }
        });
    }

    // Jalankan filter pertama kali
    applyFilters();

    // FITUR UX: Auto-scroll ke produk jika ada filter dari URL (khususnya di Mobile)
    // Agar user tidak bingung "mana produknya?" karena tertutup header/hero
    if (hasActiveFilter) {
        setTimeout(() => {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800); // Delay sedikit menunggu animasi loading selesai
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
        // 1. Ambil data wishlist dari LocalStorage
        const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
        
        // 2. Jika kosong, tampilkan notifikasi saja
        if (wishlistIds.length === 0) {
            showNotification('Your wishlist is currently empty.', 'info');
            return;
        }
        
        // 3. Buat Modal (Menggunakan style yang sama dengan Order History / Search Overlay)
        const modal = document.createElement('div');
        modal.className = 'wishlist-modal search-overlay active'; // Gunakan class search-overlay agar style sama
        modal.style.display = 'flex';
        
        // 4. Generate Konten HTML
        // Kita menggunakan style 'order-card' agar konsisten, tapi disesuaikan isinya untuk produk
        const itemsHtml = wishlistIds.map(id => {
            const product = products[id];
            if (!product) return ''; // Skip jika produk tidak ditemukan

            return `
                <div class="order-card" style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
                    
                    <div style="display: flex; align-items: center; gap: 1.5rem; flex: 1;">
                        <img src="${product.image}" class="item-img" alt="${product.name}" 
                            onclick="window.location.href='product_detail.html?id=${id}'" 
                            style="cursor: pointer; width: 80px; height: 80px;">
                        
                        <div class="item-info">
                            <h4 onclick="window.location.href='product_detail.html?id=${id}'" 
                                style="cursor: pointer; font-size: 1.1rem; margin-bottom: 0.2rem;">
                                ${product.name}
                            </h4>
                            <p style="color: var(--gold); margin-bottom: 0.5rem;">${product.price}</p>
                            <div style="font-size: 0.8rem; color: #666;">${product.ratingStars} (${product.ratingCount})</div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-end;">
                        <button onclick="quickAddToCart('${id}')" 
                                style="background: var(--gold); color: #000; border: none; padding: 0.5rem 1rem; border-radius: 50px; cursor: pointer; font-weight: 600; font-size: 0.8rem;">
                            Add to Cart
                        </button>
                        <button onclick="removeFromWishlistModal('${id}', this)" 
                                style="background: transparent; border: 1px solid #333; color: #888; padding: 0.4rem 0.8rem; border-radius: 50px; cursor: pointer; font-size: 0.75rem;">
                            Remove
                        </button>
                    </div>

                </div>
            `;
        }).join('');

        // 5. Susun Struktur Modal
        modal.innerHTML = `
            <div class="search-container" style="background: #000; padding: 2rem; border-radius: 20px; border: 1px solid var(--gold-dark); max-height: 80vh; overflow-y: auto; width: 100%; max-width: 700px;">
                <div class="search-header" style="position: sticky; top: 0; background: #000; z-index: 10; padding-bottom: 1rem; border-bottom: 1px solid #222;">
                    <h2 style="font-family: 'Playfair Display', serif; color: var(--gold);">My Wishlist</h2>
                    <button class="close-search" onclick="closeWishlistModal()">×</button>
                </div>
                <div class="order-list" style="margin-top: 1rem;">
                    ${itemsHtml}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // Mencegah scroll background
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
        
        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelector('input[type="password"]').value;
        
        // Simple validation
        if (email && password) {
            // Save user session
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            showNotification('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    }

    function handleSignup(e) {
        e.preventDefault();
        
        const fullName = e.target.querySelector('input[type="text"]').value;
        const email = e.target.querySelector('input[type="email"]').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Validate password strength
        if (password.length < 3) {
            showNotification('Password must be at least 3 characters!', 'error');
            return;
        }
        
        // Save user data
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userProfile', JSON.stringify({
            firstName: fullName.split(' ')[0],
            lastName: fullName.split(' ').slice(1).join(' '),
            email: email
        }));
        
        showNotification('Account created successfully! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    function socialLogin(provider) {
        showNotification(`${provider} login feature coming soon!`, 'success');
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
// INFINITE BEST SELLER SLIDER (Seamless Loop)
// ============================================
function initBestSellerSlider() {
    const track = document.getElementById('bs-track');
    let slides = document.querySelectorAll('.wide-product-card');
    const nextBtn = document.getElementById('bs-next');
    const prevBtn = document.getElementById('bs-prev');
    const dotsContainer = document.getElementById('bs-dots');

    if (!track || slides.length === 0) return;

    // 1. Setup Dots (Hanya untuk jumlah slide asli)
    dotsContainer.innerHTML = ''; // Reset dots
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(idx + 1)); // +1 karena ada clone
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');

    // 2. Cloning Logic untuk Efek Infinite
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';

    track.append(firstClone);
    track.prepend(lastClone);

    // Update list slide setelah cloning
    const allSlides = document.querySelectorAll('.wide-product-card'); 
    
    // 3. State Variables
    let counter = 1; // Mulai dari 1 karena 0 adalah lastClone
    let isTransitioning = false;
    const size = 100; // Karena width css 100%

    // Posisi awal (langsung ke slide asli pertama)
    track.style.transform = `translateX(${-size * counter}%)`;

    // 4. Fungsi Navigasi Utama
    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'; // Animasi Smooth
        track.style.transform = `translateX(${-size * counter}%)`;
        
        updateDots();
    }

    function updateDots() {
        // Hapus active dari semua dots
        dots.forEach(d => d.classList.remove('active'));
        
        // Hitung index dot yang sesuai (koreksi clone)
        let dotIndex = counter - 1;
        if (counter === 0) dotIndex = slides.length - 1; // Jika di clone terakhir
        if (counter === allSlides.length - 1) dotIndex = 0; // Jika di clone pertama
        
        if(dots[dotIndex]) dots[dotIndex].classList.add('active');
    }

    function moveToSlide(index) {
        if (isTransitioning) return;
        counter = index;
        updateSlider();
    }

    // 5. Event Listeners Buttons
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        if (counter >= allSlides.length - 1) return;
        counter++;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        if (counter <= 0) return;
        counter--;
        updateSlider();
    });

    // 6. Transition End - Magic Loop happens here
    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        
        // Jika kita berada di Clone Terakhir (copy dari slide terakhir), lompat ke Slide Terakhir Asli
        if (allSlides[counter].id === 'last-clone') {
            track.style.transition = 'none'; // Matikan animasi agar instan
            counter = allSlides.length - 2;
            track.style.transform = `translateX(${-size * counter}%)`;
        }
        
        // Jika kita berada di Clone Pertama (copy dari slide pertama), lompat ke Slide Pertama Asli
        if (allSlides[counter].id === 'first-clone') {
            track.style.transition = 'none'; // Matikan animasi agar instan
            counter = 1;
            track.style.transform = `translateX(${-size * counter}%)`;
        }
    });

    // 7. Touch / Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            // Swipe Left -> Next
            if (!isTransitioning) {
                counter++;
                updateSlider();
            }
        } else if (touchEndX - touchStartX > 50) {
            // Swipe Right -> Prev
            if (!isTransitioning) {
                counter--;
                updateSlider();
            }
        }
    });
}

// Mobile Filter Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const filterToggleBtn = document.getElementById('mobile-filter-toggle');
    const shopSidebar = document.getElementById('shopSidebar');

    if (filterToggleBtn && shopSidebar) {
        filterToggleBtn.addEventListener('click', () => {
            shopSidebar.classList.toggle('active');
            
            // Ubah teks tombol biar interaktif
            const isClosed = !shopSidebar.classList.contains('active');
            const spanText = filterToggleBtn.querySelector('span');
            if(spanText) {
                spanText.textContent = isClosed ? 'Filter Products' : 'Close Filters';
            }
        });
    }
});

// ============================================
// OFFER SLIDER (Untuk Halaman Shop)
// ============================================
function initOfferSlider() {
    const track = document.getElementById('offer-track');
    if (!track) return;

    let slides = track.querySelectorAll('.wide-product-card');
    const nextBtn = document.getElementById('offer-next');
    const prevBtn = document.getElementById('offer-prev');
    
    if (slides.length === 0) return;

    // --- Cloning Logic (Infinite Loop) ---
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
    let slideInterval; // Variabel untuk menyimpan timer

    track.style.transform = `translateX(${-size * counter}%)`;

    // --- Fungsi Update Posisi Slider ---
    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        track.style.transform = `translateX(${-size * counter}%)`;
    }

    // --- Fungsi Pindah ke Slide Berikutnya ---
    function nextSlide() {
        if (counter >= allSlides.length - 1) return;
        counter++;
        updateSlider();
    }

    // --- Fungsi Pindah ke Slide Sebelumnya ---
    function prevSlide() {
        if (counter <= 0) return;
        counter--;
        updateSlider();
    }

    // --- Fungsi Timer Otomatis (5 Detik) ---
    function startAutoSlide() {
        clearInterval(slideInterval); // Hapus timer lama agar tidak tumpang tindih
        slideInterval = setInterval(() => {
            nextSlide();
        }, 3500); // 5000ms = 5 detik
    }

    // --- Event Listeners Tombol (Reset Timer saat diklik) ---
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Reset waktu tunggu jadi 5 detik lagi
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Reset waktu tunggu jadi 5 detik lagi
        });
    }

    // --- Infinite Loop Logic (Saat Transisi Selesai) ---
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

    // --- Fitur Tambahan: Pause saat Mouse Hover ---
    // Agar user bisa membaca promo tanpa slide bergeser tiba-tiba
    const sliderContainer = track.parentElement;
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Mulai Auto Slide saat halaman dimuat
    startAutoSlide();
}

// ============================================
// 19. CONSULTATION BOOKING SYSTEM
// ============================================

function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Mencegah scroll background
        
        // Auto-fill nama/email jika user sudah login (simulasi)
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile) {
            if(document.getElementById('bookName')) document.getElementById('bookName').value = userProfile.firstName + ' ' + userProfile.lastName;
            if(document.getElementById('bookEmail')) document.getElementById('bookEmail').value = userProfile.email;
        }
        
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('bookDate').setAttribute('min', today);
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 1. Ambil data dari form
            const name = document.getElementById('bookName').value;
            const date = document.getElementById('bookDate').value;
            const time = document.getElementById('bookTime').value;
            const topic = document.querySelector('input[name="topic"]:checked').value;
            
            // 2. Simulasi Loading
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Booking...";
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // 3. Simpan ke LocalStorage (Simulasi Database)
                const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
                appointments.push({
                    id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
                    name: name,
                    date: date,
                    time: time,
                    topic: topic,
                    status: 'Confirmed'
                });
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // 4. Reset Form & Tutup Modal
                bookingForm.reset();
                closeBookingModal();
                
                // 5. Tampilkan Notifikasi Sukses
                if (typeof showNotification === 'function') {
                    showNotification(`Booking Confirmed! See you on ${date} at ${time}.`);
                } else {
                    alert(`Booking Confirmed! See you on ${date} at ${time}.`);
                }
                
                // Reset tombol
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
            }, 1500); // Delay 1.5 detik agar terasa nyata
        });
    }
});

// Pastikan fungsi di-export ke window agar bisa dipanggil dari HTML onclick
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;

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

// Handle Custom Fragrance Form Submission (MULTI-SELECT SUPPORT)
document.addEventListener('DOMContentLoaded', () => {
    const customForm = document.getElementById('customFragranceForm');
    
    if (customForm) {
        customForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Helper function untuk mengambil value checkbox yang dipilih
            const getSelectedValues = (name) => {
                const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
                let values = Array.from(checkboxes).map(cb => cb.value);
                return values.length > 0 ? values.join(', ') : 'Surprise Me';
            };

            // 1. Ambil data gabungan (Pilihan Kartu + Input Manual)
            const topNotes = getSelectedValues('topNote');
            const topCustom = document.getElementById('topNoteCustom').value;
            const finalTop = topCustom ? `${topNotes} (+ ${topCustom})` : topNotes;

            const heartNotes = getSelectedValues('heartNote');
            const heartCustom = document.getElementById('heartNoteCustom').value;
            const finalHeart = heartCustom ? `${heartNotes} (+ ${heartCustom})` : heartNotes;

            const baseNotes = getSelectedValues('baseNote');
            const baseCustom = document.getElementById('baseNoteCustom').value;
            const finalBase = baseCustom ? `${baseNotes} (+ ${baseCustom})` : baseNotes;
            
            const creationName = document.getElementById('creationName').value || 'My Signature Scent';
            
            // 2. Simulasi Loading UI
            const submitBtn = customForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Analyzing Composition...";
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // 3. Simpan data lengkap
                const customRequests = JSON.parse(localStorage.getItem('customRequests') || '[]');
                customRequests.push({
                    id: 'BESPOKE-' + Math.floor(1000 + Math.random() * 9000),
                    date: new Date().toISOString(),
                    formula: {
                        top: finalTop,
                        heart: finalHeart,
                        base: finalBase
                    },
                    name: creationName,
                    status: 'Perfumer Reviewing'
                });
                localStorage.setItem('customRequests', JSON.stringify(customRequests));
                
                // 4. Feedback & Reset
                customForm.reset();
                closeCustomModal(); 
                
                if (typeof showNotification === 'function') {
                    showNotification(`Masterpiece submitted! "${creationName}" is being processed.`, 'success');
                } else {
                    alert(`Request for "${creationName}" sent successfully!`);
                }
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
            }, 2000); 
        });
    }
});

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