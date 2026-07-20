// GrowTrack translations — all UI strings in 3 languages.
// Keys are camelCase identifiers used throughout the app via useLanguage().
// To add a new string: add it to all three language objects below.

export type Lang = "en" | "hi" | "te";

export interface Translations {
  // ── Navigation ─────────────────────────────────────────────────────────
  navHome: string;
  navFeatures: string;
  navHowItWorks: string;
  navReviews: string;
  navPantry: string;
  navScan: string;
  navRecipes: string;
  navChat: string;
  navSettings: string;
  navLogout: string;
  navSignIn: string;
  navSignUp: string;

  // ── Landing Page — Hero ────────────────────────────────────────────────
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroGetStarted: string;
  heroHowItWorks: string;

  // ── Landing Page — Features ────────────────────────────────────────────
  featuresTitle: string;
  featuresSubtitle: string;
  featureScanTitle: string;
  featureScanDesc: string;
  featureRecipesTitle: string;
  featureRecipesDesc: string;
  featureChatTitle: string;
  featureChatDesc: string;

  // ── Landing Page — How It Works ────────────────────────────────────────
  howTitle: string;
  howSubtitle: string;
  howStep1Title: string;
  howStep1Desc: string;
  howStep2Title: string;
  howStep2Desc: string;
  howStep3Title: string;
  howStep3Desc: string;
  howCta: string;

  // ── Landing Page — Testimonials ────────────────────────────────────────
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  testimonial1: string;
  testimonial2: string;
  testimonial3: string;

  // ── Landing Page — CTA ─────────────────────────────────────────────────
  ctaTitle: string;
  ctaSubtitle: string;
  ctaBeta: string;

  // ── Landing Page — Footer ──────────────────────────────────────────────
  footerPrivacy: string;
  footerTerms: string;
  footerContact: string;

  // ── Login Page ─────────────────────────────────────────────────────────
  loginTitle: string;
  loginSubtitle: string;
  loginEmailLabel: string;
  loginEmailPlaceholder: string;
  loginPasswordLabel: string;
  loginPasswordPlaceholder: string;
  loginButton: string;
  loginNoAccount: string;
  loginDemoNote: string;

  // ── Signup Page ────────────────────────────────────────────────────────
  signupTitle: string;
  signupSubtitle: string;
  signupNameLabel: string;
  signupNamePlaceholder: string;
  signupEmailLabel: string;
  signupEmailPlaceholder: string;
  signupPasswordLabel: string;
  signupPasswordPlaceholder: string;
  signupButton: string;
  signupHasAccount: string;

  phoneLabel: string;
  phonePlaceholder: string;
  verifyTitle: string;
  verifySubtitle: string;
  verifyCodeLabel: string;
  verifyButton: string;
  verifyResend: string;

  // ── Dashboard / Pantry ─────────────────────────────────────────────────
  dashTitle: string;
  dashSubtitleEmpty: string;
  dashSubtitleLoading: string;
  dashSubtitleCount: (n: number) => string;
  dashSearch: string;
  dashFilterAll: string;
  dashScanCta: string;
  dashScanCtaSub: string;
  dashRecipesCta: string;
  dashEmptyTitle: string;
  dashEmptyDesc: string;
  dashEmptyAction: string;
  dashNoResults: (q: string) => string;
  dashNoResultsDesc: string;
  dashClearFilters: string;
  dashCookNow: string;
  dashAllRecipes: string;

  // ── Expiring Soon / Running Out (Dashboard) ─────────────────────────────
  dashUrgentTitle: string;
  dashUrgentSub: string;
  dashUrgentExpiring: (days: number) => string;
  dashUrgentRunningOut: string;

  // ── Auth Google Sign In ────────────────────────────────────────────────
  authContinueWithGoogle: string;
  authOrDivider: string;

  // ── Category labels (used in filter chips + item cards) ────────────────
  catGrain: string;
  catDairy: string;
  catVegetable: string;
  catSpice: string;
  catOther: string;
  catBakery: string;
  catFruit: string;
  catMeat: string;
  catGroceries: string;
  catVegetablesProduce: string;
  catGrainsBakery: string;
  catDairyRefrigerated: string;
  catSpicesSeasonings: string;
  catOilsPantry: string;
  catFreshVegetables: string;
  catLeafyHerbs: string;
  catMedicines: string;
  catPills: string;
  catSyrups: string;
  catFirstAid: string;

  // ── Reminders & Alerts Section ─────────────────────────────────────────
  dashRemindersTitle: string;
  dashRemindersSub: string;
  dashAlertExpired: (item: string) => string;
  dashAlertExpiringSoon: (item: string, days: number) => string;
  dashAlertLowStock: (item: string, qty: string) => string;
  dashAlertInstant: (msg: string) => string;
  dashDismissAlert: string;
  alertFilterAll: (n: number) => string;
  alertFilterExpiry: string;
  alertFilterLowStock: string;
  alertBadgeUrgent: string;
  alertBadgeExpiringSoon: string;
  alertBadgeRunningLow: string;
  alertBadgeNewUpdate: string;
  alertInstantTitle: string;
  alertInstantBody: string;
  recipeReadyToCook: string; // added for status text
  recipeMissingItems: (n: number) => string;
  recipeIngredientsInCart: (have: number, total: number) => string;
  recipeMin: string;

  // ── Pantry item name translations ──────────────────────────────────────
  // Keys are the English item_name stored in DB; values are translated display name.
  // Falls back to the original English name if key not found.
  pantryItemNames: Record<string, string>;


  // ── Scan ───────────────────────────────────────────────────────────────
  scanTitle: string;
  scanStepUpload: string;
  scanStepScanning: string;
  scanStepReview: string;
  scanPickPhotoDesc: string;
  scanScanPhotoBtn: string;
  scanPickFirstBtn: string;
  scanScanningMsg: string;
  scanReviewTitle: string;
  scanReviewDesc: string;
  scanAllRemovedMsg: string;
  scanTryAnotherPhoto: string;
  scanConfirmBtn: (n: number) => string;
  scanItemNamePlaceholder: string;
  scanItemNameAriaLabel: string;
  scanQuantityPlaceholder: string;
  scanQuantityAriaLabel: string;
  scanExpiryAriaLabel: string;
  scanRemoveAriaLabel: (name: string) => string;
  scanBackBtn: string;
  scanExpiryAIPredicted: string;
  scanModeGrocery: string;
  scanModeMeal: string;
  scanModeMedicine: string;
  scanMealTitle: string;
  scanMedicineTitle: string;
  scanMealDesc: string;
  scanMedicineDesc: string;
  scanMealScanningMsg: string;
  scanMealReviewTitle: string;
  scanMealReviewDesc: string;
  scanMealConfirmBtn: string;
  scanMealConsuming: string;
  scanNutrientsCalories: string;
  scanNutrientsProtein: string;
  scanNutrientsCarbs: string;
  scanNutrientsFat: string;

  // ── Recipes ────────────────────────────────────────────────────────────
  recipesTitle: string;
  recipesSubtitle: string;
  recipesSearchPlaceholder: string;
  recipesLoading: string;
  recipesEmptyTitle: string;
  recipesEmptyDesc: string;
  recipesLegendReady: string;
  recipesLegendMissing: string;
  recipesReady: string;
  recipesCatAll: string;
  recipesCatMain: string;
  recipesCatSide: string;
  recipesCatSoup: string;
  recipesCatDessert: string;
  recipeDetailBack: string;
  // duplicate removed - keep only one definition
  recipeMissing: (n: number) => string;
  recipeIngredients: string;
  recipeInPantry: (n: number, total: number) => string;
  recipeInPantryLabel: string;
  recipeMissingLabel: string;
  recipeHowToMake: string;
  recipeStillNeed: (n: number) => string;
  recipeServings: string;

