"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/app/store/useStore';

const menuData = {
  "Coffee": [
    { name: "Cappuccino", price: 60, fav: true },
    { name: "Espresso", price: 35 },
    { name: "Americano", price: 40 },
    { name: "Mocha Dark", price: 100, fav: true },
    { name: "Pistachio", price: 200 },
    { name: "Oreo Frappe", price: 160 },
    { name: "Cold Biscoff", price: 220 },
  ],
  "Maggie & Pasta": [
    { name: "Cheese Masala", price: 85, fav: true },
    { name: "All-in-one", price: 100 },
    { name: "White Sauce", price: 160, fav: true },
    { name: "Garlic Cheese", price: 180 },
  ],
  "Snacks": [
    { name: "Paneer Pizza", price: 170, fav: true },
    { name: "Chocolate Sandw.", price: 160 },
    { name: "Daabeli", price: 70 },  
    { name: "Peri-Peri Fries", price: 80, fav: true },
  ]
};

const Loader = () => (
  <motion.div 
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
    exit={{ opacity: 0, scale: 1.2 }}
  >
    <motion.div
      animate={{ rotate: 360, borderRadius: ["20%", "50%", "20%"] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-12 h-12 border-2 border-[#5b9342] shadow-[0_0_15px_#5b9342]"
    />
    <p className="mt-8 font-black italic text-white tracking-[0.4em] uppercase text-[9px]">Hot & Cold</p>
  </motion.div>
);

export default function MobileChaosMenu() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Coffee");
  const { addPick, removePick, picks, total } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Helper to get quantity of an item
  const getItemQty = (name: string) => picks.filter(p => p.name === name).length;

  return (
    <div className="min-h-screen pb-60" style={{ backgroundColor: '#050505', color: '#fff', overflowX: 'hidden' }}>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {/* Radical Nav */}
      <nav className="p-6 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-black/40">
        <div className="bg-white text-black px-3 py-1 font-black uppercase text-lg shadow-[4px_4px_0px_#5b9342] -rotate-2">
          H&C.
        </div>
        
        <Link href="/your-picks" className="relative group">
            <div className="bg-[#facc15] p-3 rounded-2xl rotate-3 shadow-[3px_3px_0px_#fff]">
                <span className="text-xl">🛒</span>
            </div>
            {picks.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5b9342] text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black border-2 border-black">
                    {picks.length}
                </span>
            )}
        </Link>
      </nav>

      <main className="px-5 pt-6">
        {/* Anti-Design Title */}
        <div className="mb-12">
          <h2 className="text-5xl font-black leading-[0.8] tracking-tighter">
            THE <br /> 
            <span style={{ color: '#5b9342' }}>LUST</span> <br />
            <span className="italic text-[#facc15]">LIST.</span>
          </h2>
        </div>

        {/* Category Scroller */}
        <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar">
          {Object.keys(menuData).map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all"
              style={{ 
                transform: `rotate(${idx % 2 === 0 ? '1deg' : '-1.5deg'})`,
                backgroundColor: activeCategory === cat ? '#5b9342' : '#111',
                color: activeCategory === cat ? '#000' : '#888',
                border: activeCategory === cat ? '2px solid #fff' : '1px solid #222',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Menu Items */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {menuData[activeCategory as keyof typeof menuData].map((item, idx) => {
                const qty = getItemQty(item.name);
                return (
                  <div key={item.name} 
                    className="relative flex justify-between items-center p-6 rounded-[2.5rem] border border-white/5"
                    style={{ backgroundColor: '#0c0c0c', marginLeft: idx % 2 === 0 ? '0' : '10px' }}
                  >
                    <div className="max-w-[60%]">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-black text-lg uppercase leading-tight tracking-tight">{item.name}</h4>
                        {item.fav && <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] shadow-[0_0_10px_#facc15]" />}
                      </div>
                      <span className="text-2xl font-black tracking-tighter" style={{ color: '#5b9342' }}>₹{item.price}</span>
                    </div>

                    <div className="flex items-center">
                      {qty > 0 ? (
                        <div className="flex items-center bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                          <button 
                            onClick={() => {
                                const index = picks.findIndex(p => p.name === item.name);
                                if (index > -1) removePick(index);
                            }}
                            className="w-10 h-12 text-white font-black hover:bg-red-500/20 transition-colors"
                          >
                            –
                          </button>
                          <span className="w-8 text-center font-black text-[#facc15]">{qty}</span>
                          <button 
                            onClick={() => addPick(item)}
                            className="w-10 h-12 text-[#5b9342] font-black hover:bg-[#5b9342]/20 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addPick(item)}
                          className="px-6 py-3 rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-[#5b9342]/20 border-2 border-transparent active:border-white transition-all"
                          style={{ backgroundColor: '#5b9342', color: '#000' }}
                        >
                          ADD +
                        </motion.button>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 w-full p-4 z-50 pointer-events-none">
        <div className="max-w-md mx-auto space-y-3 pointer-events-auto">
          {picks.length > 0 && (
            <Link href="/your-picks">
              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="bg-[#facc15] p-5 rounded-[2rem] flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-black"
              >
                <div className="text-black flex items-center gap-3">
                    <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-xs italic">{picks.length}</span>
                    <span className="text-2xl font-black tracking-tighter italic">₹{total}</span>
                </div>
                <div className="bg-black text-white px-5 py-2 rounded-xl font-black uppercase italic text-[10px] tracking-widest">
                   Order Now
                </div>
              </motion.div>
            </Link>
          )}
          
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 flex justify-between items-center">
            <div className="pl-4">
              <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-0.5">Quick Help</p>
              <p className="text-sm font-black text-white tracking-tighter">8959545821</p>
            </div>
            <motion.a 
              href="tel:+918959545821"
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-tighter"
            >
              Call
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}