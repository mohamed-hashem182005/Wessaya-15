import { normalizePhone } from "@/lib/format";

export type CheckoutValues = {
  name: string;
  phone: string;
  area: string;
  address: string;
  notes: string;
};

export type CheckoutField = keyof CheckoutValues;
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

export const emptyCheckoutValues: CheckoutValues = {
  name: "",
  phone: "",
  area: "",
  address: "",
  notes: "",
};

export function normalizeEgyptianMobile(value: string): string {
  let phone = normalizePhone(value);
  if (phone.startsWith("+20")) phone = `0${phone.slice(3)}`;
  else if (phone.startsWith("0020")) phone = `0${phone.slice(4)}`;
  else if (phone.startsWith("20") && phone.length === 12) phone = `0${phone.slice(2)}`;
  return phone;
}

export function isValidEgyptianMobile(value: string): boolean {
  return /^01[0125]\d{8}$/.test(normalizeEgyptianMobile(value));
}

export function validateCheckout(values: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {};
  const name = values.name.trim();
  const area = values.area.trim();
  const address = values.address.trim();

  if (name.length < 3) {
    errors.name = "اكتب الاسم الكامل (3 حروف على الأقل).";
  } else if (name.length > 60) {
    errors.name = "الاسم طويل جدًا. اختصره شوية.";
  }

  if (!values.phone.trim()) {
    errors.phone = "اكتب رقم الموبايل.";
  } else if (!isValidEgyptianMobile(values.phone)) {
    errors.phone = "اكتب رقم موبايل مصري صحيح يبدأ بـ 010 أو 011 أو 012 أو 015.";
  }

  if (area.length < 2) {
    errors.area = "اكتب المنطقة أو الحي.";
  }

  if (address.length < 8) {
    errors.address = "اكتب العنوان بالتفصيل (8 حروف على الأقل).";
  } else if (address.length > 240) {
    errors.address = "العنوان طويل جدًا. اختصره شوية.";
  }

  if (values.notes.length > 500) {
    errors.notes = "الملاحظات طويلة جدًا (الحد 500 حرف).";
  }

  return errors;
}

export function validateCheckoutField(
  field: CheckoutField,
  values: CheckoutValues,
): string | undefined {
  return validateCheckout(values)[field];
}
