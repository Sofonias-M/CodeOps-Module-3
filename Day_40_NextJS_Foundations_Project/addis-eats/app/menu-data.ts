export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Sharing platters" | "Vegetarian" | "House favourites";
  image: string;
  tag?: string;
  serves?: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "addis-sharing-platter",
    name: "Addis sharing platter",
    description:
      "A generous spread of doro wot, misir wot, gomen, fresh salad and warm injera.",
    price: 1499,
    category: "Sharing platters",
    image:
      "/A generous spread of doro wot, misir wot, gomen, fresh salad and warm injera.jpg",
    tag: "Guest favourite",
    serves: "Serves 2",
  },
  {
    id: "vegetarian-beyaynetu",
    name: "Vegetarian beyaynetu",
    description:
      "A colourful selection of slow-cooked lentils, greens and seasonal vegetables.",
    price: 699,
    category: "Vegetarian",
    image:
      "/Beyaynetu.jfif",
    tag: "Plant based",
    serves: "Serves 1–2",
  },
  {
    id: "doro-wot",
    name: "Doro wot",
    description:
      "Chicken simmered low and slow in berbere, with egg and a little extra warmth.",
    price: 1200,
    category: "House favourites",
    image:
      "/Doro-Wat-500x500.jpg",
    tag: "A classic",
    serves: "Serves 1",
  },
  {
    id: "misir-wot",
    name: "Misir wot",
    description:
      "Red lentils gently cooked with berbere, garlic and our house spice blend.",
    price: 749,
    category: "Vegetarian",
    image:
      "/Misr-Wot.jfif",
    serves: "Serves 1",
  },
  {
    id: "tibs",
    name: "Siga tibs",
    description:
      "Tender beef sautéed with rosemary, onions, green chilli and clarified butter.",
    price: 1299,
    category: "House favourites",
    image:
      "/Siga-Tibs.jfif",
    tag: "Made to order",
    serves: "Serves 1",
  },
  {
    id: "sambusa",
    name: "Lentil sambusa",
    description:
      "Crisp golden pastry filled with seasoned lentils. A lovely start to any meal.",
    price: 299,
    category: "Sharing platters",
    image:
      "/Lentil-sambusa.avif",
    serves: "Three pieces",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(price);
