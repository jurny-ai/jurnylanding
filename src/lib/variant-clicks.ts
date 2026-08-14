import type { HeatPoint } from "@/components/HeatmapOverlay";

/**
 * Where synthetic users clicked on each variant of the product page.
 *
 * Coordinates are percentages of the StorefrontMock frame, so they stay locked
 * to the element underneath at every breakpoint. They were read off the rendered
 * mock rather than derived by hand: each target in StorefrontMock carries a
 * `data-hot` attribute, and the centre of its bounding box relative to the frame
 * is what appears here. If the mock's layout changes, re-measure rather than
 * nudging these by eye.
 *
 * Shared, because two places have to agree on them: the heatmap in
 * VariantPrediction, and the pooled points at the end of the pipeline sequence,
 * which land on the same buttons of the same page.
 */
/* Both variants as seen in the landscape viewport crop, which is what the A/B
   section and the pipeline's stage 4 both render. Measured against the crop
   rather than converted from the full page, because the crop is not a scale: the
   sticky bar repositions to the bottom of the viewport, and everything below the
   fold simply is not there to be clicked. */
export const VARIANT_A_VIEWPORT_CLICKS: HeatPoint[] = [
  { x: 23.1, y: 69.1, w: 0.75, r: 13 }, // gallery
  { x: 71.3, y: 63.8, w: 0.6, r: 7 }, // swatches
  { x: 92.8, y: 71.6, w: 0.35, r: 5 }, // size guide
  { x: 71.3, y: 78.5, w: 0.8, r: 8 }, // size row
  { x: 77.3, y: 90.3, w: 1, r: 9, peak: true }, // add to cart
  { x: 94, y: 10.2, w: 0.3, r: 4 }, // cart icon
];

export const VARIANT_B_VIEWPORT_CLICKS: HeatPoint[] = [
  { x: 20.1, y: 55.6, w: 0.55, r: 11 }, // gallery
  { x: 65.4, y: 58.4, w: 0.5, r: 6 }, // swatches
  { x: 65.4, y: 73.1, w: 0.75, r: 8 }, // size row
  { x: 83.2, y: 92.7, w: 1, r: 8, peak: true }, // sticky add to cart
  { x: 94, y: 10.2, w: 0.25, r: 4 }, // cart icon
];

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
