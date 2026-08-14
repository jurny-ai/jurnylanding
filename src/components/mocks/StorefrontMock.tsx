"use client";

import ScaledFrame from "@/components/mocks/ScaledFrame";
import { cn } from "@/lib/utils";

/* The mock deliberately uses its own neutral palette rather than Jurny's tokens.
   It is meant to read as somebody else's storefront sitting under our heatmap,
   and it stays low-contrast so the density overlay is legible on top of it. */
const INK = "#1b1b21";
const MUTED = "#71717f";
const LINE = "#e4e4ea";
const WASH = "#f7f7f9";

export type StorefrontScreen = "pdp" | "cart" | "checkout";
export type StorefrontVariant = "a" | "b";
export type StorefrontCrop = "full" | "viewport";

export const MOCK_W = 680;

/* Frame height per screen, sized snugly to each screen's content so no frame
   ends in a slab of dead whitespace. The two PDP variants must share a height,
   since they are compared side by side; the cart and checkout each stand alone. */
export const MOCK_H: Record<StorefrontScreen, number> = {
  pdp: 890,
  cart: 700,
  checkout: 640,
};

/** Landscape crop: the page as it appears in one browser viewport.
 *
 *  Every screen gets the same frame height so a journey strip reads as one
 *  consistent set of screenshots, but each is scrolled to the moment that
 *  matters on it. Cropping all three from the top would cut the cart's checkout
 *  button and the checkout's pay button, which are the whole point of those
 *  screens. */
export const VIEWPORT_H = 440;

export const VIEWPORT: Record<StorefrontScreen, { content: number; offset: number }> = {
  pdp: { content: VIEWPORT_H, offset: 0 },
  cart: { content: 700, offset: 240 },
  checkout: { content: 640, offset: 190 },
};

const SWATCHES = [
  { name: "Fog Grey", hex: "#b9bac0" },
  { name: "Ink", hex: "#2c2f3a" },
  { name: "Oat", hex: "#ddd3c1" },
  { name: "Moss", hex: "#6e7a63" },
  { name: "Clay", hex: "#b58573" },
];

const SIZES = [
  { label: "XS", state: "available" },
  { label: "S", state: "available" },
  { label: "M", state: "selected" },
  { label: "L", state: "available" },
  { label: "XL", state: "soldout" },
  { label: "XXL", state: "available" },
] as const;

/* -------------------------------------------------------------------------- */

function BrowserChrome({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-3 border-b px-4 py-2.5" style={{ borderColor: LINE, background: WASH }}>
      <div className="flex gap-1.5">
        <span className="block h-2.5 w-2.5 rounded-full" style={{ background: "#e0e0e6" }} />
        <span className="block h-2.5 w-2.5 rounded-full" style={{ background: "#e0e0e6" }} />
        <span className="block h-2.5 w-2.5 rounded-full" style={{ background: "#e0e0e6" }} />
      </div>
      <div
        className="flex flex-1 items-center gap-2 rounded-full px-3 py-1"
        style={{ background: "#fff", border: `1px solid ${LINE}` }}
      >
        <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke={MUTED} strokeWidth={2}>
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        <span className="text-[11px] tracking-tight" style={{ color: MUTED }}>
          {path}
        </span>
      </div>
    </div>
  );
}

/** The garment. Drawn, not photographed, and kept muted so the heatmap reads. */
function ProductPhoto({
  className,
  tone = 0,
  ...rest
}: { className?: string; tone?: number } & React.HTMLAttributes<HTMLDivElement>) {
  const shades = ["#c6c7cd", "#d5d6db", "#bcbdc4"];
  const shade = shades[tone % shades.length];

  return (
    <div {...rest} className={cn("relative overflow-hidden", className)} style={{ background: "#eeeef1" }}>
      <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`pp-${tone}`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <rect width="200" height="240" fill="#ececed" />
        {/* sleeves */}
        <path d="M62 78 L28 104 L34 150 L62 138 Z" fill={shade} opacity="0.85" />
        <path d="M138 78 L172 104 L166 150 L138 138 Z" fill={shade} opacity="0.85" />
        {/* body */}
        <path d="M62 74 Q100 62 138 74 L142 196 Q100 206 58 196 Z" fill={shade} />
        {/* collar */}
        <path d="M84 68 Q100 82 116 68 Q100 60 84 68 Z" fill="#ffffff" opacity="0.5" />
        {/* ribbing */}
        <rect x="58" y="188" width="84" height="9" fill="#000" opacity="0.05" />
        <rect width="200" height="240" fill={`url(#pp-${tone})`} />
      </svg>
    </div>
  );
}

