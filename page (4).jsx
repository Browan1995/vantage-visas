import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, Clock, FileText, Banknote, Sparkles } from "lucide-react";
import { countries, getCountry } from "@/lib/countries";
import DifficultyMeter from "@/components/DifficultyMeter";

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCountry(params.country);
  if (!c) return { title: "Destination — NorthBound Visas" };
  return {
    title: `${c.name} Visa for South Africans — NorthBound Visas`,
    description: `${c.name} ${c.visaType} for SA passport holders. ${c.processingTime} processing. Concierge service with 98% approval.`,
  };
}

export default function CountryPage({ params }) {
  const c = getCountry(params.country);
  if (!c) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Link
            href="/#destinations"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            All Destinations
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="text-7xl mb-6">{c.flag}</div>
              <div className="eyebrow mb-5">{c.visaType}</div>
              <h1 className="font-display text-5xl lg:text-7xl text-cream leading-[0.95] mb-6">
                {c.name}
              </h1>
              <p className="text-cream/60 text-lg leading-relaxed max-w-xl">{c.tagline}.</p>

              <div className="grid grid-cols-2 gap-4 mt-10 max-w-md">
                <div className="border-l border-gold/40 pl-4">
                  <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-2">
                    <Clock size={11} /> Processing
                  </div>
                  <div className="font-display text-xl text-cream">{c.processingTime}</div>
                </div>
                <div className="border-l border-gold/40 pl-4">
                  <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-2">
                    <Banknote size={11} /> Gov Fee
                  </div>
                  <div className="font-display text-xl text-cream">{c.govFee}</div>
                </div>
              </div>
            </div>

            {/* Difficulty meter card */}
            <div className="lg:col-span-5">
              <div className="glass p-10">
                <div className="eyebrow mb-6 justify-center inline-flex w-full">Difficulty Rating</div>
                <DifficultyMeter level={c.difficulty} />
                <div className="hairline my-6" />
                <p className="text-center text-xs text-cream/50 leading-relaxed">
                  Our assessment based on refusal rates, documentation complexity, and embassy
                  idiosyncrasies for SA applicants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gold" strokeWidth={1.4} />
                </div>
                <h2 className="font-display text-3xl text-cream">Core Requirements</h2>
              </div>
              <ul className="space-y-4">
                {c.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-4 pb-4 border-b border-gold/10 last:border-0">
                    <span className="font-display text-gold text-sm mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-cream/75 text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 blur-3xl rounded-full" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 border border-gold/40 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gold" strokeWidth={1.4} />
                  </div>
                  <h2 className="font-display text-3xl text-cream">Concierge Tip</h2>
                </div>
                <p className="font-display text-2xl text-cream/90 leading-relaxed italic mb-8">
                  &ldquo;{c.tips}&rdquo;
                </p>
                <div className="hairline mb-6" />
                <p className="text-xs text-cream/50 leading-relaxed">
                  This is exactly the kind of insight we bring to every {c.shortName} file. Not
                  generic checklists — embassy-specific intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="glass p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl" />
            </div>
            <div className="relative">
              <div className="eyebrow justify-center inline-flex mb-5">Next Step</div>
              <h2 className="font-display text-4xl lg:text-5xl text-cream leading-tight mb-5">
                Ready for <span className="italic text-gold-gradient">{c.shortName}</span>?
              </h2>
              <p className="text-cream/60 max-w-lg mx-auto mb-8">
                Take our 6-step visa quiz and receive a {c.shortName}-specific quote within 24 hours.
              </p>
              <Link href="/visa-quiz" className="btn-gold">
                Start My {c.shortName} Quiz
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
