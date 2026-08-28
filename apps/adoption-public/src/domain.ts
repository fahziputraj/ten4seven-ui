export const categories = [
  "All",
  "Field Notes",
  "Systems",
  "Practice",
] as const;

export type ProductCategory = Exclude<(typeof categories)[number], "All">;

export type Product = {
  author: string;
  category: ProductCategory;
  description: string;
  format: string;
  id: string;
  price: number;
  rating: number;
  title: string;
};

export const products: Product[] = [
  {
    id: "small-decisions",
    title: "A Map of Small Decisions",
    category: "Field Notes",
    author: "Nadia Prasetyo",
    description:
      "A practical field guide to making steady progress in complex work.",
    format: "Ebook · 142 pages",
    price: 145000,
    rating: 4.8,
  },
  {
    id: "calm-products",
    title: "Building Calm Products",
    category: "Systems",
    author: "Dara Siregar",
    description:
      "Patterns for teams that want useful products without noisy process.",
    format: "Ebook · 188 pages",
    price: 175000,
    rating: 4.9,
  },
  {
    id: "practical-type",
    title: "Practical Type",
    category: "Practice",
    author: "Raka Wijaya",
    description:
      "A clear, friendly introduction to typography as an everyday tool.",
    format: "Ebook · 96 pages",
    price: 120000,
    rating: 4.7,
  },
  {
    id: "reliable-design",
    title: "Reliable by Design",
    category: "Systems",
    author: "Laras Anindya",
    description: "How small interaction decisions build trust over time.",
    format: "Ebook · 164 pages",
    price: 160000,
    rating: 4.9,
  },
];

export type Cart = Record<string, number>;

export function filterProducts(
  items: Product[],
  query: string,
  category: ProductCategory | "All",
) {
  const normalized = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesQuery =
      !normalized ||
      [item.title, item.author, item.description, item.category].some((value) =>
        value.toLowerCase().includes(normalized),
      );
    return matchesQuery && (category === "All" || item.category === category);
  });
}

export function addToCart(cart: Cart, productId: string): Cart {
  return { ...cart, [productId]: (cart[productId] ?? 0) + 1 };
}

export function setCartQuantity(
  cart: Cart,
  productId: string,
  quantity: number,
): Cart {
  if (quantity <= 0) {
    const next = { ...cart };
    delete next[productId];
    return next;
  }
  return { ...cart, [productId]: quantity };
}

export function removeFromCart(cart: Cart, productId: string): Cart {
  return setCartQuantity(cart, productId, 0);
}

export function cartCount(cart: Cart) {
  return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
}

export function cartSubtotal(cart: Cart, items: Product[]) {
  return items.reduce(
    (total, item) => total + item.price * (cart[item.id] ?? 0),
    0,
  );
}
