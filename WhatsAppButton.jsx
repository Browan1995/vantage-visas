"use client";

import { MessageCircle } from "lucide-react";

// NOTE: Replace PHONE with your real WhatsApp Business number (international format, no +).
const PHONE = "27794748331";

export default function WhatsAppButton({ destination }) {
  const msg = destination
    ? `Hi NorthBound, I just finished the quiz for ${destination}. Please send my quote.`
    : `Hi NorthBound, I just finished the quiz for [Destination]. Please send my quote.`;
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NorthBound on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="wa-pulse w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-2xl border-2 border-white/20 group-hover:scale-110 transition-transform duration-300">
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current" aria-hidden="true">
          <path d="M16.003 3C9.374 3 4 8.374 4 15.003c0 2.38.69 4.6 1.88 6.474L4 29l7.74-1.832a11.96 11.96 0 0 0 4.263.78h.005C22.632 27.948 28 22.577 28 15.95 28 9.324 22.632 3 16.003 3zm0 22.105c-1.43 0-2.83-.38-4.055-1.098l-.29-.173-4.59 1.086 1.102-4.474-.19-.303a9.918 9.918 0 1 1 18.39-5.193c0 5.48-4.46 9.93-9.93 9.93zm5.46-7.43c-.3-.15-1.77-.873-2.046-.972-.273-.1-.473-.15-.673.15-.2.297-.77.972-.944 1.172-.174.2-.348.223-.647.074-.3-.15-1.266-.466-2.41-1.486-.89-.795-1.49-1.777-1.666-2.077-.174-.3-.02-.46.13-.61.135-.135.3-.35.45-.525.15-.174.2-.3.3-.5.1-.198.05-.372-.025-.522-.075-.15-.673-1.622-.92-2.222-.243-.584-.49-.505-.672-.515l-.574-.01c-.2 0-.524.074-.798.373-.273.3-1.046 1.02-1.046 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.108 3.22 5.108 4.517.714.308 1.27.492 1.704.63.715.228 1.366.196 1.88.12.574-.086 1.77-.724 2.02-1.424.25-.7.25-1.3.175-1.425-.074-.125-.273-.2-.573-.35z"/>
        </svg>
      </div>
      <span className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-navy-900 text-cream text-xs tracking-widest uppercase px-4 py-2 border border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
