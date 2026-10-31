import Image from "next/image";
import Link from "next/link";
import heroPoster from "@/assets/images/hero-poster.webp";
import { getWhatsAppUrl, siteConfig } from "@/data/site";
import { ArrowLeftIcon, WhatsAppIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media" aria-hidden="true">
        <Image
          src={heroPoster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero__image"
          placeholder="blur"
        />
        <span className="hero__scrim" />
        <span className="hero__grain" />
      </div>

      <div className="container-page hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__rule" aria-hidden="true" />
            <span className="latin-label">EST. 2007</span>
            <span className="hero__dot" aria-hidden="true" />
            شارع 15 · سوهاج
          </p>

          <h1 className="hero__title">
            <span className="hero__title-line">على الفحم،</span>
            <span className="hero__title-line hero__title-line--accent">من قلب شارع 15.</span>
          </h1>

          <p className="hero__lead">
            مشويات على الفحم، فرايد تشكن، بيتزا، كريب ووجبات عائلية. اختار من منيو وصايه
            الـــ 15، جهّز طلبك، وابعته واتساب.
          </p>

          <div className="hero__actions">
            <Link href="/menu" className="btn btn--saffron">
              شوف المنيو
              <ArrowLeftIcon className="size-4" />
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline-light"
            >
              <WhatsAppIcon className="size-5" />
              اطلب على واتساب
            </a>
          </div>

          <p className="hero__micro">
            الطلب عبر واتساب — بدون دفع أونلاين — التأكيد من المطعم.
          </p>
        </div>

        <aside className="hero__side" aria-label="معلومات المطعم">
          <div className="hero__menu-card">
            <span className="hero__menu-label">المنيو المنشور</span>
            <strong className="hero__menu-date">{siteConfig.menu.updated}</strong>
            <span className="hero__menu-note">أسعار وتوافر تتأكد عبر واتساب</span>
          </div>

          <ul className="hero__facts">
            <li>مشويات على الفحم</li>
            <li>صالة عائلية مكيفة</li>
            <li>من 2007</li>
          </ul>
        </aside>
      </div>

      <div className="hero__bottom">
        <div className="container-page hero__bottom-inner">
          <p className="hero__bottom-cats">
            مشويات · فرايد تشكن · بيتزا · كريب · وجبات عائلية
          </p>
          <Link href="/menu" className="hero__scroll" aria-label="افتح صفحة المنيو">
            <span>كل المنيو</span>
            <ArrowLeftIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
