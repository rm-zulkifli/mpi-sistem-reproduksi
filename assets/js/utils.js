/**
 * UTILS & HELPER FUNCTIONS
 * Sintesis Audio Web Audio API, Canvas Confetti, LocalStorage Helper, Formatter
 */

const Utils = {
  // Web Audio API Audio Synthesizer
  audioCtx: null,
  soundEnabled: true,

  initAudio() {
    if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
  },

  playTone(freq, type, duration, delay = 0) {
    if (!this.soundEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + delay);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + delay);
      osc.stop(this.audioCtx.currentTime + delay + duration);
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  },

  playClick() {
    this.playTone(600, 'sine', 0.08);
  },

  playCorrect() {
    this.playTone(523.25, 'sine', 0.12, 0);       // C5
    this.playTone(659.25, 'sine', 0.12, 0.1);     // E5
    this.playTone(783.99, 'sine', 0.25, 0.2);     // G5
  },

  playWrong() {
    this.playTone(280, 'sawtooth', 0.15, 0);
    this.playTone(220, 'sawtooth', 0.25, 0.12);
  },

  playComplete() {
    this.playTone(440, 'triangle', 0.15, 0);      // A4
    this.playTone(554.37, 'triangle', 0.15, 0.12);// C#5
    this.playTone(659.25, 'triangle', 0.15, 0.24);// E5
    this.playTone(880, 'triangle', 0.4, 0.36);    // A5
  },

  playFlip() {
    this.playTone(400, 'triangle', 0.06);
  },

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  },

  // Lightweight HTML5 Canvas Confetti (Zero dependency)
  triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#2563eb', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

    for (let i = 0; i < 100; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        velX: (Math.random() - 0.5) * 6,
        velY: Math.random() * 4 + 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8
      });
    }

    let animationFrame;
    let opacity = 1.0;
    const startTime = Date.now();

    function render() {
      const elapsed = Date.now() - startTime;
      if (elapsed > 3500) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.velX;
        p.y += p.velY;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(render);
    }

    render();
  },

  // LocalStorage Helpers
  storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(`MPI_REPRO_${key}`);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.error("Storage get error:", e);
        return defaultValue;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(`MPI_REPRO_${key}`, JSON.stringify(value));
      } catch (e) {
        console.error("Storage set error:", e);
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(`MPI_REPRO_${key}`);
      } catch (e) {
        console.error("Storage remove error:", e);
      }
    }
  },

  // Toast Notification
  showToast(message, type = 'success', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'warning') icon = '⚠';

    toast.innerHTML = `<span style="font-weight: bold;">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Formatting utilities
  formatDate(isoString) {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  formatTimer(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  },

  sanitize(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }
};

if (typeof window !== "undefined") {
  window.Utils = Utils;
}
