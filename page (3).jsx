import Link from "next/link";
import { ArrowUpRight, Target, Heart, Eye, Feather } from "lucide-react";

export const metadata = {
  title: "About — NorthBound Visas",
  description: "A premium visa concierge for South African travelers. 98% approval rate.",
};

const values = [
  {
    icon: Eye,
    t: "Precision",
    d: "Every file is reviewed by hand — line by line, document by document. We read what embassy officers read.",
  },
  {
    icon: Heart,
    t: "Hospitality",
    d: "You&rsquo;ll speak to the same concierge from the first WhatsApp to the passport collection. No call centres.",
  },
  {
    icon: Feather,
    t: "Discretion",
    d: "Your financials, medical history, and travel plans stay between you and us. Always.",
  },
  {
    icon: Target,
    t: "Accountability",
    d: "If we can&rsquo;t get you approved, we refund you. Skin in the game is the whole point.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="eyebrow mb-6">About The House</div>
              <h1 className="font-display text-5xl lg:text-7xl text-cream leading-[0.95]">
                Built for the <span className="italic text-gold-gradient">discerning</span> South African traveler.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <div className="border-l border-gold/40 pl-6">
                <div className="font-display text-6xl text-gold-gradient leading-none">98%</div>
                <div className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/50 mt-3">
                  Approval rate across
                  <br /> 689+ applications
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="glass p-10 lg:p-16">
            <div className="eyebrow mb-6">Our Story</div>
            <div className="space-y-6 text-cream/75 text-lg leading-relaxed font-display">
              <p>
                NorthBound was founded on a simple frustration: South Africans were being let
                down by visa agencies that treated their passports like paperwork and their
                dreams like data entry.
              </p>
              <p>
                The green mamba is one of the most respected travel documents in Africa — yet
                holders are routinely refused because their files weren&rsquo;t prepared with the
                precision European, American, and Asian embassies demand.
              </p>
              <p>
                We set out to build something different. A concierge. A house where every file
                is crafted by a senior consultant who has personally seen how each embassy thinks.
                Where the cover letter is written for <em>your</em> circumstances, not copied
                from a template. Where the interview prep is modelled on real questions from the
                last thirty days of Pretoria and Johannesburg consular sessions.
              </p>
              <p className="text-gold-gradient italic">
                The result is a 98% approval rate — and a client list that keeps coming back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="eyebrow justify-center inline-flex mb-5">What We Stand For</div>
            <h2 className="font-display text-4xl lg:text-6xl text-cream leading-[1]">
              Four <span className="italic text-gold-gradient">principles</span>. No compromises.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="glass glass-hover p-8">
                  <Icon className="w-8 h-8 text-gold mb-5" strokeWidth={1.3} />
                  <h3 className="font-display text-2xl text-cream mb-3">{v.t}</h3>
                  <p
                    className="text-cream/60 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: v.d }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display text-4xl lg:text-5xl text-cream leading-[1.05] mb-6">
            Ready to join the <span className="italic text-gold-gradient">house</span>?
          </h2>
          <p className="text-cream/60 mb-10 max-w-xl mx-auto">
            Start the quiz. A concierge will be in touch within 24 hours.
          </p>
          <Link href="/visa-quiz" className="btn-gold">
            Begin The Quiz
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
