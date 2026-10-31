"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import storefront from "@/assets/images/storefront.webp";
import pizzaCraft from "@/assets/images/pizza-craft.webp";
import trayMixed from "@/assets/images/tray-mixed-crop.webp";
import burger from "@/assets/images/burger-crop.webp";
import pizzaPrep from "@/assets/images/pizza-prep.webp";
import trayChicken from "@/assets/images/tray-chicken-crop.webp";
import trayKofta from "@/assets/images/tray-kofta-crop.webp";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  XIcon,
} from "@/components/icons";
import { siteConfig } from "@/data/site";
import { SectionDeco } from "@/components/section-deco";
import { SectionHook } from "@/components/section-hook";

type GalleryItem = {
  src: StaticImageData;
  alt: string;
  caption: string;
  className: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: storefront,
    alt: "واجهة مطعم وصايه الـــ 15 في شارع 15 بسوهاج",
    caption: "واجهة المطعم — شارع 15",
    className: "gallery__item--feature",
  },
  {
    src: pizzaCraft,
    alt: "تحضير البيتزا خطوة بخطوة في مطبخ وصايه الـــ 15",
    caption: "تحضير البيتزا",
    className: "gallery__item--tall",
  },
  {
    src: trayMixed,
    alt: "صينية مشويات من صور مطعم وصايه الـــ 15",
    caption: "صينية مشويات",
    className: "",
  },
  {
    src: burger,
    alt: "برجر بالجبنة من صور مطعم وصايه الـــ 15",
    caption: "برجر بالجبنة",
    className: "",
  },
  {
    src: pizzaPrep,
    alt: "إضافة مكونات البيتزا قبل الخبز",
    caption: "بيتزا قبل الخبز",
    className: "gallery__item--tall",
  },
  {
    src: trayChicken,
    alt: "صينية دجاج مشوي من صور مطعم وصايه الـــ 15",
    caption: "دجاج مشوي",
    className: "",
  },
  {
    src: trayKofta,
    alt: "صينية كفتة مشوية من صور مطعم وصايه الـــ 15",
    caption: "كفتة مشوية",
    className: "",
  },
];

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = activeIndex !== null;
  const activeItem = activeIndex !== null ? galleryItems[activeIndex] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  function showPrevious() {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + galleryItems.length) % galleryItems.length,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % galleryItems.length,
    );
  }

  return (
    <section id="gallery" className="gallery section-pad has-deco">
      <SectionDeco />
      <div className="container-page">
        <div className="gallery__head">
          <div>
            <p className="eyebrow eyebrow--dark">من المطعم</p>
            <h2 className="section-title section-title--light">
              لقطات من
              <span className="section-title__accent">عندنا.</span>
            </h2>
          </div>
          <p className="gallery__intro">
            صور من صفحة المطعم ومن صور منشورة على دلائل المطاعم. اضغط على أي صورة تشوفها
            أكبر.
          </p>
        </div>

        <SectionHook>التفاصيل هتخليك تاكلها بعينيك</SectionHook>

        <div className="gallery__grid">
          {galleryItems.map((item, index) => (
            <button
              key={`${item.caption}-${index}`}
              type="button"
              className={`gallery__item ${item.className}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`عرض صورة: ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="gallery__img"
                placeholder="blur"
  loading="lazy"
              />
              <span className="gallery__shade" aria-hidden="true" />
              <span className="gallery__caption">{item.caption}</span>
            </button>
          ))}
        </div>

        <p className="gallery__source">
          <ExternalLinkIcon className="size-3.5" />
          بعض الصور من الصفحة الرسمية للمطعم على فيسبوك ومن صور منشورة على دلائل المطاعم.
        </p>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="معرض صور المطعم"
        onClose={() => setActiveIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveIndex(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showNext();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            showPrevious();
          }
        }}
      >
        {activeItem ? (
          <div className="lightbox__panel">
            <div className="lightbox__top">
              <span className="lightbox__counter">
                {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(galleryItems.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="icon-btn icon-btn--light"
                onClick={() => setActiveIndex(null)}
                aria-label="إغلاق الصورة"
              >
                <XIcon className="size-5" />
              </button>
            </div>
            <div className="lightbox__image-wrap">
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                sizes="90vw"
                className="lightbox__image"
                placeholder="blur"
  loading="lazy"
              />
            </div>
            <div className="lightbox__bottom">
              <p>{activeItem.caption}</p>
              <div className="lightbox__nav">
                <button type="button" className="icon-btn icon-btn--light" onClick={showPrevious} aria-label="الصورة السابقة">
                  <ChevronRightIcon className="size-5" />
                </button>
                <button type="button" className="icon-btn icon-btn--light" onClick={showNext} aria-label="الصورة التالية">
                  <ChevronLeftIcon className="size-5" />
                </button>
              </div>
            </div>
            <p className="lightbox__note">
              صور من المطعم — التفاصيل والأطباق المتاحة تتأكد من {siteConfig.nameAr}.
            </p>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
