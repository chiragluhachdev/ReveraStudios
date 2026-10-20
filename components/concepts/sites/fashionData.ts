import { unsplash } from "@/lib/concepts";

// Collection and campaign content for the Formé Studio concept (fictional
// fashion label). Shared by the storefront and the Lookbook section.

export const fashionCategories = ["Outerwear", "Knitwear", "Tailoring", "Essentials", "Accessories"] as const;
export type FashionCategory = (typeof fashionCategories)[number];

export const sizes = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof sizes)[number];

export type Product = {
  id: string;
  name: string;
  category: FashionCategory;
  price: number;
  image: string;
  alt: string;
  colours: { name: string; hex: string }[];
  /** Sizes currently sold out (shown struck through, not hidden). */
  soldOut: Size[];
  fabric: string;
  fit: string;
  isNew?: boolean;
};

const u = (id: string) => unsplash(id, 900);

export const products: Product[] = [
  { id: "overcoat", name: "Wool Overcoat", category: "Outerwear", price: 18900, image: u("1539109136881-3be0616acf4b"), alt: u("1485968579580-b6d095142e6e"), colours: [{ name: "Sky", hex: "#9DB4CF" }, { name: "Camel", hex: "#B58B5C" }, { name: "Noir", hex: "#1B1A19" }], soldOut: ["XS"], fabric: "80% Italian wool, 20% cashmere", fit: "Relaxed. Size down for a closer fit.", isNew: true },
  { id: "bomber", name: "Atelier Bomber", category: "Outerwear", price: 12400, image: u("1591047139829-d91aecb6caea"), alt: u("1488161628813-04466f872be2"), colours: [{ name: "Tan", hex: "#B97E58" }, { name: "Olive", hex: "#5F6247" }], soldOut: [], fabric: "Washed cotton twill, cupro lining", fit: "Boxy, cropped at the hip." },
  { id: "sweater", name: "Merino Crew", category: "Knitwear", price: 7900, image: u("1475180098004-ca77a66827be"), alt: u("1558769132-cb1aea458c5e"), colours: [{ name: "Oat", hex: "#D9C9B0" }, { name: "Rust", hex: "#A65A32" }, { name: "Charcoal", hex: "#3B3A38" }], soldOut: ["M"], fabric: "100% extra-fine merino", fit: "True to size, slightly oversized.", isNew: true },
  { id: "poncho", name: "Fisherman Knit Wrap", category: "Knitwear", price: 8600, image: u("1434389677669-e08b4cac3105"), alt: u("1558769132-cb1aea458c5e"), colours: [{ name: "Ecru", hex: "#EFE6D6" }], soldOut: [], fabric: "Hand-finished cotton cable knit", fit: "One size, drapes to the hip." },
  { id: "trouser", name: "Pleated Wide-leg Trouser", category: "Tailoring", price: 9200, image: u("1594633312681-425c7b97ccd1"), alt: u("1544441893-675973e31985"), colours: [{ name: "Blush", hex: "#D7B7A6" }, { name: "Camel", hex: "#B58B5C" }, { name: "Noir", hex: "#1B1A19" }], soldOut: ["XL"], fabric: "Wool-blend suiting", fit: "High rise, full leg, ankle length.", isNew: true },
  { id: "blazer", name: "Tailored Blazer", category: "Tailoring", price: 15600, image: u("1617137968427-85924c800a22"), alt: u("1485968579580-b6d095142e6e"), colours: [{ name: "Navy", hex: "#22304A" }, { name: "Check", hex: "#4A5A4A" }], soldOut: [], fabric: "Super 110s wool, half-canvas", fit: "Slim through the shoulder, soft waist." },
  { id: "dress", name: "The Plum Dress", category: "Tailoring", price: 13800, image: u("1566174053879-31528523f8ae"), alt: u("1581044777550-4cfa60707c03"), colours: [{ name: "Plum", hex: "#5A1E3C" }, { name: "Noir", hex: "#1B1A19" }], soldOut: ["S"], fabric: "Bias-cut satin, made in a run of 120", fit: "Fitted at the bodice, fluid skirt." },
  { id: "tee", name: "Essential Tee", category: "Essentials", price: 2900, image: u("1523381210434-271e8be1f52b"), alt: u("1562157873-818bc0726f68"), colours: [{ name: "Sage", hex: "#8FA195" }, { name: "Bone", hex: "#EDE7DD" }, { name: "Noir", hex: "#1B1A19" }], soldOut: [], fabric: "260gsm organic cotton", fit: "Classic, slightly boxy." },
  { id: "scarf", name: "Check Wool Scarf", category: "Accessories", price: 4800, image: u("1490114538077-0a7f8cb49891"), alt: u("1525507119028-ed4c629a60a3"), colours: [{ name: "Heritage check", hex: "#8B5A3C" }], soldOut: [], fabric: "Lambswool, fringed", fit: "180 × 35 cm." },
];

export const productById = (id: string) => products.find((p) => p.id === id)!;

/** AW26 "Quiet Hours" lookbook. Hotspot x/y are % of the frame. */
export const looks: { image: string; title: string; spots: { productId: string; x: number; y: number }[] }[] = [
  { image: unsplash("1539109136881-3be0616acf4b", 1400), title: "Look 01 — Milan, 7am", spots: [{ productId: "overcoat", x: 50, y: 46 }, { productId: "scarf", x: 56, y: 30 }] },
  { image: unsplash("1475180098004-ca77a66827be", 1400), title: "Look 02 — Shoreline", spots: [{ productId: "sweater", x: 46, y: 40 }] },
  { image: unsplash("1488161628813-04466f872be2", 1400), title: "Look 03 — Round window", spots: [{ productId: "bomber", x: 47, y: 50 }, { productId: "trouser", x: 52, y: 72 }] },
  { image: unsplash("1566174053879-31528523f8ae", 1400), title: "Look 04 — After hours", spots: [{ productId: "dress", x: 52, y: 62 }] },
  { image: unsplash("1485968579580-b6d095142e6e", 1400), title: "Look 05 — Street, late", spots: [{ productId: "blazer", x: 45, y: 50 }] },
];

export const FREE_SHIPPING = 4999;
export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
