# Lumière Scents - Luxury Perfume E-Commerce

**Lumière Scents** is a modern, responsive e-commerce web application designed for a luxury fragrance brand. Beyond standard shopping features, it includes a unique **Fragrance Builder**, service booking system, and a dynamic user dashboard.

## Key Features

### Shopping Experience
* **Product Catalog:** Browse perfumes with categories (Men, Women, Unisex) and search functionality.
* **Dynamic Cart & Wishlist:** Add items to cart or wishlist with real-time badge updates (using `localStorage`).
* **Product Details:** Detailed view with ingredients, and related products.
* **Checkout Flow:** streamlined checkout page with order summary.

### Fragrance Builder 
* **Custom Scent Creation:** Users can design their own perfume by selecting Top, Heart, and Base notes.
* **Dynamic Pricing:** Real-time price calculation based on selected bottle size and premium ingredients.
* **Formula Submission:** Saves the custom formula to the user's profile for the lab to process.

### User Dashboard & Interactions
* **Order History:** View past orders with status tracking.
* **Review System:** Users can leave star ratings and reviews for purchased products. 
* **Service Booking:** Book appointments for personal consultations, gifting, or workshops.
* **Custom Requests:** Track the status of fragrance orders.

### UI/UX Design
* **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile.
* **Luxury Aesthetic:** Gold and black color palette, elegant typography (Playfair Display & Montserrat), and smooth animations.
* **Toast Notifications:** Custom non-intrusive popup notifications for user actions (success/error messages).

## Tech Stack

* **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox, Grid).
* **Scripting:** JavaScript (Vanilla ES6+).
* **Data Persistence:** Browser `localStorage` (Simulating a backend database for users, orders, and reviews).
* **Icons:** SVG Icons.

## Project Structure

```text
Perfume_shop/
├── main.js                 # Core Logic (Cart, Reviews, Custom Fragrance, Auth)
├── pages/                  # HTML Pages
│   ├── index.html          # Home
│   ├── shop.html           # Product Catalog
│   ├── product_detail.html # Single Product View
│   ├── service.html        # Services & Booking
│   ├── custom.html         # Custom Fragrance Builder
│   ├── profile.html        # User Dashboard
│   ├── cart.html           # Shopping Cart
│   └── ...
├── style/                  # CSS Stylesheets
│   ├── global.css          # Variables, Reset, Navbar, Footer
│   ├── index.css           # Home specific styles
│   ├── service.css         # Service & Modal styles
│   └── ...
├── video/                  # Video
└── images/                 # Image 
```

## How to Run
1. Clone the repository (or download the ZIP):
```
git clone https://github.com/AbinEast/Perfume-Shop-Web-JS.git
```
2. Open the project: Simply open the pages/index.html file in your web browser.

   Recommended: Use "Live Server" extension in VS Code for the best experience.
   
## Web Preview
https://abineast.github.io/Perfume-Shop-Web-JS/
