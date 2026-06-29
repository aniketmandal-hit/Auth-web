import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ZoroHeroPage() {

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col justify-between overflow-hidden relative">
      
      
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-[-10%] left-[20%] w-2 h-[120%] bg-emerald-500 rotate-35" />
        <div className="absolute top-[-10%] left-[50%] w-2 h-[120%] bg-emerald-400 rotate-35" />
        <div className="absolute top-[-10%] left-[80%] w-2 h-[120%] bg-emerald-600 rotate-35" />
      </div>

      
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="text-xl font-black tracking-widest text-emerald-500">
          三刀流 <span className="text-neutral-400">/ 3刀</span>
        </div>
        <div>
            <Link
            to='/'
            className='bg-linear-to-r  from-emerald-700 via-emerald-600 to-teal-800/80 rounded-2xl w-30 h-9 p-2 cursor-pointer'> Back to home</Link>
        </div>
       
        
      </header>

      
      <main className="flex-1 flex flex-col justify-center items-center px-4 relative z-10">
        <div className="text-center max-w-4xl space-y-6">
          
         
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-amber-500 bg-emerald-950/50 border border-emerald-800/50 px-4 py-1.5 rounded-full backdrop-blur-sm">
            The Pirate Hunter
          </span>

         
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase text-white select-none">
            Roronoa <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 via-emerald-400 to-teal-600">Zoro</span>
          </h1>

      
          <p className="text-xl md:text-3xl font-light tracking-wide text-neutral-400 pt-4">
            welcome to my website
          </p>
          
        </div>
      </main>

      
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-neutral-600 relative z-10 gap-4">
        <div>WANO COUNTRY // GRAND LINE</div>
        <div className="flex gap-4 items-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>WADO ICHIMONJI</span>
          <span className="w-2 h-2 rounded-full bg-neutral-700" />
          <span>SHUSUI</span>
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          <span>ENMA</span>
        </div>
      </footer>
      
    </div>
  );
}