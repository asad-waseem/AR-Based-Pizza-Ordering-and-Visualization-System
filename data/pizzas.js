import { PIZZA_SIZES } from './sizes';

export const pizzas = [
  {
    id: "margherita",
    slug: "margherita",
    name: "Classic Margherita",
    shortDescription: "Classic tomato, mozzarella and fresh basil.",
    description: "The classic Margherita pizza features a perfectly baked thin crust topped with our signature San Marzano tomato sauce, fresh mozzarella cheese, and fragrant basil leaves. A simple yet perfect Italian classic.",
    image: "/assets/img/food/pizza.png",
    gallery: [
      "/assets/img/food/pizza.png"
    ],
    ingredients: [
      "Tomato Sauce",
      "Fresh Mozzarella",
      "Basil",
      "Extra Virgin Olive Oil"
    ],
    category: "classic",
    tags: ["vegetarian", "popular"],
    rating: 4.8,
    reviewCount: 124,
    sizes: {
      small: {
        ...PIZZA_SIZES.small,
        price: 12.99
      },
      medium: {
        ...PIZZA_SIZES.medium,
        price: 15.99
      },
      large: {
        ...PIZZA_SIZES.large,
        price: 18.99
      }
    },
    model3d: {
      glb: "/assets/models/pizza-default.glb",
      usdz: "/assets/models/pizza-default.usdz",
      authoredDiameterMeters: 0.3048
    }
  },
  {
    id: "pepperoni",
    slug: "pepperoni",
    name: "Double Pepperoni",
    shortDescription: "Loaded with crispy pepperoni and mozzarella.",
    description: "For the true pepperoni lover. We double the amount of premium, perfectly spiced pepperoni and layer it over our rich tomato sauce and a blend of mozzarella and provolone cheeses. Baked to a perfect crisp.",
    image: "/assets/img/food/pizza-2.png",
    gallery: [
      "/assets/img/food/pizza-2.png"
    ],
    ingredients: [
      "Tomato Sauce",
      "Mozzarella",
      "Premium Pepperoni",
      "Oregano"
    ],
    category: "meat",
    tags: ["popular", "spicy"],
    rating: 4.9,
    reviewCount: 215,
    sizes: {
      small: {
        ...PIZZA_SIZES.small,
        price: 14.99
      },
      medium: {
        ...PIZZA_SIZES.medium,
        price: 17.99
      },
      large: {
        ...PIZZA_SIZES.large,
        price: 21.99
      }
    },
    model3d: {
      glb: "/assets/models/pizza-default.glb",
      usdz: "/assets/models/pizza-default.usdz",
      authoredDiameterMeters: 0.3048
    }
  },
  {
    id: "bbq-chicken",
    slug: "bbq-chicken",
    name: "BBQ Chicken Supreme",
    shortDescription: "Grilled chicken, red onions, and sweet BBQ sauce.",
    description: "A sweet and savory masterpiece. We replace our traditional tomato sauce with a tangy BBQ sauce, then top it with grilled chicken breast, sliced red onions, cilantro, and a blend of mozzarella and smoked gouda.",
    image: "/assets/img/food/pizza-3.png",
    gallery: [
      "/assets/img/food/pizza-3.png"
    ],
    ingredients: [
      "BBQ Sauce",
      "Mozzarella",
      "Grilled Chicken",
      "Red Onions",
      "Cilantro"
    ],
    category: "chicken",
    tags: ["sweet", "savory"],
    rating: 4.7,
    reviewCount: 98,
    sizes: {
      small: {
        ...PIZZA_SIZES.small,
        price: 15.99
      },
      medium: {
        ...PIZZA_SIZES.medium,
        price: 18.99
      },
      large: {
        ...PIZZA_SIZES.large,
        price: 22.99
      }
    },
    model3d: {
      glb: "/assets/models/pizza-default.glb",
      usdz: "/assets/models/pizza-default.usdz",
      authoredDiameterMeters: 0.3048
    }
  },
  {
    id: "veggie-supreme",
    slug: "veggie-supreme",
    name: "Veggie Supreme",
    shortDescription: "Bell peppers, mushrooms, onions, and black olives.",
    description: "A garden-fresh delight loaded with crisp green bell peppers, fresh mushrooms, sliced red onions, and black olives over our signature tomato sauce and melted mozzarella cheese.",
    image: "/assets/img/food/pizza-4.png",
    gallery: [
      "/assets/img/food/pizza-4.png"
    ],
    ingredients: [
      "Tomato Sauce",
      "Mozzarella",
      "Bell Peppers",
      "Mushrooms",
      "Red Onions",
      "Black Olives"
    ],
    category: "vegetarian",
    tags: ["vegetarian", "healthy"],
    rating: 4.6,
    reviewCount: 85,
    sizes: {
      small: {
        ...PIZZA_SIZES.small,
        price: 13.99
      },
      medium: {
        ...PIZZA_SIZES.medium,
        price: 16.99
      },
      large: {
        ...PIZZA_SIZES.large,
        price: 19.99
      }
    },
    model3d: {
      glb: "/assets/models/pizza-default.glb",
      usdz: "/assets/models/pizza-default.usdz",
      authoredDiameterMeters: 0.3048
    }
  },
  {
    id: "creamy-garlic-chicken",
    slug: "creamy-garlic-chicken",
    name: "Creamy Garlic Chicken",
    shortDescription: "White garlic sauce, roasted chicken, and fresh parsley.",
    description: "Rich and comforting. This pizza features a creamy roasted garlic sauce base, topped with tender roasted chicken breast, caramelized onions, mozzarella cheese, and a sprinkle of fresh parsley.",
    image: "/assets/img/food/pizza-creamy.png",
    gallery: [
      "/assets/img/food/pizza-creamy.png"
    ],
    ingredients: [
      "Creamy Garlic Sauce",
      "Mozzarella",
      "Roasted Chicken",
      "Caramelized Onions",
      "Parsley"
    ],
    category: "chicken",
    tags: ["rich", "creamy"],
    rating: 4.8,
    reviewCount: 112,
    sizes: {
      small: {
        ...PIZZA_SIZES.small,
        price: 15.99
      },
      medium: {
        ...PIZZA_SIZES.medium,
        price: 18.99
      },
      large: {
        ...PIZZA_SIZES.large,
        price: 22.99
      }
    },
    model3d: {
      glb: "/assets/models/pizza-default.glb",
      usdz: "/assets/models/pizza-default.usdz",
      authoredDiameterMeters: 0.3048
    }
  },
  {
    id: "meat-lovers",
    slug: "meat-lovers",
    name: "Ultimate Meat Lovers",
    shortDescription: "Pepperoni, sausage, bacon, and ham.",
    description: "The ultimate carnivore's dream. Packed with premium pepperoni, Italian sausage, crispy bacon pieces, and smoked ham, all blanketed under melted mozzarella and provolone cheeses on our classic crust.",
    image: "/assets/img/food/big-pizza.png",
    gallery: [
      "/assets/img/food/big-pizza.png"
    ],
    ingredients: [
      "Tomato Sauce",
      "Mozzarella",
      "Pepperoni",
      "Italian Sausage",
      "Bacon",
      "Smoked Ham"
    ],
    category: "meat",
    tags: ["meat", "heavy"],
    rating: 4.9,
    reviewCount: 340,
    sizes: {
      small: {
        ...PIZZA_SIZES.small,
        price: 16.99
      },
      medium: {
        ...PIZZA_SIZES.medium,
        price: 20.99
      },
      large: {
        ...PIZZA_SIZES.large,
        price: 24.99
      }
    },
    model3d: {
      glb: "/assets/models/pizza-default.glb",
      usdz: "/assets/models/pizza-default.usdz",
      authoredDiameterMeters: 0.3048
    }
  },
  {
    id: "demo-pizza",
    slug: "demo-pizza",
    name: "Interactive Demo Pizza",
    shortDescription: "A special pizza added just for testing.",
    description: "This is a demo product created for testing the application's catalog and checkout flow. It features our standard sizes and can be viewed in AR (if a model is provided).",
    image: "/assets/img/food/pizza-4.png",
    gallery: [
      "/assets/img/food/pizza-4.png"
    ],
    ingredients: [
      "Demo Sauce",
      "Demo Cheese",
      "Testing Toppings"
    ],
    category: "classic",
    tags: ["demo", "test"],
    rating: 5.0,
    reviewCount: 999,
    sizes: {
      small: {
        ...PIZZA_SIZES.small,
        price: 9.99
      },
      medium: {
        ...PIZZA_SIZES.medium,
        price: 12.99
      },
      large: {
        ...PIZZA_SIZES.large,
        price: 15.99
      }
    },
    model3d: {
      glb: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", // using a public demo model so the 3D viewer actually loads something
      usdz: "https://modelviewer.dev/shared-assets/models/Astronaut.usdz",
      authoredDiameterMeters: 1.0
    }
  }
];
