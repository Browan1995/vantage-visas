"use client";

import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Thandiwe M.",
    location: "Sandton, Johannesburg",
    platform: "Google",
    rating: 5,
    text: "I had been refused a UK visa twice before I found NorthBound. Their concierge rebuilt my entire application from scratch. Approved in 9 days. I still can't quite believe it.",
  },
  {
    name: "James van der Merwe",
    location: "Stellenbosch",
    platform: "Trustpilot",
    rating: 5,
    text: "The level of detail is unreal. They know exactly what each embassy wants. My Schengen went through without a single query. Worth every rand.",
  },
  {
    name: "Priya Naidoo",
    location: "Umhlanga, Durban",
    platform: "Google",
    rating: 5,
    text: "The US B1/B2 interview prep alone saved me. They ran me through three mock interviews. The actual interview was easier than their practice. Ten years approved.",
  },
  {
    name: "Sipho Dlamini",
    location: "Pretoria",
    platform: "Trustpilot",
    rating: 5,
    text: "Genuine premium service. WhatsApp replies within minutes, documents checked line by line, no surprises. This is how it should be done.",
  },
  {
    name: "Lerato K.",
    location: "Cape Town",
    platform: "Google",
    rating: 5,
    text: "Australia visitor visa — done. They warned me about every requirement, prepped my employer letter, and kept me calm throughout. Flawless execution.",
  },
];

export default function ReviewSlider() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % reviews.length);
  const prev = () => setI((v) => (v - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, []);

  const r = reviews[i];

  return (
    <div className="relative max-w-4xl mx-auto">
      <Quote className="absolute -top-8 -left-4 w-24 h-24 text-gold/10" strokeWidth={1} />

      <div className="glass p-10 md:p-14 relative overflow-hidden">
        <div className="flex items-center gap-1 mb-6">
          {Array.from({ length: r.rating }).map((_, idx) => (
            <Star key={idx} className="w-4 h-4 fill-gold text-gold" />
          ))}
          <span className="ml-3 text-xs tracking-[0.25em] uppercase text-gold/70">
            via {r.platform}
          </span>
        </div>

        <p className="font-display text-2xl md:text-3xl text-cream leading-relaxed italic mb-8">
          &ldquo;{r.text}&rdquo;
        </p>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-cream font-medium">{r.name}</div>
            <div className="text-xs text-cream/50 tracking-wider uppercase mt-1">
              {r.location}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-1.5 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Review ${idx + 1}`}
              className={`h-[2px] transition-all duration-500 ${
                idx === i ? "w-10 bg-gold" : "w-4 bg-gold/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
