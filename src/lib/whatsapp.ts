import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/lib/cart";
import type { CheckoutValues } from "@/lib/validation";

export function buildOrderMessage(
  lines: CartLine[],
  customer: CheckoutValues,
  subtotal: number,
): string {
  const itemLines = lines.map((line, index) => {
    const details: string[] = [];
    if (line.variantLabel) details.push(`   الحجم / الاختيار: ${line.variantLabel}`);
    if (line.extras.length) {
      details.push(
        `   إضافات: ${line.extras
          .map((extra) => `${extra.label} (${formatPrice(extra.price)})`)
          .join(" + ")}`,
      );
    }
    if (line.note?.trim()) details.push(`   ملاحظة: ${line.note.trim()}`);
    const heading = `${index + 1}. ${line.quantity} × ${line.name} — ${formatPrice(
      line.unitPrice * line.quantity,
    )}`;
    return [heading, ...details].join("\n");
  });

  return [
    "*طلب جديد — وصايه الـــ 15*",
    "",
    `*الاسم:* ${customer.name.trim()}`,
    `*الموبايل:* ${customer.phone.trim()}`,
    `*المنطقة:* ${customer.area.trim()}`,
    `*العنوان:* ${customer.address.trim()}`,
    `*ملاحظات:* ${customer.notes.trim() || "لا يوجد"}`,
    "",
    "------------------------------",
    "*الأصناف*",
    ...itemLines,
    "------------------------------",
    `*إجمالي الأصناف:* ${formatPrice(subtotal)}`,
    "*رسوم التوصيل:* تُحدد مع المطعم على واتساب",
    "",
    "الأسعار من منيو منشور بتاريخ 9 أكتوبر 2025. برجاء تأكيد الأسعار والتوافر ورسوم التوصيل قبل تنفيذ الطلب.",
  ].join("\n");
}
