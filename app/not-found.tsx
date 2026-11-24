import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />

      <main id="main-content" className="pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-[960px] px-4 sm:px-8">
          <div className="rounded-3xl border border-[#12161F]/12 bg-white p-8 sm:p-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C85A17]/25 bg-[#C85A17]/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C85A17]">
              <Compass className="h-3.5 w-3.5" />
              <span>404 · Page Not Found</span>
            </div>

            <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-[#12161F] sm:text-5xl">
              This route does not exist in Abdul Hameed’s portfolio.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4B5262]">
              The page you requested may have moved or the URL was mistyped. Use the links below to inspect verified project case studies, services, or technical expertise.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-[#12161F] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F8F6F1] transition-colors hover:bg-[#C85A17]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Homepage</span>
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-[#12161F]/15 bg-[#F8F6F1] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#12161F] transition-colors hover:border-[#C85A17] hover:text-[#C85A17]"
              >
                <span>Browse All 9 Case Studies</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#4B5262] transition-colors hover:text-[#C85A17]"
              >
                <span>Contact Abdul Hameed</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
