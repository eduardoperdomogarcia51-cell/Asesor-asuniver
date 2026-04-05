import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TutoringSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const labelCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const labelCard = labelCardRef.current;
    if (!section || !leftCard || !rightCard || !labelCard) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Left feature card
      scrollTl.fromTo(
        leftCard,
        { x: '-60vw', opacity: 0, scale: 1.06 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Right info card
      scrollTl.fromTo(
        rightCard,
        { x: '60vw', opacity: 0, rotate: 1.5 },
        { x: 0, opacity: 1, rotate: 0, ease: 'none' },
        0
      );

      // Label card
      scrollTl.fromTo(
        labelCard,
        { y: '30vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // SETTLE (30-70%) - hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(
        leftCard,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        rightCard,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        labelCard,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="asesorias"
      className="section-pinned bg-[#F4F2EE] z-20"
    >
      {/* Left Feature Card (Image) */}
      <div
        ref={leftCardRef}
        className="absolute left-[4vw] top-[12vh] w-[56vw] h-[76vh] card-bento overflow-hidden"
      >
        <img
          src="/classroom_group_study.jpg"
          alt="Sesión de estudio grupal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Right Info Card */}
      <div
        ref={rightCardRef}
        className="absolute left-[62vw] top-[12vh] w-[34vw] h-[76vh] card-bento bg-white p-8 flex flex-col justify-between"
      >
        <div>
          <span className="label-mono">Asesorías Académicas</span>
          <h2 className="font-['Sora'] font-bold text-clamp-h2 text-[#111111] mt-4 leading-tight">
            Aprende con método
          </h2>
          <p className="text-clamp-body text-[#6D6A63] mt-6 leading-relaxed">
            Clases personalizadas, materiales claros y seguimiento semanal. 
            Desde primaria hasta preuniversitario.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#B9FF2C] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#111111]" />
            </div>
            <div>
              <p className="font-['Sora'] font-bold text-2xl text-[#111111]">+12 años</p>
              <p className="text-sm text-[#6D6A63]">de experiencia</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#B9FF2C] flex items-center justify-center">
              <Users className="w-5 h-5 text-[#111111]" />
            </div>
            <div>
              <p className="font-['Sora'] font-bold text-2xl text-[#111111]">+2,000</p>
              <p className="text-sm text-[#6D6A63]">estudiantes</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#B9FF2C] flex items-center justify-center">
              <Award className="w-5 h-5 text-[#111111]" />
            </div>
            <div>
              <p className="font-['Sora'] font-bold text-2xl text-[#111111]">98%</p>
              <p className="text-sm text-[#6D6A63]">recomiendan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Left Label Card */}
      <div
        ref={labelCardRef}
        className="absolute left-[4vw] top-[82vh] w-[18vw] h-[10vh] card-bento bg-[#111111] p-4 flex items-center justify-center"
      >
        <a href="#metodo" className="text-white text-sm font-medium flex items-center gap-2 hover:text-[#B9FF2C] transition-colors">
          Conoce el método <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
