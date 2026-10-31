"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { MinusIcon, PlusIcon, XIcon } from "@/components/icons";

type ItemDialogProps = {
  item: MenuItem | null;
  categoryName: string;
  open: boolean;
  onClose: () => void;
};

export function ItemDialog({ item, categoryName, open, onClose }: ItemDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const { addLine, notify } = useCart();
  const [variantId, setVariantId] = useState(() => item?.variants?.[0]?.id ?? "");
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const selectedVariant = useMemo(
    () => item?.variants?.find((variant) => variant.id === variantId) ?? null,
    [item, variantId],
  );

  const basePrice = selectedVariant?.price ?? item?.price ?? 0;

  const availableExtras = useMemo(() => {
    if (!item?.extras || !selectedVariant) return [];
    return item.extras.filter((extra) => extra.prices[selectedVariant.id] !== undefined);
  }, [item, selectedVariant]);

  const selectedExtras = useMemo(
    () =>
      availableExtras
        .filter((extra) => extraIds.includes(extra.id))
        .map((extra) => ({
          id: extra.id,
          label: extra.label,
          price: selectedVariant ? extra.prices[selectedVariant.id] : 0,
        })),
    [availableExtras, extraIds, selectedVariant],
  );

  const extrasTotal = selectedExtras.reduce((total, extra) => total + extra.price, 0);
  const unitPrice = basePrice + extrasTotal;
  const total = unitPrice * quantity;

  function handleAdd() {
    if (!item) return;
    addLine({
      itemId: item.id,
      name: item.name,
      categoryName,
      basePrice,
      unitPrice,
      quantity,
      variantId: selectedVariant?.id,
      variantLabel: selectedVariant?.label,
      extras: selectedExtras,
      note: note.trim() || undefined,
    });
    notify(`اتضاف ${item.name} للسلة`);
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="item-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {item ? (
        <div className="item-dialog__panel">
          <div className="item-dialog__top">
            <div>
              <p className="item-dialog__kicker">{categoryName}</p>
              <h2 id={titleId} className="item-dialog__title">
                {item.name}
                {item.isNew ? <span className="new-stamp">جديد</span> : null}
              </h2>
            </div>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="إغلاق">
              <XIcon className="size-5" />
            </button>
          </div>

          <div className="item-dialog__body">
            {item.description ? <p className="item-dialog__description">{item.description}</p> : null}
            {item.note ? <p className="item-dialog__note">{item.note}</p> : null}

            {item.variants?.length ? (
              <fieldset className="item-dialog__fieldset">
                <legend className="item-dialog__legend">
                  {item.variants.every((variant) => variant.price === item.variants?.[0].price)
                    ? "اختيارك"
                    : "الحجم"}
                </legend>
                <div className="choice-row">
                  {item.variants.map((variant) => (
                    <label key={variant.id} className="choice-pill">
                      <input
                        type="radio"
                        name={`variant-${item.id}`}
                        value={variant.id}
                        checked={variantId === variant.id}
                        onChange={() => {
                          setVariantId(variant.id);
                          setExtraIds([]);
                        }}
                        className="sr-only"
                      />
                      <span className="choice-pill__label">
                        {variant.label}
                        <span className="choice-pill__price">{formatPrice(variant.price)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {availableExtras.length ? (
              <fieldset className="item-dialog__fieldset">
                <legend className="item-dialog__legend">إضافات اختيارية</legend>
                <div className="choice-stack">
                  {availableExtras.map((extra) => {
                    const price = selectedVariant ? extra.prices[selectedVariant.id] : 0;
                    return (
                      <label key={extra.id} className="check-row">
                        <input
                          type="checkbox"
                          checked={extraIds.includes(extra.id)}
                          onChange={() =>
                            setExtraIds((current) =>
                              current.includes(extra.id)
                                ? current.filter((id) => id !== extra.id)
                                : [...current, extra.id],
                            )
                          }
                          className="check-row__input"
                        />
                        <span className="check-row__box" aria-hidden="true" />
                        <span className="check-row__label">{extra.label}</span>
                        <span className="check-row__price">+ {formatPrice(price)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            <div className="item-dialog__fieldset">
              <label htmlFor={`note-${item.id}`} className="item-dialog__legend">
                ملاحظات على الصنف <span className="item-dialog__optional">(اختياري)</span>
              </label>
              <textarea
                id={`note-${item.id}`}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength={200}
                rows={2}
                className="form-input form-input--textarea"
                placeholder="مثال: بدون مخلل، صوص زيادة…"
              />
            </div>
          </div>

          <div className="item-dialog__footer">
            <div className="qty" aria-label="الكمية">
              <button
                type="button"
                className="qty__btn"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={quantity <= 1}
                aria-label="تقليل الكمية"
              >
                <MinusIcon className="size-4" />
              </button>
              <output className="qty__value" aria-live="polite">
                {quantity}
              </output>
              <button
                type="button"
                className="qty__btn"
                onClick={() => setQuantity((value) => Math.min(99, value + 1))}
                disabled={quantity >= 99}
                aria-label="زيادة الكمية"
              >
                <PlusIcon className="size-4" />
              </button>
            </div>
            <button type="button" className="btn btn--red item-dialog__add" onClick={handleAdd}>
              <span>أضف للسلة</span>
              <span className="item-dialog__total">{formatPrice(total)}</span>
            </button>
          </div>

          <p className="item-dialog__source">
            السعر من منيو منشور بتاريخ 9 أكتوبر 2025 — يتأكد التوافر والسعر النهائي عبر واتساب.
          </p>
        </div>
      ) : null}
    </dialog>
  );
}
