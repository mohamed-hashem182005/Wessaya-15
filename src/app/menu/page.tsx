import type { Metadata } from "next";
import Link from "next/link";
import { menuCategories, menuItemCount } from "@/data/menu";
import { getConfiguredSiteUrl, siteConfig } from "@/data/site";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { MenuFacility, MenuSourceCard } from "@/components/menu/menu-notes";
import { SectionDeco } from "@/components/section-deco";

const configuredUrl = getConfiguredSiteUrl();

export const metadata: Metadata = {
  title: "المنيو الكامل",
  description: `كل أصناف مطعم وصايه الـــ 15 على صفحة واحدة — ${menuItemCount} صنف من الوجبات والمشويات والبيتزا والكريب. ابحث وفلتر واختار طلبك.`,
  ...(configuredUrl
    ? {
        alternates: {
          canonical: "/menu",
        },
      }
    : {}),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: siteConfig.nameAr,
    url: configuredUrl ? "/menu" : undefined,
    title: `المنيو الكامل | ${siteConfig.nameAr}`,
    description: `كل أصناف مطعم وصايه الـــ 15 — ${menuItemCount} صنف مع الأسعار والتفاصيل.`,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "منيو وصايه الـــ 15 — مشويات وفرايد تشكن وبيتزا وكريب",
      },
    ],
  },
};

export default function MenuPage() {
  return (
    <div className="menu-page">
      <div className="menu-hero-band has-deco">
        <SectionDeco />
        <div className="container-page">
          <nav className="breadcrumb" aria-label="مسار الصفحة">
            <Link href="/">الرئيسية</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">المنيو</span>
          </nav>

          <header className="menu-page__head">
            <div className="menu-page__intro">
              <p className="eyebrow">المنيو الكامل · {menuItemCount} صنف</p>
              <h1 className="section-title menu-page__title">
                المنيو
                <span className="section-title__accent">كله هنا.</span>
              </h1>
              <p className="section-lead">
                {menuCategories.length} فئة من الوجبات والمشويات والبيتزا والكريب. ابحث بالاسم،
                فلتر بالفئة، واختار الحجم أو الإضافات قبل ما تضيف للسلة.
              </p>
            </div>

            <div className="menu-page__meta">
              <MenuSourceCard />
            </div>
          </header>
        </div>
      </div>

      <div className="container-page">
        <MenuBrowser categories={menuCategories} itemCount={menuItemCount} />

        <MenuFacility />
      </div>
    </div>
  );
}
