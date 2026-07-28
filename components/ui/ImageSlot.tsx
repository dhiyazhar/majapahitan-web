"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  /** Text shown on the placeholder while the real asset is missing. */
  label?: string;
  /** Sizing classes for the wrapper (it is `overflow-hidden` + the chosen `position`). */
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  /**
   * Wrapper positioning. Defaults to "relative" so `next/image` fill has a positioned
   * ancestor. Pass "absolute" when the slot must fill a parent via `inset-0`.
   * (Do NOT put `relative`/`absolute` in `className` — it conflicts with this.)
   */
  position?: "relative" | "absolute";
};

/**
 * Renders a real image when the file exists, otherwise a labelled gradient placeholder.
 * The wrapper controls the box, so dropping a real file into /public/images causes no
 * layout shift. See public/images/README.md for expected paths.
 */
export default function ImageSlot({
  src,
  alt,
  label,
  className = "",
  imgClassName = "",
  priority,
  sizes,
  position = "relative",
}: Props) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  return (
    <div className={`${position} overflow-hidden ${className}`}>
      {showPlaceholder ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-panel-2 to-ink-2 text-muted">
          <ImageIcon className="h-6 w-6 opacity-50" aria-hidden />
          {label ? (
            <span className="px-3 text-center text-[10px] font-medium uppercase tracking-[0.18em]">
              {label}
            </span>
          ) : null}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className={`object-cover ${imgClassName}`}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
