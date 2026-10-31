"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="state-page">
      <div className="state-page__card" role="alert">
        <p className="state-page__kicker">حصلت مشكلة</p>
        <h1 className="state-page__title">الصفحة مش عايزة تفتح</h1>
        <p className="state-page__text">
          جرّب تحمّل الصفحة تاني. لو المشكلة فضلت، تقدر تتواصل مع المطعم على واتساب أو ترجع
          للصفحة الرئيسية.
        </p>
        <div className="state-page__actions">
          <button type="button" className="btn btn--red" onClick={reset}>
            حاول تاني
          </button>
          <Link href="/" className="btn btn--ghost">
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
