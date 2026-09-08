import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc, RotateCw } from 'lucide-react';

// Singleton audio instance — prevents duplicate audio from React StrictMode double-mount
let globalAudio = null;

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(302.8);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    // If a global audio already exists (StrictMode remount), reuse it
    if (!globalAudio) {
      globalAudio = new Audio('./assets/tobey_andrew_theme.mp3');
      globalAudio.loop = true;
      globalAudio.volume = 0.55;
      globalAudio.preload = 'auto';
    }

    const audio = globalAudio;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    // Only start playing if not already playing (prevents double-play on StrictMode remount)
    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback: listen for any gesture to start
        const handleGesture = () => {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
          cleanupGesture();
        };

        const events = ['click', 'pointerdown', 'keydown', 'scroll', 'touchstart'];
        events.forEach((evt) => {
          document.addEventListener(evt, handleGesture, { once: true, passive: true });
        });

        var cleanupGesture = () => {
          events.forEach((evt) => {
            document.removeEventListener(evt, handleGesture);
          });
        };
      });
    } else {
      // Already playing from previous mount — sync state
      setIsPlaying(true);
    }

    const wasPlayingBeforeDialogueRef = { current: false };

    const handleDialogueState = (e) => {
      if (!audioRef.current) return;
      const { isPlayingDialogue } = e.detail || {};

      if (isPlayingDialogue) {
        wasPlayingBeforeDialogueRef.current = !audioRef.current.paused;
        if (!audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (wasPlayingBeforeDialogueRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
        }
      }
    };

    window.addEventListener('spiderman-dialogue-state', handleDialogueState);

    return () => {
      window.removeEventListener('spiderman-dialogue-state', handleDialogueState);
      // Don't pause or destroy globalAudio — it's a singleton that persists across remounts
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {isExpanded && (
        <div className="p-4 rounded-2xl bg-[#080914]/95 border border-red-500/40 backdrop-blur-xl shadow-[0_0_30px_rgba(239,68,68,0.35)] w-80 text-left animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-red-400 ${isPlaying ? 'animate-ping' : ''} opacity-75`} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span className="text-[11px] font-tech uppercase tracking-widest text-red-400 font-bold">
                Multiverse Soundtrack
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-tech text-slate-400 uppercase tracking-wider">
              <RotateCw className={`w-3 h-3 text-cyan-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
              Auto-Loop Active
            </div>
          </div>

          <div className="mt-3">
            <h4 className="text-sm font-bebas tracking-wide text-white flex items-center gap-1.5">
              Tobey & Andrew's Theme
            </h4>
            <p className="text-[11px] font-tech text-cyan-300/90 -mt-0.5 tracking-wider uppercase">
              No Way Home Tribute Suite (Full)
            </p>
          </div>

          <div className="mt-3">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-[10px] font-tech text-slate-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span className="text-slate-500 font-sans tracking-tight">Looping Start to End</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <button
              onClick={togglePlay}
              className="interactive-control px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-tech tracking-wider uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Music</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-slate-400 hover:text-white transition-colors p-1"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className={`interactive-control group flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-xl backdrop-blur-xl ${
          isPlaying
            ? 'bg-slate-900/90 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.35)] text-white'
            : 'bg-slate-950/80 border-slate-700/60 text-slate-300 hover:border-red-500/40'
        }`}
        title="Background Music: Tobey and Andrew's Theme (No Way Home Tribute)"
      >
        <div className="relative flex items-center justify-center">
          <Disc
            className={`w-4 h-4 text-red-400 ${isPlaying ? 'animate-spin' : ''}`}
            style={{ animationDuration: '4s' }}
          />
        </div>

        <div className="flex items-end gap-0.5 h-3 w-4">
          <span
            className={`w-1 bg-red-500 rounded-t transition-all ${
              isPlaying ? 'h-3 animate-pulse' : 'h-1'
            }`}
          />
          <span
            className={`w-1 bg-cyan-400 rounded-t transition-all ${
              isPlaying ? 'h-2 animate-pulse delay-75' : 'h-1'
            }`}
          />
          <span
            className={`w-1 bg-amber-400 rounded-t transition-all ${
              isPlaying ? 'h-3 animate-pulse delay-150' : 'h-1'
            }`}
          />
        </div>

        <span className="text-xs font-tech tracking-wider uppercase flex items-center gap-1.5">
          <span className="hidden sm:inline text-slate-300 font-medium">BGM:</span>
          <span className="text-white font-semibold">Tobey & Andrew's Theme</span>
        </span>

        <span
          onClick={togglePlay}
          className="ml-1 p-1 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
        </span>
      </button>
    </div>
  );
}
