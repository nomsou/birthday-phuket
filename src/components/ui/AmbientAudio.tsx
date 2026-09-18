"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";

const VOLUME = 0.05; // ~5% volume — very quiet, ambient

export function AmbientAudio() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (pathname === "/enter") return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUME;
    audio.loop = true;

    const tryPlay = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay blocked — user will trigger it via interaction
        });
    };

    tryPlay();

    const onFirstInteraction = () => {
      tryPlay();
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };

    window.addEventListener("click", onFirstInteraction);
    window.addEventListener("touchstart", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);

    return () => {
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, [pathname]);

  // Hide entirely on /enter, and if audio becomes unavailable
  if (pathname === "/enter" || !available) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setAvailable(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Mute ambient music" : "Play ambient music"}
        className="fixed bottom-5 right-5 z-50 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-105"
        style={{
          background: "#2C5F2D",
          color: "#F5F0E6",
          opacity: 0.85,
        }}
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </>
  );
}
