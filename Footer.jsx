import Link from "next/link";
import { Compass, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-gold/20 bg-navy-950/80 backdrop-blur-sm">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-navy-950">
        <div className="w-12 h-12 border border-gold/40 rounded-full flex items-center justify-center">
          <Compass className="w-5 h-5 text-gold" strokeWidth={1.5} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl text-cream mb-4">NorthBound Visas</h3>
            <p className="text-cream/60 text-sm leading-relaxed max-w-md">
              The Green Mamba&rsquo;s gateway to the world. A premium concierge handling visa applications
              for discerning South African travelers since day one.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/70 hover:text-navy-950 hover:bg-gold transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow mb-5">Navigate</div>
            <ul className="space-y-3 text-sm">
              {[
                ["/", "Home"],
                ["/visa-quiz", "Visa Quiz"],
                ["/pricing", "Pricing"],
                ["/about", "About"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-cream/60 hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-cream/60">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-gold mt-1 shrink-0" />
                <span>+27 79 474 8331</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-gold mt-1 shrink-0" />
                <span>rowanvdmerwe@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-1 shrink-0" />
                <span>Cape Town &middot; Johannesburg</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row justify-between gap-6 text-xs text-cream/40">
          <p>&copy; {new Date().getFullYear()} NorthBound Visa Agency. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            NorthBound Visas is a private concierge. We are not affiliated with any government. Guarantee void
            if client provides false information, hides criminal history, or misses deadlines. Government fees
            are non-refundable.
          </p>
        </div>
      </div>
    </footer>
  );
}
