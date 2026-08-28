import { useEffect, useMemo, useState } from "react";

import {
  addToCart,
  cartCount,
  cartSubtotal,
  categories,
  filterProducts,
  products,
  removeFromCart,
  setCartQuantity,
  type Cart,
  type Product,
  type ProductCategory,
} from "./domain";

type Route = "catalog" | "guides" | "home";

function routeFromPath(pathname: string): Route {
  if (pathname === "/catalog") return "catalog";
  if (pathname === "/guides") return "guides";
  return "home";
}

function navigate(pathname: string) {
  window.history.pushState({}, "", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

function LegacyProductCard({
  onAdd,
  onOpen,
  product,
}: {
  onAdd: () => void;
  onOpen: () => void;
  product: Product;
}) {
  return (
    <article className="legacy-public-product-card">
      <div className={`legacy-cover legacy-cover-${product.id}`}>
        <span>
          {product.title
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")}
        </span>
      </div>
      <div className="legacy-public-product-copy">
        <span className="legacy-public-eyebrow">{product.category}</span>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <div className="legacy-public-meta">
          <span>{product.format}</span>
          <strong>{formatPrice(product.price)}</strong>
        </div>
        <div className="legacy-public-card-actions">
          <button className="legacy-public-link" onClick={onOpen} type="button">
            View details
          </button>
          <button
            aria-label={`Add ${product.title} to cart`}
            className="legacy-public-add"
            onClick={onAdd}
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

function HomePage({
  onBrowse,
  onOpen,
}: {
  onBrowse: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="legacy-public-page">
      <section className="legacy-public-hero">
        <div>
          <span className="legacy-public-eyebrow">
            A small library for useful work
          </span>
          <h1>Make room for better decisions.</h1>
          <p>
            Common Ground brings together thoughtful ebooks and practical notes
            for people building products, teams, and systems.
          </p>
          <button className="legacy-button" onClick={onBrowse} type="button">
            Browse the library →
          </button>
        </div>
        <div className="legacy-public-hero-card">
          <span>Featured reading</span>
          <strong>Reliable by Design</strong>
          <small>Small interaction decisions that build trust over time.</small>
        </div>
      </section>
      <section className="legacy-public-feature">
        <div>
          <span className="legacy-public-eyebrow">Read at your pace</span>
          <h2>Ideas that travel well.</h2>
        </div>
        <div className="legacy-public-feature-list">
          <p>
            <strong>Useful, not loud</strong>
            <span>Clear writing for the work in front of you.</span>
          </p>
          <p>
            <strong>Made for practice</strong>
            <span>Every title ends closer to a decision.</span>
          </p>
          <p>
            <strong>Keep your shelf light</strong>
            <span>Save only what you want to return to.</span>
          </p>
        </div>
      </section>
      <section className="legacy-public-featured">
        <div className="legacy-section-heading">
          <div>
            <span className="legacy-public-eyebrow">Start here</span>
            <h2>Selected titles</h2>
          </div>
          <button
            className="legacy-public-link"
            onClick={onBrowse}
            type="button"
          >
            View all
          </button>
        </div>
        <div className="legacy-public-grid">
          {products.slice(0, 2).map((product) => (
            <LegacyProductCard
              key={product.id}
              onAdd={() => undefined}
              onOpen={() => onOpen(product.id)}
              product={product}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function CatalogPage({
  onAdd,
  onOpen,
}: {
  onAdd: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const visibleProducts = useMemo(
    () => filterProducts(products, query, category),
    [category, query],
  );

  return (
    <div className="legacy-public-page" data-testid="catalog-page">
      <div className="legacy-public-heading">
        <div>
          <span className="legacy-public-eyebrow">The library</span>
          <h1>Find your next useful read.</h1>
          <p>
            Browse field notes, system thinking, and practical guidance for the
            work you are already doing.
          </p>
        </div>
      </div>
      <div
        aria-label="Catalog filters"
        className="legacy-public-toolbar"
        role="region"
      >
        <label className="legacy-public-search">
          Search
          <input
            aria-label="Search library"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles, authors, topics"
            value={query}
          />
        </label>
        <label>
          Collection
          <select
            aria-label="Collection filter"
            onChange={(event) =>
              setCategory(event.target.value as ProductCategory | "All")
            }
            value={category}
          >
            {categories.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <span role="status">{visibleProducts.length} titles</span>
      </div>
      <div className="legacy-public-grid">
        {visibleProducts.length ? (
          visibleProducts.map((product) => (
            <LegacyProductCard
              key={product.id}
              onAdd={() => onAdd(product.id)}
              onOpen={() => onOpen(product.id)}
              product={product}
            />
          ))
        ) : (
          <div className="legacy-public-empty">
            No titles match that search.
          </div>
        )}
      </div>
    </div>
  );
}

function GuidesPage() {
  return (
    <div className="legacy-public-page">
      <div className="legacy-public-heading">
        <div>
          <span className="legacy-public-eyebrow">Guides</span>
          <h1>Reading paths for busy weeks.</h1>
          <p>
            Begin with one question, then choose a title that helps you move it
            forward.
          </p>
        </div>
      </div>
      <div className="legacy-guide-list">
        <article>
          <strong>Starting a new system</strong>
          <span>Building Calm Products · Reliable by Design</span>
        </article>
        <article>
          <strong>Making clearer work</strong>
          <span>Practical Type · A Map of Small Decisions</span>
        </article>
      </div>
    </div>
  );
}

function ProductDetails({
  onAdd,
  onClose,
  product,
}: {
  onAdd: () => void;
  onClose: () => void;
  product: Product;
}) {
  return (
    <dialog
      aria-label={`${product.title} details`}
      className="legacy-public-dialog"
      data-testid="product-detail"
      open
    >
      <div className="legacy-public-dialog-card">
        <button
          aria-label="Close product details"
          className="legacy-public-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <div
          className={`legacy-cover legacy-cover-large legacy-cover-${product.id}`}
        >
          <span>
            {product.title
              .split(" ")
              .map((word) => word[0])
              .slice(0, 2)
              .join("")}
          </span>
        </div>
        <span className="legacy-public-eyebrow">
          {product.category} · {product.format}
        </span>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="legacy-public-author">
          Written by {product.author} · ★ {product.rating.toFixed(1)}
        </p>
        <button className="legacy-button" onClick={onAdd} type="button">
          Add to cart · {formatPrice(product.price)}
        </button>
      </div>
    </dialog>
  );
}

function CartDialog({
  cart,
  onClose,
  onRemove,
  onQuantity,
}: {
  cart: Cart;
  onClose: () => void;
  onRemove: (id: string) => void;
  onQuantity: (id: string, quantity: number) => void;
}) {
  const cartProducts = products.filter((product) => cart[product.id]);
  const subtotal = cartSubtotal(cart, products);
  return (
    <dialog
      aria-label="Shopping cart"
      className="legacy-public-dialog"
      data-testid="cart-dialog"
      open
    >
      <div className="legacy-public-dialog-card">
        <div className="legacy-dialog-header">
          <div>
            <span className="legacy-public-eyebrow">Your shelf</span>
            <h2>Shopping cart</h2>
          </div>
          <button
            aria-label="Close shopping cart"
            className="legacy-public-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        {cartProducts.length ? (
          <>
            <div className="legacy-cart-list">
              {cartProducts.map((product) => (
                <div className="legacy-cart-line" key={product.id}>
                  <div>
                    <strong>{product.title}</strong>
                    <span>{formatPrice(product.price)}</span>
                  </div>
                  <div className="legacy-cart-controls">
                    <button
                      aria-label={`Decrease quantity for ${product.title}`}
                      onClick={() =>
                        onQuantity(product.id, (cart[product.id] ?? 1) - 1)
                      }
                      type="button"
                    >
                      −
                    </button>
                    <output aria-label={`Quantity for ${product.title}`}>
                      {cart[product.id]}
                    </output>
                    <button
                      aria-label={`Increase quantity for ${product.title}`}
                      onClick={() =>
                        onQuantity(product.id, (cart[product.id] ?? 0) + 1)
                      }
                      type="button"
                    >
                      +
                    </button>
                    <button
                      aria-label={`Remove ${product.title} from cart`}
                      className="legacy-public-remove"
                      onClick={() => onRemove(product.id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="legacy-cart-total">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <button className="legacy-button" onClick={onClose} type="button">
              Continue to checkout
            </button>
          </>
        ) : (
          <div className="legacy-public-empty">
            Your cart is empty. Add a title when you find one worth keeping.
          </div>
        )}
      </div>
    </dialog>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(() =>
    routeFromPath(window.location.pathname),
  );
  const [cart, setCart] = useState<Cart>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const handlePopState = () =>
      setRoute(routeFromPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function go(pathname: string) {
    setSelectedId(null);
    navigate(pathname);
  }

  function handleAdd(productId: string) {
    const product = products.find((item) => item.id === productId);
    setCart((current) => addToCart(current, productId));
    setNotice(`${product?.title ?? "Title"} added to cart`);
  }

  const selectedProduct = selectedId
    ? products.find((product) => product.id === selectedId)
    : undefined;
  const itemsInCart = cartCount(cart);

  return (
    <div className="legacy-public-shell">
      <header className="legacy-public-header">
        <a
          className="legacy-public-brand"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            go("/");
          }}
        >
          <span className="legacy-public-mark">CG</span>
          <span>
            Common Ground<small>Library</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a
            className={route === "catalog" ? "is-active" : undefined}
            href="/catalog"
            onClick={(event) => {
              event.preventDefault();
              go("/catalog");
            }}
          >
            Library
          </a>
          <a
            className={route === "guides" ? "is-active" : undefined}
            href="/guides"
            onClick={(event) => {
              event.preventDefault();
              go("/guides");
            }}
          >
            Guides
          </a>
        </nav>
        <button
          aria-label={`Open cart${itemsInCart ? ` (${itemsInCart})` : ""}`}
          className="legacy-public-cart"
          data-testid="open-cart"
          onClick={() => setCartOpen(true)}
          type="button"
        >
          Cart {itemsInCart ? <span>{itemsInCart}</span> : null}
        </button>
      </header>
      <main>
        {route === "home" ? (
          <HomePage onBrowse={() => go("/catalog")} onOpen={setSelectedId} />
        ) : route === "guides" ? (
          <GuidesPage />
        ) : (
          <CatalogPage onAdd={handleAdd} onOpen={setSelectedId} />
        )}
      </main>
      <footer className="legacy-public-footer">
        <strong>Common Ground</strong>
        <span>Thoughtful reading for useful work.</span>
        <span>© 2026</span>
      </footer>
      {selectedProduct ? (
        <ProductDetails
          onAdd={() => {
            handleAdd(selectedProduct.id);
            setSelectedId(null);
          }}
          onClose={() => setSelectedId(null)}
          product={selectedProduct}
        />
      ) : null}
      {cartOpen ? (
        <CartDialog
          cart={cart}
          onClose={() => setCartOpen(false)}
          onQuantity={(id, quantity) =>
            setCart((current) => setCartQuantity(current, id, quantity))
          }
          onRemove={(id) => setCart((current) => removeFromCart(current, id))}
        />
      ) : null}
      {notice ? (
        <div
          aria-live="polite"
          className="legacy-public-notice"
          onAnimationEnd={() => setNotice("")}
        >
          {notice}
        </div>
      ) : null}
    </div>
  );
}
