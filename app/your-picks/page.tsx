"use client";

import { useStore } from '@/app/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function YourPicks() {
  const { picks, total, removePick } = useStore();

  return (
    <div className="min-h-screen p-6 pb-48" style={{ backgroundColor: '#050505', color: '#ffffff' }}>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <h1 className="text-5xl font-black leading-none tracking-tighter uppercase italic" style={{ color: '#5b9342' }}>
          CHECK <br /> <span className="text-white not-italic">OUT.</span>
        </h1>
        <Link href="/" className="bg-[#111] border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase">
          Back
        </Link>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {picks.length === 0 ? (
            <motion.div className="text-center py-24 opacity-20">
              <p className="text-6xl mb-4">🛒</p>
              <p className="text-xs font-black uppercase tracking-[0.4em]">Cart is Dead</p>
            </motion.div>
          ) : (
            picks.map((item, index: number) => (
              <motion.div 
                layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                key={`${item.name}-${index}`}
                className="flex justify-between items-center p-6 rounded-[2rem] border border-white/5"
                style={{ backgroundColor: '#0c0c0c' }}
              >
                <div>
                  <p className="font-black text-lg uppercase italic tracking-tight mb-1">{item.name}</p>
                  <p className="font-black text-xl" style={{ color: '#5b9342' }}>₹{item.price}</p>
                </div>
                
                <button 
                  onClick={() => removePick(index)}
                  className="bg-red-500/10 text-red-500 px-4 py-2 rounded-xl text-[9px] font-black uppercase border border-red-500/20"
                >
                  Bye
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Floating Checkout */}
      {picks.length > 0 && (
        <div className="fixed bottom-10 left-6 right-6 z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-[2.5rem] shadow-2xl border-2 border-black"
            style={{ backgroundColor: '#facc15' }}
          >
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-black/50 text-[10px] font-black uppercase tracking-widest mb-1">Damage</p>
                <p className="text-5xl font-black text-black tracking-tighter italic">₹{total}</p>
              </div>
            </div>
            <motion.a 
              whileTap={{ scale: 0.96 }}
              href="tel:+918959545821" 
              className="w-full block text-center py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl"
              style={{ backgroundColor: '#000', color: '#fff' }}
            >
              Confirm Order
            </motion.a>
          </motion.div>
        </div>
      )}
    </div>
  );
}