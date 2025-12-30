// ============================================
// DATA FILE: script/data.js
// Berisi semua data produk, toko, dan detail
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
        ratingCount: "2"
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
        brand: "Lumiere Scents",
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