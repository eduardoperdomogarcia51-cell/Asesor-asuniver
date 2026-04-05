import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '¿Para qué niveles están las asesorías?',
    answer: 'Trabajamos con estudiantes de primaria, secundaria, preparatoria y universidad. También ofrecemos asesorías para profesionales que necesitan preparar exámenes o mejorar habilidades específicas.',
  },
  {
    question: '¿Cómo se agendan las clases?',
    answer: 'Puedes agendar directamente desde nuestro sitio web seleccionando el horario que mejor te convenga. También puedes contactarnos por WhatsApp o correo electrónico para coordinar una fecha personalizada.',
  },
  {
    question: '¿Los talleres son en vivo o grabados?',
    answer: 'Ofrecemos ambas modalidades. Los talleres en vivo se realizan semanalmente con grupos reducidos para mayor interacción. También contamos con una biblioteca de talleres grabados disponibles las 24 horas.',
  },
  {
    question: '¿Qué incluyen los recursos digitales?',
    answer: 'Nuestros recursos incluyen guías de escritura, plantillas de estudio organizadas por materia, hojas de práctica con ejercicios, y planners creativos para organizar tu proceso de aprendizaje.',
  },
  {
    question: '¿Hay garantía de devolución?',
    answer: 'Sí, ofrecemos una garantía de 14 días. Si no sientes que estás haciendo progreso en ese período, te devolvemos el 100% de tu dinero sin hacer preguntas.',
  },
  {
    question: '¿Puedo cambiar de plan después?',
    answer: 'Por supuesto. Puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se reflejan en tu próximo ciclo de facturación.',
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const items = itemsRef.current.filter(Boolean);
    if (!section || !heading || items.length === 0) return;

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

      // Items animation
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el;
  };

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-[#F4F2EE] py-20 z-[80]"
    >
      <div className="px-[4vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 text-center">
          <span className="label-mono block mb-3">FAQ</span>
          <h2 className="font-['Sora'] font-bold text-clamp-h2 text-[#111111]">
            Preguntas frecuentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              ref={setItemRef(i)}
              className="card-bento bg-white overflow-hidden"
            >
              <button
                className="w-full p-5 flex items-center justify-between text-left"
                onClick={() => toggleItem(i)}
              >
                <span className="font-['Sora'] font-semibold text-[#111111] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#6D6A63] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5">
                  <p className="text-[#6D6A63] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
