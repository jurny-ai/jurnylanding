"use client";

import ScaledFrame from "@/components/mocks/ScaledFrame";
import { cn } from "@/lib/utils";

/* Same neutral palette as the desktop mock: this is meant to read as somebody
   else's storefront sitting under our heatmap, and it stays low-contrast so the
   density overlay is legible on top of it. */
const INK = "#1b1b21";
const MUTED = "#71717f";
const LINE = "#e4e4ea";

export type PhoneScreen = "pdp" | "cart" | "checkout";

/** A 390pt phone viewport, the iPhone logical width most D2C traffic arrives on. */
export const PHONE_W = 390;
export const PHONE_H = 700;

/** Height of the device chrome. The page starts below it, as it does on a real
 *  phone, rather than scrolling underneath an opaque bar. */
export const CHROME_TOP = 82;

/** Each screen is taller than one viewport, so each is scrolled to the moment
 *  that matters on it: the buy box, the checkout button, the pay button.
 *  Natural content heights measured off the render are 953, 642 and 611, plus
 *  CHROME_TOP. Re-measure rather than nudging these if a screen changes. */
export const PHONE_VIEW: Record<PhoneScreen, { content: number; offset: number }> = {
  pdp: { content: 1035, offset: 250 },
  cart: { content: 724, offset: 75 },
  checkout: { content: 750, offset: 55 },
};

const SWATCHES = ["#b9bac0", "#2c2f3a", "#ddd3c1", "#6e7a63", "#b58573"];

const SIZES = [
  { label: "XS", state: "available" },
  { label: "S", state: "available" },
  { label: "M", state: "selected" },
  { label: "L", state: "available" },
  { label: "XL", state: "soldout" },
] as const;

/* -------------------------------------------------------------------------- */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pb-1 pt-3" style={{ color: INK }}>
      <span className="text-[13px] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7.5" width="3" height="3.5" rx="1" />
          <rect x="4.5" y="5.5" width="3" height="5.5" rx="1" />
          <rect x="9" y="3" width="3" height="8" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 10.6l2.2-2.6a3.4 3.4 0 0 0-4.4 0l2.2 2.6z" />
          <path
            d="M7.5 4.1c1.7 0 3.3.6 4.5 1.7l1.5-1.7A9 9 0 0 0 7.5 1.7 9 9 0 0 0 1.5 4.1L3 5.8a6.7 6.7 0 0 1 4.5-1.7z"
            opacity="0.9"
          />
        </svg>
        {/* battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="15" height="8" rx="1.6" fill="currentColor" />
          <path d="M23 4.2v3.6c.9-.3 1.4-.9 1.4-1.8S23.9 4.5 23 4.2z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

function SafariBar({ host }: { host: string }) {
  return (
    <div className="px-4 pb-2 pt-1">
      <div
        className="flex items-center justify-center gap-1.5 rounded-xl py-2"
        style={{ background: "#eeeef1" }}
      >
        <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke={MUTED} strokeWidth={2.4}>
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        <span className="text-[13px] tracking-tight" style={{ color: "#3d3d47" }}>
          {host}
        </span>
      </div>
    </div>
  );
}

/** iOS home indicator, pinned to the bottom of the viewport. */
function HomeIndicator() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-center pb-2 pt-3" style={{ background: "#fff" }}>
      <span className="h-[5px] w-[134px] rounded-full" style={{ background: "#1b1b21", opacity: 0.28 }} />
    </div>
  );
}

function StoreBar() {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: LINE }}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={INK} strokeWidth={1.7}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
      <span className="text-[15px] font-semibold tracking-[0.16em]" style={{ color: INK }}>
        NORTHFIELD
      </span>
      <span className="relative">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={INK} strokeWidth={1.7}>
          <path d="M6 8h12l-1 12H7z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        <span
          className="absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
          style={{ background: INK }}
        >
          2
        </span>
      </span>
    </div>
  );
}

