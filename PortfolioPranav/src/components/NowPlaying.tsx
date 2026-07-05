import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, X, Play, Pause, Square, Volume2, VolumeX } from "lucide-react";

const track = {
  title: "Coding Beats",
  artist: "Royalty-Free Instrumental",
  album: "Pranav's coding playlist",
  cover:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&q=80",
  src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
};

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function EqBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-4">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] bg-primary rounded-full"
          animate={
            playing
              ? { height: ["20%", "100%", "40%", "80%", "30%"] }
              : { height: "20%" }
          }
          transition={
            playing
              ? { duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

export function NowPlaying() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setPlaying(false);
      setCurrent(0);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      /* browser blocked autoplay */
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrent(0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(duration, duration * ratio));
  };

  if (dismissed) return null;

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:block">
      {/* Single shared audio element */}
      <audio ref={audioRef} src={track.src} preload="metadata" />

      <AnimatePresence mode="wait">
        {mounted && !open && (
          <motion.div
            key="pill"
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.85 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 glass-panel rounded-full pl-2 pr-3 py-2 hover:border-primary/50 transition-colors shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          >
            <button
              onClick={togglePlay}
              className="relative flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform overflow-hidden shadow-[0_0_20px_rgba(139,92,246,0.5)]"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-[2px]" />}
            </button>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 cursor-pointer"
              aria-label="Expand player"
            >
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                  {playing ? "Now playing" : "Coding mix"}
                </span>
                <span className="text-sm font-medium text-foreground truncate max-w-[140px]">
                  {track.title}
                </span>
              </div>
              <EqBars playing={playing} />
            </button>
          </motion.div>
        )}

        {mounted && open && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-2xl p-4 w-[320px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-primary/30 relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/30 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex items-start justify-between mb-3 relative">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-2 w-2 rounded-full ${playing ? "bg-primary animate-pulse" : "bg-muted-foreground"}`}
                />
                <span className="text-[10px] uppercase tracking-widest text-primary font-mono">
                  {playing ? "Now playing" : "Paused"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMute}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="Minimize"
                >
                  <Music2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    stop();
                    setDismissed(true);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="Hide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 relative">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-primary/30">
                <motion.img
                  src={track.cover}
                  alt={`${track.title} cover`}
                  className="w-full h-full object-cover"
                  animate={playing ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                  transition={{ duration: 6, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{track.title}</div>
                <div className="text-xs text-muted-foreground truncate">{track.artist}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-mono mt-1 truncate">
                  {track.album}
                </div>
              </div>

              <EqBars playing={playing} />
            </div>

            {/* Real progress bar (clickable to seek) */}
            <div
              onClick={seek}
              className="mt-4 h-[6px] w-full bg-border/50 rounded-full overflow-hidden relative cursor-pointer group"
            >
              <div
                className="h-full bg-gradient-to-r from-primary to-violet-300 rounded-full transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-foreground rounded-full ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-1.5">
              <span>{formatTime(current)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Transport controls */}
            <div className="flex items-center justify-center gap-3 mt-3">
              <button
                onClick={stop}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
                aria-label="Stop"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-[2px]" />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
