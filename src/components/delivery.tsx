import Image from "next/image";
import Link from "next/link";
import deliveryTeam from "@/assets/images/delivery-team.webp";
import { getWhatsAppUrl, siteConfig } from "@/data/site";
import { SectionDeco } from "@/components/section-deco";
import { SectionHook } from "@/components/section-hook";
import {
  ArrowLeftIcon,
  InfoIcon,
  PhoneIcon,
  TicketIcon,
  WhatsAppIcon,
} from "@/components/icons";

const steps = [
  {
    number: "01",
    title: "اختار من المنيو",
    text: "حدد الأصناف والكميات، ولو الصنف له حجم أو إضافات اختارها من نافذة الصنف.",
  },
  {
    number: "02",
    title: "راجع بياناتك",
    text: "اكتب الاسم والموبايل والمنطقة والعنوان. البيانات دي بتتحط في رسالة الطلب.",
  },
  {
    number: "03",
    title: "ابعت على واتساب",
    text: "هنفتح واتساب برسالة جاهزة. راجعها واضغط إرسال بنفسك — الطلب يتأكد بعد رد المطعم.",
  },
];

const checklist = [
  "المنطقة متاحة للتوصيل؟",
  "رسوم التوصيل كام؟",
  "الحد الأدنى للطلب؟",
  "وقت التوصيل المتوقع؟",
  "الأصناف المطلوبة متاحة؟",
];

export function Delivery() {
  return (
    <section id="delivery" className="delivery section-pad scroll-mt-24 has-deco">
      <SectionDeco />
      <div className="container-page">
        <div className="delivery__grid">
          <div className="delivery__copy">
            <p className="eyebrow eyebrow--light">التوصيل والطلب</p>
            <h2 className="section-title section-title--light">
              الطلب من المنيو…
              <span className="section-title__accent">واتساب على طول.</span>
            </h2>
            <p className="delivery__lead">
              المطعم بيعلن عن خدمة توصيل على صفحته الرسمية. المناطق ورسوم التوصيل مش منشورة
              بشكل رسمي، فبنخليك تأكدها مع المطعم على واتساب قبل تنفيذ الطلب.
            </p>
            <SectionHook>ريحة الشوي بتندهلك</SectionHook>

            <div className="delivery__steps">
              {steps.map((step) => (
                <div key={step.number} className="delivery-step">
                  <span className="delivery-step__number" aria-hidden="true">
                    {step.number}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="delivery__actions">
              <Link href="/menu" className="btn btn--saffron">
                ابدأ من المنيو
                <ArrowLeftIcon className="size-4" />
              </Link>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline-light"
              >
                <WhatsAppIcon className="size-5" />
                افتح واتساب
              </a>
            </div>
          </div>

          <figure className="delivery__photo">
            <div className="delivery__photo-frame">
              <Image
                src={deliveryTeam}
                alt="فريق دليفري وصايه الـــ 15 بموتوسيكلات التوصيل أمام الفرع في شارع 15 بسوهاج"
                fill
                sizes="(max-width: 1024px) 92vw, 27rem"
                className="delivery__photo-img"
                placeholder="blur"
              />
              <span className="delivery__photo-badge">W15 · دليفري</span>
            </div>
            <figcaption className="delivery__photo-caption">
              <span className="delivery__photo-kicker">
                <TicketIcon className="size-4" />
                دليفري وصايه 15
              </span>
              <strong>فريق التوصيل — فرع شارع 15</strong>
              <span>اطلب على واتساب أو أرقام المطعم.</span>
            </figcaption>
          </figure>
        </div>

        <div className="delivery__board">
          <div className="delivery__board-col">
            <h3 className="delivery__board-title">قبل ما تبعت، خلي في بالك</h3>
            <ul className="delivery__board-list">
              {checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="delivery__board-text">
              كل دي أسئلة بتتأكد مع المطعم على واتساب. إحنا مش بنحسب رسوم توصيل ولا بنأكد
              تغطية منطقة من غير رد المطعم.
            </p>
          </div>

          <div className="delivery__board-col delivery__board-col--contact">
            <h3 className="delivery__board-title">
              <PhoneIcon className="size-4" />
              أرقام التوصيل
            </h3>
            <div className="delivery__phones">
              {siteConfig.phones.map((phone) => (
                <a key={phone.tel} href={`tel:${phone.tel}`} className="delivery__phone">
                  <span>{phone.label}</span>
                  <strong dir="ltr">{phone.value}</strong>
                </a>
              ))}
            </div>
            <p className="delivery__board-note">
              <InfoIcon className="size-4 shrink-0" />
              <span>الموقع لا يرسل الطلب تلقائيًا ولا يستقبل مدفوعات.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
