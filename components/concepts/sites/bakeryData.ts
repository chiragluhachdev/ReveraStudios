import { unsplash } from "@/lib/concepts";

// Menu and café content for the Crumb & Co. concept (fictional bakehouse).
// One source feeds the website menu, the printed menu, the chalkboard and
// the order page, so prices and dietary tags always match.

export const dietary = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-free",
  N: "Contains nuts",
} as const;
export type Diet = keyof typeof dietary;

export const categories = ["Viennoiserie", "Breads", "Cakes & Tarts", "Coffee", "Brunch"] as const;
export type Category = (typeof categories)[number];

export type MenuItem = {
  id: string;
  name: string;
  note: string;
  price: number;
  category: Category;
  diet: Diet[];
  image?: string;
  signature?: boolean;
};

export const menu: MenuItem[] = [
  { id: "croissant", name: "Butter Croissant", note: "72 layers, French butter, three-day lamination", price: 180, category: "Viennoiserie", diet: ["V"], image: unsplash("1555507036-ab1f4038808a", 700), signature: true },
  { id: "pain-choc", name: "Pain au Chocolat", note: "Two batons of 70% dark chocolate", price: 220, category: "Viennoiserie", diet: ["V"], image: unsplash("1483695028939-5bb13f8648b0", 700) },
  { id: "almond", name: "Almond Croissant", note: "Twice-baked, frangipane, flaked almonds", price: 260, category: "Viennoiserie", diet: ["V", "N"] },
  { id: "cardamom-bun", name: "Cardamom Knot", note: "Our Bombay twist on the Swedish bun", price: 200, category: "Viennoiserie", diet: ["V"], image: unsplash("1534432182912-63863115e106", 700), signature: true },
  { id: "kouign", name: "Kouign-amann", note: "Caramelised, crackly, unapologetic", price: 240, category: "Viennoiserie", diet: ["V"] },
  { id: "sourdough", name: "Country Sourdough", note: "36-hour ferment, Sundays only", price: 420, category: "Breads", diet: ["VG"], image: unsplash("1549931319-a545dcf3bc73", 700), signature: true },
  { id: "rye", name: "Seeded Rye", note: "Sunflower, flax and a little molasses", price: 380, category: "Breads", diet: ["VG"], image: unsplash("1509440159596-0249088772ff", 700) },
  { id: "baguette", name: "Baguette Tradition", note: "Shattering crust, open crumb", price: 160, category: "Breads", diet: ["VG"], image: unsplash("1608198093002-ad4e005484ec", 700) },
  { id: "brioche", name: "Brioche Loaf", note: "Golden, buttery, ideal for French toast", price: 340, category: "Breads", diet: ["V"] },
  { id: "torte", name: "Chocolate Hazelnut Torte", note: "Flourless, dense, dangerously rich", price: 290, category: "Cakes & Tarts", diet: ["V", "GF", "N"], image: unsplash("1571115177098-24ec42ed204d", 700) },
  { id: "raspberry", name: "Raspberry Sponge", note: "Vanilla chiffon, fresh raspberries", price: 260, category: "Cakes & Tarts", diet: ["V"], image: unsplash("1505935428862-770b6f24f629", 700) },
  { id: "orange-tart", name: "Orange Cardamom Tart", note: "Glazed orange curd, cardamom shortcrust", price: 240, category: "Cakes & Tarts", diet: ["V"], image: unsplash("1565958011703-44f9829ba187", 700), signature: true },
  { id: "cookie", name: "Brown Butter Cookie", note: "Sea salt, dark chocolate chunks", price: 150, category: "Cakes & Tarts", diet: ["V"], image: unsplash("1558961363-fa8fdf82db35", 700) },
  { id: "espresso", name: "Espresso", note: "House blend, Chikmagalur beans", price: 140, category: "Coffee", diet: ["VG"] },
  { id: "flat-white", name: "Flat White", note: "Double ristretto, silky milk", price: 210, category: "Coffee", diet: ["V"], image: unsplash("1509042239860-f550ce710b93", 700) },
  { id: "jaggery-latte", name: "Iced Jaggery Latte", note: "Our signature — smoky, not too sweet", price: 240, category: "Coffee", diet: ["V"], signature: true },
  { id: "chai", name: "Masala Chai", note: "Brewed in-house, every two hours", price: 150, category: "Coffee", diet: ["V"] },
  { id: "toast", name: "Sourdough & Cultured Butter", note: "Two thick slices, flaky salt", price: 260, category: "Brunch", diet: ["V"] },
  { id: "sandwich", name: "Croissant Breakfast Sandwich", note: "Soft egg, aged cheddar, chilli jam", price: 380, category: "Brunch", diet: ["V"] },
  { id: "shakshuka", name: "Shakshuka & Sourdough", note: "Spiced tomato, baked eggs, herbs", price: 420, category: "Brunch", diet: ["V"] },
  { id: "granola", name: "Granola Bowl", note: "Toasted oats, curd, seasonal fruit", price: 320, category: "Brunch", diet: ["V", "N"] },
];

