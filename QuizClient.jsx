"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Plane, Briefcase, Users, Calendar, History, Phone } from "lucide-react";
import { countries } from "@/lib/countries";

const WA_PHONE = "27794748331";

const steps = [
  {
    key: "destination",
    label: "Destination",
    title: "Where are you headed?",
    subtitle: "Select the country you intend to visit.",
    icon: Plane,
    type: "select",
    options: [
      ...countries.map((c) => ({ value: c.shortName, label: c.name, emoji: c.flag })),
      { value: "Other", label: "Another country", emoji: "🌍" },
    ],
  },
  {
    key: "purpose",
    label: "Purpose",
    title: "What&rsquo;s the purpose of your trip?",
    subtitle: "This shapes the visa category we pursue.",
    icon: Briefcase,
    type: "select",
    options: [
      { value: "Tourism", label: "Tourism / Leisure", emoji: "🏖" },
      { value: "Business", label: "Business / Conference", emoji: "💼" },
      { value: "Family", label: "Family / Visiting Relatives", emoji: "👨‍👩‍👧" },
    ],
  },
  {
    key: "employment",
    label: "Employment",
    title: "How do you earn a living?",
    subtitle: "Embassies weigh this heavily.",
    icon: Users,
    type: "select",
    options: [
      { value: "Salaried", label: "Salaried Employee", emoji: "📊" },
      { value: "Business Owner", label: "Business Owner / Self-Employed", emoji: "🏢" },
      { value: "Student", label: "Student", emoji: "🎓" },
      { value: "Retired", label: "Retired", emoji: "🌅" },
    ],
  },
  {
    key: "history",
    label: "History",
    title: "Any visas in the last 5 years?",
    subtitle: "Prior travel history strengthens your file.",
    icon: History,
    type: "select",
    options: [
      { value: "None", label: "None yet", emoji: "🆕" },
      { value: "Schengen", label: "Schengen", emoji: "🇪🇺" },
      { value: "UK/US", label: "UK or US", emoji: "🗽" },
      { value: "Multiple", label: "Multiple countries", emoji: "✈️" },
    ],
  },
  {
    key: "timeline",
    label: "Timeline",
    title: "How soon are you flying?",
    subtitle: "Urgency changes how we triage your file.",
    icon: Calendar,
    type: "select",
    options: [
      { value: "Under 2 weeks", label: "Under 2 weeks", emoji: "🚨" },
      { value: "2–4 weeks", label: "2 – 4 weeks", emoji: "⚡" },
      { value: "1–3 months", label: "1 – 3 months", emoji: "📅" },
      { value: "3+ months", label: "3+ months", emoji: "🗓" },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    title: "Where do we send your quote?",
    subtitle: "We&rsquo;ll WhatsApp you within 24 hours.",
    icon: Phone,
    type: "contact",
  },
];

export default function QuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const current = steps[step];
  const progress = ((step + (done ? 1 : 0)) / steps.length) * 100;

  const pick = (key, value) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setTimeout(() => {
      if (step < steps.length - 1) setStep(step + 1);
    }, 250);
  };

  const submit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const phone = form.get("phone");
    setAnswers((a) => ({ ...a, name, phone }));
    setDone(true);
  };

  // Completion screen
  if (done) {
    const dest = answers.destination || "my trip";
    const msg = `Hi NorthBound, I just finished the quiz for ${dest}. Please send my quote.

Name: ${answers.name}
Phone: ${answers.phone}
Purpose: ${answers.purpose}
Employment: ${answers.employment}
History: ${answers.history}
Timeline: ${answers.timeline}`;
    const href = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;

    return (
      <div className="glass p-10 lg:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl" />
        </div>

        <div className="relative">
          <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-8 bg-navy-900">
            <Check className="w-9 h-9 text-gold" strokeWidth={1.5} />
          </div>

          <div className="eyebrow justify-center inline-flex mb-5">Quiz Complete</div>
          <h2 className="font-display text-4xl lg:text-5xl text-cream mb-4 leading-tight">
            Thank you, <span className="italic text-gold-gradient">{answers.name?.toString().split(" ")[0]}</span>.
          </h2>
          <p className="text-cream/60 max-w-xl mx-auto mb-10">
            Your file has been noted. A concierge will WhatsApp you a personalised quote for{" "}
            <span className="text-gold">{dest}</span> within the next 24 hours.
          </p>

          <a href={href} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Open WhatsApp Now
            <ArrowRight size={16} />
          </a>

          <div className="hairline my-10 max-w-sm mx-auto" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            {Object.entries({
              Destination: answers.destination,
              Purpose: answers.purpose,
              Employment: answers.employment,
              History: answers.history,
              Timeline: answers.timeline,
              Phone: answers.phone,
            }).map(([k, v]) => (
              <div key={k} className="border border-gold/15 p-3">
                <div className="text-[0.6rem] tracking-[0.25em] uppercase text-gold/60">{k}</div>
                <div className="text-cream text-sm mt-1 truncate">{v || "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const Icon = current.icon;

  return (
    <div>
      {/* Progress */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[0.7rem] tracking-[0.25em] uppercase text-gold">
            Step {step + 1} of {steps.length}
          </div>
          <div className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/40">
            {current.label}
          </div>
        </div>
        <div className="h-px bg-gold/15 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold-light transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="flex justify-between mt-4">
          {steps.map((s, i) => (
            <div
              key={s.key}
              className={`text-[0.6rem] tracking-wider uppercase transition-colors duration-500 ${
                i <= step ? "text-gold" : "text-cream/25"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="glass p-8 lg:p-12 relative">
        <div className="flex items-start gap-5 mb-10">
          <div className="w-14 h-14 border border-gold/40 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-gold" strokeWidth={1.4} />
          </div>
          <div>
            <h2
              className="font-display text-3xl lg:text-4xl text-cream leading-tight mb-2"
              dangerouslySetInnerHTML={{ __html: current.title }}
            />
            <p
              className="text-cream/50 text-sm"
              dangerouslySetInnerHTML={{ __html: current.subtitle }}
            />
          </div>
        </div>

        {/* Select type */}
        {current.type === "select" && (
          <div className="grid sm:grid-cols-2 gap-3">
            {current.options.map((opt) => {
              const selected = answers[current.key] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => pick(current.key, opt.value)}
                  className={`group flex items-center gap-4 p-5 border text-left transition-all duration-300 ${
                    selected
                      ? "border-gold bg-gold/10"
                      : "border-gold/20 hover:border-gold/60 hover:bg-gold/5"
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="flex-1 text-cream text-sm tracking-wide">
                    {opt.label}
                  </span>
                  <ArrowRight
                    size={16}
                    className={`text-gold transition-all ${
                      selected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Contact type */}
        {current.type === "contact" && (
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-[0.7rem] tracking-[0.25em] uppercase text-gold mb-2">
                Full Name
              </label>
              <input
                name="name"
                required
                placeholder="e.g. Thandiwe Mbeki"
                className="field"
              />
            </div>
            <div>
              <label className="block text-[0.7rem] tracking-[0.25em] uppercase text-gold mb-2">
                WhatsApp Number
              </label>
              <input
                name="phone"
                type="tel"
                required
                placeholder="e.g. +27 82 123 4567"
                className="field"
              />
            </div>
            <p className="text-[0.7rem] text-cream/40 leading-relaxed">
              By submitting, you agree to be contacted by a NorthBound concierge regarding your
              visa quote. We never share your details.
            </p>
            <button type="submit" className="btn-gold w-full">
              Submit &amp; Receive Quote
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Back button */}
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors"
          >
            <ArrowLeft size={14} />
            Previous
          </button>
        )}
      </div>
    </div>
  );
}
