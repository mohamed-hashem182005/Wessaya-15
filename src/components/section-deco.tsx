import Image from "next/image";
import logo from "@/assets/images/logo.png";

/**
 * Solid background layer for sections whose own paint would cover the
 * watermark: fills the section, then the brand seal, the name and the year
 * sit on top of it. Everything inside is decorative only.
 */
export function SectionDeco() {
  return (
    <div className="section-deco" aria-hidden="true">
      <span className="section-deco__base" />
      <div className="section-deco__inner">
        <span className="section-deco__logo">
          <Image src={logo} alt="" width={420} height={420} sizes="24rem" />
        </span>
        <span className="section-deco__word">WESAYA 15</span>
        <span className="section-deco__arabic">وصايه الـــ 15</span>
        <span className="section-deco__year">EST. 2007</span>
        <span className="section-deco__rule" />
      </div>
    </div>
  );
}
