import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, MessageSquare, Menu as MenuIcon, X, Star, Instagram } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenReviewModal: () => void;
  isInstagramFollower?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onSelectCategory,
  onOpenReviewModal,
  isInstagramFollower
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Signature', id: 'signature' },
    { label: 'Starters', id: 'starters' },
    { label: 'Mains', id: 'mains' },
    { label: 'Biryani', id: 'biryani' },
    { label: 'Breads', id: 'breads' },
    { label: 'Desserts', id: 'desserts' },
    { label: 'Story', id: 'about' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'about') {
      const el = document.getElementById('restaurant-info');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onSelectCategory(id);
      const el = document.getElementById('menu-catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(`Hello ${restaurantInfo.name}, I would like to inquire about the menu and place a reservation/order.`);
    window.open(`https://wa.me/${restaurantInfo.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0C0F] border-b border-[#232934] py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#0A0C0F] via-[#0A0C0F]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 group cursor-pointer"
            aria-label={`${restaurantInfo.name} Home`}
          >
            <span className="w-8 h-8 rounded-full border border-[#C29E65]/50 flex items-center justify-center text-[#C29E65] text-xs font-serif tracking-widest font-semibold group-hover:border-[#E26421] transition-colors">
              {restaurantInfo.monogram}
            </span>
            <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] uppercase text-[#F6F2E9] group-hover:text-[#C29E65] transition-colors font-medium">
              {restaurantInfo.name}
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-medium text-[#A8B2C1]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-[#F6F2E9] transition-colors py-1 relative group cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C29E65] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary interactive controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Google Review Trigger */}
            <a
              href={restaurantInfo.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#C29E65] hover:text-[#F6F2E9] hover:bg-[#171B22] border border-[#C29E65]/30 rounded-md transition-colors whitespace-nowrap cursor-pointer"
              title="Directly Write a Google Review"
            >
              <Star className="w-3.5 h-3.5 text-[#C29E65] fill-[#C29E65]" />
              <span className="text-[11px] uppercase tracking-wider">Review</span>
            </a>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-[#A8B2C1] hover:text-[#F6F2E9] hover:bg-[#171B22] rounded-lg transition-colors cursor-pointer"
              aria-label="Search dishes and ingredients"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* WhatsApp Quick Link */}
            <button
              onClick={handleWhatsAppDirect}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider text-[#C29E65] hover:text-[#F6F2E9] hover:bg-[#171B22] border border-[#C29E65]/40 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>

            {/* Cart Trigger - Highlighted & Prominent */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-[#E26421] via-[#F37A3B] to-[#E26421] hover:brightness-110 active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-[#E26421]/35 border border-[#FFA366]/40 cursor-pointer ring-2 ring-[#E26421]/20"
              aria-label={`View order bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span>Order</span>
              {cartCount > 0 ? (
                <span className="min-w-5 h-5 px-1.5 flex items-center justify-center bg-white text-[#E26421] text-[11px] font-extrabold rounded-full tabular-nums shadow-md">
                  {cartCount}
                </span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#A8B2C1] hover:text-[#F6F2E9] rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0E1116] border-b border-[#232934] px-6 py-6 transition-all">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C29E65] mb-4 font-semibold">
              Explore Menu Categories
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left text-sm py-2 text-[#D3DBE8] hover:text-[#C29E65] border-b border-[#1A1E26] cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Privilege & Review banner */}
            <div className="mb-4 p-3 rounded-lg bg-[#14171D] border border-[#232934] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span className="text-[#F6F2E9]">Follow for 10% Off</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="text-[11px] font-semibold text-[#E26421] underline"
              >
                Claim in Bag
              </button>
            </div>

            <div className="pt-3 border-t border-[#1A1E26] flex items-center justify-between text-xs text-[#8A95A5]">
              <a
                href={restaurantInfo.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-[#C29E65] hover:text-[#F6F2E9] cursor-pointer"
                title="Directly Write a Google Review"
              >
                <Star className="w-3.5 h-3.5 fill-[#C29E65]" />
                <span>Write Google Review</span>
              </a>

              <button
                onClick={handleWhatsAppDirect}
                className="text-[#25D366] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Quick Sticky Navigation Bar (under 15% mobile viewport cap) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0A0C0F] border-t border-[#232934] px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <button
          onClick={() => {
            const el = document.getElementById('menu-catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-[11px] text-[#A8B2C1] hover:text-[#F6F2E9] cursor-pointer"
        >
          <span className="font-serif text-sm leading-none font-semibold text-[#C29E65]">SH</span>
          <span>Menu</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-1 text-[11px] text-[#A8B2C1] hover:text-[#F6F2E9] cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>

        <a
          href={restaurantInfo.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-[11px] text-[#C29E65] hover:text-white cursor-pointer"
          title="Directly Write a Google Review"
        >
          <Star className="w-4 h-4 fill-[#C29E65]" />
          <span>Review</span>
        </a>

        {/* Highlighted Primary Order Action Button */}
        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#E26421] via-[#F37A3B] to-[#E26421] hover:brightness-110 active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_4px_20px_rgba(226,100,33,0.45)] border border-[#FFA16C]/50 transition-all cursor-pointer ring-2 ring-[#E26421]/30"
          aria-label={`View order bag with ${cartCount} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" />
            )}
          </div>
          <span className="font-extrabold tracking-wide text-sm">Order</span>
          {cartCount > 0 ? (
            <span className="min-w-5 h-5 px-1.5 bg-[#0A0C0F] text-[#FFA16C] border border-[#FFA16C]/60 text-[11px] font-black rounded-full flex items-center justify-center tabular-nums shadow-inner">
              {cartCount}
            </span>
          ) : (
            <span className="text-[10px] text-white/90 bg-white/20 px-1.5 py-0.5 rounded font-medium">Bag</span>
          )}
        </button>
      </div>
    </>
  );
};
