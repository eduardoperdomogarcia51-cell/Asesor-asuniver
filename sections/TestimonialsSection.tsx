import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "La asesoría me dio claridad. Pasé de 'no sé por dónde empezar' a entregar mi ensayo con confianza.",
    name: 'Laura M.',
    role: 'Estudiante',
  },
  {
    quote: "Los talleres de escritura son intensos y respetuosos. Mi narrativa cambió por completo.",
    name: 'Daniel R.',
    role: 'Escritor independiente',
  },
  {
    quote: "Las plantillas me ahorran horas cada semana. Mi productividad aumentó dramáticamente.",
    name: 'Camila T.',
    role: 'Creadora de contenido',
  },
  {
    quote: "Finalmente entendí matemáticas después de años de frustración. El método funciona.",
    name: 'Andrés P.',
    role: 'Estudiante universitario',
  },
  {
    quote: "El taller de poesía me devolvió la confianza para compartir mi voz con el mundo.",
    name: 'Sofía L.',
    role: 'Poeta emergente',
  },
  {
    quote: "Recomiendo asesoríasuniver a todos mis amigos. Es una inversión que vale cada centavo.",
    name: 'Javier K.',
    role: 'Profesional',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F4F2EE] py-20 z-[60]"
    >
      <div className="px-[4vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <span className="label-mono block mb-3">Testimonios</span>
          <h2 className="font-['Sora'] font-bold text-clamp-h2 text-[#111111]">
            Comunidad de creadores
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              ref={setCardRef(i)}
              className="card-bento bg-white p-6 flex flex-col justify-between min-h-[200px] hover:-translate-y-2 transition-transform duration-300"
            >
              <div>
                <Quote className="w-8 h-8 text-[#B9FF2C] mb-4" />
                <p className="text-[#111111] leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#111111]/10">
                <p className="font-['Sora'] font-semibold text-sm text-[#111111]">
                  {testimonial.name}
                </p>
                <p className="text-xs text-[#6D6A63]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