function ProductPhoto({ className, tone = 0 }: { className?: string; tone?: number }) {
  const shades = ["#c6c7cd", "#d5d6db", "#bcbdc4"];
  const shade = shades[tone % shades.length];

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: "#eeeef1" }}>
      <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width="200" height="240" fill="#ececed" />
        <path d="M62 78 L28 104 L34 150 L62 138 Z" fill={shade} opacity="0.85" />
        <path d="M138 78 L172 104 L166 150 L138 138 Z" fill={shade} opacity="0.85" />
        <path d="M62 74 Q100 62 138 74 L142 196 Q100 206 58 196 Z" fill={shade} />
        <path d="M84 68 Q100 82 116 68 Q100 60 84 68 Z" fill="#ffffff" opacity="0.5" />
      </svg>
    </div>
  );
}

function BuyButton({ label = "Add to cart", hot }: { label?: string; hot?: string }) {
  return (
    <div
      data-hot={hot}
      className="flex h-[52px] w-full items-center justify-center rounded-lg text-[15px] font-semibold tracking-[0.04em] text-white"
      style={{ background: INK }}
    >
      {label}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function PdpScreen() {
  return (
    <div className="flex h-full flex-col bg-white" style={{ paddingTop: CHROME_TOP }}>
      <StoreBar />

      <div data-hot="gallery" className="relative">
        <ProductPhoto className="h-[330px] w-full" />
        <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: i === 0 ? INK : "#ffffff", opacity: i === 0 ? 0.75 : 0.85 }}
            />
          ))}
        </span>
      </div>

      <div className="px-4 pt-4">
        <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: MUTED }}>
          Northfield Supply
        </p>
        <h1 className="mt-1.5 text-[22px] font-medium leading-tight" style={{ color: INK }}>
          Everyday Merino Crew
        </h1>

        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex gap-0.5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill={i < 4 ? "#3d3d47" : "#c9c9d1"}>
                <path d="M10 1.6l2.6 5.2 5.8.8-4.2 4.1 1 5.7L10 14.7l-5.2 2.7 1-5.7L1.6 7.6l5.8-.8z" />
              </svg>
            ))}
          </span>
          <span className="text-[12.5px]" style={{ color: MUTED }}>
            4.6 · 1,284 reviews
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2.5">
          <span className="text-[21px] font-semibold" style={{ color: INK }}>
            $128
          </span>
          <span className="text-[14px] line-through" style={{ color: "#b4b4be" }}>
            $160
          </span>
          <span className="px-1.5 py-0.5 text-[11px] font-semibold" style={{ background: "#f0e9e6", color: "#8a4a3c" }}>
            20% OFF
          </span>
        </div>

        <p className="mt-5 text-[13px]" style={{ color: "#3d3d47" }}>
          Color: <span className="font-medium">Fog Grey</span>
        </p>
        <div data-hot="swatches" className="mt-2 flex gap-2.5">
          {SWATCHES.map((hex, i) => (
            <span
              key={hex}
              className="h-8 w-8 rounded-full"
              style={{ background: hex, boxShadow: i === 0 ? `0 0 0 1.5px #fff, 0 0 0 3px ${INK}` : `0 0 0 1px ${LINE}` }}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-[13px]" style={{ color: "#3d3d47" }}>
            Size: <span className="font-medium">M</span>
          </p>
          <span className="text-[12.5px] underline" style={{ color: MUTED }}>
            Size guide
          </span>
        </div>
        <div data-hot="size-row" className="mt-2 flex gap-2">
          {SIZES.map((size) => (
            <span
              key={size.label}
              className="relative flex h-11 flex-1 items-center justify-center rounded-lg text-[13px] font-medium"
              style={{
                border: `1px solid ${size.state === "selected" ? INK : LINE}`,
                boxShadow: size.state === "selected" ? `inset 0 0 0 1px ${INK}` : undefined,
                color: size.state === "soldout" ? "#bcbcc6" : INK,
              }}
            >
              {size.label}
              {size.state === "soldout" && (
                <span className="absolute left-2 right-2 top-1/2 h-px -rotate-[20deg]" style={{ background: "#d8d8e0" }} />
              )}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <BuyButton hot="add-to-cart" />
        </div>
        <p className="mt-2.5 text-center text-[12px]" style={{ color: MUTED }}>
          Or 4 interest free payments of $32.00
        </p>

        <div className="mt-5" style={{ borderTop: `1px solid ${LINE}` }}>
          {["Fabric & care", "Fit & sizing", "Shipping & returns"].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between py-3.5 text-[13.5px]"
              style={{ borderBottom: `1px solid ${LINE}`, color: "#3d3d47" }}
            >
              {row}
              <span style={{ color: MUTED }}>+</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CartScreen() {
  return (
    <div className="flex h-full flex-col bg-white" style={{ paddingTop: CHROME_TOP }}>
      <StoreBar />

      <div className="px-4 pt-4">
        <h1 className="text-[20px] font-medium" style={{ color: INK }}>
          Your cart (2)
        </h1>

        {[
          { name: "Everyday Merino Crew", meta: "Fog Grey · M", price: "$128" },
          { name: "Wool Blend Sock", meta: "Charcoal · L", price: "$22" },
        ].map((line) => (
          <div key={line.name} className="flex gap-3 py-4" style={{ borderBottom: `1px solid ${LINE}` }}>
            <ProductPhoto className="h-[92px] w-[74px] shrink-0 rounded-lg" />
            <div className="flex-1">
              <p className="text-[14px] font-medium" style={{ color: INK }}>
                {line.name}
              </p>
              <p className="mt-0.5 text-[12.5px]" style={{ color: MUTED }}>
                {line.meta}
              </p>
              <div
                className="mt-2.5 flex h-9 w-[92px] items-center justify-between rounded-lg px-3"
                style={{ border: `1px solid ${LINE}` }}
              >
                <span style={{ color: MUTED }}>−</span>
                <span className="text-[13px]" style={{ color: INK }}>
                  1
                </span>
                <span style={{ color: INK }}>+</span>
              </div>
            </div>
            <p className="text-[14px]" style={{ color: INK }}>
              {line.price}
            </p>
          </div>
        ))}

        <div data-hot="discount" className="mt-4 flex gap-2">
          <div
            className="flex h-11 flex-1 items-center rounded-lg px-3 text-[13px]"
            style={{ border: `1px solid ${LINE}`, color: MUTED }}
          >
            Discount code
          </div>
          <div
            data-hot="apply"
            className="flex h-11 w-[88px] items-center justify-center rounded-lg text-[13px] font-medium"
            style={{ border: `1px solid ${INK}`, color: INK }}
          >
            Apply
          </div>
        </div>

        <div data-hot="totals" className="mt-5 space-y-2 text-[13.5px]">
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
          <div
            className="flex justify-between pt-2.5 text-[15px] font-semibold"
            style={{ color: INK, borderTop: `1px solid ${LINE}` }}
          >
            <span>Total</span>
            <span>$163.31</span>
          </div>
        </div>

        <div className="mt-5">
          <BuyButton label="Checkout" hot="checkout-btn" />
        </div>
        <p className="mt-2.5 text-center text-[12px]" style={{ color: MUTED }}>
          Taxes and shipping calculated at checkout
        </p>
      </div>
    </div>
  );
}

function CheckoutScreen() {
  return (
    <div className="flex h-full flex-col bg-white" style={{ paddingTop: CHROME_TOP }}>
      <StoreBar />

      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 text-[12px]" style={{ color: MUTED }}>
          <span style={{ color: INK }}>Information</span>
          <span>›</span>
          <span style={{ color: INK }}>Shipping</span>
          <span>›</span>
          <span>Payment</span>
        </div>

        <h2 className="mt-4 text-[16px] font-medium" style={{ color: INK }}>
          Contact
        </h2>
        <div
          data-hot="contact"
          className="mt-2 flex h-12 items-center rounded-lg px-3 text-[13.5px]"
          style={{ border: `1px solid ${LINE}`, color: "#3d3d47" }}
        >
          casey.mercer@gmail.com
        </div>

        <h2 className="mt-5 text-[16px] font-medium" style={{ color: INK }}>
          Shipping address
        </h2>
        <div data-hot="address" className="mt-2 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {["First name", "Last name"].map((f) => (
              <div
                key={f}
                className="flex h-12 items-center rounded-lg px-3 text-[13.5px]"
                style={{ border: `1px solid ${LINE}`, color: MUTED }}
              >
                {f}
              </div>
            ))}
          </div>
          <div
            className="flex h-12 items-center rounded-lg px-3 text-[13.5px]"
            style={{ border: `1px solid ${LINE}`, color: MUTED }}
          >
            Address
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["City", "State", "ZIP"].map((f) => (
              <div
                key={f}
                className="flex h-12 items-center rounded-lg px-3 text-[13.5px]"
                style={{ border: `1px solid ${LINE}`, color: MUTED }}
              >
                {f}
              </div>
            ))}
          </div>
        </div>

        <h2 className="mt-5 text-[16px] font-medium" style={{ color: INK }}>
          Payment
        </h2>
        <div data-hot="payment" className="mt-2 overflow-hidden rounded-lg" style={{ border: `1px solid ${LINE}` }}>
          <div
            className="flex h-12 items-center gap-2 px-3 text-[13.5px]"
            style={{ borderBottom: `1px solid ${LINE}`, color: MUTED }}
          >
            Card number
            <span className="ml-auto flex gap-1">
              {["#1a1f71", "#eb001b", "#006fcf"].map((c) => (
                <span key={c} className="h-3.5 w-5 rounded-sm" style={{ background: c, opacity: 0.55 }} />
              ))}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <div
              className="flex h-12 items-center px-3 text-[13.5px]"
              style={{ borderRight: `1px solid ${LINE}`, color: MUTED }}
            >
              MM / YY
            </div>
            <div className="flex h-12 items-center px-3 text-[13.5px]" style={{ color: MUTED }}>
              CVC
            </div>
          </div>
        </div>

        <div className="mt-5">
          <BuyButton label="Pay $163.31" hot="pay-btn" />
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 pb-6 text-[12px]" style={{ color: MUTED }}>
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          Secure encrypted checkout
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const HOSTS: Record<PhoneScreen, string> = {
  pdp: "northfield.com",
  cart: "northfield.com",
  checkout: "checkout.northfield.com",
};

interface PhoneMockProps {
  screen?: PhoneScreen;
  className?: string;
  children?: React.ReactNode;
}

/**
 * One storefront screen inside a phone.
 *
 * The chrome (status bar, Safari address pill, home indicator) is pinned outside
 * the scrolling window, exactly as it is on a real device, so only the page
 * content moves under the crop. `children` render on top of the whole viewport,
 * which is how heatmaps get placed in percentage coordinates.
 */
export default function PhoneMock({ screen = "pdp", className, children }: PhoneMockProps) {
  const view = PHONE_VIEW[screen];

  return (
    <div
      className={cn("relative overflow-hidden bg-white", className)}
      style={{ borderRadius: "clamp(14px, 5.5cqw, 34px)", containerType: "inline-size" }}
    >
      <div className="relative" style={{ aspectRatio: `${PHONE_W} / ${PHONE_H}` }}>
        {/* Device chrome sits above the scrolling page, as on a real phone. */}
        <div className="absolute inset-x-0 top-0 z-10 bg-white">
          <StatusBar />
          <SafariBar host={HOSTS[screen]} />
        </div>

        <ScaledFrame
          width={PHONE_W}
          height={PHONE_H}
          contentHeight={view.content}
          offsetY={view.offset}
          className="h-full"
        >
          {screen === "pdp" && <PdpScreen />}
          {screen === "cart" && <CartScreen />}
          {screen === "checkout" && <CheckoutScreen />}
        </ScaledFrame>

        <div className="absolute inset-x-0 bottom-0 z-10">
          <HomeIndicator />
        </div>

        {children}
      </div>
    </div>
  );
}
