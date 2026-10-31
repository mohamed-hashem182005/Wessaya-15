import Link from "next/link";
import { menuCategories, menuItemCount, type MenuCategory } from "@/data/menu";
import { formatCount, formatPrice } from "@/lib/format";
import { MenuFacility, MenuSourceCard } from "@/components/menu/menu-notes";
import { ArrowLeftIcon } from "@/components/icons";
import { SectionDeco } from "@/components/section-deco";
import { SectionHook } from "@/components/section-hook";

function getCategoryStartingPrice(category: MenuCategory): number | null {
  const prices = category.items.flatMap((item) =>
    item.variants?.length ? item.variants.map((variant) => variant.price) : item.price ? [item.price] : [],
  );

  return prices.length ? Math.min(...prices) : null;
}

export function MenuSection() {
  return (
    <section id="menu" className="menu-section menu-preview section-pad scroll-mt-24 has-deco">
      <SectionDeco />
      <div className="container-page">
        <div className="menu-section__head">
          <div className="menu-section__intro">
            <p className="eyebrow">دليل المنيو</p>
            <h2 className="section-title">
              ستة عشر بابًا
              <span className="section-title__accent">تبدأ منها.</span>
            </h2>
            <p className="section-lead">
              {formatCount(menuItemCount)} صنف على {formatCount(menuCategories.length)} فئة — دي
              خريطة المنيو وبداية الأسعار. صفحة المنيو فيها كل الأصناف مع البحث والفلترة
              والتفاصيل.
            </p>
            <SectionHook>كل واحد نفسه في حاجة ووصايه مجمعلك كل حاجة</SectionHook>
          </div>

          <MenuSourceCard />
        </div>

        <div className="menu-preview__grid">
          {menuCategories.map((category, index) => {
            const startingPrice = getCategoryStartingPrice(category);

            return (
              <Link
                key={category.id}
                href={`/menu#category-${category.id}`}
                className="menu-preview__row"
              >
                <span className="menu-preview__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="menu-preview__name">{category.name}</span>
                <span className="menu-preview__meta">{formatCount(category.items.length)} صنف</span>
                <span className="menu-preview__price">
                  {startingPrice !== null ? `من ${formatPrice(startingPrice)}` : "—"}
                </span>
                <ArrowLeftIcon className="menu-preview__arrow size-4" />
              </Link>
            );
          })}
        </div>

        <div className="menu-preview__cta">
          <div className="menu-preview__cta-copy">
            <p className="menu-preview__cta-kicker">كل الأصناف والتفاصيل</p>
            <h3>المنيو كامل، على صفحة واحدة.</h3>
            <p>ابحث بالاسم، فلتر بالفئة، واختار الأحجام والإضافات قبل ما تضيف للسلة.</p>
          </div>
          <Link href="/menu" className="btn btn--saffron">
            افتح المنيو الكامل
            <ArrowLeftIcon className="size-4" />
          </Link>
        </div>

        <MenuFacility />
      </div>
    </section>
  );
}
