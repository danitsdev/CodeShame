"use client";

import { Copy, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ShareRoastModal({
  score,
  verdict,
  summary,
}: {
  score: string;
  verdict: string;
  summary: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const scoreNum = Number.parseFloat(score);
  let severityColorClass = "bg-accent-red";
  let severityTextColorClass = "text-accent-red";
  let severityBorderClass = "border-accent-red";
  let severityGlowClass = "from-accent-red/30";

  if (scoreNum >= 7) {
    severityColorClass = "bg-accent-green";
    severityTextColorClass = "text-accent-green";
    severityBorderClass = "border-accent-green";
    severityGlowClass = "from-accent-green/30";
  } else if (scoreNum >= 4) {
    severityColorClass = "bg-accent-amber";
    severityTextColorClass = "text-accent-amber";
    severityBorderClass = "border-accent-amber";
    severityGlowClass = "from-accent-amber/30";
  }

  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        className="gap-2 px-4 h-9"
        onClick={() => setOpen(true)}
      >
        <span className="font-mono text-xs">$ share_score</span>
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="flex flex-col w-full max-w-[560px] bg-bg-surface rounded-3xl p-8 gap-8 border border-border-primary shadow-[0_16px_32px_rgba(0,0,0,0.5)]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-text-primary font-mono text-2xl font-semibold">
                Share this Score
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Preview */}
            <a
              href={`${typeof window !== "undefined" ? window.location.pathname : ""}/opengraph-image`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col w-full aspect-[1200/630] bg-bg-page rounded-xl border border-border-secondary relative overflow-hidden p-6 sm:p-8 font-mono cursor-pointer transition-all hover:ring-2 hover:ring-border-primary"
            >
              <div
                className={`absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${severityGlowClass} via-transparent to-transparent`}
              />

              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black/60 text-text-primary text-xs px-3 py-1.5 rounded-md backdrop-blur-md border border-border-secondary font-medium">
                  Open Image ↗
                </span>
              </div>

              {/* Top: Logo */}
              <div className="flex items-center gap-2 mb-6 z-10 w-full">
                <span className="text-accent-green text-lg font-black leading-none">
                  {">"}
                </span>
                <span className="text-text-primary text-lg font-semibold leading-none">
                  codeshame
                </span>
              </div>

              {/* Middle */}
              <div className="flex flex-row items-center gap-6 sm:gap-8 w-full z-10 flex-1">
                {/* Circle */}
                <div
                  className={`flex items-center justify-center rounded-full border-[8px] w-32 h-32 sm:w-36 sm:h-36 shrink-0 ${severityBorderClass} bg-black/40`}
                >
                  <div className="flex items-baseline translate-x-1">
                    <span
                      className={`${severityTextColorClass} text-3xl sm:text-4xl font-black leading-none`}
                    >
                      {score}
                    </span>
                    <span className="text-text-tertiary text-sm sm:text-base font-bold leading-none">
                      /10
                    </span>
                  </div>
                </div>

                {/* Texts */}
                <div className="flex flex-col gap-4 flex-1 overflow-hidden">
                  <span className="text-text-primary text-sm sm:text-[15px] font-mono font-medium leading-relaxed tracking-tight line-clamp-4 sm:line-clamp-5">
                    "{summary}"
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${severityColorClass}`}
                    />
                    <span
                      className={`${severityTextColorClass} text-xs sm:text-sm font-bold font-mono`}
                    >
                      {verdict}
                    </span>
                  </div>
                </div>
              </div>
            </a>

            {/* Copy Link */}
            <div className="flex items-center gap-2 w-full pt-2">
              <div className="flex-1 bg-bg-input rounded-lg border border-border-primary px-4 py-4 flex items-center overflow-hidden">
                <span className="text-text-primary font-mono text-sm truncate">
                  {url}
                </span>
              </div>
              <button
                type="button"
                onClick={copyLink}
                className="flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-green/90 transition-colors text-black px-6 py-4 rounded-lg font-mono font-semibold cursor-pointer"
              >
                <Copy size={20} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
