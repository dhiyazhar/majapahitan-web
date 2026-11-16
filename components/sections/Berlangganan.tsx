"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Berlangganan() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Stub: wire to newsletter backend later.
    if (!email) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3500);
  };

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      {/* On desktop the copy and the form sit side by side as one band; below lg they stack. */}
      <div className="rounded-xl bg-maroon p-7 sm:p-10 lg:flex lg:items-center lg:gap-10">
        <div className="lg:w-80 lg:shrink-0">
          <SectionHeading title="Berlangganan Informasi" tone="gold" size="sm" />
          <p className="mt-2 text-sm text-cream/85">
            Dapatkan berita, program, dan pameran terbaru dari kami.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 flex-1 lg:mt-0 lg:self-stretch lg:border-l lg:border-cream/20 lg:pl-10 lg:flex lg:items-center"
        >
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <label htmlFor="berlangganan-email" className="sr-only">
              Alamat email
            </label>
            <input
              id="berlangganan-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="min-h-11 w-full min-w-0 flex-1 rounded-sm bg-cream px-4 py-3 text-sm text-cream-ink placeholder:text-cream-ink/65 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-sm bg-gold px-7 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-soft"
            >
              {done ? "Terkirim!" : "Berlangganan"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
