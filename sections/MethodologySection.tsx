import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Search, MapPin, PenTool, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    title: 'Diagnóstico',
    desc: 'Identificamos tus prioridades.',
  },
  {
    icon: MapPin,
    title: 'Plan',
    desc: 'Ruta de estudio semanal.',
  },
  {
    icon: PenTool,
    title: 'Práctica',
    desc: 'Ejercicios + retroalimentación.',
  },
  {
    icon: RefreshCw,
    title: 'Seguimiento',
    desc: 'Ajustes hasta lograrlo.',
  },
];

export default function MethodologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topCenterRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        topLeftRef.current,
        { y: '-40vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        topCenterRef.current,
        { y: '-40vh', opacity: 0, rotate: -1 },
        { y: 0, opacity: 1, rotate: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        topRightRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bottomLeftRef.current,
        { x: '-60vw', opacity: 0, scale: 1.05 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        bottomRightRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.10
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        topLeftRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        topCenterRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        topRightRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        bottomLeftRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        bottomRightRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="metodo"
      className="section-pinned bg-[#F4F2EE] z-30"
    >
      {/* Top Left: Lime Title Card */}
      <div
        ref={topLeftRef}
        className="absolute left-[4vw] top-[12vh] w-[34vw] h-[26vh] card-bento bg-[#B9FF2C] p-6 flex flex-col justify-between"
      >
        <span className="label-mono text-[#111111]/70">Nuestro Método</span>
        <h2 className="font-['Sora'] font-bold text-2xl md:text-3xl text-[#111111] leading-tight">
          Un sistema pensado para resultados
        </h2>
      </div>

      {/* Top Center: Image Card */}
      <div
        ref={topCenterRef}
        className="absolute left-[40vw] top-[12vh] w-[34vw] h-[26vh] card-bento overflow-hidden"
      >
        <img
          src="/method_mentorship_chat.jpg"
          alt="Mentoría personalizada"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Right: Dark CTA Card */}
      <div
        ref={topRightRef}
        className="absolute left-[76vw] top-[12vh] w-[20vw] h-[26vh] card-bento-dark bg-[#111111] p-6 flex flex-col justify-center items-center text-center"
      >
        <span className="text-white/60 text-xs mb-3">Primera clase</span>
        <a href="#contacto" className="btn-lime text-xs flex items-center gap-2">
          Agenda <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Bottom Left: Wide Image Card */}
      <div
        ref={bottomLeftRef}
        className="absolute left-[4vw] top-[42vh] w-[56vw] h-[46vh] card-bento overflow-hidden"
      >
        <img
          src="/hero_students_collab.jpg"
          alt="Sesión de estudio"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Right: Steps Card */}
      <div
        ref={bottomRightRef}
        className="absolute left-[62vw] top-[42vh] w-[34vw] h-[46vh] card-bento bg-white p-6 flex flex-col justify-between"
      >
        <span className="label-mono">4 pasos claros</span>
        
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#B9FF2C] flex items-center justify-center flex-shrink-0 mt-0.5">
                <step.icon className="w-4 h-4 text-[#111111]" />
              </div>
              <div>
                <p className="font-['Sora'] font-semibold text-sm text-[#111111]">
                  {step.title}
                </p>
                <p className="text-xs text-[#6D6A63] mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
