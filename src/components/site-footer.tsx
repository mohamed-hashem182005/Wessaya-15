import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { getWhatsAppUrl, siteConfig } from "@/data/site";
import {
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";

const footerLinks = [
  { href: "/menu", label: "المنيو" },
  { href: "/#featured", label: "أصنافنا" },
  { href: "/#story", label: "حكايتنا" },
  { href: "/#gallery", label: "الصور" },
  { href: "/#delivery", label: "التوصيل" },
  { href: "/#contact", label: "تواصل" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-page">
        <div className="site-footer__masthead">
          <p className="site-footer__kicker">WESSAYA 15 ST. · SOHAG · EGYPT</p>
          <p className="site-footer__statement">استمتع بأصل الطعم.</p>
        </div>

        <div className="site-footer__top">
          <div className="site-footer__brand">
            <div className="brand brand--footer">
              <Link href="/" className="brand__logo" aria-label="وصايه الـــ 15 — الرئيسية">
                <Image src={logo} alt="" width={52} height={52} sizes="52px" />
              </Link>
              <Link href="/" className="brand__text">
                <span className="brand__name">وصايه الـــ 15</span>
                <span className="brand__sub">WESSAYA 15 · SOHAG</span>
              </Link>
            </div>
            <p className="site-footer__tagline">استمتع بأصل الطعم</p>
            <p className="site-footer__desc">
              مشويات على الفحم، فرايد تشكن، بيتزا وكريب — من شارع 15 بسوهاج، منذ 2007.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--whatsapp"
            >
              <WhatsAppIcon className="size-4" />
              اطلب على واتساب
            </a>
          </div>

          <nav className="site-footer__nav" aria-label="روابط الموقع">
            <h2>الموقع</h2>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <h2>تواصل</h2>
            <a href={`tel:${siteConfig.phones[0].tel}`} className="site-footer__contact-link">
              <PhoneIcon className="size-4" />
              <span dir="ltr">{siteConfig.whatsappDisplay}</span>
            </a>
            <a
              href={siteConfig.mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__contact-link"
            >
              <MapPinIcon className="size-4" />
              <span>{siteConfig.address.full}</span>
            </a>
            <div className="site-footer__social">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="صفحة فيسبوك"
                className="icon-btn icon-btn--light"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="حساب إنستجرام"
                className="icon-btn icon-btn--light"
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer__notes">
          <p>
            الأسعار من منيو منشور بتاريخ {siteConfig.menu.updated}. الأسعار والتوافر ورسوم
            التوصيل تتأكد مع المطعم عبر واتساب.
          </p>
          <p>
            الموقع تعريفي للطلب عبر واتساب — لا يستقبل مدفوعات ولا يرسل الطلبات تلقائيًا.
            بيانات الطلب تتبعت في رسالة واتساب فقط.
          </p>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.nameAr}. جميع الحقوق محفوظة.
          </p>
          <p className="site-footer__latin">WESSAYA 15 ST. · SOHAG · EGYPT</p>
          <p className="site-footer__source">
            صور من صفحة المطعم ومن دلائل المطاعم. المنيو: {siteConfig.menu.sourceName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
