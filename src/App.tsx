import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Github, Music, Gamepad2, Database, Activity } from 'lucide-react';

export default function App() {
  return (
    <main className="min-h-screen bg-dark-bg overflow-x-hidden selection:bg-neon-green/30 flex flex-col relative text-white">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Navigation / Header */}
      <header className="relative z-10 p-8 flex justify-between items-end bg-transparent">
        <div className="space-y-1">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none neon-text-pink">
            Synth Snake
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Neural Audio Environment v2.0</p>
        </div>

        <div className="flex gap-4">
          <div className="glass-panel px-6 py-2 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Current Score</span>
            <span className="text-2xl font-mono font-bold neon-text-green">00,000</span>
          </div>
          <div className="glass-panel px-6 py-2 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Best Record</span>
            <span className="text-2xl font-mono font-bold opacity-80">-- ---</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 p-8 max-w-[1440px] mx-auto w-full overflow-hidden">
        
        {/* Left Sidebar: Library */}
        <aside className="col-span-3 glass-panel p-6 flex flex-col space-y-6">
          <h3 className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 border-b border-white/5 pb-4">Neural Audio Library</h3>
          
          <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#00ffff]"></div>
              <div>
                <p className="text-sm font-bold">Cybernetic Drift</p>
                <p className="text-[10px] opacity-40 font-mono uppercase tracking-widest">Master Node 07</p>
              </div>
            </div>
            {['Neon Pulse', 'Data Rain', 'Logic Stream'].map((track, i) => (
              <div key={i} className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-center space-x-4 opacity-40 hover:opacity-100 cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div>
                  <p className="text-sm font-bold">{track}</p>
                  <p className="text-[10px] opacity-40 font-mono uppercase tracking-widest">Process Unit {i+1}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5">
             <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-neon-green" />
                  <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Cache State</span>
                </div>
                <span className="text-[10px] font-mono text-neon-green animate-pulse">OK</span>
             </div>
          </div>
        </aside>

        {/* Center: Game Window */}
        <section className="col-span-6 glass-panel flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-neon-green/5 to-transparent pointer-events-none" />
          <SnakeGame />
          <div className="mt-8 text-[10px] uppercase tracking-[0.5em] opacity-30 font-bold animate-pulse">
            Neural Uplink Active
          </div>
        </section>

        {/* Right Sidebar: Now Playing & Stats */}
        <aside className="col-span-3 flex flex-col gap-6">
          <MusicPlayer />

          <div className="glass-panel p-6 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest leading-none mb-2 underline decoration-neon-green underline-offset-4">Refresh Rate</span>
              <span className="font-mono text-lg font-bold">144.0 Hz</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest leading-none mb-2 underline decoration-neon-pink underline-offset-4">Intensity</span>
              <span className="font-mono text-lg font-bold neon-text-pink">LEVEL 03</span>
            </div>
          </div>

          <div className="glass-panel p-6 flex-1">
             <h3 className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 border-b border-white/5 pb-4 mb-4">Diagnostic Logs</h3>
             <div className="space-y-3 font-mono text-[10px]">
                <div className="flex justify-between opacity-30">
                  <span>[02:40:01]</span>
                  <span>INIT_SYSTEM...</span>
                </div>
                <div className="flex justify-between text-neon-green">
                  <span>[02:40:05]</span>
                  <span>LNK_STABLE_V4</span>
                </div>
                <div className="flex justify-between text-neon-pink">
                  <span>[02:40:12]</span>
                  <span>AUDIO_SYNC_ACT</span>
                </div>
             </div>
          </div>
        </aside>
      </div>

      {/* Footer Bar */}
      <footer className="relative z-10 px-8 py-4 bg-white/[0.02] border-t border-white/5 flex justify-between items-center">
        <div className="flex gap-8">
           <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-slate-500" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold">Latency: 4.2ms</span>
           </div>
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-white/20">
          Neural Synthetic Environment / Grid v2.0
        </p>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-sm bg-neon-green/30" />
           <div className="w-2 h-2 rounded-sm bg-neon-pink/30" />
        </div>
      </footer>
    </main>
  );
}
