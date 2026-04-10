import QuizClient from "@/components/QuizClient";

export const metadata = {
  title: "Visa Quiz — NorthBound Visas",
  description: "6-step visa quiz. Receive a personalised quote within 24 hours.",
};

export default function VisaQuizPage() {
  return (
    <section className="relative pt-36 pb-28 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="eyebrow justify-center inline-flex mb-5">The 6-Step Depth Quiz</div>
          <h1 className="font-display text-5xl lg:text-6xl text-cream leading-[1] mb-5">
            Let&rsquo;s build your <span className="italic text-gold-gradient">file</span>.
          </h1>
          <p className="text-cream/60 max-w-xl mx-auto">
            Answer six quick questions. A concierge will WhatsApp you a tailored quote and
            document checklist within 24 hours.
          </p>
        </div>
        <QuizClient />
      </div>
    </section>
  );
}
