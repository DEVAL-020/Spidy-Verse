import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Quote, Play, Pause, RotateCcw } from 'lucide-react';

export default function DialogueBanner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(24);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('./assets/tobey_dialogue.mp3');
    audio.volume = 1.0;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      window.dispatchEvent(new CustomEvent('spiderman-dialogue-state', { detail: { isPlayingDialogue: false } }));
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      window.dispatchEvent(new CustomEvent('spiderman-dialogue-state', { detail: { isPlayingDialogue: false } }));
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('spiderman-dialogue-state', { detail: { isPlayingDialogue: false } }));
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        window.dispatchEvent(new CustomEvent('spiderman-dialogue-state', { detail: { isPlayingDialogue: true } }));
      }).catch((err) => {
        console.warn('Audio playback error', err);
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance("Whatever life holds in store for me, I will never forget these words: With great power comes great responsibility. This is my gift, my curse. Who am I? I am Spider-Man.");
          window.speechSynthesis.speak(u);
        }
      });
    }
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
    window.dispatchEvent(new CustomEvent('spiderman-dialogue-state', { detail: { isPlayingDialogue: true } }));
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="relative z-10 my-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden border border-red-500/40 bg-gradient-to-r from-slate-950 via-red-950/50 to-slate-950 p-8 sm:p-12 shadow-[0_0_60px_rgba(239,68,68,0.25)] backdrop-blur-xl">
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none text-red-500">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-96 h-96">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-tech tracking-widest uppercase shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <Quote className="w-3.5 h-3.5" />
            The Sacred Spider-Man Creed
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-[11px] font-tech text-amber-400 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            VOICE: TOBEY MAGUIRE (ORIGINAL FILM AUDIO)
          </div>
        </div>

        <div className="text-center sm:text-left space-y-4">
          <p className="text-base sm:text-xl font-outfit text-slate-300 tracking-wide italic">
            "Whatever life holds in store for me, I will never forget these words:"
          </p>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bebas tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-400 drop-shadow-[0_0_25px_rgba(239,68,68,0.6)] uppercase leading-tight">
            "WITH GREAT POWER COMES GREAT RESPONSIBILITY."
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-2">
            <p className="text-lg sm:text-2xl font-outfit text-cyan-300 tracking-wide font-light">
              This is my gift, my curse...
            </p>

            <div className="text-2xl sm:text-4xl font-bebas tracking-wider text-white flex items-center gap-2 justify-center sm:justify-start">
              <span>Who am I?</span>
              <span className="text-red-500 bg-red-950/80 px-4 py-1 rounded-xl border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                I AM SPIDER-MAN.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <button
              onClick={togglePlayAudio}
              className="interactive-control px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-tech uppercase tracking-wider text-sm font-bold flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:scale-105"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  Pause Tobey's Voice
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current animate-pulse" />
                  Play Tobey Maguire's Voice 🎙️
                </>
              )}
            </button>

            {currentTime > 0 && (
              <button
                onClick={handleRestart}
                className="interactive-control p-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all shadow-md hover:scale-105"
                title="Replay from start"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-md">
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="text-slate-400 hover:text-white transition-colors"
                title={isMuted ? 'Unmute Dialogue' : 'Mute Dialogue'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-rose-400" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (val > 0 && isMuted) setIsMuted(false);
                }}
                className="w-14 sm:w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                title={`Dialogue Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              />
              <span className="text-[11px] font-mono text-slate-300 min-w-[32px]">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>

          <div className="w-full sm:flex-1 sm:max-w-md flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-red-400 font-bold flex items-center gap-1.5">
                {isPlaying && (
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-1 bg-red-500 animate-pulse h-3" />
                    <span className="w-1 bg-red-400 animate-pulse h-2 delay-75" />
                    <span className="w-1 bg-red-600 animate-pulse h-3.5 delay-150" />
                  </span>
                )}
                {formatTime(currentTime)}
              </span>
              <span>Tobey Maguire // Spider-Man (2002)</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 transition-all duration-150 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
