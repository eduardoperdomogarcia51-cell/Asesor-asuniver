import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    image: '/product_ebook_mockup.jpg',
    title: 'Guía de escritura',
    price: '$19',
  },
  {
    image: '/product_templates_stack.jpg',
    title: 'Plantillas de estudio',
    price: '$15',
  },
  {
    image: '/product_worksheets_spread.jpg',
    title: 'Hojas de práctica',
    price: '$12',
  },
  {
    image: '/product_planner_closed.jpg',
    title: 'Planner creativo',
    price: '$25',
  },
];

export default function StoreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topCenterRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomCardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        topCenterRef.current,
        { y: '-40vh', opacity: 0, scale: 1.04 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        topRightRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Bottom cards stagger
      bottomCardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { y: '50vh', opacity: 0, rotate: -1 },
            { y: 0, opacity: 1, rotate: 0, ease: 'none' },
            0.10 + i * 0.02
          );
        }
      });

      // EXIT (70-100%)
      scrollTl.fromTo(
        topLeftRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
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

      bottomCardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { y: 0, opacity: 1 },
            { y: '18vh', opacity: 0, ease: 'power2.in' },
            0.72 + i * 0.01
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const setBottomCardRef = (index: number) => (el: HTMLDivElement | null) => {
    bottomCardsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      id="tienda"
      className="section-pinned bg-[#F4F2EE] z-50"
    >
      {/* Top Left: Lime Title Card */}
      <div
        ref={topLeftRef}
        className="absolute left-[4vw] top-[12vh] w-[34vw] h-[26vh] card-bento bg-[#B9FF2C] p-6 flex flex-col justify-between"
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#111111]" />
          <span className="label-mono text-[#111111]/70">Tienda Digital</span>
        </div>
        <div>
          <h2 className="font-['Sora'] font-bold text-2xl md:text-3xl text-[#111111] leading-tight">
            Recursos para crear y publicar
          </h2>
          <p className="text-sm text-[#111111]/70 mt-2">
            Guías, plantillas y hojas de trabajo.
          </p>
        </div>
      </div>

      {/* Top Center: Product Image Card */}
      <div
        ref={topCenterRef}
        className="absolute left-[40vw] top-[12vh] w-[34vw] h-[26vh] card-bento overflow-hidden group cursor-pointer"
      >
        <img
          src={products[0].image}
          alt={products[0].title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <span className="text-white/70 text-xs">{products[0].title}</span>
          <span className="text-white font-['Sora'] font-bold">{products[0].price}</span>
        </div>
      </div>

      {/* Top Right: Dark CTA Card */}
      <div
        ref={topRightRef}
        className="absolute left-[76vw] top-[12vh] w-[20vw] h-[26vh] card-bento-dark bg-[#111111] p-6 flex flex-col justify-center items-center text-center"
      >
        <span className="text-white/60 text-xs mb-3">Explorar</span>
        <a href="#tienda" className="btn-lime text-xs flex items-center gap-2">
          Ver tienda <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Bottom Row: Product Cards */}
      {products.slice(1).map((product, i) => (
        <div
          key={i}
          ref={setBottomCardRef(i)}
          className={`absolute top-[42vh] w-[${i === 2 ? '20vw' : '34vw'}] h-[46vh] card-bento overflow-hidden group cursor-pointer`}
          style={{
            left: i === 0 ? '4vw' : i === 1 ? '40vw' : '76vw',
            width: i === 2 ? '20vw' : '34vw',
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <span className="text-white/70 text-xs">{product.title}</span>
            <span className="text-white font-['Sora'] font-bold">{product.price}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
