import { StarIcon } from "@/components/icons";

const phrases = [
  "من قلب شارع 15",
  "على الفحم",
  "ريحة الشوي بتندهلك",
  "دايبة وجوسي من جوا",
  "مستحيل تقدر تقاومها",
  "من 2007",
  "استمتع بأصل الطعم",
  "صالة عائلية",
  "جودة البيتزا من أول خطوة",
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {phrases.map((phrase, index) => (
        <span key={`${phrase}-${index}`} className="marquee__item">
          <span>{phrase}</span>
          <StarIcon className="marquee__star" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-label="من قلب شارع 15 — على الفحم — ريحة الشوي بتندهلك — دايبة وجوسي من جوا — من 2007">
      <div className="marquee__track">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </div>
  );
}