  // ── Chatbot ────────────────────────────────────────────────────────────
  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  chatSend: string;
  chatWelcome: string;
  chatTyping: string;

  // ── Language ───────────────────────────────────────────────────────────
  langLabel: string;

  // ── Misc ───────────────────────────────────────────────────────────────
  back: string;
  loading: string;
  errorNotFound: string;
  errorNotFoundDesc: string;
  goBack: string;
}

// ─── English (Simple version for rural users) ────────────────────────────────

const en: Translations = {
  navHome: "Home",
  navFeatures: "Features",
  navHowItWorks: "How It Works",
  navReviews: "Reviews",
  navPantry: "My Cart",
  navScan: "Scan Items",
  navRecipes: "Recipes",
  navChat: "Help Chat",
  navSettings: "Settings",
  navLogout: "Logout",
  navSignIn: "Login",
  navSignUp: "Sign Up",

  // ── Landing — Hero
  heroBadge: "Smart Kitchen Helper",
  heroTitle: "Smart Kitchen Cart",
  heroSubtitle: "Scan your groceries, track your cart, and get recipes — all in one app.",
  heroGetStarted: "Get Started Free",
  heroHowItWorks: "How It Works",

  // ── Landing — Features
  featuresTitle: "Features",
  featuresSubtitle: "Everything you need in one app",
  featureScanTitle: "Scan Items",
  featureScanDesc: "Take a photo of your groceries. AI adds everything to your cart.",
  featureRecipesTitle: "Get Recipes",
  featureRecipesDesc: "Get recipes based on what's in your cart. Cook with what you have.",
  featureChatTitle: "Kitchen Help",
  featureChatDesc: "Ask about food storage, cooking tips, or recipe ideas. Get instant help.",

  // ── Landing — How It Works
  howTitle: "How It Works",
  howSubtitle: "Three simple steps to a smarter kitchen",
  howStep1Title: "📸 Scan",
  howStep1Desc: "Take a photo of your groceries. AI detects and adds everything.",
  howStep2Title: "🍽️ Discover",
  howStep2Desc: "Get recipe ideas based on what you have. Never wonder what to cook.",
  howStep3Title: "💚 Cook & Save",
  howStep3Desc: "Cook meals, track your cart, and stop wasting food.",
  howCta: "Start Free Trial",

  // ── Landing — Testimonials
  testimonialsTitle: "What People Say",
  testimonialsSubtitle: "Real stories from our users",
  testimonial1: "\"I used to waste so much food. Now I scan my groceries and get recipes. I save money every month!\"",
  testimonial2: "\"The scan feature is amazing. Just take a photo and everything is added. The recipe suggestions are always good!\"",
  testimonial3: "\"I don't have time to plan meals. growtracker does it for me. It's like having a kitchen helper.\"",

  // ── Landing — CTA
  ctaTitle: "Ready to Start?",
  ctaSubtitle: "Join thousands of families who are saving money and reducing food waste.",
  ctaBeta: "✨ Free forever during beta",

  // ── Landing — Footer
  footerPrivacy: "Privacy",
  footerTerms: "Terms",
  footerContact: "Contact",

  // ── Login
  loginTitle: "Welcome Back",
  loginSubtitle: "Sign in to your account",
  loginEmailLabel: "Email or Phone Number",
  loginEmailPlaceholder: "you@example.com or +91...",
  loginPasswordLabel: "Password",
  loginPasswordPlaceholder: "Enter your password",
  loginButton: "Login",
  loginNoAccount: "Don't have an account?",
  loginDemoNote: "Demo mode — instant access",

  // ── Signup
  signupTitle: "growtracker",
  signupSubtitle: "Create your account",
  signupNameLabel: "Your Name",
  signupNamePlaceholder: "Enter your name",
  signupEmailLabel: "Email or Phone Number",
  signupEmailPlaceholder: "you@example.com or +91...",
  signupPasswordLabel: "Password",
  signupPasswordPlaceholder: "Create a password",
  signupButton: "Create Account",
  signupHasAccount: "Already have an account?",

  phoneLabel: "Phone Number",
  phonePlaceholder: "+91 98765 43210",
  verifyTitle: "Verify Account",
  verifySubtitle: "We sent a 6-digit verification code to your phone / email.",
  verifyCodeLabel: "Verification Code",
  verifyButton: "Verify & Continue",
  verifyResend: "Resend Code",

  dashTitle: "My Dashboard",
  dashSubtitleEmpty: "Empty — add items",
  dashSubtitleLoading: "Loading…",
  dashSubtitleCount: (n) => `${n} item${n !== 1 ? "s" : ""}`,
  dashSearch: "Search items…",
  dashFilterAll: "All",
  dashScanCta: "📷 Scan Items",
  dashScanCtaSub: "Add items by photo",
  dashRecipesCta: "🍽️ Get Recipes",
  dashEmptyTitle: "Cart is empty",
  dashEmptyDesc: "Scan your grocery bag to add items.",
  dashEmptyAction: "Scan Items",
  dashNoResults: (q) => `No results for "${q}"`,
  dashNoResultsDesc: "Try another search or clear filters.",
  dashClearFilters: "Clear filters",
  dashCookNow: "Cook from your cart",
  dashAllRecipes: "All recipes →",

  dashUrgentTitle: "⏰ Expiring Soon & Running Out",
  dashUrgentSub: "Use these items before they spoil or run out",
  dashUrgentExpiring: (days: number) => days <= 0 ? "Expires today!" : days === 1 ? "Expires tomorrow!" : `Expires in ${days} days`,
  dashUrgentRunningOut: "Running Low",

  authContinueWithGoogle: "Continue with Google",
  authOrDivider: "OR",

  catGrain: "Grain",
  catDairy: "Dairy",
  catVegetable: "Vegetable",
  catSpice: "Spice",
  catOther: "Other",
  catBakery: "Bakery",
  catFruit: "Fruit",
  catMeat: "Meat",
  catGroceries: "Groceries",
  catVegetablesProduce: "Vegetables & Produce",
  catGrainsBakery: "Grains & Bakery",
  catDairyRefrigerated: "Dairy & Refrigerated",
  catSpicesSeasonings: "Spices & Seasonings",
  catOilsPantry: "Oils & Pantry Essentials",
  catFreshVegetables: "Fresh Vegetables",
  catLeafyHerbs: "Leafy Greens & Herbs",
  catMedicines: "Medicines",
  catPills: "Pills & Tablets",
  catSyrups: "Syrups & Liquids",
  catFirstAid: "First Aid & Topical",

  dashRemindersTitle: "⚡ Alerts & Reminders",
  dashRemindersSub: "Instant notifications, expiring food & low stock updates",
  dashAlertExpired: (item) => `${item} has expired or needs immediate check`,
  dashAlertExpiringSoon: (item, days) => `${item} expires in ${days} day${days !== 1 ? "s" : ""}`,
  dashAlertLowStock: (item, qty) => `${item} running low (${qty} remaining)`,
  dashAlertInstant: (msg) => msg,
  dashDismissAlert: "Dismiss",
  alertFilterAll: (n) => `All (${n})`,
  alertFilterExpiry: "⏰ Expiry",
  alertFilterLowStock: "📉 Low Stock",
  alertBadgeUrgent: "URGENT",
  alertBadgeExpiringSoon: "EXPIRING SOON",
  alertBadgeRunningLow: "RUNNING LOW",
  alertBadgeNewUpdate: "NEW UPDATE",
  alertInstantTitle: "AI Smart Scanner",
  alertInstantBody: "5 fresh vegetables & produce detected and organized into categories.",
  recipeReadyToCook: "✓ Ready to cook",
  recipeMissingItems: (n) => `${n} item${n > 1 ? "s" : ""} missing`,
  recipeIngredientsInCart: (have, total) => `${have}/${total} ingredients in cart`,
  recipeMin: "min",

 pantryItemNames: {}, // English is pass-through — original names are already English

  scanStepUpload: "Pick a photo",
  scanStepScanning: "Scanning…",
  scanStepReview: "Review items",
  scanPickPhotoDesc: "Upload a receipt or a photo of your pantry items.",
  scanScanPhotoBtn: "📷 Scan this photo",
  scanPickFirstBtn: "Pick a photo first",
  scanScanningMsg: "Reviewing your photo… spotting items 🔍",
  scanReviewTitle: "Review Detected Items",
  scanReviewDesc: "Edit anything that looks off, then confirm.",
  scanAllRemovedMsg: "All items removed.",
  scanTryAnotherPhoto: "Try another photo",
  scanConfirmBtn: (n) => `✓ Add ${n} item${n !== 1 ? "s" : ""} to Cart`,
  scanItemNamePlaceholder: "Item name",
  scanItemNameAriaLabel: "Item name",
  scanQuantityPlaceholder: "e.g. 500g, 2 pieces",
  scanQuantityAriaLabel: "Quantity",
  scanExpiryAriaLabel: "Expiry Date",
  scanRemoveAriaLabel: (name) => `Remove ${name}`,
  scanBackBtn: "← Back",
  scanExpiryAIPredicted: "AI predicted · tap to edit",
  scanModeGrocery: "Groceries",
  scanModeMeal: "Meals",
  scanModeMedicine: "Medicine",
  scanTitle: "Scan Groceries",
  scanMealTitle: "Scan a Meal",
  scanMedicineTitle: "Scan Medicine",
  scanMealDesc: "Snap a photo of your meal to log macros.",
  scanMedicineDesc: "Snap a photo of medicine strips or bottles.",
  scanMealScanningMsg: "Analyzing plate & macros… 🍽️",
  scanMealReviewTitle: "Meal Consumption Review",
  scanMealReviewDesc: "Confirm the curry/dish and ingredients eaten to subtract them from your stock.",
  scanMealConfirmBtn: "Confirm Meal Consumption",
  scanMealConsuming: "Subtracting ingredients from pantry…",
  scanNutrientsCalories: "Calories",
  scanNutrientsProtein: "Protein",
  scanNutrientsCarbs: "Carbs",
  scanNutrientsFat: "Fat",

  recipesTitle: "Recipe Ideas",
  recipesSubtitle: "Based on what you have",
  recipesSearchPlaceholder: "Search recipes…",
  recipesLoading: "Finding recipes… 🍳",
  recipesEmptyTitle: "No recipes found",
  recipesEmptyDesc: "Add more items to see recipes.",
  recipesLegendReady: "All items available",
  recipesLegendMissing: "Some items missing",
  recipesReady: "✓ Ready",
  recipesCatAll: "All",
  recipesCatMain: "Main",
  recipesCatSide: "Side",
  recipesCatSoup: "Soup",
  recipesCatDessert: "Dessert",
  recipeDetailBack: "← All Recipes",
  recipeMissing: (n) => `${n} missing`,
  recipeIngredients: "Ingredients",
  recipeInPantry: (n, total) => `${n}/${total} in cart`,
  recipeInPantryLabel: "In cart",
  recipeMissingLabel: "Missing",
  recipeHowToMake: "How to cook",
  recipeStillNeed: (n) => `Need ${n} more item${n !== 1 ? "s" : ""}:`,
  recipeServings: "Servings",

  chatTitle: "Ask growtracker",
  chatSubtitle: "Storage tips & recipe help",
  chatPlaceholder: "Ask about recipes, storage…",
  chatSend: "Send",
  chatWelcome: "👋 Hi! I'm your kitchen helper. Ask me about food storage, recipes, or your cart!",
  chatTyping: "Thinking…",

  langLabel: "Language",

  back: "← Back",
  loading: "Loading…",
  errorNotFound: "Recipe not found",
  errorNotFoundDesc: "This recipe is not available.",
  goBack: "← Back to Recipes",
};

