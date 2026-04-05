import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Shield, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Clase única',
    price: '$25',
    period: '/hora',
    description: 'Ideal para un tema específico.',
    features: [
      '1 hora de asesoría personalizada',
      'Material de apoyo incluido',
      'Resumen post-sesión',
      'Sin compromiso',
    ],
    highlighted: false,
  },
  {
    name: 'Plan mensual',
    price: '$89',
    period: '/mes',
    description: 'Seguimiento completo + materiales.',
    features: [
      '4 horas de asesoría semanal',
      'Material exclusivo',
      'Seguimiento por WhatsApp',
      'Acceso a talleres grupales',
      'Descuento en recursos digitales',
    ],
    highlighted: true,
  },
  {
    name: 'Talleres + Recursos',
    price: '$39',
    period: '',
    description: 'Acceso a talleres grabados y plantillas.',
    features: [
      'Acceso a biblioteca de talleres',
      'Plantillas descargables',
      'Hojas de práctica',
      'Comunidad privada',
      'Actualizaciones mensuales',
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const guaranteeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const guarantee = guaranteeRef.current;
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
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Guarantee animation
      if (guarantee) {
        gsap.fromTo(
          guarantee,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: guarantee,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      id="planes"
      className="relative bg-[#F4F2EE] py-20 z-[70]"
    >
      <div className="px-[4vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 text-center">
          <span className="label-mono block mb-3">Precios</span>
          <h2 className="font-['Sora'] font-bold text-clamp-h2 text-[#111111]">
            Elige tu camino
          </h2>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              ref={setCardRef(i)}
              className={`card-bento p-6 flex flex-col ${
                plan.highlighted
                  ? 'bg-[#111111] text-white scale-[1.02]'
                  : 'bg-white text-[#111111]'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#B9FF2C] text-[#111111] text-xs font-semibold px-3 py-1 rounded-full">
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-['Sora'] font-semibold text-lg">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-['Sora'] font-bold text-3xl">{plan.price}</span>
                  <span className={plan.highlighted ? 'text-white/60' : 'text-[#6D6A63]'}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${plan.highlighted ? 'text-white/70' : 'text-[#6D6A63]'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-[#B9FF2C]' : 'text-[#B9FF2C]'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-[#111111]'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  plan.highlighted
                    ? 'bg-[#B9FF2C] text-[#111111]'
                    : 'bg-[#111111] text-white'
                }`}
              >
                Empezar <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div
          ref={guaranteeRef}
          className="mt-12 card-bento bg-white p-6 flex items-center justify-center gap-4 max-w-2xl mx-auto"
        >
          <div className="w-12 h-12 rounded-full bg-[#B9FF2C] flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-[#111111]" />
          </div>
          <div>
            <p className="font-['Sora'] font-semibold text-[#111111]">
              Garantía de 14 días
            </p>
            <p className="text-sm text-[#6D6A63]">
              Si no sientes progreso en 14 días, te devolvemos tu dinero.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
