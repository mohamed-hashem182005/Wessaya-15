"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/logo.png";
import { useCart } from "@/components/cart/cart-provider";
import { getWhatsAppUrl, siteConfig } from "@/data/site";
import { cn } from "@/lib/format";
import {
  CartIcon,
  FacebookIcon,
  InstagramIcon,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/icons";

const navLinks = [
  { href: "/menu", label: "المنيو" },
  { href: "/#featured", label: "أصنافنا" },
  { href: "/#story", label: "حكايتنا" },
  { href: "/#gallery", label: "الصور" },
  { href: "/#delivery", label: "التوصيل" },
  { href: "/#contact", label: "تواصل" },
];

const mobileLinks = [{ href: "/", label: "الرئيسية" }, ...navLinks];

export function SiteHeader() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDialogElement>(null);
  const onDark = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const dialog = navRef.current;
    if (!dialog) return;
    if (navOpen && !dialog.open) dialog.showModal();
    if (!navOpen && dialog.open) dialog.close();
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [navOpen]);

  function closeNav() {
    setNavOpen(false);
  }

  return (
    <header className={cn("site-header", scrolled && "is-scrolled", onDark && "on-dark")}>
      <div className="container-page site-header__inner">
        <Link href="/" className="brand" aria-label="وصايه الـــ 15 — الرئيسية">
          <span className="brand__logo">
            <Image src={logo} alt="" width={44} height={44} priority sizes="44px" />
          </span>
          <span className="brand__text">
            <span className="brand__name">وصايه الـــ 15</span>
            <span className="brand__sub">WESSAYA 15 · SOHAG</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => {
            const isActive = link.href === "/menu" && pathname === "/menu";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn("desktop-nav__link", isActive && "is-active")}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="header-wa"
            aria-label="اطلب على واتساب"
          >
            <WhatsAppIcon className="size-4" />
            <span>اطلب واتساب</span>
          </a>
          <button
            type="button"
            className="cart-btn"
            onClick={openCart}
            aria-label={count > 0 ? `افتح السلة — ${count} صنف` : "افتح السلة — فاضية"}
            aria-haspopup="dialog"
          >
            <CartIcon className="size-5" />
            {count > 0 ? (
              <span className="cart-btn__count" aria-hidden="true">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setNavOpen(true)}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            aria-label="افتح القائمة"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>

      <dialog
        ref={navRef}
        id="mobile-nav"
        className="nav-dialog"
        aria-labelledby="mobile-nav-title"
        onClose={closeNav}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeNav();
        }}
      >
        <div className="nav-panel">
          <div className="nav-panel__head">
            <div className="brand brand--static">
              <span className="brand__logo">
                <Image src={logo} alt="" width={44} height={44} sizes="44px" />
              </span>
              <span className="brand__text">
                <span className="brand__name" id="mobile-nav-title">
                  وصايه الـــ 15
                </span>
                <span className="brand__sub">WESSAYA 15 · SOHAG</span>
              </span>
            </div>
            <button type="button" className="icon-btn icon-btn--light" onClick={closeNav} aria-label="إغلاق القائمة">
              <XIcon className="size-5" />
            </button>
          </div>

          <nav className="nav-panel__links" aria-label="قائمة الموبايل">
            {mobileLinks.map((link, index) => {
              const isActive = link.href === "/menu" && pathname === "/menu";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn("nav-panel__link", isActive && "is-active")}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeNav}
                >
                  <span className="nav-panel__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-panel__footer">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--whatsapp btn--wide"
              onClick={closeNav}
            >
              <WhatsAppIcon className="size-5" />
              اطلب على واتساب
            </a>
            <div className="nav-panel__contact">
              <a href={`tel:${siteConfig.phones[0].tel}`} className="nav-panel__phone">
                <PhoneIcon className="size-4" />
                <span dir="ltr">{siteConfig.whatsappDisplay}</span>
              </a>
              <div className="nav-panel__social">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn icon-btn--light"
                  aria-label="صفحة فيسبوك"
                >
                  <FacebookIcon className="size-5" />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn icon-btn--light"
                  aria-label="حساب إنستجرام"
                >
                  <InstagramIcon className="size-5" />
                </a>
              </div>
            </div>
            <p className="nav-panel__note">
              الأسعار من منيو {siteConfig.menu.updated} — تتأكد عبر واتساب.
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
