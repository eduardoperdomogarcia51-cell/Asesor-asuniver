import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users, BookOpen, ThumbsUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset cards when scrolling back to top
            gsap.set(cards, { opacity: 1, x: 0, y: 0, scale: 1 });
          },
        },
      });

      // EXIT phase (70-100%)
      cards.forEach((card, i) => {
        const isLeft = i === 0 || i === 3 || i === 6;
        const isRight = i === 2 || i === 5 || i === 8;
        const isCenter = i === 4 || i === 7;

        if (isLeft) {
          scrollTl.fromTo(
            card,
            { x: 0, opacity: 1 },
            { x: '-18vw', opacity: 0, ease: 'power2.in' },
            0.70
          );
        } else if (isRight) {
          scrollTl.fromTo(
            card,
            { x: 0, opacity: 1 },
            { x: '18vw', opacity: 0, ease: 'power2.in' },
            0.70
          );
        } else if (isCenter) {
          scrollTl.fromTo(
            card,
            { scale: 1, opacity: 1 },
            { scale: 0.96, opacity: 0, ease: 'power2.in' },
            0.70
          );
        } else {
          scrollTl.fromTo(
            card,
            { y: 0, opacity: 1 },
            { y: '-12vh', opacity: 0, ease: 'power2.in' },
            0.72
          );
        }
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
      className="section-pinned bg-[#F4F2EE] z-10"
    >
      {/* Bento Grid Container */}
      <div className="absolute left-[4vw] top-[12vh] w-[92vw] h-[78vh]">
        {/* Row 1 */}
        {/* Card 1: Welcome (lime) */}
        <div
          ref={setCardRef(0)}
          className="absolute left-0 top-0 w-[34vw] h-[26vh] card-bento bg-[#B9FF2C] p-6 flex flex-col justify-between"
        >
          <div>
            <span className="label-mono text-[#111111]/70">Bienvenido a</span>
            <h1 className="font-['Sora'] font-bold text-2xl md:text-3xl text-[#111111] mt-2 leading-tight">
              asesoríasuniver
            </h1>
          </div>
          <p className="text-sm text-[#111111]/80 leading-relaxed">
            Asesorías académicas, talleres de escritura y recursos digitales.
          </p>
        </div>

        {/* Card 2: Hero Image */}
        <div
          ref={setCardRef(1)}
          className="absolute left-[36vw] top-0 w-[34vw] h-[26vh] card-bento overflow-hidden"
        >
          <img
            src="/hero_students_collab.jpg"
            alt="Estudiantes colaborando"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card 3: CTA (dark) */}
        <div
          ref={setCardRef(2)}
          className="absolute left-[72vw] top-0 w-[20vw] h-[26vh] card-bento-dark bg-[#111111] p-6 flex flex-col justify-center items-center text-center"
        >
          <span className="text-white/60 text-xs mb-3">Comienza hoy</span>
          <a href="#reserva" className="btn-lime text-xs flex items-center gap-2">
            Reserva <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Row 2 */}
        {/* Card 4: Literature Quote */}
        <div
          ref={setCardRef(3)}
          className="absolute left-0 top-[28vh] w-[34vw] h-[24vh] card-bento overflow-hidden relative"
        >
          <img
            src="/hero_literature_quote_bg.jpg"
            alt="Literatura"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
            <span className="label-mono text-white/70">Talleres</span>
            <p className="text-white font-['Sora'] font-semibold text-lg mt-1">
              "Escribe con intención"
            </p>
          </div>
        </div>

        {/* Card 5: Stats */}
        <div
          ref={setCardRef(4)}
          className="absolute left-[36vw] top-[28vh] w-[34vw] h-[24vh] card-bento bg-white p-6 flex flex-col justify-between"
        >
          <span className="label-mono">Nuestra comunidad</span>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#B9FF2C] mb-1">
                <Users className="w-5 h-5" />
              </div>
              <p className="font-['Sora'] font-bold text-xl text-[#111111]">+2,000</p>
              <p className="text-xs text-[#6D6A63]">estudiantes</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#B9FF2C] mb-1">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="font-['Sora'] font-bold text-xl text-[#111111]">+150</p>
              <p className="text-xs text-[#6D6A63]">talleres</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[#B9FF2C] mb-1">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <p className="font-['Sora'] font-bold text-xl text-[#111111]">98%</p>
              <p className="text-xs text-[#6D6A63]">recomienda</p>
            </div>
          </div>
        </div>

        {/* Card 6: Author Portrait */}
        <div
          ref={setCardRef(5)}
          className="absolute left-[72vw] top-[28vh] w-[20vw] h-[24vh] card-bento overflow-hidden"
        >
          <img
            src="/hero_author_portrait.jpg"
            alt="Autor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 3 */}
        {/* Card 7: Micro Label */}
        <div
          ref={setCardRef(6)}
          className="absolute left-0 top-[54vh] w-[20vw] h-[20vh] card-bento bg-white p-5 flex flex-col justify-center"
        >
          <span className="label-mono mb-2">Desde 2012</span>
          <p className="text-sm text-[#111111] font-medium">
            +12 años transformando vidas through education
          </p>
        </div>

        {/* Card 8: Brand Card */}
        <div
          ref={setCardRef(7)}
          className="absolute left-[22vw] top-[54vh] w-[48vw] h-[20vh] card-bento bg-[#111111] p-6 flex items-center justify-center"
        >
          <div className="text-center">
            <p className="font-['Sora'] font-bold text-3xl md:text-4xl text-white tracking-tight">
              Aprende. Crea. Publica.
            </p>
          </div>
        </div>

        {/* Card 9: Bottom CTA */}
        <div
          ref={setCardRef(8)}
          className="absolute left-[72vw] top-[54vh] w-[20vw] h-[20vh] card-bento bg-white p-5 flex flex-col justify-center items-center"
        >
          <span className="label-mono mb-3">¿Listo para empezar?</span>
          <a href="#planes" className="btn-dark text-xs flex items-center gap-2">
            Ver planes <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
