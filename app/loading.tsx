import React from 'react';
import Navbar from '@/components/Navbar';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />
      <main
        id="main-content"
        aria-busy="true"
        aria-label="Loading page content"
        className="mx-auto max-w-[1380px] px-4 pb-24 pt-28 sm:px-8 sm:pt-36"
      >
        <div className="animate-pulse space-y-8">
          <div className="border-b border-[#12161F]/10 pb-10">
            <div className="h-3.5 w-44 rounded-full bg-[#EFECE4]" />
            <div className="mt-4 h-12 w-3/4 max-w-2xl rounded-2xl bg-[#EFECE4]" />
            <div className="mt-4 h-5 w-2/3 max-w-xl rounded-xl bg-[#EFECE4]" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="h-72 rounded-2xl border border-[#12161F]/8 bg-white p-4" />
            <div className="h-72 rounded-2xl border border-[#12161F]/8 bg-white p-4" />
            <div className="h-72 rounded-2xl border border-[#12161F]/8 bg-white p-4" />
          </div>
        </div>
      </main>
    </div>
  );
}
