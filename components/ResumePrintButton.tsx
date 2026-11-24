'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function ResumePrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label="Print or Save Resume as PDF via Browser Print Dialog"
      className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#12161F] px-5 py-3 text-xs font-semibold text-[#F8F6F1] transition-colors hover:bg-[#C85A17] sm:text-sm"
    >
      <Printer className="h-4 w-4" />
      <span>Print / Save as PDF (Browser Print)</span>
    </button>
  );
}
