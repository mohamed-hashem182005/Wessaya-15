"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { getLineTotal } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { getWhatsAppUrl, siteConfig } from "@/data/site";
import {
  emptyCheckoutValues,
  isValidEgyptianMobile,
  normalizeEgyptianMobile,
  validateCheckout,
  type CheckoutErrors,
  type CheckoutField,
  type CheckoutValues,
} from "@/lib/validation";
import { buildOrderMessage } from "@/lib/whatsapp";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CartIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/icons";

type CartStep = "cart" | "details" | "review" | "ready";

const stepLabels: Array<{ id: Exclude<CartStep, "ready">; label: string }> = [
  { id: "cart", label: "السلة" },
  { id: "details", label: "البيانات" },
  { id: "review", label: "المراجعة" },
];

export function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeLine,
    clearCart,
    notify,
  } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState<CartStep>("cart");
  const [customer, setCustomer] = useState<CheckoutValues>({ ...emptyCheckoutValues });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [confirmClear, setConfirmClear] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

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

  useEffect(() => {
    if (!isOpen) return;
    bodyRef.current?.scrollTo({ top: 0 });
    const timer = window.setTimeout(() => {
      if (step === "details") {
        document.getElementById("checkout-name")?.focus();
      } else {
        headingRef.current?.focus();
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [step, isOpen]);

  useEffect(() => {
    if (copyState === "idle") return;
    const timer = window.setTimeout(() => setCopyState("idle"), 3000);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const message = useMemo(
    () => buildOrderMessage(lines, customer, subtotal),
    [lines, customer, subtotal],
  );
  const whatsappHref = getWhatsAppUrl(message);

  function updateField(field: CheckoutField, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleBlur(field: CheckoutField) {
    const nextErrors = validateCheckout(customer);
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
    if (field === "phone" && isValidEgyptianMobile(customer.phone)) {
      updateField("phone", normalizeEgyptianMobile(customer.phone));
    }
  }

  function handleDetailsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCheckout(customer);
    setErrors(nextErrors);
    const firstError = (Object.keys(nextErrors) as CheckoutField[])[0];
    if (firstError) {
      document.getElementById(`checkout-${firstError}`)?.focus();
      return;
    }
    setStep("review");
  }

  function handleClearCart() {
    clearCart();
    setConfirmClear(false);
    setCustomer({ ...emptyCheckoutValues });
    setErrors({});
    setStep("cart");
    notify("تم تفريغ السلة");
  }

  function handleClose() {
    closeCart();
    setStep("cart");
    setConfirmClear(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  const title =
    step === "cart"
      ? "السلة"
      : step === "details"
        ? "بيانات التوصيل"
        : step === "review"
          ? "راجع طلبك"
          : "رسالة الطلب جاهزة";

  return (
    <dialog
      ref={dialogRef}
      className="cart-dialog"
      aria-labelledby="cart-dialog-title"
      onClose={handleClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeCart();
      }}
    >
      <div className="cart-drawer">
        <header className="cart-drawer__header">
          <div>
            <p className="cart-drawer__kicker">
              {step === "ready" ? "آخر خطوة" : "طلب من المنيو"}
            </p>
            <h2 id="cart-dialog-title" ref={headingRef} tabIndex={-1} className="cart-drawer__title">
              {title}
              {step === "cart" && count > 0 ? (
                <span className="cart-drawer__count">{count}</span>
              ) : null}
            </h2>
          </div>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label="إغلاق السلة">
            <XIcon className="size-5" />
          </button>
        </header>

        {step !== "ready" ? (
          <ol className="cart-steps" aria-label="خطوات الطلب">
            {stepLabels.map((entry) => (
              <li
                key={entry.id}
                className="cart-step"
                aria-current={step === entry.id ? "step" : undefined}
              >
                <span className="cart-step__dot" aria-hidden="true" />
                {entry.label}
              </li>
            ))}
          </ol>
        ) : null}

        <div className="cart-drawer__body" ref={bodyRef}>
          {step === "cart" ? (
            lines.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty__icon">
                  <CartIcon className="size-8" />
                </div>
                <h3>السلة فاضية</h3>
                <p>اختار من المنيو وابدأ طلبك. هنحضّر لك رسالة واتساب بكل التفاصيل.</p>
                <Link href="/menu" className="btn btn--dark" onClick={closeCart}>
                  شوف المنيو
                </Link>
              </div>
            ) : (
              <>
                <ul className="cart-lines">
                  {lines.map((line) => (
                    <li key={line.key} className="cart-line">
                      <div className="cart-line__head">
                        <div>
                          <h3 className="cart-line__name">{line.name}</h3>
                          <p className="cart-line__category">{line.categoryName}</p>
                        </div>
                        <button
                          type="button"
                          className="icon-btn icon-btn--ghost cart-line__remove"
                          onClick={() => removeLine(line.key)}
                          aria-label={`حذف ${line.name} من السلة`}
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      </div>
                      {line.variantLabel ? (
                        <p className="cart-line__meta">
                          <span>الاختيار:</span> {line.variantLabel}
                        </p>
                      ) : null}
                      {line.extras.length ? (
                        <p className="cart-line__meta">
                          <span>إضافات:</span>{" "}
                          {line.extras.map((extra) => extra.label).join(" + ")}
                        </p>
                      ) : null}
                      {line.note ? (
                        <p className="cart-line__note">ملاحظة: {line.note}</p>
                      ) : null}
                      <div className="cart-line__bottom">
                        <div className="qty qty--small" aria-label={`كمية ${line.name}`}>
                          <button
                            type="button"
                            className="qty__btn"
                            onClick={() => updateQuantity(line.key, line.quantity - 1)}
                            aria-label={`تقليل كمية ${line.name}`}
                          >
                            <MinusIcon className="size-3.5" />
                          </button>
                          <output className="qty__value" aria-live="polite">
                            {line.quantity}
                          </output>
                          <button
                            type="button"
                            className="qty__btn"
                            onClick={() => updateQuantity(line.key, line.quantity + 1)}
                            disabled={line.quantity >= 99}
                            aria-label={`زيادة كمية ${line.name}`}
                          >
                            <PlusIcon className="size-3.5" />
                          </button>
                        </div>
                        <div className="cart-line__prices">
                          {line.quantity > 1 ? (
                            <span className="cart-line__unit">
                              {formatPrice(line.unitPrice)} للوحدة
                            </span>
                          ) : null}
                          <span className="cart-line__total">{formatPrice(getLineTotal(line))}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="cart-summary">
                  <div className="cart-summary__row">
                    <span>إجمالي الأصناف</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <div className="cart-summary__row cart-summary__row--muted">
                    <span>رسوم التوصيل</span>
                    <span>تُحدد عبر واتساب</span>
                  </div>
                  <p className="cart-summary__note">
                    <InfoIcon className="size-4 shrink-0" />
                    <span>
                      الإجمالي النهائي ورسوم التوصيل يتأكدوا مع المطعم. الأسعار من منيو{" "}
                      {siteConfig.menu.updated}.
                    </span>
                  </p>
                </div>

                <div className="cart-clear">
                  {confirmClear ? (
                    <div className="cart-clear__confirm">
                      <span>متأكد إنك عايز تمسح السلة؟</span>
                      <button type="button" className="text-link text-link--danger" onClick={handleClearCart}>
                        نعم، امسح
                      </button>
                      <button type="button" className="text-link" onClick={() => setConfirmClear(false)}>
                        لأ
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="text-link text-link--muted"
                      onClick={() => setConfirmClear(true)}
                    >
                      تفريغ السلة
                    </button>
                  )}
                </div>
              </>
            )
          ) : null}

          {step === "details" ? (
            <form id="checkout-form" className="checkout-form" onSubmit={handleDetailsSubmit} noValidate>
              <p className="cart-intro">
                اكتب بياناتك مرة واحدة، وهنحطها في رسالة واتساب جاهزة. مش هنحفظها على أي سيرفر.
              </p>

              <div className="form-field">
                <label htmlFor="checkout-name" className="form-label">
                  الاسم <span className="form-required">*</span>
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  value={customer.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  onBlur={() => handleBlur("name")}
                  autoComplete="name"
                  className="form-input"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "error-name" : undefined}
                  placeholder="الاسم الكامل"
                />
                {errors.name ? (
                  <p id="error-name" className="form-error" role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="form-field">
                <label htmlFor="checkout-phone" className="form-label">
                  الموبايل <span className="form-required">*</span>
                </label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  dir="ltr"
                  value={customer.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  onBlur={() => handleBlur("phone")}
                  autoComplete="tel"
                  className="form-input form-input--ltr"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "error-phone" : "hint-phone"}
                  placeholder="01xxxxxxxxx"
                  maxLength={20}
                />
                {errors.phone ? (
                  <p id="error-phone" className="form-error" role="alert">
                    {errors.phone}
                  </p>
                ) : (
                  <p id="hint-phone" className="form-hint">
                    رقم مصري: 010 / 011 / 012 / 015
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="checkout-area" className="form-label">
                  المنطقة أو الحي <span className="form-required">*</span>
                </label>
                <input
                  id="checkout-area"
                  name="area"
                  type="text"
                  value={customer.area}
                  onChange={(event) => updateField("area", event.target.value)}
                  onBlur={() => handleBlur("area")}
                  autoComplete="address-level2"
                  className="form-input"
                  aria-invalid={Boolean(errors.area)}
                  aria-describedby={errors.area ? "error-area" : undefined}
                  placeholder="مثال: شارع 15"
                />
                {errors.area ? (
                  <p id="error-area" className="form-error" role="alert">
                    {errors.area}
                  </p>
                ) : null}
              </div>

              <div className="form-field">
                <label htmlFor="checkout-address" className="form-label">
                  العنوان بالتفصيل <span className="form-required">*</span>
                </label>
                <textarea
                  id="checkout-address"
                  name="address"
                  value={customer.address}
                  onChange={(event) => updateField("address", event.target.value)}
                  onBlur={() => handleBlur("address")}
                  autoComplete="street-address"
                  rows={3}
                  className="form-input form-input--textarea"
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? "error-address" : undefined}
                  placeholder="الشارع، رقم العمارة، الدور، علامة مميزة"
                />
                {errors.address ? (
                  <p id="error-address" className="form-error" role="alert">
                    {errors.address}
                  </p>
                ) : null}
              </div>

              <div className="form-field">
                <label htmlFor="checkout-notes" className="form-label">
                  ملاحظات على الطلب <span className="form-optional">(اختياري)</span>
                </label>
                <textarea
                  id="checkout-notes"
                  name="notes"
                  value={customer.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  onBlur={() => handleBlur("notes")}
                  rows={2}
                  maxLength={500}
                  className="form-input form-input--textarea"
                  aria-invalid={Boolean(errors.notes)}
                  aria-describedby={errors.notes ? "error-notes" : undefined}
                  placeholder="أي تفاصيل تحب تضيفها للطلب"
                />
                {errors.notes ? (
                  <p id="error-notes" className="form-error" role="alert">
                    {errors.notes}
                  </p>
                ) : null}
              </div>

              <div className="checkout-actions">
                <button type="button" className="btn btn--ghost" onClick={() => setStep("cart")}>
                  <ArrowRightIcon className="size-4" />
                  رجوع للسلة
                </button>
                <button type="submit" className="btn btn--red">
                  راجع الطلب
                </button>
              </div>
            </form>
          ) : null}

          {step === "review" ? (
            <div className="review">
              <section className="review__block" aria-labelledby="review-customer">
                <div className="review__head">
                  <h3 id="review-customer">بيانات التوصيل</h3>
                  <button type="button" className="text-link" onClick={() => setStep("details")}>
                    تعديل
                  </button>
                </div>
                <dl className="review__list">
                  <div>
                    <dt>الاسم</dt>
                    <dd>{customer.name}</dd>
                  </div>
                  <div>
                    <dt>الموبايل</dt>
                    <dd dir="ltr" className="review__ltr">
                      {normalizeEgyptianMobile(customer.phone)}
                    </dd>
                  </div>
                  <div>
                    <dt>المنطقة</dt>
                    <dd>{customer.area}</dd>
                  </div>
                  <div>
                    <dt>العنوان</dt>
                    <dd>{customer.address}</dd>
                  </div>
                  {customer.notes.trim() ? (
                    <div>
                      <dt>ملاحظات</dt>
                      <dd>{customer.notes}</dd>
                    </div>
                  ) : null}
                </dl>
              </section>

              <section className="review__block" aria-labelledby="review-items">
                <div className="review__head">
                  <h3 id="review-items">الأصناف</h3>
                  <button type="button" className="text-link" onClick={() => setStep("cart")}>
                    تعديل السلة
                  </button>
                </div>
                <ul className="review__items">
                  {lines.map((line) => (
                    <li key={line.key}>
                      <div>
                        <span className="review__qty">{line.quantity}×</span>
                        <span>{line.name}</span>
                        {line.variantLabel ? (
                          <span className="review__variant"> — {line.variantLabel}</span>
                        ) : null}
                        {line.extras.length ? (
                          <span className="review__variant">
                            {" "}
                            (+ {line.extras.map((extra) => extra.label).join(" + ")})
                          </span>
                        ) : null}
                      </div>
                      <span className="review__price">{formatPrice(getLineTotal(line))}</span>
                    </li>
                  ))}
                </ul>
                <div className="review__total">
                  <span>إجمالي الأصناف</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <p className="review__fee">رسوم التوصيل تُحدد مع المطعم على واتساب.</p>
              </section>

              <div className="review__notice">
                <InfoIcon className="size-5 shrink-0" />
                <p>
                  الموقع مش هيرسل الطلب لوحده. هنفتح واتساب برسالة جاهزة، وانت تراجعها وتضغط إرسال.
                  الطلب يبقى مؤكد بعد رد المطعم.
                </p>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp btn--wide"
                onClick={() => setStep("ready")}
              >
                <WhatsAppIcon className="size-5" />
                افتح واتساب وأرسل الطلب
                <ExternalLinkIcon className="size-4" />
              </a>

              <div className="checkout-actions checkout-actions--center">
                <button type="button" className="btn btn--ghost" onClick={() => setStep("details")}>
                  <ArrowRightIcon className="size-4" />
                  رجوع للبيانات
                </button>
              </div>
            </div>
          ) : null}

          {step === "ready" ? (
            <div className="order-ready">
              <div className="order-ready__icon">
                <CheckIcon className="size-8" />
              </div>
              <h3>رسالة الطلب جاهزة في واتساب</h3>
              <p>
                فتحنا واتساب في تاب جديد برسالة فيها طلبك وبياناتك. راجع الرسالة، واضغط{" "}
                <strong>إرسال</strong> بنفسك.
              </p>
              <div className="order-ready__notice">
                <InfoIcon className="size-4 shrink-0" />
                <span>
                  لو التاب ما فتحش، استخدم الرابط تحت. الموقع لا يرسل الطلب تلقائيًا، والطلب لا يُعتبر
                  مؤكدًا إلا بعد رد المطعم.
                </span>
              </div>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--wide">
                <WhatsAppIcon className="size-5" />
                افتح واتساب تاني
              </a>
              <button type="button" className="btn btn--outline btn--wide" onClick={handleCopy}>
                <CopyIcon className="size-4" />
                {copyState === "copied"
                  ? "تم نسخ الرسالة"
                  : copyState === "error"
                    ? "النسخ مش متاح — استخدم رابط واتساب"
                    : "انسخ نص الرسالة"}
              </button>
              <div className="order-ready__actions">
                <button type="button" className="text-link" onClick={() => setStep("review")}>
                  رجوع للمراجعة
                </button>
                <button type="button" className="text-link text-link--muted" onClick={handleClearCart}>
                  تفريغ السلة بعد الإرسال
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {step === "cart" && lines.length > 0 ? (
          <footer className="cart-drawer__footer">
            <div className="cart-drawer__footer-total">
              <span>إجمالي الأصناف</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <button type="button" className="btn btn--red btn--wide" onClick={() => setStep("details")}>
              متابعة الطلب
              <ArrowLeftIcon className="size-4" />
            </button>
            <p className="cart-drawer__footer-note">
              بدون دفع أونلاين — التأكيد والتوصيل عبر واتساب.
            </p>
          </footer>
        ) : null}
      </div>
    </dialog>
  );
}
