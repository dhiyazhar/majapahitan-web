"use client";

import { useState } from "react";

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
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-maroon to-maroon-2 p-7 sm:p-10">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gold/10 blur-2xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-gold sm:text-3xl">
            Berlangganan Informasi
          </h2>
          <p className="mt-2 text-sm text-cream/85">
            Dapatkan berita, program, dan pameran terbaru dari kami.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="w-full rounded-sm bg-cream px-4 py-3 text-sm text-cream-ink placeholder:text-cream-ink/50 focus:outline-none focus:ring-2 focus:ring-gold sm:max-w-md"
            />
            <button
              type="submit"
              className="shrink-0 rounded-sm bg-gold px-7 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-gold-soft"
            >
              {done ? "Terkirim!" : "Berlangganan"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
