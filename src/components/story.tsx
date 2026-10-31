import Image from "next/image";
import storefront from "@/assets/images/storefront.webp";
import trayKofta from "@/assets/images/tray-kofta-crop.webp";
import { siteConfig } from "@/data/site";
import { SectionDeco } from "@/components/section-deco";

export function Story() {
  return (
    <section id="story" className="story section-pad scroll-mt-24 has-deco">
      <SectionDeco />
      <div className="story__ghost" aria-hidden="true">
        2007
      </div>
      <div className="container-page story__grid">
        <div className="story__copy">
          <p className="eyebrow">حكايتنا</p>
          <h2 className="section-title">
            من 2007…
            <span className="section-title__accent">وفي نفس الشارع.</span>
          </h2>

          <div className="story__text">
            <p>
              وصايه الـــ 15 في شارع 15 بسوهاج، وبتقدم أكل سريع ومشويات على الفحم منذ 2007.
              على المنيو هتلاقي وجبات فردية وعائلية، فرايد تشكن، بيتزا، كريب، ووجبات أطفال.
            </p>
            <p>
              والمطعم بيذكر إن فيه صالة مكيفة خاصة للعائلات بالدور الثاني خلف المطعم — منيو
              المطعم المنشور بيقول كده.
            </p>
          </div>

          <dl className="story__stats">
            <div>
              <dt>بداية النشاط</dt>
              <dd>2007</dd>
            </div>
            <div>
              <dt>الشارع</dt>
              <dd>15</dd>
            </div>
            <div>
              <dt>صالة العائلات</dt>
              <dd>الدور الثاني</dd>
            </div>
          </dl>

          <blockquote className="story__quote">
            <p>«استمتع بأصل الطعم»</p>
            <footer>من ورقة صواني المطعم</footer>
          </blockquote>

          <p className="story__source">
            الوصف مبني على الصفحة الرسمية للمطعم و{siteConfig.menu.sourceName}.
          </p>
        </div>

        <div className="story__media">
          <div className="story__image story__image--main">
            <Image
              src={storefront}
              alt="واجهة مطعم وصايه الـــ 15 في شارع 15 بسوهاج"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="story__img"
              placeholder="blur"
            />
            <span className="story__caption">واجهة المطعم — شارع 15</span>
          </div>
          <div className="story__image story__image--small">
            <Image
              src={trayKofta}
              alt="صينية كفتة مشوية من صور مطعم وصايه الـــ 15"
              fill
              sizes="(max-width: 1024px) 50vw, 24vw"
              className="story__img"
              placeholder="blur"
              loading="lazy"
            />
            <span className="story__caption">من المطبخ</span>
          </div>
          <div className="story__seal" aria-hidden="true">
            <span className="story__seal-kicker">EST.</span>
            <strong>2007</strong>
            <span className="story__seal-name">SOHAG</span>
          </div>
        </div>
      </div>
    </section>
  );
}
