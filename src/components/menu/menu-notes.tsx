import { siteConfig } from "@/data/site";
import { ExternalLinkIcon, InfoIcon } from "@/components/icons";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export function MenuSourceCard() {
  return (
    <aside className="menu-source-card" aria-label="مصدر الأسعار">
      <div className="menu-source-card__top">
        <Image src={logo} alt="وصايه الـــ 15" width={28} height={28} className="menu-source-card__logo" />
        <span>مصدر المنيو</span>
      </div>
      <p className="menu-source-card__title">آخر منيو منشور</p>
      <p className="menu-source-card__date">{siteConfig.menu.updated}</p>
      <a
        href={siteConfig.menu.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="menu-source-card__link"
      >
        {siteConfig.menu.sourceName}
        <ExternalLinkIcon className="size-3.5" />
      </a>
      <p className="menu-source-card__note">
        <InfoIcon className="size-4 shrink-0" />
        <span>الأسعار والتوافر ممكن يكونوا اتغيروا. أكد مع المطعم قبل الطلب.</span>
      </p>
    </aside>
  );
}

export function MenuFacility() {
  return (
    <div className="menu-facility">
      <span className="menu-facility__badge" aria-hidden="true">
        عائلات
      </span>
      <p>يوجد صالة مكيفة الهواء خاصة للعائلات بالدور الثاني خلف المطعم.</p>
      <span className="menu-facility__source">بحسب منيو المطعم</span>
    </div>
  );
}