export const byId = (id: string) => menu.find((m) => m.id === id)!;

/** Items you can pre-order for pickup (all have photos). */
export const orderable = ["croissant", "pain-choc", "cardamom-bun", "sourdough", "orange-tart", "cookie", "raspberry", "flat-white"].map(byId);

/** Chalkboard specials by day of week (0 = Sunday). */
export const specials: { day: string; items: { name: string; price: number }[]; note: string }[] = [
  { day: "Sun", items: [{ name: "Sourdough Sunday loaf", price: 420 }, { name: "Cinnamon morning bun", price: 210 }, { name: "Cold brew tonic", price: 230 }], note: "Pre-order your loaf — they go by 10!" },
  { day: "Mon", items: [{ name: "Banana bread, brown butter", price: 190 }, { name: "Cheese & chive scone", price: 170 }, { name: "Honey cortado", price: 200 }], note: "Slow Monday? Same." },
  { day: "Tue", items: [{ name: "Pistachio croissant", price: 280 }, { name: "Lemon drizzle slice", price: 210 }, { name: "Rose cold brew", price: 240 }], note: "Pistachio day. You're welcome." },
  { day: "Wed", items: [{ name: "Spinach & feta danish", price: 240 }, { name: "Coffee walnut cake", price: 230 }, { name: "Masala chai float", price: 220 }], note: "Halfway there ☕" },
  { day: "Thu", items: [{ name: "Chocolate babka", price: 260 }, { name: "Mango cream puff", price: 220 }, { name: "Iced filter coffee", price: 190 }], note: "Babka drops at 9am sharp." },
  { day: "Fri", items: [{ name: "Croissant bread pudding", price: 250 }, { name: "Gulab jamun cruffin", price: 240 }, { name: "Espresso tonic", price: 230 }], note: "Treat-yourself Friday." },
  { day: "Sat", items: [{ name: "Almond croissant (double!)", price: 280 }, { name: "Strawberry tart", price: 260 }, { name: "Jaggery latte", price: 240 }], note: "Queue moves fast, promise." },
];

export const pickupSlots = ["Today · 8:00", "Today · 8:30", "Today · 9:00", "Today · 9:30", "Tomorrow · 7:30", "Tomorrow · 8:00"];

export const hours = [
  { day: "Monday", time: "7:00 – 19:00" },
  { day: "Tuesday", time: "7:00 – 19:00" },
  { day: "Wednesday", time: "7:00 – 19:00" },
  { day: "Thursday", time: "7:00 – 19:00" },
  { day: "Friday", time: "7:00 – 21:00" },
  { day: "Saturday", time: "7:00 – 21:00" },
  { day: "Sunday", time: "7:30 – 17:00" },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
