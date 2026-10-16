"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { portfolioContent } from "../../data/portfolio";
import { designTokens } from "../../lib/design-tokens";

const navigationItems = [
  { label: "Home", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  const [activeHref, setActiveHref] = useState("#top");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 12);
      if (window.scrollY < 80) setActiveHref("#top");
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const visibleSections = new Map<string, number>();
    const sections = navigationItems
      .map(({ href }) => (href.startsWith("#") ? document.getElementById(href.slice(1)) : null))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        const mostVisibleSection = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0];
        if (mostVisibleSection) setActiveHref(`#${mostVisibleSection[0]}`);
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const handleNavigation = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (!href.startsWith("#")) return;

    if (href === "#top") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
      window.history.pushState(null, "", href);
      setActiveHref(href);
      return;
    }

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    const navHeight = document.querySelector("[data-navbar]")?.getBoundingClientRect().height ?? 0;
    const targetTop = window.scrollY + target.getBoundingClientRect().top - navHeight - 12;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    window.history.pushState(null, "", href);
    setActiveHref(href);
  };

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    setActiveHref("#top");
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
    window.history.pushState(null, "", "#top");
  };

  const menuTransition = {
    duration: shouldReduceMotion
      ? designTokens.animation.reducedMotionDuration
      : designTokens.animation.duration.standard,
    ease: designTokens.animation.easing.standard,
  };

  return (
    <header data-navbar className="sticky top-0 z-50 mx-auto w-full px-3 pt-3 sm:px-5">
      <motion.nav
        aria-label="Primary navigation"
        className="relative mx-auto flex min-h-14 max-w-7xl items-center justify-between rounded-xl border border-white/10 bg-[#0B1120]/75 px-4 shadow-[0_12px_36px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors duration-300 sm:px-6"
        animate={{ backgroundColor: isScrolled ? "rgba(11, 17, 32, 0.94)" : "rgba(11, 17, 32, 0.75)" }}
        transition={{
          duration: shouldReduceMotion
            ? designTokens.animation.reducedMotionDuration
            : designTokens.animation.duration.standard,
        }}
      >
        <a
          href="#top"
          onClick={handleBrandClick}
          className="inline-flex min-h-11 items-center gap-2.5 rounded-md text-xs font-semibold tracking-[0.12em] text-[#F8FAFC] outline-none transition-colors hover:text-[#22D3EE] focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,0.75)]" />
          {portfolioContent.brand}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navigationItems.map(({ label, href }) => {
            const isActive = activeHref === href;

            return (
              <a
                key={href}
                href={href}
                onClick={handleNavigation(href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                  isActive ? "text-[#F8FAFC]" : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-desktop"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-white/[0.07]"
                    transition={menuTransition}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            );
          })}
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#F8FAFC] outline-none transition-colors hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-[#22D3EE] md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
            <motion.span
              className="h-[2px] w-full rounded-full bg-current"
              animate={menuOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: menuTransition.duration }}
            />
            <motion.span
              className="h-[2px] w-full rounded-full bg-current"
              animate={menuOpen ? { opacity: 0, scaleX: 0.6 } : { opacity: 1, scaleX: 1 }}
              transition={{
                duration: shouldReduceMotion
                  ? designTokens.animation.reducedMotionDuration
                  : designTokens.animation.duration.fast,
              }}
            />
            <motion.span
              className="h-[2px] w-full rounded-full bg-current"
              animate={menuOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: menuTransition.duration }}
            />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              id="mobile-navigation-menu"
              key="mobile-navigation-menu"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, height: 0 }}
              transition={menuTransition}
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-xl border border-white/10 bg-[#0B1120]/95 p-2 shadow-[0_18px_48px_rgba(0,0,0,0.42)] backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col">
                {navigationItems.map(({ label, href }, index) => {
                  const isActive = activeHref === href;

                  return (
                    <motion.a
                      key={href}
                      href={href}
                      onClick={handleNavigation(href)}
                      aria-current={isActive ? "page" : undefined}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        ...menuTransition,
                        delay: shouldReduceMotion ? 0 : index * designTokens.animation.staggerChildren,
                      }}
                      className={`flex min-h-12 items-center justify-between rounded-lg px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                        isActive
                          ? "bg-white/[0.07] text-[#F8FAFC]"
                          : "text-[#94A3B8] hover:bg-white/[0.04] hover:text-[#F8FAFC]"
                      }`}
                    >
                      {label}
                      {isActive && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