function Stars({ size = 11 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < 4 ? "#3d3d47" : "#c9c9d1"}>
          <path d="M10 1.6l2.6 5.2 5.8.8-4.2 4.1 1 5.7L10 14.7l-5.2 2.7 1-5.7L1.6 7.6l5.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

function StoreHeader({ compact }: { compact?: boolean }) {
  return (
    <>
      <div
        className="flex items-center justify-center py-1.5 text-[10px] tracking-[0.08em]"
        style={{ background: INK, color: "#fff" }}
      >
        Free shipping over $75 · Free 60 day returns
      </div>
      <div className="flex items-center justify-between border-b px-6 py-3.5" style={{ borderColor: LINE }}>
        <span className="text-[15px] font-semibold tracking-[0.16em]" style={{ color: INK }}>
          NORTHFIELD
        </span>
        {!compact && (
          <nav className="flex items-center gap-5 text-[11.5px]" style={{ color: "#3d3d47" }}>
            <span>New In</span>
            <span>Men</span>
            <span>Women</span>
            <span>Everyday</span>
            <span style={{ color: "#a8433a" }}>Sale</span>
          </nav>
        )}
        <div className="flex items-center gap-3.5" style={{ color: "#4a4a55" }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c1.4-3.6 4-5.4 7-5.4s5.6 1.8 7 5.4" />
          </svg>
          <span className="relative">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M6 8h12l-1 12H7z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span
              className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold text-white"
              style={{ background: INK }}
            >
              2
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

function SizeRow() {
  return (
    <div data-hot="size-row" className="flex gap-1.5">
      {SIZES.map((size) => (
        <span
          key={size.label}
          className="relative flex h-8 w-[52px] items-center justify-center text-[11.5px] font-medium"
          style={{
            border: `1px solid ${size.state === "selected" ? INK : LINE}`,
            color: size.state === "soldout" ? "#bcbcc6" : INK,
            background: size.state === "selected" ? "#fff" : "#fff",
            boxShadow: size.state === "selected" ? `inset 0 0 0 1px ${INK}` : undefined,
          }}
        >
          {size.label}
          {size.state === "soldout" && (
            <span
              className="absolute left-1 right-1 top-1/2 h-px -rotate-[18deg]"
              style={{ background: "#d8d8e0" }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

function BuyButton({ label = "Add to cart" }: { label?: string }) {
  return (
    <div
      className="flex h-11 w-full items-center justify-center text-[12.5px] font-semibold tracking-[0.06em] text-white"
      style={{ background: INK }}
    >
      {label.toUpperCase()}
    </div>
  );
}

function Accordions() {
  return (
    <div data-hot="accordions" style={{ borderTop: `1px solid ${LINE}` }}>
      {["Fabric & care", "Fit & sizing", "Shipping & returns"].map((row) => (
        <div
          key={row}
          className="flex items-center justify-between py-2.5 text-[11.5px]"
          style={{ borderBottom: `1px solid ${LINE}`, color: "#3d3d47" }}
        >
          {row}
          <span style={{ color: MUTED }}>+</span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function PdpScreen({ variant, crop }: { variant: StorefrontVariant; crop: StorefrontCrop }) {
  const isB = variant === "b";
  const cropped = crop === "viewport";

  const buyBox = (
    <div className="flex flex-col gap-3.5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: MUTED }}>
          Northfield Supply
        </p>
        <h1 className="mt-1.5 text-[21px] font-medium leading-tight" style={{ color: INK }}>
          Everyday Merino Crew
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <Stars />
          <span className="text-[11px]" style={{ color: MUTED }}>
            4.6 · 1,284 reviews
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-2.5">
        <span className="text-[19px] font-semibold" style={{ color: INK }}>
          $128
        </span>
        <span className="text-[13px] line-through" style={{ color: "#b4b4be" }}>
          $160
        </span>
        <span className="px-1.5 py-0.5 text-[10px] font-semibold" style={{ background: "#f0e9e6", color: "#8a4a3c" }}>
          20% OFF
        </span>
      </div>

      <div>
        <p className="mb-1.5 text-[11px]" style={{ color: "#3d3d47" }}>
          Color: <span className="font-medium">Fog Grey</span>
        </p>
        <div data-hot="swatches" className="flex gap-1.5">
          {SWATCHES.map((swatch, i) => (
            <span
              key={swatch.name}
              className="h-6 w-6 rounded-full"
              style={{
                background: swatch.hex,
                boxShadow: i === 0 ? `0 0 0 1px #fff, 0 0 0 2px ${INK}` : `0 0 0 1px ${LINE}`,
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-[11px]" style={{ color: "#3d3d47" }}>
            Size: <span className="font-medium">M</span>
          </p>
          <span data-hot="size-guide" className="text-[10.5px] underline" style={{ color: MUTED }}>
            Size guide
          </span>
        </div>
        <SizeRow />
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex h-11 items-center gap-3 px-3" style={{ border: `1px solid ${LINE}` }}>
          <span style={{ color: MUTED }}>−</span>
          <span className="text-[12px]" style={{ color: INK }}>
            1
          </span>
          <span style={{ color: INK }}>+</span>
        </div>
        <div data-hot="add-to-cart" className="flex-1">
          <BuyButton />
        </div>
      </div>

      <p className="text-[10.5px]" style={{ color: MUTED }}>
        Or 4 interest free payments of $32.00
      </p>
      <p className="text-[11px]" style={{ color: "#3d3d47" }}>
        Get it by <span className="font-medium">Tue, Aug 19</span> to 94110
      </p>

      <Accordions />
    </div>
  );

  return (
    <div className={cn("relative flex h-full flex-col bg-white", cropped && "overflow-hidden")}>
      <StoreHeader />

      {!isB && (
        <div className="px-6 pt-3 text-[10.5px]" style={{ color: MUTED }}>
          Home / Men / Knitwear
        </div>
      )}

      <div className={cn("grid gap-6 px-6", isB ? "pt-4" : "pt-3")} style={{ gridTemplateColumns: isB ? "0.85fr 1fr" : "1fr 0.92fr" }}>
        <div>
          <ProductPhoto data-hot="gallery" className={isB ? "h-[300px] w-full" : "h-[372px] w-full"} />
          <div data-hot="thumbs" className="mt-2 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <ProductPhoto key={i} tone={i} className="h-[58px] w-full" />
            ))}
          </div>
        </div>
        {buyBox}
      </div>

      <div className="mt-7 px-6">
        <p className="mb-3 text-[12.5px] font-medium" style={{ color: INK }}>
          Complete the look
        </p>
        <div data-hot="complete-look" className="grid grid-cols-3 gap-3">
          {["Merino Beanie", "Wool Blend Sock", "Everyday Chino"].map((name, i) => (
            <div key={name}>
              <ProductPhoto tone={i + 1} className="h-[92px] w-full" />
              <p className="mt-1.5 text-[10.5px]" style={{ color: "#3d3d47" }}>
                {name}
              </p>
              <p className="text-[10.5px]" style={{ color: MUTED }}>
                ${[38, 22, 98][i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isB && (
        <div
          className={cn(
            "flex items-center justify-between border-t px-6 py-2.5",
            cropped ? "absolute inset-x-0 bottom-0" : "mt-auto"
          )}
          style={{ borderColor: LINE, background: "#fff" }}
        >
          <div>
            <p className="text-[11px] font-medium" style={{ color: INK }}>
              Everyday Merino Crew · M
            </p>
            <p className="text-[10.5px]" style={{ color: MUTED }}>
              $128
            </p>
          </div>
          <div data-hot="sticky-add" className="w-[180px]">
            <BuyButton />
          </div>
        </div>
      )}
    </div>
  );
}

function CartScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StoreHeader compact />
      <div className="px-6 pt-5">
        <h1 className="text-[19px] font-medium" style={{ color: INK }}>
          Your cart (2)
        </h1>

        {[
          { name: "Everyday Merino Crew", meta: "Fog Grey · M", price: "$128" },
          { name: "Wool Blend Sock", meta: "Charcoal · L", price: "$22" },
        ].map((line) => (
          <div key={line.name} className="flex gap-3 py-4" style={{ borderBottom: `1px solid ${LINE}` }}>
            <ProductPhoto className="h-[84px] w-[68px] shrink-0" />
            <div className="flex-1">
              <p className="text-[12.5px] font-medium" style={{ color: INK }}>
                {line.name}
              </p>
              <p className="mt-0.5 text-[11px]" style={{ color: MUTED }}>
                {line.meta}
              </p>
              <div className="mt-2 flex h-7 w-[76px] items-center justify-between px-2" style={{ border: `1px solid ${LINE}` }}>
                <span style={{ color: MUTED }}>−</span>
                <span className="text-[11px]" style={{ color: INK }}>
                  1
                </span>
                <span style={{ color: INK }}>+</span>
              </div>
            </div>
            <p className="text-[12.5px]" style={{ color: INK }}>
              {line.price}
            </p>
          </div>
        ))}

        <div data-hot="discount" className="mt-4 flex gap-2">
          <div className="flex h-9 flex-1 items-center px-3 text-[11px]" style={{ border: `1px solid ${LINE}`, color: MUTED }}>
            Discount code
          </div>
          <div data-hot="apply" className="flex h-9 w-[84px] items-center justify-center text-[11px] font-medium" style={{ border: `1px solid ${INK}`, color: INK }}>
            Apply
          </div>
        </div>

        <div data-hot="totals" className="mt-5 space-y-1.5 text-[11.5px]">
          {[
            ["Subtotal", "$150.00"],
            ["Shipping", "Free"],
            ["Estimated tax", "$13.31"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between" style={{ color: "#3d3d47" }}>
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div className="flex justify-between pt-2 text-[13px] font-semibold" style={{ color: INK, borderTop: `1px solid ${LINE}` }}>
            <span>Total</span>
            <span>$163.31</span>
          </div>
        </div>

        <div data-hot="checkout-btn" className="mt-5">
          <BuyButton label="Checkout" />
        </div>
        <p className="mt-2 text-center text-[10.5px]" style={{ color: MUTED }}>
          Taxes and shipping calculated at checkout
        </p>
      </div>
    </div>
  );
}

function CheckoutScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StoreHeader compact />
      <div className="px-6 pt-5">
        <div className="flex items-center gap-2 text-[10.5px]" style={{ color: MUTED }}>
          <span style={{ color: INK }}>Information</span>
          <span>›</span>
          <span style={{ color: INK }}>Shipping</span>
          <span>›</span>
          <span>Payment</span>
        </div>

        <h1 className="mt-4 text-[15px] font-medium" style={{ color: INK }}>
          Contact
        </h1>
        <div data-hot="contact" className="mt-2 flex h-10 items-center px-3 text-[11.5px]" style={{ border: `1px solid ${LINE}`, color: "#3d3d47" }}>
          casey.mercer@gmail.com
        </div>

        <h2 className="mt-5 text-[15px] font-medium" style={{ color: INK }}>
          Shipping address
        </h2>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {["First name", "Last name"].map((f) => (
            <div key={f} className="flex h-10 items-center px-3 text-[11.5px]" style={{ border: `1px solid ${LINE}`, color: MUTED }}>
              {f}
            </div>
          ))}
        </div>
        <div data-hot="address" className="mt-2 flex h-10 items-center px-3 text-[11.5px]" style={{ border: `1px solid ${LINE}`, color: MUTED }}>
          Address
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["City", "State", "ZIP"].map((f) => (
            <div key={f} className="flex h-10 items-center px-3 text-[11.5px]" style={{ border: `1px solid ${LINE}`, color: MUTED }}>
              {f}
            </div>
          ))}
        </div>

        <h2 className="mt-5 text-[15px] font-medium" style={{ color: INK }}>
          Payment
        </h2>
        <div data-hot="payment" className="mt-2" style={{ border: `1px solid ${LINE}` }}>
          <div className="flex h-10 items-center gap-2 px-3 text-[11.5px]" style={{ borderBottom: `1px solid ${LINE}`, color: MUTED }}>
            Card number
            <span className="ml-auto flex gap-1">
              {["#1a1f71", "#eb001b", "#006fcf"].map((c) => (
                <span key={c} className="h-3 w-5 rounded-sm" style={{ background: c, opacity: 0.55 }} />
              ))}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex h-10 items-center px-3 text-[11.5px]" style={{ borderRight: `1px solid ${LINE}`, color: MUTED }}>
              MM / YY
            </div>
            <div className="flex h-10 items-center px-3 text-[11.5px]" style={{ color: MUTED }}>
              CVC
            </div>
          </div>
        </div>

        <div data-hot="pay-btn" className="mt-5">
          <BuyButton label="Pay $163.31" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const PATHS: Record<StorefrontScreen, string> = {
  pdp: "northfield.com/products/everyday-merino-crew",
  cart: "northfield.com/cart",
  checkout: "northfield.com/checkouts/c/38f1a9",
};

interface StorefrontMockProps {
  screen?: StorefrontScreen;
  variant?: StorefrontVariant;
  /** "viewport" crops the page to a landscape above-the-fold frame. */
  crop?: StorefrontCrop;
  /** Height of an arbitrary window onto the page, in intrinsic pixels, with the
   *  scroll position that window sits at. Overrides `crop`. Lets a caller frame
   *  one specific part of a screen instead of taking it whole. */
  windowH?: number;
  windowOffset?: number;
  /** Browser chrome adds a fixed pixel height that does not scale with width.
   *  Turn it off where the frame has to keep an exact aspect ratio, such as the
   *  variant panels inside the pipeline canvas. */
  chrome?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A D2C product page rendered at a fixed intrinsic size, wrapped in browser
 * chrome. `children` render on top of the page itself, which is how heatmaps and
 * friction markers get placed in percentage coordinates.
 */
export default function StorefrontMock({
  screen = "pdp",
  variant = "a",
  crop = "full",
  windowH,
  windowOffset = 0,
  chrome = true,
  className,
  children,
}: StorefrontMockProps) {
  return (
    <div className={cn("overflow-hidden border border-border bg-white", className)}>
      {chrome && <BrowserChrome path={PATHS[screen]} />}
      <div className="relative">
        <ScaledFrame
          width={MOCK_W}
          height={windowH ?? (crop === "viewport" ? VIEWPORT_H : MOCK_H[screen])}
          contentHeight={windowH ? MOCK_H[screen] : crop === "viewport" ? VIEWPORT[screen].content : MOCK_H[screen]}
          offsetY={windowH ? windowOffset : crop === "viewport" ? VIEWPORT[screen].offset : 0}
        >
          {screen === "pdp" && <PdpScreen variant={variant} crop={crop} />}
          {screen === "cart" && <CartScreen />}
          {screen === "checkout" && <CheckoutScreen />}
        </ScaledFrame>
        {children}
      </div>
    </div>
  );
}
