"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/#features", label: "Fitur" },
  { href: "/#cara-kerja", label: "Cara Kerja" },
  { href: "/#keamanan", label: "Keamanan" },
  { href: "/articles", label: "Artikel" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const SCROLL_THRESHOLD = 80;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
    focusables[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target))
        return;
      close();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open, close]);

  const panelTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.28, ease: "easeOut" as const };
  const panelInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 };
  const panelExit = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-foreground">
          Dompet Garuda
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <Button
            ref={triggerRef}
            variant="ghost"
            size="icon"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            <BurgerIcon open={open} reduceMotion={!!prefersReducedMotion} />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              className="fixed inset-x-0 top-16 bottom-0 z-40 bg-background/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
              onClick={close}
            />
            <motion.div
              key="panel"
              id={panelId}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu navigasi"
              className="fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md md:hidden"
              initial={panelInitial}
              animate={{ opacity: 1, y: 0 }}
              exit={panelExit}
              transition={panelTransition}
            >
              <nav className="flex flex-col gap-1 px-4 py-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function BurgerIcon({
  open,
  reduceMotion,
}: {
  open: boolean;
  reduceMotion: boolean;
}) {
  const transition = { duration: reduceMotion ? 0.05 : 0.2, ease: "easeInOut" as const };

  return (
    <span className="relative flex size-5 flex-col items-center justify-center">
      <motion.span
        className="absolute h-0.5 w-4 rounded-full bg-current"
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
        transition={transition}
      />
      <motion.span
        className="absolute h-0.5 w-4 rounded-full bg-current"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={transition}
      />
      <motion.span
        className="absolute h-0.5 w-4 rounded-full bg-current"
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
        transition={transition}
      />
    </span>
  );
}
