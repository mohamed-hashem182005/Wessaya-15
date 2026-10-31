export const siteConfig = {
  nameAr: "وصايه الـــ 15",
  nameEn: "Wessaya 15",
  nameEnLegal: "WESAYA 15 ST.",
  alternateName: "وصاية 15",
  tagline: "استمتع بأصل الطعم",
  description:
    "مطعم وصايه الـــ 15 في شارع 15 بسوهاج — مشويات على الفحم، فرايد تشكن، بيتزا، كريب ووجبات عائلية منذ 2007. اطلب من المنيو عبر واتساب.",
  since: 2007,
  address: {
    street: "شارع 15",
    city: "سوهاج",
    country: "مصر",
    full: "شارع 15، سوهاج، مصر",
  },
  whatsappNumber: "201211186419",
  whatsappDisplay: "01211186419",
  phones: [
    { label: "موبايل / واتساب", value: "01211186419", tel: "+201211186419", whatsapp: true },
    { label: "خط أرضي", value: "093 2104006", tel: "+20932104006", whatsapp: false },
    { label: "خط أرضي", value: "093 2104005", tel: "+20932104005", whatsapp: false },
    { label: "خط أرضي", value: "093 2104002", tel: "+20932104002", whatsapp: false },
  ],
  social: {
    facebook: "https://www.facebook.com/Wessaya15.st/",
    instagram: "https://www.instagram.com/wesaya_sohag/",
  },
  menu: {
    updated: "9 أكتوبر 2025",
    sourceUrl: "https://menuegypt.com/ar/%D9%88%D8%B5%D8%A7%D9%8A%D9%87-%D8%A7%D9%84%D9%80%D9%80%D9%80-15/%D8%B3%D9%88%D9%87%D8%A7%D8%AC",
    sourceName: "Menu Egypt",
  },
  hours: {
    display: "يوميًا من 10:00 صباحًا إلى 2:00 بعد منتصف الليل",
    note: "المواعيد منقولة من دلائل المطاعم وليست مؤكدة من الصفحة الرسمية. أكد قبل الزيارة أو الطلب.",
  },
  mapSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=%D9%88%D8%B5%D8%A7%D9%8A%D9%87+15+%D8%B4%D8%A7%D8%B1%D8%B9+15+%D8%B3%D9%88%D9%87%D8%A7%D8%AC",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=%D9%88%D8%B5%D8%A7%D9%8A%D9%87+15+%D8%B4%D8%A7%D8%B1%D8%B9+15+%D8%B3%D9%88%D9%87%D8%A7%D8%AC",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=26.5569,31.6948&output=embed&z=15",
  coordinates: {
    lat: 26.5569,
    lng: 31.6948,
  },
} as const;

export function getConfiguredSiteUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString().replace(/\/+$/, "");
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  return getConfiguredSiteUrl() ?? "http://localhost:3000";
}

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function getDirectionsUrl(): string {
  return siteConfig.mapSearchUrl;
}
