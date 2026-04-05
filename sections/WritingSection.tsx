import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Feather } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WritingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftTallRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightMiddleRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);
  const farRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
      scrollTl.fromTo(
        leftTallRef.current,
        { x: '-60vw', opacity: 0, scale: 1.06 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        rightTopRef.current,
        { x: '60vw', opacity: 0, rotate: 1 },
        { x: 0, opacity: 1, rotate: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        rightMiddleRef.current,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        rightBottomRef.current,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.10
      );

      scrollTl.fromTo(
        farRightRef.current,
        { x: '40vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.12
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        leftTallRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        rightTopRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        rightMiddleRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        rightBottomRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        farRightRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.74
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="talleres"
      className="section-pinned bg-[#111111] z-40"
    >
      {/* Left Tall Image Card (Typewriter) */}
      <div
        ref={leftTallRef}
        className="absolute left-[4vw] top-[12vh] w-[34vw] h-[76vh] card-bento overflow-hidden"
      >
        <img
          src="/typewriter_closeup.jpg"
          alt="Máquina de escribir"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Right Top: Lime Headline Card */}
      <div
        ref={rightTopRef}
        className="absolute left-[40vw] top-[12vh] w-[56vw] h-[26vh] card-bento bg-[#B9FF2C] p-6 flex flex-col justify-between"
      >
        <div className="flex items-center gap-2">
          <Feather className="w-5 h-5 text-[#111111]" />
          <span className="label-mono text-[#111111]/70">Talleres de Escritura</span>
        </div>
        <h2 className="font-['Sora'] font-bold text-3xl md:text-4xl text-[#111111] leading-tight">
          Escribe con intención
        </h2>
      </div>

      {/* Right Middle: Image Card (Writing Desk) */}
      <div
        ref={rightMiddleRef}
        className="absolute left-[40vw] top-[42vh] w-[34vw] h-[24vh] card-bento overflow-hidden"
      >
        <img
          src="/writing_desk_scene.jpg"
          alt="Escritorio de escritura"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Bottom: Dark CTA Card */}
      <div
        ref={rightBottomRef}
        className="absolute left-[40vw] top-[70vh] w-[34vw] h-[18vh] card-bento-dark bg-[#1a1a1a] p-5 flex flex-col justify-center"
      >
        <p className="text-white/70 text-sm mb-3">
          Talleres de narrativa, poesía y ensayo. Estructura, voz y edición.
        </p>
        <a href="#talleres" className="btn-lime text-xs flex items-center gap-2 w-fit">
          Ver próximos talleres <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Far Right: Portrait Card */}
      <div
        ref={farRightRef}
        className="absolute left-[76vw] top-[42vh] w-[20vw] h-[46vh] card-bento overflow-hidden"
      >
        <img
          src="/writer_portrait_smile.jpg"
          alt="Escritor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-white/70 text-xs">Tu instructor</span>
          <p className="text-white font-['Sora'] font-semibold">María González</p>
        </div>
      </div>
    </section>
  );
}
