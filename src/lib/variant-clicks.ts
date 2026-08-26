import type { HeatPoint } from "@/components/HeatmapOverlay";

/** The three screens of a buying journey, and where synthetic users clicked on
 *  each. Coordinates are percentages of the phone viewport for that screen,
 *  measured off the rendered PhoneMock via its `data-hot` attributes rather than
 *  derived by hand. If a screen's layout or its scroll offset changes,
 *  re-measure. See PHONE_VIEW. */
export const JOURNEY = [
  {
    step: "Product page",
    screen: "pdp" as const,
    clicks: [
      { x: 50, y: 22, w: 0.5, r: 12 }, // product image
      { x: 50, y: 58.4, w: 0.6, r: 9 }, // colour swatches
      { x: 50, y: 70.6, w: 0.8, r: 9 }, // size row
      { x: 78, y: 63.6, w: 0.25, r: 5 }, // size guide
      { x: 50, y: 80.3, w: 1, r: 9, peak: true }, // add to cart
    ] as HeatPoint[],
  },
  {
    step: "Cart",
    screen: "cart" as const,
    clicks: [
      { x: 32, y: 30, w: 0.4, r: 9 }, // line items
      { x: 50, y: 55.4, w: 0.65, r: 9 }, // discount code field
      { x: 82, y: 55.4, w: 0.45, r: 6 }, // apply
      { x: 50, y: 69.8, w: 0.35, r: 8 }, // order totals
      { x: 50, y: 84.8, w: 1, r: 9, peak: true }, // checkout
    ] as HeatPoint[],
  },
  {
    step: "Checkout",
    screen: "checkout" as const,
    clicks: [
      { x: 50, y: 25.7, w: 0.5, r: 8 }, // contact
      { x: 50, y: 48, w: 0.8, r: 10 }, // shipping address
      { x: 50, y: 73.8, w: 0.65, r: 9 }, // payment
      { x: 50, y: 87.4, w: 1, r: 9, peak: true }, // pay
    ] as HeatPoint[],
  },
];
