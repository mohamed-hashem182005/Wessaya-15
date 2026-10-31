"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import type { MenuCategory, MenuItem } from "@/data/menu";
import { getItemPriceLabel } from "@/data/menu";
import { getCategoryImage } from "@/data/menu-images";
import { formatCount, normalizeArabic } from "@/lib/format";
import { ItemDialog } from "@/components/menu/item-dialog";
import { PlusIcon, SearchIcon, UtensilsIcon, XIcon } from "@/components/icons";

type MenuBrowserProps = {
  categories: MenuCategory[];
  itemCount: number;
};

type SelectedItem = {
  item: MenuItem;
  categoryName: string;
};

type FilteredCategory = {
  category: MenuCategory;
  items: MenuItem[];
};

function variantSummary(item: MenuItem): string | null {
  // Sizes are listed as labels only; the price line already shows the entry
  // price and the dialog carries the full per-size pricing. This keeps the
  // compact card free of duplicated numbers.
  if (!item.variants || item.variants.length < 2) return null;
  return item.variants.map((variant) => variant.label).join(" · ");
}

function MenuCard({
  item,
  categoryId,
  onOpen,
}: {
  item: MenuItem;
  categoryId: string;
  onOpen: (item: MenuItem) => void;
}) {
  const hasVariants = Boolean(item.variants?.length);
  const hasExtras = Boolean(item.extras?.length);
  const summary = variantSummary(item);
  const image = getCategoryImage(categoryId);

  return (
    <article className={`menu-card${item.featured ? " menu-card--signature" : ""}`}>
      <span className="menu-card__thumb" aria-hidden="true">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="5rem"
            className="menu-card__thumb-img"
            loading="lazy"
          />
        ) : (
          <span className="menu-card__thumb-crest">
            <span className="menu-card__thumb-mark">W</span>
            <span className="menu-card__thumb-rule" />
          </span>
        )}
      </span>

      <div className="menu-card__content">
        <div className="menu-card__head">
          <h3 className="menu-card__title">{item.name}</h3>
          {item.isNew ? <span className="new-stamp">جديد</span> : null}
          {item.featured ? <span className="menu-card__signature">اختيار</span> : null}
        </div>
        {item.description ? <p className="menu-card__description">{item.description}</p> : null}
        {item.note ? <p className="menu-card__note">{item.note}</p> : null}
        {summary ? <p className="menu-card__sizes">{summary}</p> : null}
      </div>

      <div className="menu-card__aside">
        <span className="menu-card__price">{getItemPriceLabel(item)}</span>
        <button
          type="button"
          className="menu-card__add"
          onClick={() => onOpen(item)}
          aria-label={`${hasVariants || hasExtras ? "اختار وأضف" : "أضف"} ${item.name} للسلة`}
        >
          <PlusIcon className="size-4" />
          <span>{hasVariants || hasExtras ? "اختار" : "أضف"}</span>
        </button>
      </div>
    </article>
  );
}

export function MenuBrowser({ categories, itemCount }: MenuBrowserProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<SelectedItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeArabic(deferredQuery);

  const filteredCategories = useMemo<FilteredCategory[]>(() => {
    const scoped =
      activeCategory === "all"
        ? categories
        : categories.filter((category) => category.id === activeCategory);

    return scoped
      .map((category) => {
        const categoryMatches = normalizeArabic(category.name).includes(normalizedQuery);
        const items = normalizedQuery
          ? categoryMatches
            ? category.items
            : category.items.filter((item) => {
                const haystack = normalizeArabic(
                  [item.name, item.description, item.keywords, item.note]
                    .filter(Boolean)
                    .join(" "),
                );
                return haystack.includes(normalizedQuery);
              })
          : category.items;
        return { category, items };
      })
      .filter((entry) => entry.items.length > 0);
  }, [activeCategory, categories, normalizedQuery]);

  const resultCount = filteredCategories.reduce((total, entry) => total + entry.items.length, 0);
  const hasFilter = Boolean(query.trim()) || activeCategory !== "all";

  function openItem(item: MenuItem, categoryName: string) {
    setSelected({ item, categoryName });
    setDialogOpen(true);
  }

  function resetFilters() {
    setQuery("");
    setActiveCategory("all");
  }

  return (
    <div>
      <div className="menu-toolbar">
        <div className="menu-search">
          <label htmlFor="menu-search" className="sr-only">
            ابحث في المنيو
          </label>
          <SearchIcon className="menu-search__icon" aria-hidden="true" />
          <input
            id="menu-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="دور على وجبة، بيتزا، كريب…"
            className="menu-search__input"
            autoComplete="off"
            aria-controls="menu-results"
          />
          {query ? (
            <button
              type="button"
              className="menu-search__clear"
              onClick={() => setQuery("")}
              aria-label="مسح البحث"
            >
              <XIcon className="size-4" />
            </button>
          ) : null}
        </div>

        <div className="menu-chips" role="group" aria-label="تصفية حسب الفئة">
          <button
            type="button"
            className="menu-chip"
            aria-pressed={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          >
            الكل
            <span className="menu-chip__count">{formatCount(itemCount)}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="menu-chip"
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.shortName}
              <span className="menu-chip__count">{formatCount(category.items.length)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="menu-results-meta">
        <p aria-live="polite">
          {hasFilter ? (
            <>
              <strong>{formatCount(resultCount)}</strong> صنف مطابق
              {normalizedQuery ? (
                <>
                  {" "}
                  لـ «<span className="menu-results-meta__query">{deferredQuery.trim()}</span>»
                </>
              ) : null}
            </>
          ) : (
            <>
              <strong>{formatCount(itemCount)}</strong> صنف في المنيو — اختار الفئة أو ابحث.
            </>
          )}
        </p>
        {hasFilter ? (
          <button type="button" className="text-link" onClick={resetFilters}>
            مسح الفلاتر
          </button>
        ) : null}
      </div>

      <div id="menu-results">
        {filteredCategories.length ? (
          <div className="menu-groups">
            {filteredCategories.map(({ category, items }) => {
              const categoryIndex = categories.findIndex((entry) => entry.id === category.id);
              return (
                <section
                  key={category.id}
                  id={`category-${category.id}`}
                  className="menu-group"
                  aria-labelledby={`category-title-${category.id}`}
                >
                  <div className="menu-group__head">
                    <span className="menu-group__number" aria-hidden="true">
                      {String(categoryIndex + 1).padStart(2, "0")}
                    </span>
                    <h2 id={`category-title-${category.id}`} className="menu-group__title">
                      {category.name}
                    </h2>
                    <span className="menu-group__line" aria-hidden="true" />
                    <span className="menu-group__count">{formatCount(items.length)} صنف</span>
                  </div>
                  <div className="menu-grid">
                    {items.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        categoryId={category.id}
                        onOpen={(selectedItem) => openItem(selectedItem, category.name)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="menu-empty" role="status">
            <div className="menu-empty__icon">
              <UtensilsIcon className="size-7" />
            </div>
            <h3>مفيش نتايج مطابقة</h3>
            <p>جرّب كلمة أبسط أو اختار فئة تانية. كل المنيو موجود في القائمة فوق.</p>
            <button type="button" className="btn btn--dark" onClick={resetFilters}>
              رجّع كل المنيو
            </button>
          </div>
        )}
      </div>

      <ItemDialog
        key={dialogOpen ? (selected?.item.id ?? "open") : "closed"}
        item={selected?.item ?? null}
        categoryName={selected?.categoryName ?? ""}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}
