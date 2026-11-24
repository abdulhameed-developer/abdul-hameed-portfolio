import React from 'react';
import Image from 'next/image';

interface ServiceIllustrationProps {
  slug: string;
  className?: string;
}

interface ServiceVisualSpec {
  image: string;
  alt: string;
}

const SERVICE_VISUALS: Record<string, ServiceVisualSpec> = {
  'website-development': {
    image: '/images/v5/service-web-design.jpg',
    alt: 'Editorial studio composition showing frosted browser interface planes and responsive web design grid sheets',
  },
  'wordpress-development': {
    image: '/images/v5/service-wordpress-cms.jpg',
    alt: 'Modular interlocking publishing blocks and CMS architecture on an architectural studio desk',
  },
  'ecommerce-development': {
    image: '/images/v5/service-ecommerce-store.jpg',
    alt: 'Luxury e-commerce studio still life on travertine stone with boutique packaging and glass product card',
  },
  'seo-optimization': {
    image: '/images/v5/service-seo-analytics.jpg',
    alt: 'Optical glass prism refracting light across an architectural search visibility and performance chart',
  },
  'graphic-design': {
    image: '/images/v5/service-brand-identity.jpg',
    alt: 'Tactile brand identity flat-lay with terracotta, charcoal, and sand color swatches and typography specimens',
  },
  'ai-assisted-solutions': {
    image: '/images/v5/service-ai-workflow.jpg',
    alt: 'Connected optical glass nodes and copper pathways on travertine stone representing intelligent web workflows',
  },
};

export default function ServiceIllustration({
  slug,
  className = '',
}: ServiceIllustrationProps) {
  const spec =
    SERVICE_VISUALS[slug] || SERVICE_VISUALS['website-development'];

  return (
    <div
      className={`group relative flex h-full min-h-[260px] w-full overflow-hidden rounded-2xl border border-[#12161F]/10 bg-[#EFECE4] p-2.5 shadow-[0_16px_40px_-20px_rgba(18,22,31,0.10)] sm:min-h-[340px] sm:p-3.5 ${className}`}
    >
      <div className="relative h-full min-h-[240px] w-full flex-1 overflow-hidden rounded-xl border border-[#12161F]/8 bg-[#EFECE4] sm:min-h-[315px]">
        <Image
          src={spec.image}
          alt={spec.alt}
          fill
          priority={slug === 'website-development'}
          sizes="(max-width: 1024px) 95vw, 45vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
