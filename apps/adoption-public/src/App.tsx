import { useEffect, useMemo, useState } from "react";

import { T7Icon } from "@ten4seven/icons";
import type {
  Appearance,
  DensityName,
  PaletteName,
  RadiusName,
} from "@ten4seven/tokens";
import {
  AnnouncementBar,
  Button,
  CartLineItem,
  CartPanel,
  ContentShowcase,
  CtaBlock,
  DetailDrawer,
  EmptyState,
  Hero,
  MediaFrame,
  OrderSummary,
  PageHeader,
  Price,
  ProductCard,
  ProductGrid,
  ProductMeta,
  ProductShowcase,
  PublicFooter,
  PublicShell,
  Rating,
  SearchInput,
  Select,
  Ten4SevenProvider,
  Typography,
  CartTrigger,
} from "@ten4seven/ui";

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

type SupportedAppearance = Exclude<Appearance, "system">;

function queryValue<T extends string>(
  params: URLSearchParams,
  key: string,
  values: readonly T[],
  fallback: T,
): T {
  const value = params.get(key);
  return values.some((candidate) => candidate === value)
    ? (value as T)
    : fallback;
}

function themeFromQuery() {
  const params = new URLSearchParams(window.location.search);

  return {
    appearance: queryValue<SupportedAppearance>(
      params,
      "appearance",
      ["light", "dark"],
      "light",
    ),
    density: queryValue<DensityName>(
      params,
      "density",
      ["comfortable", "default", "compact", "dense"],
      "default",
    ),
    palette: queryValue<PaletteName>(
      params,
      "palette",
      [
        "slate",
        "emerald",
        "teal",
        "cyan",
        "blue",
        "indigo",
        "violet",
        "rose",
        "red",
        "orange",
        "amber",
      ],
      "emerald",
    ),
    radius: queryValue<RadiusName>(
      params,
      "radius",
      ["sharp", "soft", "rounded"],
      "soft",
    ),
  };
}

function routeFromPath(pathname: string): Route {
  if (pathname === "/catalog") return "catalog";
  if (pathname === "/guides") return "guides";
  return "home";
}