// ─── Hindi ──────────────────────────────────────────────────────────────────

const hi: Translations = {
  navHome: "होम",
  navFeatures: "फीचर्स",
  navHowItWorks: "कैसे काम करता है",
  navReviews: "रिव्यू",
  navPantry: "मेरा कार्ट",
  navScan: "सामान स्कैन करें",
  navRecipes: "रेसिपी",
  navChat: "चैट",
  navSettings: "सेटिंग्स",
  navLogout: "लॉगआउट",
  navSignIn: "साइन इन",
  navSignUp: "साइन अप",

  // ── Landing — Hero
  heroBadge: "स्मार्ट किचन हेल्पर",
  heroTitle: "स्मार्ट किचन कार्ट",
  heroSubtitle: "अपने सामान को स्कैन करें, कार्ट ट्रैक करें, और रेसिपी पाएं — सब एक ऐप में।",
  heroGetStarted: "मुफ्त शुरू करें",
  heroHowItWorks: "कैसे काम करता है",

  // ── Landing — Features
  featuresTitle: "फीचर्स",
  featuresSubtitle: "एक ऐप में सब कुछ",
  featureScanTitle: "सामान स्कैन करें",
  featureScanDesc: "अपने सामान की फोटो लें। AI सब कुछ आपके कार्ट में जोड़ देगा।",
  featureRecipesTitle: "रेसिपी पाएं",
  featureRecipesDesc: "कार्ट में जो है उसके आधार पर रेसिपी पाएं। जो है उससे पकाएं।",
  featureChatTitle: "किचन हेल्प",
  featureChatDesc: "खाना स्टोर करने, पकाने की टिप्स, या रेसिपी आइडियाज़ पूछें। तुरंत मदद पाएं।",

  // ── Landing — How It Works
  howTitle: "कैसे काम करता है",
  howSubtitle: "तीन आसान कदम — स्मार्ट किचन के लिए",
  howStep1Title: "📸 स्कैन करें",
  howStep1Desc: "अपने सामान की फोटो लें। AI सब पहचानकर जोड़ देगा।",
  howStep2Title: "🍽️ खोजें",
  howStep2Desc: "जो आपके पास है उसके आधार पर रेसिपी सुझाव पाएं।",
  howStep3Title: "💚 पकाएं और बचाएं",
  howStep3Desc: "खाना पकाएं, कार्ट ट्रैक करें, और बर्बादी रोकें।",
  howCta: "मुफ्त ट्रायल शुरू करें",

  // ── Landing — Testimonials
  testimonialsTitle: "लोग क्या कहते हैं",
  testimonialsSubtitle: "हमारे यूज़र्स की सच्ची कहानियां",
  testimonial1: "\"मैं पहले बहुत खाना बर्बाद करती थी। अब मैं सामान स्कैन करती हूं और रेसिपी पाती हूं। हर महीने पैसे बचते हैं!\"",
  testimonial2: "\"स्कैन फीचर शानदार है। बस फोटो लो और सब जुड़ जाता है। रेसिपी सुझाव हमेशा अच्छे होते हैं!\"",
  testimonial3: "\"मेरे पास खाना प्लान करने का समय नहीं है। growtracker मेरे लिए करता है। यह एक किचन हेल्पर जैसा है।\"",

  // ── Landing — CTA
  ctaTitle: "शुरू करने के लिए तैयार?",
  ctaSubtitle: "हज़ारों परिवार पैसे बचा रहे हैं और खाना बर्बाद होना कम कर रहे हैं।",
  ctaBeta: "✨ बीटा के दौरान हमेशा मुफ्त",

  // ── Landing — Footer
  footerPrivacy: "गोपनीयता",
  footerTerms: "शर्तें",
  footerContact: "संपर्क",

  // ── Login
  loginTitle: "वापस स्वागत है",
  loginSubtitle: "अपने अकाउंट में साइन इन करें",
  loginEmailLabel: "ईमेल आईडी",
  loginEmailPlaceholder: "you@example.com",
  loginPasswordLabel: "पासवर्ड",
  loginPasswordPlaceholder: "अपना पासवर्ड डालें",
  loginButton: "साइन इन",
  loginNoAccount: "अकाउंट नहीं है?",
  loginDemoNote: "डेमो मोड — तुरंत एक्सेस",

  // ── Signup
  signupTitle: "growtracker",
  signupSubtitle: "अपना अकाउंट बनाएं",
  signupNameLabel: "आपका नाम",
  signupNamePlaceholder: "अपना नाम डालें",
  signupEmailLabel: "ईमेल आईडी",
  signupEmailPlaceholder: "you@example.com",
  signupPasswordLabel: "पासवर्ड",
  signupPasswordPlaceholder: "पासवर्ड बनाएं",
  signupButton: "अकाउंट बनाएं",
  signupHasAccount: "पहले से अकाउंट है?",

  phoneLabel: "फ़ोन नंबर",
  phonePlaceholder: "+91 98765 43210",
  verifyTitle: "अकाउंट सत्यापित करें",
  verifySubtitle: "हमने आपके फ़ोन / ईमेल पर 6 अंकों का वेरिफिकेशन कोड भेजा है।",
  verifyCodeLabel: "वेरिफिकेशन कोड",
  verifyButton: "सत्यापित करें और जारी रखें",
  verifyResend: "कोड दोबारा भेजें",

  dashTitle: "मेरा डैशबोर्ड",
  dashSubtitleEmpty: "खाली है — कुछ स्कैन करें",
  dashSubtitleLoading: "कार्ट लोड हो रहा है…",
  dashSubtitleCount: (n) => `${n} आइटम ट्रैक हो रहे हैं`,
  dashSearch: "कार्ट खोजें…",
  dashFilterAll: "सभी",
  dashScanCta: "📷 सामान स्कैन करें",
  dashScanCtaSub: "फ़ोटो लेकर सामान जोड़ें",
  dashRecipesCta: "🍽️ मेरे कार्ट से रेसिपी सुझाएं",
  dashEmptyTitle: "आपका कार्ट खाली है",
  dashEmptyDesc: "पहला सामान जोड़ने के लिए किराने का थैला स्कैन करें।",
  dashEmptyAction: "सामान स्कैन करें",
  dashNoResults: (q) => `"${q}" से कुछ नहीं मिला`,
  dashNoResultsDesc: "अलग शब्द खोजें या फ़िल्टर हटाएं।",
  dashClearFilters: "फ़िल्टर हटाएं",
  dashCookNow: "अभी पकाएं · अपने कार्ट से",
  dashAllRecipes: "सभी रेसिपी →",

  dashUrgentTitle: "⏰ जल्द खराब होने या खत्म होने वाले आइटम",
  dashUrgentSub: "खराब होने या खत्म होने से पहले इनका इस्तेमाल करें",
  dashUrgentExpiring: (days: number) => days <= 0 ? "आज ही खराब होगा!" : days === 1 ? "कल खराब होगा!" : `${days} दिनों में खराब होगा`,
  dashUrgentRunningOut: "खत्म होने वाला है",

  authContinueWithGoogle: "Google के साथ जारी रखें",
  authOrDivider: "या",

  catGrain: "अनाज",
  catDairy: "डेयरी",
  catVegetable: "सब्ज़ी",
  catSpice: "मसाला",
  catOther: "अन्य",
  catBakery: "बेकरी",
  catFruit: "फल",
  catMeat: "मांस",
  catGroceries: "किराना (Groceries)",
  catVegetablesProduce: "सब्जियाँ व ताज़ा सामान",
  catGrainsBakery: "अनाज और बेकरी",
  catDairyRefrigerated: "डेयरी और फ्रिज सामान",
  catSpicesSeasonings: "मसाले और सीज़निंग",
  catOilsPantry: "तेल और रसोई सामग्री",
  catFreshVegetables: "ताज़ा सब्जियाँ",
  catLeafyHerbs: "हरी पत्तेदार सब्जियाँ",
  catMedicines: "दवाइयां",
  catPills: "गोलियां",
  catSyrups: "सिरप",
  catFirstAid: "प्राथमिक चिकित्सा",

  dashRemindersTitle: "⚡ अलर्ट और रिमाइंडर्स",
  dashRemindersSub: "तुरंत नोटिफिकेशन, खराब होने वाले और खत्म होने वाले सामान की जानकारी",
  dashAlertExpired: (item) => `${item} खराब हो सकता है या तुरंत जांचें`,
  dashAlertExpiringSoon: (item, days) => `${item} ${days} दिन में एक्सपायर होगा`,
  dashAlertLowStock: (item, qty) => `${item} कम बचा है (केवल ${qty} बचा है)`,
  dashAlertInstant: (msg) => msg,
  dashDismissAlert: "हटाएं",
  alertFilterAll: (n) => `सभी (${n})`,
  alertFilterExpiry: "⏰ एक्सपायरी",
  alertFilterLowStock: "📉 कम स्टॉक",
  alertBadgeUrgent: "अति आवश्यक",
  alertBadgeExpiringSoon: "जल्द खराब होगा",
  alertBadgeRunningLow: "स्टॉक कम है",
  alertBadgeNewUpdate: "नया अपडेट",
  alertInstantTitle: "AI स्मार्ट स्कैनर",
  alertInstantBody: "5 ताज़ा सब्जियाँ और फल पहचाने गए और श्रेणियों में जोड़े गए।",
  recipeReadyToCook: "✓ पकाने के लिए तैयार",
  recipeMissingItems: (n) => `${n} सामग्री कम`,
  recipeIngredientsInCart: (have, total) => `${have}/${total} सामग्री कार्ट में`,
  recipeMin: "मिनट",

  pantryItemNames: {
    "Toor Dal": "तूर दाल",
    "Basmati Rice": "बासमती चावल",
    "Onions": "प्याज़",
    "Tomatoes": "टमाटर",
    "Ghee": "घी",
    "Cumin Seeds": "जीरा",
    "Ginger": "अदरक",
    "Garlic": "लहसुन",
    "Atta (Wheat Flour)": "आटा",
    "Chana Dal": "चना दाल",
    "Potatoes": "आलू",
    "Mustard Seeds": "राई",
    "Turmeric Powder": "हल्दी पाउडर",
    "Coriander Leaves": "धनिया",
    "Red Chilli Powder": "लाल मिर्च पाउडर",
    "Bay Leaf": "तेज पत्ता",
    "Cloves": "लौंग",
    "Black Pepper": "काली मिर्च",
    "Cream": "क्रीम",
    "Curd / Yoghurt": "दही",
    "Green Chilli": "हरी मिर्च",
    "Bread": "पाव / ब्रेड",
    "Milk": "दूध",
    "Paneer": "पनीर",
    "Whole Wheat Pasta": "होल व्हीट पास्ता",
    "Whole Milk": "दूध (Whole Milk)",
    "Aged Cheddar Cheese": "चेडर चीज़",
    "Black Peppercorns": "काली मिर्च",
    "Extra Virgin Olive Oil": "जैतून का तेल (Olive Oil)",
    "Fresh Tomatoes": "ताज़े टमाटर",
    "Garlic Bulbs": "लहसुन",
    "Red Onions": "लाल प्याज़",
    "Organic Baby Spinach": "पालक",
    "Fresh Coriander": "हरा धनिया",
    "Rajma": "राजमा",
    "Oats": "ओट्स",
    "Masoor Dal": "मसूर दाल",
    "Brown Rice": "ब्राउन राइस",
    "Sourdough Bread": "सॉरडो ब्रेड",
    "Adzuki Beans": "अज़ुकी बीन्स",
    "Bananas": "केले",
    "Eggs": "अंडे",
    "Cabbage": "पत्ता गोभी",
    "Organic Spinach": "ऑर्गेनिक पालक",
    "Red Beans": "राजमा",
    "Cheddar Cheese": "चेडर चीज़",
    "Olive Oil": "जैतून का तेल",
  },

  scanTitle: "सामान स्कैन करें",
  scanStepUpload: "फ़ोटो चुनें",
  scanStepScanning: "स्कैन हो रहा है…",
  scanStepReview: "आइटम देखें",
  scanPickPhotoDesc: "अपने थैले या रसीद की फ़ोटो लें।",
  scanScanPhotoBtn: "📷 यह फ़ोटो स्कैन करें",
  scanPickFirstBtn: "पहले फ़ोटो चुनें",
  scanScanningMsg: "आपकी फ़ोटो देखी जा रही है… आइटम पहचाने जा रहे हैं 🔍",
  scanReviewTitle: "पहचाने गए आइटम देखें",
  scanReviewDesc: "जो गलत लगे उसे सुधारें, फिर पुष्टि करें।",
  scanAllRemovedMsg: "सभी आइटम हटा दिए गए।",
  scanTryAnotherPhoto: "दूसरी फ़ोटो आज़माएं",
  scanConfirmBtn: (n) => `✓ ${n} आइटम कार्ट में जोड़ें`,
  scanItemNamePlaceholder: "आइटम का नाम",
  scanItemNameAriaLabel: "आइटम का नाम",
  scanQuantityPlaceholder: "जैसे 500g, 2 टुकड़े",
  scanQuantityAriaLabel: "मात्रा",
  scanExpiryAriaLabel: "एक्सपायरी तारीख",
  scanRemoveAriaLabel: (name) => `${name} हटाएं`,
  scanBackBtn: "← वापस",
  scanExpiryAIPredicted: "AI अनुमान · बदलने के लिए टैप करें",
  scanModeGrocery: "ग्रोसरी स्कैन",
  scanModeMeal: "भोजन स्कैन",
  scanModeMedicine: "दवा स्कैन",
  scanMealTitle: "AI भोजन ट्रैकर",
  scanMedicineTitle: "दवा स्कैन करें",
  scanMedicineDesc: "दवा की पट्टी या बोतल की फोटो लें।",
  scanMealDesc: "मैक्रोज़ गिनने और पेंट्री से सामग्री घटाने के लिए अपने तैयार भोजन/करी को स्कैन करें",
  scanMealScanningMsg: "थाली और मैक्रोज़ का विश्लेषण किया जा रहा है… 🍽️",
  scanMealReviewTitle: "भोजन खपत समीक्षा",
  scanMealReviewDesc: "स्टॉक से घटाने के लिए खाई गई करी/डिश और सामग्री की पुष्टि करें।",
  scanMealConfirmBtn: "भोजन खपत की पुष्टि करें",
  scanMealConsuming: "पेंट्री से सामग्री घटाई जा रही है…",
  scanNutrientsCalories: "कैलोरी",
  scanNutrientsProtein: "प्रोटीन",
  scanNutrientsCarbs: "कार्ब्स",
  scanNutrientsFat: "फैट",

  recipesTitle: "रेसिपी सुझाव",
  recipesSubtitle: "आपके कार्ट में जो है उसके आधार पर",
  recipesSearchPlaceholder: "रेसिपी खोजें…",
  recipesLoading: "आज पकाने वाली रेसिपी ढूंढी जा रही हैं… 🍳",
  recipesEmptyTitle: "कोई रेसिपी नहीं मिली",
  recipesEmptyDesc: "कार्ट में और चीजें जोड़ें, हम कुछ खोजेंगे।",
  recipesLegendReady: "सभी सामग्री कार्ट में है",
  recipesLegendMissing: "कुछ सामग्री नहीं है",
  recipesReady: "✓ तैयार",
  recipesCatAll: "सभी",
  recipesCatMain: "मुख्य",
  recipesCatSide: "साइड",
  recipesCatSoup: "सूप",
  recipesCatDessert: "मिठाई",
  recipeDetailBack: "← सभी रेसिपी",
  recipeMissing: (n) => `${n} नहीं है`,
  recipeIngredients: "सामग्री",
  recipeInPantry: (n, total) => `${n}/${total} कार्ट में`,
  recipeInPantryLabel: "कार्ट में है",
  recipeMissingLabel: "नहीं है",
  recipeHowToMake: "कैसे बनाएं",
  recipeStillNeed: (n) => `अभी भी ${n} सामग्री चाहिए:`,
  recipeServings: "कितने लोगों के लिए",

  chatTitle: "growtracker से पूछें",
  chatSubtitle: "खाने की स्टोरेज टिप्स और रेसिपी मदद",
  chatPlaceholder: "रेसिपी या स्टोरेज के बारे में पूछें…",
  chatSend: "भेजें",
  chatWelcome: "👋 नमस्ते! मैं आपका growtracker किचन असिस्टेंट हूँ। खाने की स्टोरेज, रेसिपी या कार्ट के बारे में पूछें!",
  chatTyping: "सोच रहा हूँ…",

  langLabel: "भाषा",

  back: "← वापस",
  loading: "लोड हो रहा है…",
  errorNotFound: "रेसिपी नहीं मिली",
  errorNotFoundDesc: "यह हटाई जा सकती है, या लिंक गलत है।",
  goBack: "← रेसिपी पर वापस जाएं",
};

