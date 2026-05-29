import { useEffect, useMemo, useState } from 'react';

type NavItem = {
  id: string;
  label: string;
  icon: JSX.Element;
};

export const SideNav = () => {
  const items: NavItem[] = useMemo(
    () => [
      {
        id: 'home',
        label: 'Home',
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M4 11.5L12 5l8 6.5v7.5a1 1 0 0 1-1 1h-5v-5H10v5H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        )
      },
      {
        id: 'about',
        label: 'About',
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 7.5h.01M11 11h2v6h-2z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 'benefits',
        label: 'Benefits',
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M12 3l7 4v5c0 4.6-3.1 8.2-7 9-3.9-.8-7-4.4-7-9V7l7-4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        )
      },
      {
        id: 'honey-uses',
        label: 'Uses',
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M6 9c1.4-2.5 3.7-4 6-4s4.6 1.5 6 4-1.4 6-6 10c-4.6-4-7.4-7.5-6-10z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        )
      },
      {
        id: 'products',
        label: 'Products',
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M7 7h10l-1 14H8L7 7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 7V6a3 3 0 0 1 6 0v1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 'gallery',
        label: 'Gallery',
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M7 15l3-3 4 4 3-3 3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 'reviews',
        label: 'Reviews',
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M7 17l-3 3V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 8h6M9 12h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 'contact',
        label: 'Contact',
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )
      }
    ],
    []
  );

  const [activeId, setActiveId] = useState(items[0]?.id ?? 'home');

  useEffect(() => {
    const update = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      let current = items[0]?.id ?? 'home';
      items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) current = item.id;
      });
      setActiveId(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  return (
    <nav className="fixed left-3 top-1/2 z-40 -translate-y-1/2 sm:left-6" aria-label="Section navigation">
      <div className="rounded-full border border-white/35 bg-white/20 px-2 py-3 shadow-[0_20px_50px_rgba(20,12,6,0.25)] backdrop-blur-2xl">
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                aria-label={item.label}
                aria-current={activeId === item.id ? 'true' : undefined}
                title={item.label}
                className={`group flex h-10 w-10 items-center justify-center rounded-full transition ${
                  activeId === item.id
                    ? 'bg-white/80 text-amber-900 shadow-[0_12px_24px_rgba(255,255,255,0.3)]'
                    : 'text-amber-900/70 hover:bg-white/40'
                }`}
              >
                {item.icon}
                <span className="sr-only">{item.label}</span>
              </a>
              <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 rounded-full bg-black/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-honey-100 opacity-0 shadow-lg transition group-hover:opacity-100">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
