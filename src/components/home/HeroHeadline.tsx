"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Watch Together.",
  "React Together.",
  "Feel Together."
];

export function HeroHeadline() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (text.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        timeoutId = setTimeout(() => {}, 500); // pause before typing next
      } else {
        timeoutId = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1));
        }, 50); // fast delete
      }
    } else {
      if (text.length === currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // wait before deleting
      } else {
        timeoutId = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, 100); // typing speed
      }
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, phraseIndex]);

  return (
    <h1 className="text-4xl font-display font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 h-[80px] sm:h-[96px] md:h-[120px] flex items-center justify-center">
      <span>
        {text}
        <span className="animate-pulse border-r-4 border-brand-primary ml-1 inline-block h-[1em] translate-y-2"></span>
      </span>
    </h1>
  );
}
