import type { CSSProperties } from "react";
import { unsplash } from "@/lib/concepts";

// Content for the Oriel Atelier concept (fictional interior studio).

export const rooms = ["Living", "Bedroom", "Dining", "Kitchen", "Workspace"] as const;
export type Room = (typeof rooms)[number];

export const styles = ["Warm Minimal", "Japandi", "Tropical Modern", "Modern Heritage"] as const;
export type StyleName = (typeof styles)[number];

export type InteriorProject = {
  name: string;
  room: Room;
  style: StyleName;
  locality: string;
  area: string;
  weeks: number;
  image: string;
  /** Material palette shown in the project panel. */
  swatches: string[];
};

export const interiorProjects: InteriorProject[] = [
  { name: "Banyan House", room: "Living", style: "Warm Minimal", locality: "Indiranagar", area: "3,200 sq ft", weeks: 14, image: unsplash("1616486338812-3dadae4b4ace", 1000), swatches: ["#EFE7DC", "#C9B79C", "#8B7660", "#2E2A25"] },
  { name: "Ochre Flat", room: "Living", style: "Tropical Modern", locality: "Koramangala", area: "1,450 sq ft", weeks: 10, image: unsplash("1618220179428-22790b461013", 1000), swatches: ["#E7DCC8", "#C47A3D", "#4F6B4A", "#2A2620"] },
  { name: "Casa Tera", room: "Bedroom", style: "Japandi", locality: "Whitefield", area: "2,100 sq ft", weeks: 12, image: unsplash("1615874959474-d609969a20ed", 1000), swatches: ["#E9E4DA", "#B9A78C", "#5C5A4E", "#1F1E1B"] },
  { name: "The Fern Study", room: "Workspace", style: "Modern Heritage", locality: "Jayanagar", area: "640 sq ft", weeks: 6, image: unsplash("1600494603989-9650cf6ddd3d", 1000), swatches: ["#EDE6DB", "#4D5C45", "#8E3B2F", "#1C1A18"] },
  { name: "Linen & Oak", room: "Dining", style: "Warm Minimal", locality: "HSR Layout", area: "1,800 sq ft", weeks: 9, image: unsplash("1617806118233-18e1de247200", 1000), swatches: ["#F2EDE6", "#2F5D4A", "#C9A97A", "#24221F"] },
  { name: "Quiet Suite", room: "Bedroom", style: "Modern Heritage", locality: "Sadashivanagar", area: "2,600 sq ft", weeks: 11, image: unsplash("1505693416388-ac5ce068fe85", 1000), swatches: ["#EDE6DB", "#D9CBB8", "#6B5B4E", "#1C1A18"] },
  { name: "Hearth Kitchen", room: "Kitchen", style: "Warm Minimal", locality: "Frazer Town", area: "420 sq ft", weeks: 8, image: unsplash("1600210492486-724fe5c67fb0", 1000), swatches: ["#F4F1EC", "#B8A68E", "#5E5245", "#1F1D1A"] },
  { name: "Studio Nine", room: "Workspace", style: "Japandi", locality: "Domlur", area: "1,100 sq ft", weeks: 7, image: unsplash("1524758631624-e2822e304c36", 1000), swatches: ["#ECE8E1", "#A9B8B0", "#3F4A44", "#1E1E1C"] },
  { name: "Sage Hall", room: "Living", style: "Japandi", locality: "Malleshwaram", area: "2,400 sq ft", weeks: 12, image: unsplash("1616046229478-9901c5536a45", 1000), swatches: ["#E8E6DD", "#9AA58F", "#B48A5A", "#22211E"] },
];

export const styleBoards: Record<
  StyleName,
  { line: string; images: string[]; palette: string[]; materials: string[] }
