import Image from "next/image";
import Link from "next/link";
import trayMixed from "@/assets/images/tray-mixed-crop.webp";
import { featuredItems } from "@/data/menu";
import { FeaturedList } from "@/components/featured-list";
import { SectionDeco } from "@/components/section-deco";
import { SectionHook } from "@/components/section-hook";
import { ArrowLeftIcon } from "@/components/icons";

export function Featured() {
  return (
    <section id="featured" className="featured section-pad has-deco">
      <SectionDeco />
      <div className="container-page">
        <div className="featured__head">
          <div className="featured__intro">
            <p className="eyebrow">اختيارات من المنيو</p>
            <h2 className="section-title">
              أصناف تستاهل
              <span className="section-title__accent">تبدأ بيها.</span>
            </h2>
            <p className="section-lead">
              من الوجبات الفردية للعائلية، ومن المشويات للبيتزا — دي اختيارات منشورة على منيو
              وصايه الـــ 15. اضغط على أي صنف تشوف تفاصيله وتضيفه للسلة.
            </p>
            <SectionHook>مستحيل تقدر تقاومها</SectionHook>
          </div>

          <div className="featured__aside">
            <div className="featured__media">
              <Image
                src={trayMixed}
                alt="صينية مشويات من صور مطعم وصايه الـــ 15"
                fill
                sizes="(max-width: 1024px) 92vw, 24rem"
                className="featured__image"
                placeholder="blur"
              />
              <div className="featured__media-shade" aria-hidden="true" />
              <span className="featured__caption">من صور المطعم</span>
            </div>
          </div>
        </div>

        <FeaturedList items={featuredItems} />

        <div className="featured__foot">
          <p className="featured__note">
            اختيارات تحريرية من المنيو، وليست ترتيب مبيعات. الصور من صور المطعم، وليست صورة
            مرتبطة بصنف محدد. الأسعار من منيو{" "}
            <span className="whitespace-nowrap">9 أكتوبر 2025</span>.
          </p>
          <Link href="/menu" className="btn btn--dark featured__all">
            كل المنيو
            <ArrowLeftIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
