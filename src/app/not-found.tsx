import Link from "next/link";

export const metadata = {
  title: "الصفحة مش موجودة",
};

export default function NotFound() {
  return (
    <div className="state-page">
      <div className="state-page__card">
        <span className="state-page__code" aria-hidden="true">
          404
        </span>
        <p className="state-page__kicker">الصفحة مش موجودة</p>
        <h1 className="state-page__title">الرابط ده مش عندنا</h1>
        <p className="state-page__text">
          يمكن الرابط قديم أو فيه غلطة. تقدر ترجع للصفحة الرئيسية أو تبدأ من المنيو على طول.
        </p>
        <div className="state-page__actions">
          <Link href="/" className="btn btn--red">
            الرئيسية
          </Link>
          <Link href="/#menu" className="btn btn--ghost">
            شوف لمحة المنيو
          </Link>
        </div>
      </div>
    </div>
  );
}
