export type MenuVariant = {
  id: string;
  label: string;
  price: number;
};

export type MenuExtra = {
  id: string;
  label: string;
  /** Prices keyed by the selected variant id. */
  prices: Record<string, number>;
};

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  /** Used only when the item has a single printed price. */
  price?: number;
  variants?: MenuVariant[];
  extras?: MenuExtra[];
  isNew?: boolean;
  featured?: boolean;
  note?: string;
  keywords?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  shortName: string;
  items: MenuItem[];
};

const v = (id: string, label: string, price: number): MenuVariant => ({ id, label, price });

const pizzaExtras: MenuExtra[] = [
  {
    id: "extra-mozzarella",
    label: "موتزريلا إضافية",
    prices: { m: 20, l: 25 },
  },
  {
    id: "stuffed-crust",
    label: "حشو أطراف سوسيس أو جبنة",
    prices: { m: 25, l: 30 },
  },
];

const pizza = (item: Omit<MenuItem, "extras">): MenuItem => ({ ...item, extras: pizzaExtras });

export const menuCategories: MenuCategory[] = [
  {
    id: "meals",
    name: "ركن الوجبات",
    shortName: "الوجبات",
    items: [
      { id: "meal-strips", name: "وجبة ستربس", price: 175 },
      { id: "meal-mix-grill", name: "وجبة ميكس جريل", price: 220, featured: true },
      { id: "meal-shish", name: "وجبة شيش طاووق", price: 180 },
      { id: "meal-chicken-pane", name: "وجبة دجاج بانية", price: 165 },
      { id: "meal-grilled-breast", name: "وجبة مشوى صدور", price: 175 },
      {
        id: "meal-diet-charcoal",
        name: "وجبة دايت فحم",
        description: "مشوى صدور + شيش + سلطة خضراء.",
        price: 180,
      },
      {
        id: "meal-wessaya-charcoal",
        name: "وجبة وصايه على الفحم",
        description:
          "نصف دجاج على الفحم + كفتة فحم + أرز بسمتي + سلطة خضراء + خبز + سلطة طحينة.",
        price: 255,
        featured: true,
      },
      {
        id: "meal-family",
        name: "وجبة وصايه العائلية",
        description:
          "فرخة + 10 قطع كفتة + 10 قطع شيش + أرز بسمتي + خبز + 2 سلطة + 2 طحينة.",
        price: 780,
        isNew: true,
        featured: true,
      },
    ],
  },
  {
    id: "broast",
    name: "وجبات البروست",
    shortName: "البروست",
    items: [
      {
        id: "snack-wessaya",
        name: "سناك وصايه",
        description: "2 قطعة دجاج + بطاطس + خبز.",
        price: 110,
      },
      {
        id: "box-wessaya",
        name: "بوكس",
        description: "4 قطع دجاج + بطاطس + أرز بسمتي + خبز + كول سلو.",
        price: 200,
      },
      {
        id: "max-box-wessaya",
        name: "ماكس بوكس",
        description:
          "9 قطع دجاج + بطاطس + 2 أرز بسمتي + خبز + 2 كول سلو + لتر بيبسي.",
        price: 475,
      },
    ],
  },
  {
    id: "kids",
    name: "وجبات الأطفال",
    shortName: "الأطفال",
    items: [
      {
        id: "kids-sandwich",
        name: "ساندوتش الأطفال",
        description: "يقدم مع بطاطس + عصير + لعبة.",
        variants: [v("pane", "دجاج بانية", 90), v("burger", "برجر", 90)],
      },
    ],
  },
  {
    id: "grills",
    name: "مشويات على الفحم",
    shortName: "المشويات",
    items: [
      {
        id: "whole-grilled-chicken",
        name: "فرخة مشوية بالسلطات",
        variants: [v("shish", "شيش", 320), v("regular", "عادي", 320)],
      },
      {
        id: "half-grilled-chicken",
        name: "نص فرخة مشوية بالسلطات",
        variants: [v("shish", "شيش", 175), v("regular", "عادي", 175)],
      },
      {
        id: "quarter-grilled-chicken-paper",
        name: "ربع فرخة مشوية بالسلطات ورق",
        price: 110,
      },
      {
        id: "quarter-grilled-chicken-breast",
        name: "ربع فرخة مشوية بالسلطات صدر",
        price: 120,
      },
      {
        id: "kilo-kofta",
        name: "كيلو كفتة لحم بلدي بالسلطات",
        price: 510,
      },
      {
        id: "half-kofta",
        name: "نص كفتة لحم بلدي بالسلطات",
        price: 260,
      },
      {
        id: "quarter-kofta",
        name: "ربع كفتة لحم بلدي بالسلطات",
        price: 145,
      },
    ],
  },
  {
    id: "fried-chicken",
    name: "ساندوتش فرايد تشكن",
    shortName: "فرايد تشكن",
    items: [
      {
        id: "roast-wessaya",
        name: "روست وصايه",
        description:
          "قطعتين دجاج مقلي + قطعتين روست رومي مدخن + خضروات طازجة + صوص شيدر + باربيكيو + خيار مخلل.",
        price: 120,
        featured: true,
      },
      {
        id: "big-roast-wessaya",
        name: "بيهج روست وصايه",
        description:
          "3 قطع دجاج مقلي + 3 قطع روست رومي مدخن + خضروات طازجة + صوص شيدر + باربيكيو + خيار مخلل.",
        price: 145,
        keywords: "بيج",
      },
      {
        id: "smoke-wessaya",
        name: "سموك وصايه",
        description:
          "قطعتين دجاج مقلي + قطعتين لحم مدخن + خضروات طازجة + صوص شيدر + باربيكيو + خيار مخلل.",
        price: 120,
      },
      {
        id: "big-smoke-wessaya",
        name: "بيهج سموك وصايه",
        description:
          "3 قطع دجاج مقلي + 3 قطع لحم مدخن + خضروات طازجة + صوص شيدر + باربيكيو + خيار مخلل.",
        price: 145,
        keywords: "بيج",
      },
      {
        id: "big-mix-wessaya",
        name: "بيهج ميكس وصايه",
        description:
          "قطعة ستيك برجر + قطعة دجاج مقلي + قطعة لحم مدخن أو روست رومي + خضروات طازجة + صوص شيدر + باربيكيو + خيار مخلل.",
        variants: [v("smoked", "لحم مدخن", 145), v("roast", "روست رومي", 145)],
        isNew: true,
        keywords: "بيج",
      },
      {
        id: "big-boss-wessaya",
        name: "بيهج بوص وصايه",
        description:
          "3 قطع دجاج مقلي + تركي مدخن + صوص مايونيز + باربيكيو + خضروات طازجة + صوص شيدر + خيار مخلل.",
        price: 145,
        isNew: true,
        keywords: "بيج",
      },
      {
        id: "italiano",
        name: "إيطاليانو",
        description:
          "3 قطع دجاج مقلي + لحم مدخن + رانش + خبز + خضروات طازجة + خيار مخلل.",
        price: 150,
        isNew: true,
      },
      {
        id: "fire-wessaya",
        name: "فاير وصايه",
        description:
          "3 قطع دجاج مقلي + تركي مدخن + صوص فاير + خضروات طازجة + صوص شيدر + خيار مخلل.",
        price: 150,
        isNew: true,
      },
    ],
  },
  {
    id: "chicken-sandwiches",
    name: "ساندوتشات الدجاج",
    shortName: "دجاج",
    items: [
      {
        id: "chicken-shawarma-sandwich",
        name: "شاورما دجاج",
        variants: [v("l", "L", 85), v("m", "M", 75), v("s", "S", 55)],
      },
      {
        id: "chicken-pane-sandwich",
        name: "دجاج بانية",
        variants: [v("l", "L", 85), v("m", "M", 75)],
      },
      {
        id: "shish-tawooq-sandwich",
        name: "شيش طاووق",
        variants: [v("l", "L", 90), v("m", "M", 80)],
      },
      {
        id: "chicken-fajita-sandwich",
        name: "فاهيتا دجاج",
        variants: [v("l", "L", 85), v("m", "M", 65)],
      },
      { id: "lahabyo", name: "لهابيو", price: 85 },
      { id: "super-crunchy", name: "سوبر كرانشي", price: 90 },
      { id: "chicken-mozzarella", name: "تشكن موتزريلا", price: 90 },
      { id: "cordon-bleu", name: "كوردن بلو", price: 100 },
      { id: "grilled-breast-sandwich", name: "مشوى صدور", price: 90 },
    ],
  },
  {
    id: "meat-sandwiches",
    name: "ساندوتشات اللحوم",
    shortName: "لحوم",
    items: [
      {
        id: "meat-shawarma-sandwich",
        name: "شاورما لحمة",
        variants: [v("l", "L", 95), v("m", "M", 85), v("s", "S", 65)],
      },
      { id: "hawawshi-oven", name: "حواوشي فرن", price: 50 },
      { id: "hawawshi-mozzarella", name: "حواوشي موتزريلا", price: 60 },
      {
        id: "beef-burger",
        name: "بيف برجر",
        description: "لحم بلدي.",
        price: 45,
      },
      {
        id: "cheese-burger",
        name: "تشيز برجر",
        description: "لحم بلدي.",
        price: 90,
      },
      {
        id: "double-cheese-burger",
        name: "دبل تشيز برجر",
        description: "لحم بلدي.",
        price: 120,
      },
      {
        id: "double-cheese-egg",
        name: "دبل تشيز بيض",
        description: "لحم بلدي.",
        price: 130,
      },
      {
        id: "charcoal-kofta-sandwich",
        name: "كفتة فحم",
        description: "لحم بلدي.",
        price: 90,
      },
      { id: "sausage-sandwich", name: "سوسيس", price: 60 },
    ],
  },
  {
    id: "syrian",
    name: "شاورما سوري",
    shortName: "شاورما سوري",
    items: [
      { id: "syrian-meat-mozzarella", name: "شاورما سوري لحمة و موتزريلا", price: 110 },
      { id: "syrian-chicken-mozzarella", name: "شاورما سوري دجاج و موتزريلا", price: 100 },
      { id: "syrian-charcoal-kofta", name: "كفتة فحم سوري", price: 100 },
      { id: "syrian-potato", name: "بطاطس سوري", price: 55 },
      { id: "syrian-crunchy-spicy", name: "سوري كرانشي حار وصايه", price: 100 },
      { id: "syrian-arlani", name: "سوري عرلني", price: 125 },
    ],
  },
  {
    id: "crepes",
    name: "ركن الكريب",
    shortName: "كريب",
    items: [
      {
        id: "crepe-mix-wessaya",
        name: "ميكس وصايه",
        description: "شيش + سوسيس + كفتة.",
        variants: [v("regular", "عادي", 120), v("combo", "كومبو", 140)],
      },
      {
        id: "crepe-meat-shawarma",
        name: "شاورما لحمة",
        variants: [v("regular", "عادي", 125), v("combo", "كومبو", 145)],
      },
      {
        id: "crepe-sausage",
        name: "سوسيس",
        variants: [v("regular", "عادي", 75), v("combo", "كومبو", 95)],
      },
      {
        id: "crepe-meat-mix",
        name: "ميكس لحمة",
        description: "لحم بلدي.",
        variants: [v("regular", "عادي", 100), v("combo", "كومبو", 120)],
      },
      {
        id: "crepe-charcoal-kofta",
        name: "كفتة فحم",
        variants: [v("regular", "عادي", 95), v("combo", "كومبو", 115)],
      },
      {
        id: "crepe-chicken-shawarma",
        name: "شاورما دجاج",
        variants: [v("regular", "عادي", 100), v("combo", "كومبو", 120)],
      },
      {
        id: "crepe-chicken-mix",
        name: "ميكس دجاج",
        variants: [v("regular", "عادي", 105), v("combo", "كومبو", 125)],
      },
      {
        id: "crepe-chicken-pane",
        name: "دجاج بانية",
        variants: [v("regular", "عادي", 105), v("combo", "كومبو", 125)],
      },
      {
        id: "crepe-crunchy-spicy",
        name: "كرانشي وصايه حار",
        variants: [v("regular", "عادي", 105), v("combo", "كومبو", 125)],
      },
      {
        id: "crepe-shish",
        name: "شيش",
        variants: [v("regular", "عادي", 100), v("combo", "كومبو", 120)],
      },
      {
        id: "crepe-chicken-fajita",
        name: "فاهيتا دجاج",
        variants: [v("regular", "عادي", 100), v("combo", "كومبو", 120)],
      },
      { id: "crepe-cheese-mix", name: "ميكس جبن", price: 70 },
      { id: "crepe-extra-wessaya", name: "اكسترا وصايه", price: 175 },
      {
        id: "crepe-sweet-roll",
        name: "رول (حلو)",
        description: "2 هوهوز + أوريو + نوتيلا.",
        price: 70,
      },
    ],
  },
  {
    id: "pizza",
    name: "ركن البيتزا",
    shortName: "بيتزا",
    items: [
      pizza({
        id: "pizza-mix-wessaya",
        name: "ميكس وصايه",
        description: "بيبروني مدخن، لحم مفروم، صوص وصايه وزيتون.",
        variants: [v("l", "L", 150)],
        featured: true,
      }),
      pizza({
        id: "pizza-biolo",
        name: "بيولو",
        description: "قطع فراخ طازجة، خضروات طازجة، موتزريلا، صوص وصايه وزيتون.",
        variants: [v("m", "M", 135), v("l", "L", 155)],
      }),
      pizza({
        id: "pizza-chicken-spicy",
        name: "تشكن سبايسي",
        description: "قطع فراخ متبلة حارة، خضروات طازجة، موتزريلا، صوص وصايه وزيتون.",
        variants: [v("m", "M", 135), v("l", "L", 155)],
      }),
      pizza({
        id: "pizza-meat-shawarma",
        name: "شاورما لحمة",
        description: "شاورما لحمة، خضروات طازجة، موتزريلا، صوص وصايه وزيتون.",
        variants: [v("l", "L", 165)],
      }),
      pizza({
        id: "pizza-sausage",
        name: "سوسيس",
        description: "شرائح سوسيس، خضروات طازجة، موتزريلا، صوص وصايه وزيتون.",
        variants: [v("l", "L", 115)],
      }),
      pizza({
        id: "pizza-minced",
        name: "مفروم",
        description: "لحم مفروم متبل، خضروات طازجة، موتزريلا، صوص وصايه وزيتون.",
        variants: [v("m", "M", 115), v("l", "L", 135)],
      }),
      pizza({
        id: "pizza-supreme",
        name: "سوبر سوبريم",
        description: "دجاج، لحم مفروم، سوسيس، خضروات طازجة، موتزريلا، صوص وصايه وزيتون.",
        variants: [v("l", "L", 160)],
      }),
      pizza({
        id: "pizza-tuna",
        name: "بيتزا تونة",
        description: "قطع تونة، خضروات طازجة، موتزريلا، صوص وصايه وزيتون.",
        variants: [v("l", "L", 140)],
      }),
      pizza({
        id: "pizza-cheese-mix",
        name: "ميكس جبن",
        description: "رومي، شيدر، ريكفورد، كيري، خضروات طازجة، موتزريلا، صوص وصايه وزيتون.",
        variants: [v("m", "M", 120), v("l", "L", 135)],
      }),
      pizza({
        id: "pizza-mushroom",
        name: "مشروم",
        description: "قطع مشروم طازجة، خضروات طازجة، موتزريلا، صوص وصايه وزيتون.",
        variants: [v("l", "L", 130)],
      }),
      pizza({
        id: "pizza-margherita",
        name: "مارجريتا",
        description: "خضروات طازجة، صوص وصايه، موتزريلا وزيتون.",
        variants: [v("m", "M", 80), v("l", "L", 95)],
      }),
      pizza({
        id: "pizza-charcoal-kofta",
        name: "بيتزا كفتة فحم",
        description: "صوابع كفتة فحم بلدي، خضروات طازجة، موتزريلا، صوص وصايه وزيتون.",
        variants: [v("l", "L", 155)],
      }),
      pizza({
        id: "pizza-tranches",
        name: "الترانيش",
        variants: [v("l", "L", 160)],
        isNew: true,
      }),
      pizza({
        id: "pizza-bbq",
        name: "باربيكيو",
        variants: [v("l", "L", 160)],
        isNew: true,
      }),
    ],
  },
  {
    id: "rice-pasta",
    name: "الأرز والمكرونات",
    shortName: "أرز ومكرونة",
    items: [
      { id: "plain-rice", name: "أرز سادة", price: 25 },
      { id: "basmati-rice", name: "أرز بسمتي", price: 35 },
      { id: "meat-shawarma-rice", name: "أرز شاورما لحمة", price: 95 },
      { id: "chicken-shawarma-rice", name: "أرز شاورما دجاج", price: 90 },
      {
        id: "rezo",
        name: "ريزو",
        description: "أرز بسمتي + قطع ستربس + صوص من اختيارك (باربيكيو / تايجر).",
        variants: [v("bbq", "باربيكيو", 90), v("tiger", "تايجر", 90)],
        isNew: true,
      },
      { id: "meat-spaghetti", name: "مكرونة اسباجتي لحمة", price: 100 },
      { id: "oven-pasta", name: "مكرونة فرن", price: 100 },
      { id: "negresco", name: "مكرونة نجرسكو (اسباجيتي)", price: 110 },
      {
        id: "fried-chicken-pasta",
        name: "باستا فرايد تشكن",
        description: "صوص أبيض أو أحمر + دجاج + خليط من الجبن + صوص وصايه الخاصة.",
        variants: [v("white", "صوص أبيض", 110), v("red", "صوص أحمر", 110)],
        isNew: true,
      },
    ],
  },
  {
    id: "fattah",
    name: "الفتة",
    shortName: "فتة",
    items: [
      { id: "fattah-meat", name: "فتة سوري لحمة", price: 125 },
      { id: "fattah-chicken", name: "فتة سوري دجاج", price: 115 },
      { id: "fattah-mix", name: "فتة سوري ميكس", price: 120 },
    ],
  },
  {
    id: "lenten",
    name: "ركن الصيامي",
    shortName: "صيامي",
    items: [
      { id: "potato-sandwich", name: "ساندوتش بطاطس", price: 50 },
      { id: "mushroom-fajita-sandwich", name: "ساندوتش فاهيتا مشروم", price: 55 },
      { id: "potato-crepe", name: "كريب بطاطس", price: 60 },
      { id: "tuna-crepe", name: "كريب تونة", price: 100 },
      { id: "mushroom-fajita-crepe", name: "كريب فاهيتا مشروم", price: 95 },
      { id: "penne-sauce", name: "مكرونة قلم بالصلصة", price: 55 },
      { id: "spaghetti-sauce", name: "مكرونة سباجيتي بالصلصة", price: 55 },
    ],
  },
  {
    id: "sides",
    name: "أصناف جانبية",
    shortName: "جانبي",
    items: [
      { id: "mixed-veg", name: "خضار مشكل", price: 25 },
      { id: "green-salad", name: "سلطة خضراء", price: 10 },
      { id: "tahini-salad", name: "سلطة طحينة", price: 20 },
      { id: "pickled-eggplant", name: "باذنجان مخلل", price: 10 },
      { id: "pickles", name: "مخلل", price: 15 },
      { id: "pom-frites", name: "بوم فريت", price: 25 },
      { id: "coleslaw", name: "كول سلو", price: 20 },
      { id: "cheese-fries", name: "بطاطس (جبنة)", price: 35 },
      { id: "fries-six", name: "بطاطس فري سكس", price: 35 },
      {
        id: "mozzarella-sticks",
        name: "موتزريلا ستكس",
        description: "3 صوابع موتزريلا.",
        price: 50,
        isNew: true,
      },
      {
        id: "onion-rings",
        name: "أونيون رينج",
        description: "5 حلقات.",
        price: 40,
        isNew: true,
      },
      {
        id: "cheddar-ranch-fries",
        name: "فرايز بالشيدر + رانش",
        price: 50,
        isNew: true,
      },
    ],
  },
  {
    id: "sauces",
    name: "الصوصات والإضافات",
    shortName: "صوصات",
    items: [
      { id: "toum-small", name: "تومية صغير", price: 15 },
      { id: "toum-large", name: "تومية كبير", price: 20 },
      { id: "ranch", name: "رانش", price: 20 },
      { id: "bbq-sauce", name: "باربيكيو", price: 20 },
      { id: "cheddar-sauce", name: "تشيدر", price: 20 },
      { id: "spicy-sauce", name: "سبايسي", price: 20 },
      { id: "texas-sauce", name: "تكساس", price: 20 },
      { id: "machine-add", name: "ماشين (إضافة)", price: 45 },
      { id: "can-add", name: "كان (إضافة)", price: 40 },
    ],
  },
  {
    id: "drinks",
    name: "المشروبات",
    shortName: "مشروبات",
    items: [
      {
        id: "egyptian-drinks",
        name: "مشروبات مصرية بأنواعها",
        price: 20,
        note: "اكتب النوع المطلوب في ملاحظات الصنف.",
      },
      { id: "small-water", name: "مياه معدنية صغيرة", price: 10 },
      {
        id: "canned-drinks",
        name: "كانز بأنواعه",
        price: 20,
        note: "اكتب النوع المطلوب في ملاحظات الصنف.",
      },
      {
        id: "one-half-liter",
        name: "لتر ونصف بأنواعه",
        price: 35,
        note: "اكتب النوع المطلوب في ملاحظات الصنف.",
      },
      { id: "big-pepsi-machine", name: "بيبسي ماشين كبير", price: 30 },
    ],
  },
];

export const allMenuItems = menuCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id, categoryName: category.name })),
);

export const featuredItems = allMenuItems.filter((item) => item.featured);

export const menuItemCount = allMenuItems.length;

export function getItemStartingPrice(item: MenuItem): number {
  if (typeof item.price === "number") return item.price;
  if (item.variants?.length) {
    return Math.min(...item.variants.map((variant) => variant.price));
  }
  return 0;
}

export function getItemPriceLabel(item: MenuItem): string {
  if (typeof item.price === "number") return `${item.price} ج.م`;
  const prices = item.variants?.map((variant) => variant.price) ?? [];
  if (!prices.length) return "—";
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `${min} ج.م` : `من ${min} ج.م`;
}