> = {
  "Warm Minimal": {
    line: "Soft neutrals, honest wood and nothing you don't use. Calm that still feels lived-in.",
    images: [unsplash("1616486338812-3dadae4b4ace", 700), unsplash("1631679706909-1844bbd07221", 700), unsplash("1586023492125-27b2c045efd7", 700)],
    palette: ["#EFE7DC", "#C9B79C", "#8B7660", "#2E2A25"],
    materials: ["Limewash", "White oak", "Linen", "Travertine"],
  },
  Japandi: {
    line: "Japanese restraint meets Scandinavian warmth — low lines, natural fibres, deliberate empty space.",
    images: [unsplash("1631679706909-1844bbd07221", 700), unsplash("1616046229478-9901c5536a45", 700), unsplash("1618219908412-a29a1bb7b86e", 700)],
    palette: ["#E9E4DA", "#B9A78C", "#5C5A4E", "#1F1E1B"],
    materials: ["Ash wood", "Rattan", "Washi paper", "Clay"],
  },
  "Tropical Modern": {
    line: "Sun, cane and terracotta. Big plants, bold accents and rooms that open to the outside.",
    images: [unsplash("1618220179428-22790b461013", 700), unsplash("1583847268964-b28dc8f51f92", 700), unsplash("1615529182904-14819c35db37", 700)],
    palette: ["#E7DCC8", "#C47A3D", "#4F6B4A", "#2A2620"],
    materials: ["Cane", "Terrazzo", "Teak", "Brass"],
  },
  "Modern Heritage": {
    line: "Deep greens, oxblood and walnut. Antiques mixed with clean modern pieces, layered over time.",
    images: [unsplash("1505693416388-ac5ce068fe85", 700), unsplash("1600494603989-9650cf6ddd3d", 700), unsplash("1540518614846-7eded433c457", 700)],
    palette: ["#EDE6DB", "#8E3B2F", "#33422F", "#1C1A18"],
    materials: ["Walnut", "Velvet", "Marble", "Aged brass"],
  },
};

/** CSS-only material textures (no image files needed). */
export const materialTextures: Record<string, CSSProperties> = {
  Limewash: { background: "radial-gradient(circle at 30% 30%, #f5f1ea, #e2d9cc 70%)" },
  "White oak": { background: "repeating-linear-gradient(100deg, #d9c3a2 0 6px, #cdb592 6px 9px, #dcc7a8 9px 16px)" },
  Linen: { background: "repeating-linear-gradient(0deg, #e9e2d6 0 2px, #e1d8ca 2px 4px), #e6ded1", backgroundBlendMode: "multiply" },
  Travertine: { background: "linear-gradient(170deg, #e7dbc8 0%, #d8c8af 40%, #e9dfcf 41%, #d3c2a7 100%)" },
  "Ash wood": { background: "repeating-linear-gradient(95deg, #e2d4bd 0 5px, #d6c6ab 5px 7px)" },
  Rattan: { background: "repeating-linear-gradient(45deg, #c9a46c 0 4px, #b48d55 4px 8px), #c9a46c" },
  "Washi paper": { background: "radial-gradient(circle at 70% 20%, #f7f3ec, #ebe4d8)" },
  Clay: { background: "radial-gradient(circle at 40% 40%, #c89b80, #a9775c)" },
  Cane: { background: "repeating-linear-gradient(45deg, #d6b47c 0 3px, transparent 3px 9px), repeating-linear-gradient(-45deg, #c39d62 0 3px, #e3c896 3px 9px)" },
  Terrazzo: { background: "radial-gradient(circle at 20% 30%, #c47a3d 0 4px, transparent 5px), radial-gradient(circle at 70% 60%, #4f6b4a 0 3px, transparent 4px), radial-gradient(circle at 45% 80%, #2a2620 0 2px, transparent 3px), #eee5d6" },
  Teak: { background: "repeating-linear-gradient(98deg, #9a6a3f 0 7px, #8a5c34 7px 10px, #a4744a 10px 16px)" },
  Brass: { background: "linear-gradient(135deg, #e2c27b, #b98d3c 50%, #e9cf8f)" },
  Walnut: { background: "repeating-linear-gradient(97deg, #5d4030 0 6px, #4f3527 6px 9px, #654636 9px 15px)" },
  Velvet: { background: "radial-gradient(circle at 30% 30%, #4a5a3e, #2c3824)" },
  Marble: { background: "linear-gradient(125deg, #f1ede7 0%, #f1ede7 45%, #cfc8be 46%, #f1ede7 48%, #e6e0d7 100%)" },
  "Aged brass": { background: "linear-gradient(135deg, #b39554, #7d6431 55%, #a78a4a)" },
};