// ─── Telugu ─────────────────────────────────────────────────────────────────

const te: Translations = {
  navHome: "హోమ్",
  navFeatures: "ఫీచర్లు",
  navHowItWorks: "ఎలా పనిచేస్తుంది",
  navReviews: "రివ్యూలు",
  navPantry: "నా కార్ట్",
  navScan: "కిరాణా స్కాన్ చేయి",
  navRecipes: "వంటకాలు",
  navChat: "చాట్",
  navSettings: "సెట్టింగ్లు",
  navLogout: "లాగ్ అవుట్",
  navSignIn: "సైన్ ఇన్",
  navSignUp: "సైన్ అప్",

  // ── Landing — Hero
  heroBadge: "స్మార్ట్ కిచెన్ హెల్పర్",
  heroTitle: "స్మార్ట్ కిచెన్ కార్ట్",
  heroSubtitle: "మీ కిరాణాను స్కాన్ చేయండి, కార్ట్ ట్రాక్ చేయండి, మరియు వంటకాలు పొందండి — అన్నీ ఒక యాప్‌లో.",
  heroGetStarted: "ఉచితంగా ప్రారంభించండి",
  heroHowItWorks: "ఇది ఎలా పనిచేస్తుంది",

  // ── Landing — Features
  featuresTitle: "ఫీచర్లు",
  featuresSubtitle: "ఒక యాప్‌లో అన్నీ",
  featureScanTitle: "కిరాణా స్కాన్ చేయి",
  featureScanDesc: "మీ కిరాణా ఫోటో తీయండి. AI అన్నీ మీ కార్ట్‌లో జోడిస్తుంది.",
  featureRecipesTitle: "వంటకాలు పొందండి",
  featureRecipesDesc: "మీ కార్ట్‌లో ఉన్నదాని ఆధారంగా వంటకాలు పొందండి. మీ దగ్గర ఉన్నదానితో వండండి.",
  featureChatTitle: "కిచెన్ హెల్ప్",
  featureChatDesc: "ఆహారం నిల్వ, వంట చిట్కాలు, లేదా వంటకం ఆలోచనలు అడగండి. తక్షణ సహాయం పొందండి.",

  // ── Landing — How It Works
  howTitle: "ఇది ఎలా పనిచేస్తుంది",
  howSubtitle: "స్మార్ట్ కిచెన్ కోసం మూడు సరళ అడుగులు",
  howStep1Title: "📸 స్కాన్ చేయండి",
  howStep1Desc: "మీ కిరాణా ఫోటో తీయండి. AI అన్నీ గుర్తించి జోడిస్తుంది.",
  howStep2Title: "🍽️ కనుగొనండి",
  howStep2Desc: "మీ దగ్గర ఉన్నదాని ఆధారంగా వంటకం ఆలోచనలు పొందండి.",
  howStep3Title: "💚 వండండి & ఆదా చేయండి",
  howStep3Desc: "భోజనం వండండి, కార్ట్ ట్రాక్ చేయండి, మరియు వృధాను ఆపండి.",
  howCta: "ఉచిత ట్రయల్ ప్రారంభించండి",

  // ── Landing — Testimonials
  testimonialsTitle: "ప్రజలు ఏమంటున్నారు",
  testimonialsSubtitle: "మా వినియోగదారుల నిజమైన కథలు",
  testimonial1: "\"నేను చాలా ఆహారం వృధా చేసేదాన్ని. ఇప్పుడు నేను కిరాణా స్కాన్ చేసి వంటకాలు పొందుతున్నాను. ప్రతి నెలా డబ్బు ఆదా అవుతోంది!\"",
  testimonial2: "\"స్కాన్ ఫీచర్ అద్భుతం. ఫోటో తీయండి, అన్నీ జోడించబడతాయి. వంటకం సూచనలు ఎప్పుడూ బాగుంటాయి!\"",
  testimonial3: "\"భోజనం ప్లాన్ చేయడానికి నాకు సమయం లేదు. growtracker నా కోసం చేస్తుంది. ఇది కిచెన్ హెల్పర్ లాంటిది.\"",

  // ── Landing — CTA
  ctaTitle: "ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?",
  ctaSubtitle: "వేలాది కుటుంబాలు డబ్బు ఆదా చేస్తున్నాయి మరియు ఆహారం వృధాను తగ్గిస్తున్నాయి.",
  ctaBeta: "✨ బీటా సమయంలో ఎల్లప్పుడూ ఉచితం",

  // ── Landing — Footer
  footerPrivacy: "గోప్యత",
  footerTerms: "నిబంధనలు",
  footerContact: "సంప్రదించండి",

  // ── Login
  loginTitle: "తిరిగి స్వాగతం",
  loginSubtitle: "మీ ఖాతాలో సైన్ ఇన్ చేయండి",
  loginEmailLabel: "ఈమెయిల్ ఐడి",
  loginEmailPlaceholder: "you@example.com",
  loginPasswordLabel: "పాస్‌వర్డ్",
  loginPasswordPlaceholder: "మీ పాస్‌వర్డ్ ఎంటర్ చేయండి",
  loginButton: "సైన్ ఇన్",
  loginNoAccount: "ఖాతా లేదా?",
  loginDemoNote: "డెమో మోడ్ — తక్షణ యాక్సెస్",

  // ── Signup
  signupTitle: "growtracker",
  signupSubtitle: "మీ ఖాతాను సృష్టించండి",
  signupNameLabel: "మీ పేరు",
  signupNamePlaceholder: "మీ పేరు ఎంటర్ చేయండి",
  signupEmailLabel: "ఈమెయిల్ ఐడి",
  signupEmailPlaceholder: "you@example.com",
  signupPasswordLabel: "పాస్‌వర్డ్",
  signupPasswordPlaceholder: "పాస్‌వర్డ్ సృష్టించండి",
  signupButton: "ఖాతా సృష్టించు",
  signupHasAccount: "ఇప్పటికే ఖాతా ఉందా?",

  phoneLabel: "ఫోన్ నంబర్",
  phonePlaceholder: "+91 98765 43210",
  verifyTitle: "ఖాతాను ధృవీకరించండి",
  verifySubtitle: "మేము మీ ఫోన్ / ఈమెయిల్‌కు 6-అంకెల ధృవీకరణ కోడ్‌ను పంపాము.",
  verifyCodeLabel: "ధృవీకరణ కోడ్",
  verifyButton: "ధృవీకరించి కొనసాగండి",
  verifyResend: "కోడ్ మళ్ళీ పంపండి",

  dashTitle: "నా డాష్బోర్డ్",
  dashSubtitleEmpty: "ఖాళీగా ఉంది — ఏదైనా స్కాన్ చేద్దాం",
  dashSubtitleLoading: "మీ కార్ట్ లోడ్ అవుతోంది…",
  dashSubtitleCount: (n) => `${n} వస్తువులు ట్రాక్ అవుతున్నాయి`,
  dashSearch: "కార్ట్‌లో వెతకండి…",
  dashFilterAll: "అన్నీ",
  dashScanCta: "📷 కిరాణా స్కాన్ చేయి",
  dashScanCtaSub: "ఫోటో తీసి వస్తువులు జోడించండి",
  dashRecipesCta: "🍽️ నా కార్ట్ నుండి వంటకాలు సూచించండి",
  dashEmptyTitle: "మీ కార్ట్ ఖాళీగా ఉంది",
  dashEmptyDesc: "మొదటి వస్తువులు జోడించడానికి కిరాణా సంచిని స్కాన్ చేయండి.",
  dashEmptyAction: "కిరాణా స్కాన్ చేయి",
  dashNoResults: (q) => `"${q}" కు ఏదీ దొరకలేదు`,
  dashNoResultsDesc: "వేరే పదం వెతకండి లేదా ఫిల్టర్ తీసివేయండి.",
  dashClearFilters: "ఫిల్టర్లు తీసివేయి",
  dashCookNow: "ఇప్పుడే వండండి · మీ కార్ట్ నుండి",
  dashAllRecipes: "అన్ని వంటకాలు →",

  dashUrgentTitle: "⏰ త్వరలో పాడయ్యే లేదా అయిపోయే వస్తువులు",
  dashUrgentSub: "ఇవి పాడయ్యే లేదా అయిపోయే లోపే వాడండి",
  dashUrgentExpiring: (days: number) => days <= 0 ? "ఈ రోజే గడువు ముగుస్తుంది!" : days === 1 ? "రేపు గడువు ముగుస్తుంది!" : `${days} రోజుల్లో గడువు ముగుస్తుంది`,
  dashUrgentRunningOut: "త్వరలో అయిపోతుంది",

  authContinueWithGoogle: "Google తో కొనసాగండి",
  authOrDivider: "లేదా",

  catGrain: "ధాన్యం",
  catDairy: "డేరీ",
  catVegetable: "కూరగాయలు",
  catSpice: "సుగంధ ద్రవ్యాలు",
  catOther: "ఇతరాలు",
  catBakery: "బేకరీ",
  catFruit: "పండ్లు",
  catMeat: "మాంసం",
  catGroceries: "కిరాణా సరుకులు",
  catVegetablesProduce: "కూరగాయలు & తాజా సరుకులు",
  catGrainsBakery: "ధాన్యాలు & బేకరీ",
  catDairyRefrigerated: "పాల ఉత్పత్తులు",
  catSpicesSeasonings: "సుగంధ ద్రవ్యాలు & మసాలాలు",
  catOilsPantry: "నూనెలు & కిరాణా నిల్వలు",
  catFreshVegetables: "తాజా కూరగాయలు",
  catLeafyHerbs: "ఆకుకూరలు & మూలికలు",
  catMedicines: "మందులు",
  catPills: "మాత్రలు",
  catSyrups: "సిరప్‌లు",
  catFirstAid: "ప్రథమ చికిత్స",

  dashRemindersTitle: "⚡ హెచ్చరికలు & రిమైండర్లు",
  dashRemindersSub: "తక్షణ నోటిఫికేషన్లు, గడువు ముగిసే ఆహారం & నిల్వ తగ్గిన సరుకులు",
  dashAlertExpired: (item) => `${item} గడువు ముగిసింది లేదా వెంటనే తనిఖీ చేయండి`,
  dashAlertExpiringSoon: (item, days) => `${item} గడువు ${days} రోజుల్లో ముగుస్తుంది`,
  dashAlertLowStock: (item, qty) => `${item} నిల్వ తక్కువగా ఉంది (మిగిలింది ${qty})`,
  dashAlertInstant: (msg) => msg,
  dashDismissAlert: "తొలగించు",
  alertFilterAll: (n) => `అన్నీ (${n})`,
  alertFilterExpiry: "⏰ గడువు",
  alertFilterLowStock: "📉 తక్కువ నిల్వ",
  alertBadgeUrgent: "తక్షణ శ్రద్ధ",
  alertBadgeExpiringSoon: "త్వరలో గడువు",
  alertBadgeRunningLow: "నిల్వ తక్కువ",
  alertBadgeNewUpdate: "కొత్త నవీకరణ",
  alertInstantTitle: "AI స్మార్ట్ స్కానర్",
  alertInstantBody: "5 తాజా కూరగాయలు & సరుకులు గుర్తించబడి వర్గాలలో అమర్చబడ్డాయి.",
  recipeReadyToCook: "✓ వండడానికి సిద్ధం",
  recipeMissingItems: (n) => `${n} సరుకులు తక్కువ`,
  recipeIngredientsInCart: (have, total) => `కార్టులో ${have}/${total} సరుకులు ఉన్నాయి`,
  recipeMin: "నిమి",

  pantryItemNames: {
    "Toor Dal": "కందిపప్పు",
    "Basmati Rice": "బాస్మతి బియ్యం",
    "Onions": "ఉల్లిపాయలు",
    "Tomatoes": "టమాటాలు",
    "Ghee": "నెయ్యి",
    "Cumin Seeds": "జీలకర్ర",
    "Ginger": "అల్లం",
    "Garlic": "వెల్లుల్లి",
    "Atta (Wheat Flour)": "గోధుమ పిండి",
    "Chana Dal": "శనగపప్పు",
    "Potatoes": "బంగాళాదుంపలు",
    "Mustard Seeds": "ఆవాలు",
    "Turmeric Powder": "పసుపు పొడి",
    "Coriander Leaves": "కొత్తిమీర",
    "Red Chilli Powder": "కారపొడి",
    "Bay Leaf": "బిరియానీ ఆకు",
    "Cloves": "లవంగాలు",
    "Black Pepper": "మిరియాలు",
    "Cream": "క్రీమ్",
    "Curd / Yoghurt": "పెరుగు",
    "Green Chilli": "పచ్చిమిర్చి",
    "Bread": "బ్రెడ్",
    "Milk": "పాలు",
    "Paneer": "పన్నీర్",
    "Whole Wheat Pasta": "గోధుమ పాస్తా",
    "Whole Milk": "పాలు",
    "Aged Cheddar Cheese": "చీజ్",
    "Black Peppercorns": "మిరియాలు",
    "Extra Virgin Olive Oil": "ఆలివ్ నూనె",
    "Fresh Tomatoes": "తాజా టమాటాలు",
    "Garlic Bulbs": "వెల్లుల్లి",
    "Red Onions": "ఎర్ర ఉల్లిపాయలు",
    "Organic Baby Spinach": "పాలకూర",
    "Fresh Coriander": "తాజా కొత్తిమీర",
    "Rajma": "రాజ్మా",
    "Oats": "ఓట్స్",
    "Masoor Dal": "మసూర్ పప్పు",
    "Brown Rice": "బ్రౌన్ రైస్",
    "Sourdough Bread": "సోర్డో బ్రెడ్",
    "Adzuki Beans": "అజుకి బీన్స్",
    "Bananas": "అరటిపండ్లు",
    "Eggs": "గుడ్లు",
    "Cabbage": "క్యాబేజీ",
    "Organic Spinach": "సేంద్రియ పాలకూర",
    "Red Beans": "రాజ్మా",
    "Cheddar Cheese": "చెడ్డార్ చీజ్",
    "Olive Oil": "ఆలివ్ నూనె",
  },

  scanTitle: "కిరాణా స్కాన్ చేయి",
  scanStepUpload: "ఫోటో ఎంచుకోండి",
  scanStepScanning: "స్కాన్ అవుతోంది…",
  scanStepReview: "వస్తువులు చూడండి",
  scanPickPhotoDesc: "మీ సంచి లేదా రసీదు ఫోటో తీయండి.",
  scanScanPhotoBtn: "📷 ఈ ఫోటో స్కాన్ చేయి",
  scanPickFirstBtn: "ముందు ఫోటో ఎంచుకోండి",
  scanScanningMsg: "మీ ఫోటో చూడబడుతోంది… వస్తువులు గుర్తించబడుతున్నాయి 🔍",
  scanReviewTitle: "గుర్తించిన వస్తువులు చూడండి",
  scanReviewDesc: "తప్పుగా ఉన్నది సరిదిద్దండి, తర్వాత నిర్ధారించండి.",
  scanAllRemovedMsg: "అన్ని వస్తువులు తొలగించబడ్డాయి.",
  scanTryAnotherPhoto: "మరో ఫోటో ప్రయత్నించండి",
  scanConfirmBtn: (n) => `✓ ${n} వస్తువులు కార్ట్‌కు జోడించు`,
  scanItemNamePlaceholder: "వస్తువు పేరు",
  scanItemNameAriaLabel: "వస్తువు పేరు",
  scanQuantityPlaceholder: "ఉదా. 500g, 2 ముక్కలు",
  scanQuantityAriaLabel: "పరిమాణం",
  scanExpiryAriaLabel: "గడువు తేదీ",
  scanRemoveAriaLabel: (name) => `${name} తొలగించు`,
  scanBackBtn: "← వెనక్కు",
  scanExpiryAIPredicted: "AI అంచనా · మార్చడానికి నొక్కండి",
 scanModeGrocery: "గ్రోసరీ స్కాన్",
  scanModeMeal: "భోజనం స్కాన్",
  scanModeMedicine: "మందు స్కాన్",
  scanMealTitle: "AI భోజనం ట్రాకర్",
  scanMedicineTitle: "మందు స్కాన్ చేయండి",
  scanMedicineDesc: "మందు స్ట్రిప్ లేదా బాటిల్ ఫోటో తీయండి.",
  scanMealDesc: "మాక్రోలను లెక్కించడానికి మరియు ప్యాంట్రీ నుండి పదార్థాలను తగ్గించడానికి మీ సిద్ధం చేసిన భోజనం/కూరను స్కాన్ చేయండి",
  scanMealScanningMsg: "ప్లేట్ & మాక్రోలను విశ్లేషిస్తోంది… 🍽️",
  scanMealReviewTitle: "భోజన వినియోగం సమీక్ష",
  scanMealReviewDesc: "స్టాక్ నుండి తీసివేయడానికి తిన్న కూర/డిష్ మరియు పదార్థాలను ధృవీకరించండి.",
  scanMealConfirmBtn: "భోజన వినియోగాన్ని ధృవీకరించు",
  scanMealConsuming: "ప్యాంట్రీ నుండి పదార్థాలను తీసివేస్తోంది…",
  scanNutrientsCalories: "క్యాలరీలు",
  scanNutrientsProtein: "ప్రోటీన్",
  scanNutrientsCarbs: "కార్బ్స్",
  scanNutrientsFat: "ఫ్యాట్",

  recipesTitle: "వంటకం సూచనలు",
  recipesSubtitle: "మీ కార్ట్‌లో ఉన్నదాని ఆధారంగా",
  recipesSearchPlaceholder: "వంటకాలు వెతకండి…",
  recipesLoading: "ఈరోజు వండగలిగే వంటకాలు వెతుకుతున్నాం… 🍳",
  recipesEmptyTitle: "వంటకాలు ఏవీ దొరకలేదు",
  recipesEmptyDesc: "కార్ట్‌లో మరిన్ని వస్తువులు జోడించండి.",
  recipesLegendReady: "అన్ని పదార్థాలూ కార్ట్‌లో ఉన్నాయి",
  recipesLegendMissing: "కొన్ని పదార్థాలు లేవు",
  recipesReady: "✓ సిద్ధం",
  recipesCatAll: "అన్నీ",
  recipesCatMain: "ప్రధాన",
  recipesCatSide: "సైడ్",
  recipesCatSoup: "సూప్",
  recipesCatDessert: "స్వీట్",
  recipeDetailBack: "← అన్ని వంటకాలు",
  recipeMissing: (n) => `${n} లేవు`,
  recipeIngredients: "పదార్థాలు",
  recipeInPantry: (n, total) => `${n}/${total} కార్ట్‌లో ఉన్నాయి`,
  recipeInPantryLabel: "కార్ట్‌లో ఉంది",
  recipeMissingLabel: "లేదు",
  recipeHowToMake: "ఎలా తయారు చేయాలి",
  recipeStillNeed: (n) => `ఇంకా ${n} పదార్థాలు కావాలి:`,
  recipeServings: "వడ్డింపులు",

  chatTitle: "growtracker ను అడగండి",
  chatSubtitle: "ఆహారం నిల్వ చేయడం & వంటకం సహాయం",
  chatPlaceholder: "వంటకాలు లేదా నిల్వ గురించి అడగండి…",
  chatSend: "పంపు",
  chatWelcome: "👋 నమస్కారం! నేను మీ growtracker వంటగది సహాయకుణ్ణి. ఆహార నిల్వ, వంటకాలు లేదా కార్ట్ గురించి అడగండి!",
  chatTyping: "ఆలోచిస్తున్నాను…",

  langLabel: "భాష",

  back: "← వెనక్కు",
  loading: "లోడ్ అవుతోంది…",
  errorNotFound: "వంటకం దొరకలేదు",
  errorNotFoundDesc: "అది తొలగించబడి ఉండవచ్చు లేదా లింక్ తప్పు.",
  goBack: "← వంటకాలకు తిరిగి వెళ్ళు",
};