function navigate(pathname: string) {
  window.history.pushState({}, "", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function initials(title: string) {
  return title
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
}

function CoverArt({
  large = false,
  product,
}: {
  large?: boolean;
  product: Product;
}) {
  return (
    <div
      aria-label={`${product.title} cover`}
      className={`adoption-public-cover${large ? " adoption-public-cover-large" : ""}`}
      data-category={product.category}
      role="img"
    >
      <span className="adoption-public-cover-mark">
        {initials(product.title)}
      </span>
    </div>
  );
}

function ProductMedia({
  large = false,
  product,
}: {
  large?: boolean;
  product: Product;
}) {
  return (
    <MediaFrame label={`${product.title} cover`} ratio={0.78}>
      <CoverArt large={large} product={product} />
    </MediaFrame>
  );
}

function ProductCardForCatalog({
  onAdd,
  onOpen,
  product,
}: {
  onAdd: () => void;
  onOpen: () => void;
  product: Product;
}) {
  return (
    <ProductCard
      actions={
        <div className="adoption-public-card-actions">
          <Button intent="quiet" onClick={onOpen} size="sm">
            View details
          </Button>
          <Button
            aria-label={`Add ${product.title} to cart`}
            leadingIcon="cart"
            onClick={onAdd}
            size="sm"
          >
            Add
          </Button>
        </div>
      }
      details={<Rating count={undefined} value={product.rating} />}
      eyebrow={product.category}
      media={<ProductMedia product={product} />}
      meta={<ProductMeta items={[product.author, product.format]} />}
      price={<Price amount={product.price} />}
      title={product.title}
    />
  );
}

function HomePage({
  onAdd,
  onBrowse,
  onOpen,
}: {
  onAdd: (id: string) => void;
  onBrowse: () => void;
  onOpen: (id: string) => void;
}) {
  const featured =
    products.find((product) => product.id === "reliable-design") ?? products[0];

  return (
    <div className="adoption-public-page">
      <AnnouncementBar
        action={
          <Button intent="quiet" onClick={onBrowse} size="sm">
            Browse library
          </Button>
        }
        dismissible
      >
        New field notes are ready for the week ahead.
      </AnnouncementBar>
      <Hero
        description="Common Ground brings together thoughtful ebooks and practical notes for people building products, teams, and systems."
        eyebrow="A small library for useful work"
        media={<ProductMedia large product={featured} />}
        primaryAction={<Button onClick={onBrowse}>Browse the library</Button>}
        title="Make room for better decisions."
        variant="split"
      />
      <div className="adoption-public-block-stack">
        <ProductShowcase
          actions={
            <Button intent="quiet" onClick={onBrowse}>
              View all
            </Button>
          }
          description="A starting point for your next useful conversation."
          title="Selected titles"
        >
          <ProductGrid minCardWidth={250}>
            {products.slice(0, 2).map((product) => (
              <ProductCardForCatalog
                key={product.id}
                onAdd={() => onAdd(product.id)}
                onOpen={() => onOpen(product.id)}
                product={product}
              />
            ))}
          </ProductGrid>
        </ProductShowcase>
        <FeatureShowcaseForLibrary />
        <CtaBlock
          actions={<Button onClick={onBrowse}>Find your next read</Button>}
          description="Keep a shelf that earns its space, one title at a time."
          title="Ideas that travel well."
          tone="subtle"
        />
      </div>
    </div>
  );
}

function FeatureShowcaseForLibrary() {
  return (
    <ContentShowcase
      description="Thoughtful material, organized around the work it should support."
      items={[
        {
          description: "Clear writing for the work in front of you.",
          id: "useful-not-loud",
          meta: "Useful, not loud",
          title: "Make space for signal.",
        },
        {
          description: "Every title ends closer to a decision you can try.",
          id: "made-for-practice",
          meta: "Made for practice",
          title: "Read toward action.",
        },
        {
          description: "Save only what you want to return to.",
          id: "keep-shelf-light",
          meta: "Keep your shelf light",
          title: "Choose with care.",
        },
      ]}
      title="Ideas that travel well."
    />
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
    <div className="adoption-public-page" data-testid="catalog-page">
      <PageHeader
        description="Browse field notes, system thinking, and practical guidance for the work you are already doing."
        overline="The library"
        title="Find your next useful read."
      />
      <div
        aria-label="Catalog filters"
        className="adoption-public-filter-toolbar"
        role="region"
      >
        <SearchInput
          aria-label="Search library"
          label="Search library"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search titles, authors, topics"
          value={query}
        />
        <Select
          aria-label="Collection filter"
          label="Collection"
          onChange={(event) =>
            setCategory(event.target.value as ProductCategory | "All")
          }
          value={category}
        >
          {categories.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Select>
        <Typography
          aria-live="polite"
          className="adoption-public-filter-result"
          typeRole="caption"
        >
          {visibleProducts.length} titles
        </Typography>
      </div>
      <ProductGrid minCardWidth={250}>
        {visibleProducts.length ? (
          visibleProducts.map((product) => (
            <ProductCardForCatalog
              key={product.id}
              onAdd={() => onAdd(product.id)}
              onOpen={() => onOpen(product.id)}
              product={product}
            />
          ))
        ) : (
          <EmptyState
            description="Try another title, author, or collection."
            icon="search"
            title="No titles match that search."
          />
        )}
      </ProductGrid>
    </div>
  );
}

function GuidesPage() {
  return (
    <div className="adoption-public-page">
      <ContentShowcase
        description="Begin with one question, then choose a title that helps you move it forward."
        items={[
          {
            description: "Building Calm Products · Reliable by Design",
            id: "starting-a-system",
            meta: "Starting a new system",
            title: "Build with less noise.",
          },
          {
            description: "Practical Type · A Map of Small Decisions",
            id: "clearer-work",
            meta: "Making clearer work",
            title: "Make the next step visible.",
          },
        ]}
        title="Reading paths for busy weeks."
      />
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
    <DetailDrawer
      description="A closer look before you add this title to your shelf."
      onClose={onClose}
      open
      title={product.title}
    >
      <div className="adoption-public-detail-stack">
        <ProductMedia large product={product} />
        <div className="adoption-public-detail-meta">
          <Typography typeRole="overline">{product.category}</Typography>
          <Rating value={product.rating} />
          <Typography typeRole="caption">{product.format}</Typography>
        </div>
        <Typography typeRole="body">{product.description}</Typography>
        <Typography typeRole="body-sm">Written by {product.author}</Typography>
        <Button leadingIcon="cart" onClick={onAdd}>
          Add to cart · <Price amount={product.price} />
        </Button>
      </div>
    </DetailDrawer>
  );
}

function CartDrawer({
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
  const totalItems = cartCount(cart);
  const subtotal = cartSubtotal(cart, products);

  return (
    <DetailDrawer
      description="Adjust your selections before continuing."
      onClose={onClose}
      open
      title="Shopping cart"
    >
      <div className="adoption-public-cart-stack">
        <CartPanel
          actions={
            cartProducts.length ? (
              <Button onClick={onClose}>Continue to checkout</Button>
            ) : undefined
          }
          emptyState={
            <EmptyState
              description="Add a title when you find one worth keeping."
              icon="cart"
              title="Your cart is empty"
            />
          }
          itemCount={`${totalItems} item${totalItems === 1 ? "" : "s"}`}
          summary={
            cartProducts.length ? (
              <div className="adoption-public-cart-summary">
                <OrderSummary
                  rows={[{ label: "Selected titles", value: totalItems }]}
                  total={<Price amount={subtotal} />}
                />
              </div>
            ) : undefined
          }
          title="Shopping cart"
        >
          {cartProducts.map((product) => (
            <CartLineItem
              key={product.id}
              max={10}
              media={<ProductMedia product={product} />}
              meta={`${product.author} · ${product.format}`}
              onQuantityChange={(quantity) => onQuantity(product.id, quantity)}
              onRemove={() => onRemove(product.id)}
              price={<Price amount={product.price} />}
              quantity={cart[product.id]}
              quantityLabel={`Quantity for ${product.title}`}
              title={product.title}
            />
          ))}
        </CartPanel>
      </div>
    </DetailDrawer>
  );
}

function PublicApp() {
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

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

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
  const totalItems = cartCount(cart);

  const navigationMenu = [
    {
      active: route === "catalog",
      icon: "catalog" as const,
      key: "library",
      label: "Library",
      onSelect: () => go("/catalog"),
    },
    {
      children: [
        {
          icon: "catalog" as const,
          key: "browse-catalog",
          label: "Browse catalog",
          onSelect: () => go("/catalog"),
        },
        {
          icon: "book" as const,
          key: "reading-guides",
          label: "Reading guides",
          onSelect: () => go("/guides"),
        },
      ],
      icon: "category" as const,
      key: "explore",
      label: "Explore",
    },
    {
      active: route === "guides",
      icon: "book" as const,
      key: "guides",
      label: "Guides",
      onSelect: () => go("/guides"),
    },
  ];

  return (
    <PublicShell
      actions={
        <CartTrigger
          count={totalItems}
          data-testid="open-cart"
          intent="quiet"
          label="Cart"
          onClick={() => setCartOpen(true)}
          size="sm"
        />
      }
      brand={
        <div className="adoption-public-brand">
          <span className="adoption-public-brand-mark">
            <T7Icon name="book" size={17} />
          </span>
          <span>
            <Typography typeRole="label">Common Ground</Typography>
            <Typography typeRole="caption">Library</Typography>
          </span>
        </div>
      }
      footer={
        <PublicFooter
          brand={
            <div className="adoption-public-footer-brand">
              <Typography typeRole="label">Common Ground</Typography>
              <Typography typeRole="caption">
                Thoughtful reading for useful work.
              </Typography>
            </div>
          }
          groups={[
            {
              items: [
                { href: "/catalog", label: "Library" },
                { href: "/guides", label: "Guides" },
              ],
              label: "Explore",
            },
          ]}
          legal="© 2026 Common Ground"
        />
      }
      navigationMenu={navigationMenu}
    >
      {route === "home" ? (
        <HomePage
          onAdd={handleAdd}
          onBrowse={() => go("/catalog")}
          onOpen={setSelectedId}
        />
      ) : route === "guides" ? (
        <GuidesPage />
      ) : (
        <CatalogPage onAdd={handleAdd} onOpen={setSelectedId} />
      )}
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
        <CartDrawer
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
          className="adoption-public-notice"
          role="status"
        >
          {notice}
        </div>
      ) : null}
    </PublicShell>
  );
}

export default function App() {
  const theme = themeFromQuery();

  return (
    <Ten4SevenProvider {...theme}>
      <PublicApp />
    </Ten4SevenProvider>
  );
}
