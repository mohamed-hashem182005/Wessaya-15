type SectionHookProps = {
  children: string;
};

/**
 * A short hook line quoted from the restaurant's own Facebook posts.
 * The source label keeps the wording clearly attributed.
 */
export function SectionHook({ children }: SectionHookProps) {
  return (
    <p className="section-hook">
      <span className="section-hook__mark" aria-hidden="true">
        ”
      </span>
      <span className="section-hook__text">{children}</span>
      <span className="section-hook__source">من بوستات وصايه على فيسبوك</span>
    </p>
  );
}