export const translations: Record<Lang, Translations> = { en, hi, te };

export function translateCategory(cat: string, t: Translations): string {
  const lc = (cat || "").toLowerCase();
  if (lc === "groceries") return t.catGroceries;
  if (lc === "vegetables" || lc === "vegetables & produce") return t.catVegetablesProduce;
  if (lc === "grain" || lc === "grains & bakery") return t.catGrainsBakery;
  if (lc === "dairy" || lc === "dairy & refrigerated") return t.catDairyRefrigerated;
  if (lc === "spice" || lc === "spices & seasonings") return t.catSpicesSeasonings;
  if (lc === "other" || lc === "oils & pantry essentials") return t.catOilsPantry;
  if (lc === "vegetable" || lc === "fresh vegetables") return t.catFreshVegetables;
  if (lc === "leafy" || lc === "leafy greens & herbs") return t.catLeafyHerbs;
  if (lc === "medicines" || lc === "medicine") return t.catMedicines;
  if (lc === "pill" || lc === "pills" || lc === "pills & tablets") return t.catPills;
  if (lc === "syrup" || lc === "syrups" || lc === "syrups & liquids") return t.catSyrups;
  if (lc === "firstaid" || lc === "first aid" || lc === "first aid & topical") return t.catFirstAid;
  if (lc === "bakery") return t.catBakery;
  if (lc === "fruit") return t.catFruit;
  if (lc === "meat") return t.catMeat;
  return cat;
}

export function translateItemName(name: string, t: Translations): string {
  if (!name) return name;
  return t.pantryItemNames[name] || name;
}

export function translateQuantity(qty: string, lang: Lang): string {
  if (!qty || lang === "en") return qty;

  let res = qty.toLowerCase();

  const dicts: Record<string, Record<string, string>> = {
    hi: {
      "pieces": "टुकड़े",
      "piece": "टुकड़ा",
      "loaf": "लोफ",
      "bunch": "गुच्छा",
      "kg": "किग्रा",
      "g": "ग्राम",
      "ml": "मिली",
      "l": "लीटर"
    },
    te: {
      "pieces": "ముక్కలు",
      "piece": "ముక్క",
      "loaf": "లోఫ్",
      "bunch": "కట్ట",
      "kg": "కి.గ్రా",
      "g": "గ్రా",
      "ml": "మి.లీ",
      "l": "లీటర్"
    }
  };

  const dict = dicts[lang] || {};
  for (const [en, trans] of Object.entries(dict)) {
    const regex = new RegExp(`\\b${en}\\b`, 'gi');
    res = res.replace(regex, trans);
  }

  return res;
}
