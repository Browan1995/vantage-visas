import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Clock, Globe, TrendingUp, Sparkles } from "lucide-react";
import ReviewSlider from "@/components/ReviewSlider";
import { countries } from "@/lib/countries";

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Decorative globe lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
          <svg className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[900px] h-[900px]" viewBox="0 0 600 600">
            <g fill="none" stroke="#D4AF37" strokeWidth="1">
              <circle cx="300" cy="300" r="280" />
              <circle cx="300" cy="300" r="230" />
              <circle cx="300" cy="300" r="180" />
              <ellipse cx="300" cy="300" rx="280" ry="120" />
              <ellipse cx="300" cy="300" rx="280" ry="60" />
              <ellipse cx="300" cy="300" rx="120" ry="280" />
              <ellipse cx="300" cy="300" rx="60" ry="280" />
              <line x1="20" y1="300" x2="580" y2="300" />
              <line x1="300" y1="20" x2="300" y2="580" />
            </g>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="reveal eyebrow mb-8" style={{ animationDelay: "0.1s" }}>
              <span>The Concierge &middot; Est. South Africa</span>
            </div>

            <h1
              className="reveal font-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.95] text-cream mb-8 tracking-tight"
              style={{ animationDelay: "0.25s" }}
            >
              The Green Mamba&rsquo;s
              <br />
              <span className="italic text-gold-gradient">gateway</span> to
              <br />
              the world.
            </h1>

            <p
              className="reveal max-w-xl text-cream/70 text-lg leading-relaxed mb-10"
              style={{ animationDelay: "0.4s" }}
            >
              A private visa concierge for South Africans who refuse to gamble with their
              passports. Every file reviewed by hand. Every embassy idiosyncrasy accounted for.
            </p>

            <div
              className="reveal flex flex-wrap gap-4 mb-14"
              style={{ animationDelay: "0.55s" }}
            >
              <Link href="/visa-quiz" className="btn-gold">
                Start My Visa Quiz
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/pricing" className="btn-outline">
                View Pricing
              </Link>
            </div>

            {/* Mini stats bar */}
            <div
              className="reveal grid grid-cols-3 gap-6 max-w-lg"
              style={{ animationDelay: "0.7s" }}
            >
              {[
                { n: "689+", l: "Visas Handled" },
                { n: "98%", l: "Approval Rate" },
                { n: "10", l: "Top Countries" },
              ].map((s, i) => (
                <div key={i} className="border-l border-gold/30 pl-4">
                  <div className="font-display text-3xl text-gold-gradient">{s.n}</div>
                  <div className="text-[0.65rem] tracking-[0.2em] uppercase text-cream/50 mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card — guarantee */}
          <div className="lg:col-span-5 reveal" style={{ animationDelay: "0.5s" }}>
            <div className="glass p-8 lg:p-10 relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l border-t border-gold" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r border-t border-gold" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l border-b border-gold" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r border-b border-gold" />

              <ShieldCheck className="w-10 h-10 text-gold mb-5" strokeWidth={1.3} />
              <div className="eyebrow mb-4">The NorthBound Guarantee</div>
              <h3 className="font-display text-3xl text-cream mb-4 leading-tight">
                100% service fee refund if your visa is denied.
              </h3>
              <p className="text-sm text-cream/60 leading-relaxed mb-6">
                We stand behind every file. If an embassy refuses your application after we
                submit it, your full concierge fee comes back to you.
              </p>
              <div className="hairline mb-5" />
              <p className="text-[0.7rem] text-cream/40 leading-relaxed">
                * Guarantee void if client provides false information, hides criminal history, or misses
                deadlines. Government fees are non-refundable.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.3em] uppercase text-cream/40 flex flex-col items-center gap-3 animate-float">
          <span>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════ STATS BAR ═══════════════════════════════ */}
      <section className="relative border-y border-gold/20 bg-navy-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {[
            { icon: Globe, n: "689+", l: "Visas Secured" },
            { icon: TrendingUp, n: "98%", l: "Approval Rate" },
            { icon: Clock, n: "<48h", l: "Avg. Response Time" },
            { icon: Sparkles, n: "5.0★", l: "Google & Trustpilot" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-5">
                <div className="w-14 h-14 border border-gold/30 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-gold" strokeWidth={1.3} />
                </div>
                <div>
                  <div className="font-display text-3xl text-cream">{s.n}</div>
                  <div className="text-[0.65rem] tracking-[0.2em] uppercase text-cream/50 mt-1">
                    {s.l}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════ TOP DESTINATIONS ═══════════════════════════════ */}
      <section className="relative py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="eyebrow mb-5">Top 10 &middot; Curated for SA Travelers</div>
              <h2 className="font-display text-4xl lg:text-6xl text-cream leading-[1] max-w-2xl">
                Where are you <span className="italic text-gold-gradient">headed</span>?
              </h2>
            </div>
            <p className="max-w-sm text-cream/60 text-sm leading-relaxed">
              From the Tower of London to Tokyo&rsquo;s neon avenues — we handle the paperwork so
              you can handle the packing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {countries.map((c, i) => (
              <Link
                key={c.slug}
                href={`/destinations/${c.slug}`}
                className="glass glass-hover p-6 group relative overflow-hidden block"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div className="absolute top-4 right-4 w-6 h-6 border border-gold/20 group-hover:border-gold/60 flex items-center justify-center transition-all">
                  <ArrowUpRight size={12} className="text-gold/60 group-hover:text-gold" />
                </div>

                <div className="text-4xl mb-4">{c.flag}</div>
                <h3 className="font-display text-xl text-cream mb-1 group-hover:text-gold transition-colors">
                  {c.shortName}
                </h3>
                <p className="text-[0.72rem] text-cream/50 leading-relaxed mb-4 min-h-[2.5rem]">
                  {c.tagline}
                </p>

                <div className="hairline mb-4" />

                <div className="flex items-center justify-between text-[0.65rem] tracking-widest uppercase">
                  <span className="text-cream/40">Difficulty</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`w-1.5 h-3 ${
                          lvl <= c.difficulty ? "bg-gold" : "bg-gold/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ REVIEWS ═══════════════════════════════ */}
      <section className="relative py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="eyebrow justify-center mb-5 inline-flex">Client Voices</div>
            <h2 className="font-display text-4xl lg:text-6xl text-cream leading-[1]">
              Five stars. <span className="italic text-gold-gradient">Every time.</span>
            </h2>
          </div>
          <ReviewSlider />
        </div>
      </section>

      {/* ═══════════════════════════════ CTA ═══════════════════════════════ */}
      <section className="relative py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="glass p-10 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/20 blur-3xl" />
            </div>

            <div className="relative">
              <div className="eyebrow justify-center mb-6 inline-flex">Ready to Fly</div>
              <h2 className="font-display text-4xl lg:text-6xl text-cream leading-[1] mb-6">
                Your <span className="italic text-gold-gradient">passport</span> deserves
                <br />
                a concierge.
              </h2>
              <p className="text-cream/60 max-w-xl mx-auto mb-10">
                Take our 6-step visa quiz and receive a personalised quote within 24 hours.
                Zero pressure. Zero upfront fees.
              </p>
              <Link href="/visa-quiz" className="btn-gold">
                Begin The Quiz
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
