export default function Loading() {
  return (
    <div className="state-page" role="status" aria-live="polite">
      <div className="state-page__card">
        <span className="state-page__spinner" aria-hidden="true" />
        <p className="state-page__loading-text">بنجهّز المنيو…</p>
      </div>
    </div>
  );
}
