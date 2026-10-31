import type { StaticImageData } from "next/image";
import trayChicken from "@/assets/images/tray-chicken-crop.webp";
import trayKofta from "@/assets/images/tray-kofta-crop.webp";
import trayMixed from "@/assets/images/tray-mixed-crop.webp";
import burger from "@/assets/images/burger-crop.webp";
import pizzaPrep from "@/assets/images/pizza-prep.webp";

/**
 * Category-level imagery for the menu cards.
 *
 * We only ship photos we actually have. A category gets a photo only when the
 * photo genuinely depicts that kind of food; everything else renders the brand
 * crest instead of a mismatched dish. Replace a `null` with a real photo once
 * the restaurant supplies one — do not substitute an unrelated image.
 */
export type CategoryImage = StaticImageData | string;

export const categoryImages: Record<string, CategoryImage | null> = {
  // card2 — family mixed grill meal (real restaurant photo)
  meals: "/card2.jpg",
  // card3 — fried chicken with fries (real restaurant photo)
  broast: "/card3.jpg",
  // burger-crop — burger
  kids: burger,
  // card1 — charcoal chicken with kofta (real restaurant photo)
  grills: "/card1.jpg",
  // card3 — fried chicken
  "fried-chicken": "/card3.jpg",
  // tray-chicken-crop — grilled chicken platter
  "chicken-sandwiches": trayChicken,
  // burger-crop — meat sandwich
  "meat-sandwiches": burger,
  // tray-kofta-crop — kofta / shawarma platter
  syrian: trayKofta,
  // no crepe photo available yet
  crepes: null,
  // pizza-prep — pizza being prepared
  pizza: pizzaPrep,
  // tray-mixed-crop — rice platter
  "rice-pasta": trayMixed,
  // no fattah photo available yet
  fattah: null,
  // no lenten (vegetarian) photo available yet
  lenten: null,
  // no sides photo available yet
  sides: null,
  // no sauces photo available yet
  sauces: null,
  // no drinks photo available yet
  drinks: null,
};

export function getCategoryImage(categoryId: string): CategoryImage | null {
  return categoryImages[categoryId] ?? null;
}
