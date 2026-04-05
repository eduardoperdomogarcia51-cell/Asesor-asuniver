import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Send, Instagram, Twitter, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    need: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;
    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        form,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative bg-[#111111] py-20 z-[90]"
    >
      <div className="px-[4vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column */}
          <div ref={leftRef}>
            <span className="label-mono text-white/50 block mb-3">Contacto</span>
            <h2 className="font-['Sora'] font-bold text-clamp-h2 text-white mb-6">
              Empieza hoy
            </h2>
            <p className="text-white/70 leading-relaxed mb-8 max-w-md">
              Cuéntanos qué necesitas. Te responderemos con un plan en menos de 24 horas.
            </p>

            <div className="space-y-4 mb-12">
              <a
                href="mailto:univerasesorias@gmail.com"
                className="flex items-center gap-3 text-white/70 hover:text-[#B9FF2C] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>univerasesorias@gmail.com</span>
              </a>
              <a
                href="https://wa.me/573502543277"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-[#B9FF2C] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>350 254 3277</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#B9FF2C] hover:text-[#111111] transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#B9FF2C] hover:text-[#111111] transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#B9FF2C] hover:text-[#111111] transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={formRef}>
            <div className="card-bento bg-white p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#B9FF2C] flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-[#111111]" />
                  </div>
                  <h3 className="font-['Sora'] font-bold text-xl text-[#111111] mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-[#6D6A63]">
                    Te contactaremos en menos de 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#111111]/10 focus:border-[#B9FF2C] focus:ring-2 focus:ring-[#B9FF2C]/20 outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#111111]/10 focus:border-[#B9FF2C] focus:ring-2 focus:ring-[#B9FF2C]/20 outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      ¿Qué necesitas?
                    </label>
                    <select
                      name="need"
                      value={formData.need}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#111111]/10 focus:border-[#B9FF2C] focus:ring-2 focus:ring-[#B9FF2C]/20 outline-none transition-all bg-white"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="asesoria">Asesoría académica</option>
                      <option value="taller">Taller de escritura</option>
                      <option value="recursos">Recursos digitales</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-[#111111]/10 focus:border-[#B9FF2C] focus:ring-2 focus:ring-[#B9FF2C]/20 outline-none transition-all resize-none"
                      placeholder="Cuéntanos más sobre lo que necesitas..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-lime flex items-center justify-center gap-2"
                  >
                    Enviar mensaje <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2024 asesoríasuniver. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
              Términos
            </a>
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
              Privacidad
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
