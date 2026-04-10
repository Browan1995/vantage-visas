import Link from "next/link";
import { Check, X, ArrowUpRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Pricing — NorthBound Visas",
  description: "Concierge vs standard visa services. Request your personalised quote.",
};

const standard = [
  { t: true, l: "Generic document checklist" },
  { t: true, l: "Application form submission" },
  { t: false, l: "Embassy-specific tailoring" },
  { t: false, l: "Line-by-line document review" },
  { t: false, l: "Bespoke cover letter" },
  { t: false, l: "Mock interview coaching" },
  { t: false, l: "WhatsApp concierge access" },
  { t: false, l: "Refund guarantee" },
];

const concierge = [
  { t: true, l: "Embassy-specific tailoring" },
  { t: true, l: "Line-by-line document review" },
  { t: true, l: "Bespoke cover letter & itinerary" },
  { t: true, l: "Mock interview coaching (US/UK)" },
  { t: true, l: "24-hour WhatsApp concierge" },
  { t: true, l: "Priority appointment booking" },
  { t: true, l: "Full refund if denied" },
  { t: true, l: "Post-approval briefing" },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <div className="eyebrow justify-center inline-flex mb-6">Pricing Philosophy</div>
          <h1 className="font-display text-5xl lg:text-7xl text-cream leading-[0.95] mb-6">
            No fixed prices.
            <br />
            <span className="italic text-gold-gradient">Only tailored quotes.</span>
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Every visa file is different. Your destination, urgency, travel history, and
            purpose all shape the work involved. We quote honestly, once we&rsquo;ve seen your
            circumstances.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Standard */}
            <div className="glass p-10 relative">
              <div className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/50 mb-3">
                The Typical Agency
              </div>
              <h2 className="font-display text-3xl text-cream/80 mb-2">Standard Service</h2>
              <p className="text-cream/50 text-sm mb-8">Volume-based, checklist-driven.</p>

              <div className="hairline mb-8" />

              <ul className="space-y-4">
                {standard.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {item.t ? (
                      <Check className="w-5 h-5 text-cream/40 shrink-0 mt-0.5" strokeWidth={1.5} />
                    ) : (
                      <X className="w-5 h-5 text-cream/20 shrink-0 mt-0.5" strokeWidth={1.5} />
                    )}
                    <span className={`text-sm ${item.t ? "text-cream/60" : "text-cream/25 line-through"}`}>
                      {item.l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concierge — highlighted */}
            <div className="glass p-10 relative border-gold/60">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-navy-950 text-[0.65rem] tracking-[0.25em] uppercase font-medium px-4 py-1.5"
                style={{ background: "linear-gradient(135deg, #E8C96A 0%, #D4AF37 50%, #A8841F 100%)" }}
              >
                NorthBound Concierge
              </div>

              <div className="text-[0.7rem] tracking-[0.25em] uppercase text-gold mb-3">
                The Premium Standard
              </div>
              <h2 className="font-display text-3xl text-cream mb-2">
                Full <span className="italic text-gold-gradient">Concierge</span>
              </h2>
              <p className="text-cream/60 text-sm mb-8">
                Hand-crafted, embassy-level precision.
              </p>

              <div className="hairline mb-8" />

              <ul className="space-y-4">
                {concierge.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/15 border border-gold flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-gold" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm text-cream">{item.l}</span>
                  </li>
                ))}
              </ul>

              <div className="hairline my-8" />

              <Link href="/visa-quiz" className="btn-gold w-full">
                Request My Quote
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee strip */}
      <section className="relative py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="glass p-10 lg:p-14 flex flex-col md:flex-row items-start gap-8">
            <ShieldCheck className="w-14 h-14 text-gold shrink-0" strokeWidth={1.3} />
            <div>
              <div className="eyebrow mb-4">The NorthBound Guarantee</div>
              <h3 className="font-display text-3xl text-cream mb-4 leading-tight">
                100% service fee refund if your visa is denied.
              </h3>
              <p className="text-cream/60 text-sm leading-relaxed mb-4">
                We only take on files we believe in. If an embassy still refuses your
                application after our submission, your full concierge fee comes back — no
                arguments, no fine-print escape hatches.
              </p>
              <p className="text-[0.7rem] text-cream/40 leading-relaxed">
                * Guarantee void if client provides false information, hides criminal history, or
                misses deadlines. Government fees are non-refundable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
