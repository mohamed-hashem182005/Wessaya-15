"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/data/menu";
import { getItemPriceLabel, menuItemCount } from "@/data/menu";
import { ItemDialog } from "@/components/menu/item-dialog";
import { PlusIcon } from "@/components/icons";
import { useCart } from "@/components/cart/cart-provider";
import trayMixed from "@/assets/images/tray-mixed-crop.webp";
import burger from "@/assets/images/burger-crop.webp";
import pizzaPrep from "@/assets/images/pizza-prep.webp";

type FeaturedItem = MenuItem & {
  categoryId: string;
  categoryName: string;
};

const cardImages: Record<string, StaticImageData | string> = {
  "meal-wessaya-charcoal": "/card1.jpg",
  "meal-wessaya-family": "/card2.jpg",
  "roast-wessaya": "/card4.jpg",
  "pizza-mix-wessaya": pizzaPrep,
  "meal-mix-grill": "/card3.jpg",
  "big-roast-wessaya": burger,
};

function variantSummary(item: MenuItem): string | null {
  // Sizes are listed as labels only; the price line already shows the entry
  // price and the dialog carries the full per-size pricing.
  if (!item.variants || item.variants.length < 2) return null;
  return item.variants.map((variant) => variant.label).join(" · ");
}

export function FeaturedList({ items }: { items: FeaturedItem[] }) {
  const { addLine } = useCart();
  const [selected, setSelected] = useState<FeaturedItem | null>(null);
  const [open, setOpen] = useState(false);

  function handleAdd(item: FeaturedItem) {
    const hasVariants = Boolean(item.variants?.length);
    const hasExtras = Boolean(item.extras?.length);
    if (hasVariants || hasExtras) {
      setSelected(item);
      setOpen(true);
      return;
    }
    addLine({
      itemId: item.id,
      name: item.name,
      categoryName: item.categoryName,
      basePrice: item.price ?? 0,
      unitPrice: item.price ?? 0,
      quantity: 1,
      extras: [],
      variantId: undefined,
      variantLabel: undefined,
      note: "",
    });
  }

  return (
    <>
      <div className="scroll-thin -mx-5 mt-9 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:items-stretch sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {items.map((item) => {
          const image = cardImages[item.id] ?? trayMixed;
          const hasVariants = Boolean(item.variants?.length);
          const summary = variantSummary(item);

          return (
            <article
              key={item.id}
              className="card-lift group flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-ink/10 bg-[#fbf5ea] shadow-[0_12px_35px_rgba(60,30,10,0.06)] sm:w-auto"
            >
              <button
                type="button"
                aria-label={`اعرض تفاصيل ${item.name}`}
                className="image-zoom relative aspect-[4/5] w-full overflow-hidden text-start"
                onClick={() => {
                  setSelected(item);
                  setOpen(true);
                }}
              >
                <Image
                  src={image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover"
                  loading="lazy"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-70"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-3 top-3 flex flex-wrap items-start gap-1.5">
                  {item.isNew ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-ink/60 px-2.5 py-1 text-[0.72rem] font-bold text-cream backdrop-blur-sm">
                      جديد
                    </span>
                  ) : null}
                </span>
              </button>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-pomegranate">
                  {item.categoryName}
                </p>
                <h3 className="mt-1.5 font-sans text-[1.35rem] font-semibold leading-snug text-ink">
                  <button
                    type="button"
                    className="text-start transition-colors hover:text-red"
                    onClick={() => {
                      setSelected(item);
                      setOpen(true);
                    }}
                  >
                    {item.name}
                  </button>
                </h3>
                {item.description ? (
                  <p className="mt-1.5 line-clamp-2 min-h-0 text-[0.9rem] leading-[1.65] text-ink/75 sm:min-h-[3.1rem]">
                    {item.description}
                  </p>
                ) : (
                  <p className="mt-1.5 min-h-0 sm:min-h-[3.1rem]" />
                )}
                <div className="mt-4 flex items-end justify-between gap-3 border-t border-ink/10 pt-3.5">
                  <div>
                    {hasVariants ? (
                      <p className="text-[0.75rem] font-semibold text-ink/65">يبدأ من</p>
                    ) : null}
                    <p className="font-sans text-[1.15rem] font-bold leading-none text-ink">
                      {getItemPriceLabel(item)}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`أضف ${item.name} إلى السلة`}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pomegranate text-cream transition-colors hover:bg-pomegranate-deep"
                    onClick={() => handleAdd(item)}
                  >
                    <PlusIcon className="size-[17px]" />
                  </button>
                </div>
                {summary ? (
                  <p className="mt-2 text-[0.78rem] leading-[1.6] text-ink/65">{summary}</p>
                ) : null}
              </div>
            </article>
          );
        })}
        <Link
          href="/menu"
          className="featured-promo group relative flex min-h-[26rem] w-[82vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-card bg-ink p-6 text-cream shadow-[0_18px_45px_rgba(12,11,9,0.25)] sm:w-auto sm:min-h-0"
        >
          <div className="pointer-events-none absolute -top-16 start-1/3 h-40 w-40 rounded-full bg-red/20 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow text-cheddar">المنيو كامل</p>
            <h3 className="display-title mt-4 text-[1.9rem] leading-[1.15] text-cream">
              كل حاجة…
              <br />
              <span className="text-cheddar">في مكان واحد.</span>
            </h3>
            <p className="mt-4 max-w-xs text-[0.9rem] leading-[1.7] text-cream/90">
              {menuItemCount} صنف في 16 فئة — بيتزا، برجر، مشويات، كريب وغيرها.
            </p>
          </div>
          <div className="relative mt-8 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-[0.9rem] font-bold text-cream">
              استكشف المنيو
            </span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cheddar text-ink transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rtl:rotate-180"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      <p className="mt-3 flex items-start gap-2 text-[0.8rem] leading-[1.65] text-ink/70">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 shrink-0"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8h.01" />
        </svg>
        الأسعار من منيو 9 أكتوبر 2025 وقد تتغير. السعر النهائي يتم تأكيده مع المطعم.
      </p>

      <ItemDialog
        key={open ? (selected?.id ?? "open") : "closed"}
        item={selected}
        categoryName={selected?.categoryName ?? ""}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}



















