// lib/mockData.ts
// Centralized mock data and type definitions for GrowTrack.
// Clean UTF-8 encoding.

export interface PantryItem {
  id: string;
  item_name: string;
  quantity: string;
  initial_quantity?: string;
  category: "grain" | "dairy" | "vegetable" | "spice" | "other" | string;
  expiry_date?: string;
  expiry_predicted?: boolean;
  added_at?: string;
}

export interface DetectedItem {
  id: string;
  item_name: string;
  quantity: string;
  category: string;
  expiry_date?: string;
  expiry_predicted?: boolean;
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
  in_pantry: boolean;
  category?: string; // optional category for pantry/cart handling
}

export interface Recipe {
  id: string;
  name: string;
  image_url: string;
  prep_time_minutes: number;
  servings: number;
  category?: string;
  ingredients: RecipeIngredient[];
  steps: string[];
}

export const mockPantryItems: PantryItem[] = [
  // ── Groceries ──────────────────────────────────────────
  {
    id: "p1",
    item_name: "Basmati Rice",
    quantity: "2 kg",
    category: "grain",
    expiry_date: "2026-12-01",
  },
  {
    id: "p2",
    item_name: "Whole Wheat Pasta",
    quantity: "500 g",
    category: "grain",
    expiry_date: "2027-03-15",
  },
  {
    id: "p3",
    item_name: "Whole Milk",
    quantity: "1 L",
    category: "dairy",
    expiry_date: "2026-07-20",
    expiry_predicted: true,
  },
  {
    id: "p4",
    item_name: "Aged Cheddar Cheese",
    quantity: "200 g",
    category: "dairy",
    expiry_date: "2026-08-10",
  },
  {
    id: "p5",
    item_name: "Turmeric Powder",
    quantity: "100 g",
    category: "spice",
    expiry_date: "2027-06-15",
  },
  {
    id: "p6",
    item_name: "Black Peppercorns",
    quantity: "80 g",
    category: "spice",
    expiry_date: "2028-01-01",
  },
  {
    id: "p7",
    item_name: "Extra Virgin Olive Oil",
    quantity: "500 ml",
    category: "other",
    expiry_date: "2027-01-01",
  },
  // ── Vegetables & Produce ───────────────────────────────
  {
    id: "p8",
    item_name: "Fresh Tomatoes",
    quantity: "500 g",
    category: "vegetable",
    expiry_date: "2026-07-18",
  },
  {
    id: "p9",
    item_name: "Garlic Bulbs",
    quantity: "6 pieces",
    category: "vegetable",
    expiry_date: "2026-08-01",
  },
  {
    id: "p10",
    item_name: "Red Onions",
    quantity: "1 kg",
    category: "vegetable",
    expiry_date: "2026-08-15",
  },
  {
    id: "p11",
    item_name: "Organic Baby Spinach",
    quantity: "250 g",
    category: "leafy",
    expiry_date: "2026-07-17",
    expiry_predicted: true,
  },
  {
    id: "p12",
    item_name: "Fresh Coriander",
    quantity: "1 bunch",
    category: "leafy",
    expiry_date: "2026-07-16",
    expiry_predicted: true,
  },
  // ── Medicines ──────────────────────────────────────────
  {
    id: "m1",
    item_name: "Paracetamol",
    quantity: "10 pieces",
    initial_quantity: "20 pieces",
    category: "pill",
    expiry_date: "2027-10-01",
  },
  {
    id: "m2",
    item_name: "Cough Syrup",
    quantity: "150 ml",
    initial_quantity: "200 ml",
    category: "syrup",
    expiry_date: "2026-11-20",
  },
  {
    id: "m3",
    item_name: "Band-Aids",
    quantity: "20 pieces",
    category: "firstaid",
    expiry_date: "2030-01-01",
  },
];

export const mockDetectedItems: DetectedItem[] = [
  {
    id: "d1",
    item_name: "Organic Spinach",
    quantity: "250 g",
    category: "vegetable",
    expiry_date: "2026-07-19",
    expiry_predicted: true,
  },
  {
    id: "d2",
    item_name: "Cheddar Cheese",
    quantity: "200 g",
    category: "dairy",
    expiry_date: "2026-08-10",
  },
  {
    id: "d3",
    item_name: "Sourdough Bread",
    quantity: "1 loaf",
    category: "grain",
    expiry_date: "2026-07-17",
    expiry_predicted: true,
  },
];

