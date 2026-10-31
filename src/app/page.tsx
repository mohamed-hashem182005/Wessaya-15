import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Featured } from "@/components/featured";
import { MenuSection } from "@/components/menu-section";
import { Story } from "@/components/story";
import { Gallery } from "@/components/gallery";
import { Delivery } from "@/components/delivery";
import { Contact } from "@/components/contact";
import { getConfiguredSiteUrl, siteConfig } from "@/data/site";

export default function Home() {
  const siteUrl = getConfiguredSiteUrl();

  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.nameAr,
    alternateName: [siteConfig.alternateName, siteConfig.nameEn, siteConfig.nameEnLegal],
    description: siteConfig.description,
    telephone: "+201211186419",
    servesCuisine: ["مشويات", "مأكولات سريعة", "بيتزا", "فرايد تشكن"],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: "EG",
    },
    foundingDate: String(siteConfig.since),
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
    ...(siteUrl
      ? {
          "@id": `${siteUrl}/#restaurant`,
          url: siteUrl,
          image: `${siteUrl}/og.jpg`,
          hasMenu: `${siteUrl}/menu`,
        }
      : {}),
  };

  return (
    <>
      <Hero />
      <Marquee />
      <Featured />
      <MenuSection />
      <Story />
      <Gallery />
      <Delivery />
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
    </>
  );
}
