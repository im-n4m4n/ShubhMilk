import NewsletterForm from "@/components/NewsletterForm";
import { compliance, contact, links, serviceAreas } from "@/lib/businessConfig";

const columns: { title: string; links: string[] }[] = [
  {
    title: "Shop",
    links: ["A2 Milk", "Curd", "Paneer", "Bilona Ghee", "Gifting"],
  },
  {
    title: "Subscribe",
    links: ["Start a Subscription", "Manage", "Slots & Areas", "Pause or Cancel"],
  },
  {
    title: "About",
    links: ["Our Farms", "The Bilona Way", "Journal", "Contact"],
  },
  {
    title: "Help",
    links: ["FAQs", "Track Order", "Returns", "Privacy"],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      {/* Paisley strip along the top edge */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-4 opacity-[0.09]" style={{ mixBlendMode: "screen" }}>
        <svg viewBox="0 0 640 16" preserveAspectRatio="none" className="h-full w-full">
          <g fill="none" stroke="var(--motif)" strokeWidth="1">
            {Array.from({ length: 40 }, (_, i) => (
              <path key={i} d={`M${i * 16} 16 C${i * 16 + 5} 4 ${i * 16 + 11} 4 ${i * 16 + 16} 16`} />
            ))}
          </g>
        </svg>
      </div>
      {/* Giant wordmark watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center"
      >
        <span className="display text-[20vw] leading-none text-milk opacity-[0.05]">SHUBH</span>
      </div>

      <div className="relative mx-auto max-w-site px-6 lg:px-12">
        {/* First-order offer card */}
        <div className="card mx-auto mt-20 max-w-xl p-8 text-center text-ink">
          <p className="font-mono text-xs text-kesar">GET ₹100 OFF</p>
          <h2 className="display mt-3 text-2xl font-medium">Your first subscription, on us.</h2>
          <NewsletterForm />
        </div>

        {/* Link columns */}
        <div className="mt-20 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] tracking-[0.25em] text-kesar">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-bone/70">
                {col.links.map((label) => (
                  <li key={label}>
                    <span className="cursor-pointer hover:text-bone">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance + contact — every value comes from lib/businessConfig.ts */}
        <div className="mt-16 space-y-2">
          <p className="font-mono text-xs text-bone/50">
            {compliance.fssai}
            {" · "}
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bone"
            >
              WhatsApp {contact.whatsappDisplay}
            </a>
            {" · "}
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
              Instagram
            </a>
          </p>
          <p className="font-mono text-[11px] text-bone/40">
            Deliveries across {serviceAreas.length} areas in Varanasi
          </p>
        </div>

        {/* Legal strip */}
        <div className="mt-16 border-t border-motif/20 py-8">
          <div className="flex flex-col gap-2 text-xs text-bone/40 sm:flex-row sm:items-center sm:justify-between">
            <p>Shubh Milk · Farm to door across Varanasi.</p>
            <p>© 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}