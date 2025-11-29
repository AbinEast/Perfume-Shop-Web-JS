# Local Face - Premium Fragrance Store
**Local Face** is a luxurious, fully responsive front-end e-commerce website designed for a premium perfume brand. It features a modern dark-themed UI with gold accents, smooth scroll animations, and a fully functional shopping cart simulation using LocalStorage.

## Key Features

### UI/UX 
- **Luxury Aesthetic:** High-end design using a Black & Gold color palette (`#050505`, `#d4a574`).
- **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile devices with a custom hamburger menu.
- **Animations:** Smooth scroll-reveal effects, parallax hero sections, and hover interactions.
- **Glassmorphism:** Modern blurred header and overlays.

### Shopping Functionality
- **Dynamic Product Grid:** Products are rendered dynamically via JavaScript.
- **Advanced Filtering & Sorting:** Filter by Category (Men/Women/Unisex), Brand, and Price range. Sort by Price or Rating.
- **Shopping Cart System:** - Add to cart with quantity selection.
  - Cart persistence using **LocalStorage** (data remains after refresh).
  - Real-time subtotal, tax, and total calculation.
- **Wishlist:** Save favorite items for later (persisted in LocalStorage).
- **Search System:** Full-screen search overlay with "Popular Tags" and real-time filtering.

### User Experience
- **User Profile:** Edit profile details and view Order History simulation.
- **Checkout Process:** Multi-step checkout form with validation.
- **Authentication:** Simulated Login and Sign-Up pages.

## Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Custom properties (variables), Flexbox, Grid, Media Queries, and Keyframe animations.
- **JavaScript (ES6+):** - DOM Manipulation.
  - `localStorage` for state management (Cart, Wishlist, User Session).
  - `IntersectionObserver` for scroll animations.
- **Fonts:** Playfair Display (Headings) & Montserrat (Body) via Google Fonts.
- **Icons:** SVG Icons.

## Project Structure

```text
Local-Face/
│
├── index.html          # Homepage (Hero, Best Sellers, Testimonials)
├── shop.html           # Product listing with Filters & Sorting
├── product_detail.html # Single product view with reviews
├── cart.html           # Shopping Cart management
├── checkout.html       # Checkout form & Order summary
├── wishlist.html       # User wishlist
├── profile.html        # User profile & Order history
├── about.html          # Brand story
├── service.html        # Services offered
├── signup.html         # Login / Register page
├── main.js             # Core logic (Product DB, Cart, UI interactions)
└── README.md           # Project documentation
```

## How to Run
Since this is a static website, you don't need to install any dependencies or run a backend server.
- Clone the repository (or download the ZIP):
- Open the project folder.
- Run the index.html with live server to open it in your web browser.

Tip: For the best experience (to avoid CORS issues with some modules if added later), it is recommended to use the Live Server extension in VS Code.

## Credits
- Images: Pexels, Unsplash (All images are used for demonstration purposes).
- Fonts: Google Fonts.
