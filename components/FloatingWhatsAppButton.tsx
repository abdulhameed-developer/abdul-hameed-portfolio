'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { DEVELOPER_PROFILE, getWhatsAppUrl } from '@/lib/portfolio-data';

export function WhatsAppOfficialIcon({
  className = 'h-4 w-4',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function GitHubOfficialIcon({
  className = 'h-4 w-4',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function LinkedInOfficialIcon({
  className = 'h-4 w-4',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function WordPressOfficialIcon({
  className = 'h-4 w-4',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.443 12c0-1.158.234-2.262.654-3.269l3.606 9.882A8.565 8.565 0 013.443 12zm8.557 8.557c-.84 0-1.651-.124-2.419-.351l2.569-7.465 2.633 7.218c.017.042.038.081.061.118a8.532 8.532 0 01-2.844.48zm1.179-12.569c.517-.027.983-.081.983-.081.463-.055.409-.735-.054-.709 0 0-1.391.109-2.291.109-.845 0-2.263-.109-2.263-.109-.463-.027-.518.681-.055.709 0 0 .438.054.901.081l1.339 3.668-1.881 5.641-3.131-9.309c.518-.027.983-.081.983-.081.463-.055.408-.735-.055-.709 0 0-1.391.109-2.291.109-.161 0-.352-.004-.554-.011A8.549 8.549 0 0112 3.443c2.226 0 4.252.851 5.773 2.244-.037-.002-.072-.007-.11-.007-.845 0-1.444.735-1.444 1.526 0 .709.409 1.309.845 2.018.327.572.709 1.308.709 2.371 0 .736-.283 1.589-.654 2.78l-.858 2.866-3.181-9.253zm4.773 10.678l2.593-7.498c.484-1.209.645-2.179.645-3.043 0-.313-.021-.604-.059-.876a8.534 8.534 0 01.999 4.021 8.558 8.558 0 01-4.178 7.396z" />
    </svg>
  );
}

export function SocialIconRow({ className = '' }: { className?: string }) {
  const items = [
    {
      label: `GitHub (@${DEVELOPER_PROFILE.githubHandle})`,
      href: DEVELOPER_PROFILE.githubUrl,
      external: true,
      icon: <GitHubOfficialIcon className="h-4 w-4" />,
    },
    {
      label: 'LinkedIn Profile',
      href: DEVELOPER_PROFILE.linkedinUrl,
      external: true,
      icon: <LinkedInOfficialIcon className="h-4 w-4" />,
    },
    {
      label: `WordPress.org (@${DEVELOPER_PROFILE.wordpressHandle})`,
      href: DEVELOPER_PROFILE.wordpressOrgUrl,
      external: true,
      icon: <WordPressOfficialIcon className="h-4 w-4" />,
    },
    {
      label: `WhatsApp (${DEVELOPER_PROFILE.whatsappDisplay})`,
      href: getWhatsAppUrl(),
      external: true,
      icon: <WhatsAppOfficialIcon className="h-4 w-4" />,
    },
    {
      label: `Email (${DEVELOPER_PROFILE.email})`,
      href: `mailto:${DEVELOPER_PROFILE.email}`,
      external: false,
      icon: <Mail className="h-4 w-4" />,
    },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          aria-label={item.label}
          title={item.label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300/90 bg-white text-[#12161F] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C85A17] hover:bg-[#12161F] hover:text-[#F8F6F1]"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

export default function FloatingWhatsAppButton() {
  const whatsappHref = getWhatsAppUrl(
    'Hello Abdul Hameed, I visited your portfolio and would like to discuss a project or opportunity.'
  );

  return (
    <div className="fixed right-5 bottom-5 z-40 print:hidden">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${DEVELOPER_PROFILE.name} on WhatsApp (${DEVELOPER_PROFILE.whatsappDisplay})`}
        title={`WhatsApp ${DEVELOPER_PROFILE.name} (${DEVELOPER_PROFILE.whatsappDisplay})`}
        data-testid="floating-whatsapp-button"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#25D366] text-white shadow-[0_12px_30px_rgba(18,22,31,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-[#1EBE5D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12161F]"
      >
        <WhatsAppOfficialIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
