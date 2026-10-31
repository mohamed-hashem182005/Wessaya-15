import { getDirectionsUrl, getWhatsAppUrl, siteConfig } from "@/data/site";
import {
  ClockIcon,
  ExternalLinkIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { SectionDeco } from "@/components/section-deco";

export function Contact() {
  return (
    <section id="contact" className="contact section-pad scroll-mt-24 has-deco">
      <SectionDeco />
      <div className="container-page contact__grid">
        <div className="contact__copy">
          <p className="eyebrow">تواصل</p>
          <h2 className="section-title">
            زورونا في
            <span className="section-title__accent">شارع 15.</span>
          </h2>
          <p className="section-lead">
            العنوان والمطعم في سوهاج. للطلب أو السؤال عن التوصيل، واتساب هو أسرع طريقة.
          </p>

          <div className="contact__items">
            <div className="contact-item">
              <span className="contact-item__icon">
                <MapPinIcon className="size-5" />
              </span>
              <div>
                <h3>العنوان</h3>
                <p>{siteConfig.address.full}</p>
                <p className="contact-item__hint">
                  صالة مكيفة للعائلات بالدور الثاني خلف المطعم — بحسب منيو المطعم.
                </p>
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  افتح البحث على الخريطة
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-item__icon">
                <ClockIcon className="size-5" />
              </span>
              <div>
                <h3>المواعيد</h3>
                <p>{siteConfig.hours.display}</p>
                <span className="unconfirmed-badge">غير مؤكد رسميًا</span>
                <p className="contact-item__hint">{siteConfig.hours.note}</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-item__icon">
                <PhoneIcon className="size-5" />
              </span>
              <div>
                <h3>اتصل أو اطلب</h3>
                <ul className="contact-phones">
                  {siteConfig.phones.map((phone) => (
                    <li key={phone.tel}>
                      <a href={`tel:${phone.tel}`} className="contact-phones__link">
                        <span className="contact-phones__label">{phone.label}</span>
                        <span dir="ltr" className="contact-phones__value">
                          {phone.value}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link text-link--whatsapp"
                >
                  <WhatsAppIcon className="size-4" />
                  اطلب على واتساب
                </a>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-item__icon">
                <StarIcon className="size-5" />
              </span>
              <div>
                <h3>تابعنا</h3>
                <div className="contact-social">
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social__link"
                  >
                    <FacebookIcon className="size-5" />
                    فيسبوك
                  </a>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social__link"
                  >
                    <InstagramIcon className="size-5" />
                    إنستجرام
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="contact-map-card" aria-label="خريطة الموقع">
          <iframe
            src={siteConfig.mapsEmbedUrl}
            title={`خريطة موقع ${siteConfig.nameAr} — ${siteConfig.address.full}`}
            width="600"
            height="450"
            loading="eager"
            allow="fullscreen"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="contact-map-card__info">
            <h3>{siteConfig.address.full}</h3>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--saffron"
            >
              <MapPinIcon className="size-4" />
              افتح في خرائط Google
              <ExternalLinkIcon className="size-3.5" />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
