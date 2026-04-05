import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Asesorías', href: '#asesorias' },
    { label: 'Talleres', href: '#talleres' },
    { label: 'Tienda', href: '#tienda' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F4F2EE]/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="px-[4vw] flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-['Sora'] font-bold text-lg tracking-tight text-[#111111]"
          >
            asesoríasuniver
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#111111] hover:text-[#6D6A63] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reserva"
              className="btn-lime text-xs"
            >
              Reserva
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#F4F2EE] pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-2xl font-['Sora'] font-semibold text-[#111111]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reserva"
              className="btn-lime text-center mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reserva una asesoría
            </a>
          </div>
        </div>
      )}
    </>
  );
}