export const mockRecipes: Recipe[] = [
  {
    id: "r1",
    name: "Creamy Tomato & Garlic Pasta",
    image_url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    prep_time_minutes: 25,
    servings: 4,
    category: "main",
    ingredients: [
      { name: "Fresh Tomatoes", quantity: "400 g", in_pantry: true },
      { name: "Garlic Bulbs", quantity: "3 pieces", in_pantry: true },
      { name: "Olive Oil", quantity: "2 tbsp", in_pantry: true },
      { name: "Whole Milk", quantity: "100 ml", in_pantry: true },
    ],
    steps: [
      "Dice the fresh tomatoes and finely mince the garlic cloves.",
      "Sauté minced garlic in olive oil over medium flame until fragrant and golden.",
      "Add diced tomatoes and simmer gently on low flame for 12-15 minutes until a rich sauce forms.",
      "Stir in whole milk or cream, season to taste, and toss with your favorite freshly cooked pasta.",
    ],
  },
  {
    id: "r2",
    name: "Golden Turmeric & Fragrant Basmati Rice",
    image_url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    prep_time_minutes: 20,
    servings: 4,
    category: "side",
    ingredients: [
      { name: "Basmati Rice", quantity: "300 g", in_pantry: true },
      { name: "Turmeric Powder", quantity: "1 tsp", in_pantry: true },
      { name: "Olive Oil", quantity: "1 tbsp", in_pantry: true },
    ],
    steps: [
      "Rinse Basmati rice thoroughly under cold water until the water runs clear.",
      "Warm olive oil in a saucepan and toast turmeric powder on low flame for 30 seconds.",
      "Add rinsed rice and water (1:1.5 ratio), bring to a boil on high flame, then cover and simmer on low flame for 15 minutes.",
      "Fluff gently with a fork before serving warm.",
    ],
  },
  {
    id: "r3",
    name: "Rustic Tomato Garlic Soup",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    prep_time_minutes: 30,
    servings: 2,
    category: "soup",
    ingredients: [
      { name: "Fresh Tomatoes", quantity: "500 g", in_pantry: true },
      { name: "Garlic Bulbs", quantity: "4 pieces", in_pantry: true },
      { name: "Olive Oil", quantity: "2 tbsp", in_pantry: true },
    ],
    steps: [
      "Cook halved tomatoes and garlic cloves drizzled with olive oil in a heavy pan on medium flame for 20 minutes until softened and caramelized.",
      "Blend the cooked vegetables until silky smooth.",
      "Simmer the blended soup in a pot on low flame for 5 minutes, seasoning with salt and cracked black pepper.",
    ],
  },
];

export const chatbotResponses: Record<string, Record<string, string>> = {
  en: {
    recipe: "You can explore delicious recipes matching your pantry ingredients right on the Dashboard or Recipes page!",
    pantry: "Your pantry automatically tracks your items and highlights ingredients that are nearing their expiration date.",
    expire: "Keep an eye on items highlighted with expiry badges so you can cook them before they spoil!",
    hello: "Hello! I'm your GrowTrack kitchen assistant. Ask me anything about recipes, pantry items, or reducing food waste!",
    default: "I'm your GrowTrack AI assistant! You can ask me about recipe ideas, pantry management, or tips to reduce food waste.",
  },
  es: {
    recipe: "¡Puedes explorar deliciosas recetas con los ingredientes de tu despensa directamente en el Panel o en la página de Recetas!",
    pantry: "Tu despensa rastrea automáticamente tus ingredientes y resalta los productos que están próximos a caducar.",
    expire: "¡Presta atención a los productos con etiqueta de caducidad para cocinarlos a tiempo!",
    hello: "¡Hola! Soy tu asistente de cocina GrowTrack. ¡Pregúntame sobre recetas o cómo aprovechar tu despensa!",
    default: "¡Soy tu asistente GrowTrack! Puedes preguntarme sobre recetas, tu despensa o consejos para no desperdiciar alimentos.",
  },
  hi: {
    recipe: "आप अपने पैंट्री के सामान के अनुसार स्वादिष्ट रेसिपी डैशबोर्ड या रेसिपी पेज पर देख सकते हैं!",
    pantry: "आपकी पैंट्री आपके सामान को ट्रैक करती है और जल्द समाप्त होने वाली चीजों को हाईलाइट करती है।",
    expire: "एक्सपायरी बैज वाले सामान पर ध्यान दें ताकि खराब होने से पहले आप उनका उपयोग कर सकें!",
    hello: "नमस्ते! मैं आपका GrowTrack किचन सहायक हूँ। रेसिपी या पैंट्री से संबंधित कुछ भी पूछें!",
    default: "मैं आपका GrowTrack सहायक हूँ! आप मुझसे रेसिपी, पैंट्री प्रबंधन या भोजन की बर्बादी रोकने के उपाय पूछ सकते हैं।",
  },
};