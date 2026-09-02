"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

type Props = {
  title: string;
};

export default function ShareButtons({ title }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleShare = (platform: "wa" | "x" | "fb") => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);

    let shareUrl = "";
    if (platform === "wa") {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    } else if (platform === "x") {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === "fb") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-hairline bg-panel p-4 sm:p-5">
      <div className="flex items-center gap-2.5 text-xs text-muted sm:text-sm">
        <Share2 className="h-4 w-4 text-gold" />
        <span className="font-semibold text-cream">Bagikan Warta Ini:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Salin Tautan */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-ink px-3 py-1.5 text-xs font-medium text-cream transition-colors hover:border-gold/50 hover:text-gold"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Tautan Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Salin Tautan</span>
            </>
          )}
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={() => handleShare("wa")}
          className="inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-ink px-3 py-1.5 text-xs font-medium text-cream transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
        >
          <span>WhatsApp</span>
        </button>

        {/* X / Twitter */}
        <button
          type="button"
          onClick={() => handleShare("x")}
          className="inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-ink px-3 py-1.5 text-xs font-medium text-cream transition-colors hover:border-sky-500/50 hover:text-sky-400"
        >
          <span>X (Twitter)</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => handleShare("fb")}
          className="inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-ink px-3 py-1.5 text-xs font-medium text-cream transition-colors hover:border-blue-500/50 hover:text-blue-400"
        >
          <span>Facebook</span>
        </button>
      </div>
    </div>
  );
}
