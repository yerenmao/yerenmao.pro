'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Experience', href: '/experience' },
    { name: 'Contact', href: '/contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };

    if (isThemeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isThemeMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' },
  ] as const;

  const [mounted, setMounted] = useState(false);
  const currentTheme = themes.find(t => t.value === theme) || themes[2];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setIsThemeMenuOpen(false);
  };

  const handleNavigation = (href: string) => {
    console.log('Navigation clicked:', href);
    setIsMenuOpen(false);
    console.log('Menu closed, navigating to:', href);
    
    // Try router.push first
    try {
      router.push(href);
      console.log('Router.push called successfully');
    } catch (error) {
      console.log('Router.push failed, using window.location:', error);
      // Fallback to window.location
      window.location.href = href;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-foreground/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/5 via-transparent to-primary-dark/5 opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-light/30 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 30}%`,
              top: '50%',
              animationDelay: `${i * 2}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
        <div
          className="text-2xl font-bold text-foreground hover:text-primary-dark transition-colors duration-200 group cursor-pointer"
          onClick={handleLogoClick}
        >
          <span className="inline-block">
            {'yerenmao'.split('').map((char, index) => (
              <span
                key={index}
                className={`logo-char inline-block ${
                  char === '.' ? 'mx-1' : ''
                }`}
              >
                {char}
              </span>
            ))}
          </span>
        </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                  window.location.href = item.href;
                }}
                className="relative font-medium transition-colors duration-300 hover:text-primary-dark group text-foreground/80 hover:text-foreground"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <span className="nav-link relative inline-block">
                  {item.name}
                  {/* Hover underline that slides in from left */}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-primary-dark rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                  {/* Active underline */}
                  {pathname === item.href && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-dark rounded-full" />
                  )}
                </span>
              </button>
            ))}
            
            {/* Theme Selector */}
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 rounded-lg text-foreground hover:bg-background-secondary transition-all duration-300 group relative overflow-hidden hover:scale-105"
                aria-label="Select theme"
              >
                <span className="text-lg transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:-translate-y-0.5">
                  {mounted ? currentTheme.icon : '💻'}
                </span>
                {/* Ripple effect */}
                <span className="absolute inset-0 bg-primary-light/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
              </button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-background border border-foreground/20 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 fade-in-0 duration-200">
                  <div className="py-1">
                    {themes.map((themeOption, index) => (
                      <button
                        key={themeOption.value}
                        onClick={() => handleThemeChange(themeOption.value)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-background-secondary transition-all duration-200 group ${
                          theme === themeOption.value ? 'bg-primary-light/10 text-primary-light' : 'text-foreground'
                        }`}
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        <span className="text-lg transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
                          {themeOption.icon}
                        </span>
                        <span className="font-medium text-sm transition-colors duration-200">
                          {themeOption.label}
                        </span>
                        {theme === themeOption.value && (
                          <svg className="w-4 h-4 ml-auto transition-all duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button md:hidden p-2 rounded-lg text-foreground hover:bg-background-secondary transition-all duration-300 group relative overflow-hidden hover:scale-105"
            onClick={() => {
              console.log('Mobile menu button clicked, current state:', isMenuOpen);
              setIsMenuOpen(!isMenuOpen);
              console.log('Mobile menu state changed to:', !isMenuOpen);
            }}
            aria-label="Toggle mobile menu"
          >
            <svg
              className={`w-6 h-6 transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-0.5 ${
                isMenuOpen ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
            {/* Ripple effect */}
            <span className="absolute inset-0 bg-primary-light/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
          </button>
        </div>

        {/* Mobile Navigation Menu - Simple Dropdown */}
        {isMenuOpen && (
          <div className="mobile-menu md:hidden">
            <div className="absolute top-full left-0 right-0 bg-background border-t border-foreground/10 shadow-lg">
              <div className="py-4 px-4 space-y-2">
                {/* Navigation Links */}
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      // Force navigation
                      setTimeout(() => {
                        window.location.href = item.href;
                      }, 100);
                    }}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      pathname === item.href 
                        ? 'bg-primary-light/20 text-primary-light' 
                        : 'text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Theme Selector */}
                <div className="border-t border-foreground/10 pt-4 mt-4">
                  <div className="text-sm font-medium text-foreground/60 mb-3">Theme</div>
                  <div className="flex space-x-2">
                    {themes.map((themeOption) => (
                      <button
                        key={themeOption.value}
                        onClick={() => {
                          setTheme(themeOption.value);
                          setIsMenuOpen(false);
                        }}
                        className={`flex-1 p-3 rounded-lg transition-colors ${
                          theme === themeOption.value
                            ? 'bg-primary-light/20 text-primary-light'
                            : 'text-foreground/60 hover:bg-foreground/5'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-1">
                          <span className="text-lg">{themeOption.icon}</span>
                          <span className="text-xs font-medium">{themeOption.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
