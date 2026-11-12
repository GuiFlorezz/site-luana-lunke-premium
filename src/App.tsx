import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const treatments = [
  {
    number: '01',
    title: 'Estética facial',
    description: 'Protocolos personalizados para cuidar da pele com leveza, segurança e naturalidade.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1100&q=85',
    alt: 'Cuidado facial em ambiente acolhedor',
  },
  {
    number: '02',
    title: 'Tecnologias estéticas',
    description: 'Recursos modernos escolhidos com critério para acompanhar os seus objetivos.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1100&q=85',
    alt: 'Produtos de cuidado para a pele',
  },
  {
    number: '03',
    title: 'Plano de cuidado',
    description: 'Uma jornada feita em conjunto, respeitando sua história, seu tempo e sua beleza.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1100&q=85',
    alt: 'Profissional realizando cuidado estético',
  },
]

const carouselSlides = [
  {
    title: 'Estética facial',
    description: 'Protocolos pensados para cuidar da pele e valorizar sua beleza com naturalidade.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90',
    alt: 'Momento de cuidado facial em ambiente sereno',
  },
  {
    title: 'Tecnologias estéticas',
    description: 'Recursos escolhidos com atenção para acompanhar diferentes objetivos de cuidado.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2200&q=90',
    alt: 'Produtos e elementos de skincare em uma composição natural',
  },
  {
    title: 'Cuidado individual',
    description: 'Uma jornada construída a partir de uma conversa e de uma avaliação cuidadosa.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=2200&q=90',
    alt: 'Cuidado estético realizado com atenção',
  },
  {
    title: 'Rituais para sua pele',
    description: 'Um convite a cuidar de si com presença, consistência e respeito ao seu momento.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2200&q=90',
    alt: 'Produtos de cuidado para a pele',
  },
  {
    title: 'Beleza no seu tempo',
    description: 'Cada escolha começa por entender você, seus desejos e o que faz sentido para sua rotina.',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=2200&q=90',
    alt: 'Retrato em luz natural',
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M3.5 10h12m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" /></svg>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const reducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLElement>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const section = carouselRef.current
    if (!section || reducedMotion) return

    const context = gsap.context(() => {
      gsap.fromTo('.treatment-carousel-image',
        { autoAlpha: 0.55, scale: 1.045 },
        { autoAlpha: 1, scale: 1, duration: 1, ease: 'power2.out' },
      )
      gsap.fromTo('.treatment-carousel-copy > *',
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out', delay: 0.12 },
      )
    }, section)

    return () => context.revert()
  }, [activeSlide, reducedMotion])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const lenis = reducedMotion ? undefined : new Lenis({ duration: 1.15, smoothWheel: true })
    const updateLenis = (time: number) => lenis?.raf(time * 1000)

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(updateLenis)
      gsap.ticker.lagSmoothing(0)
    }

    const context = gsap.context(() => {
      if (reducedMotion) return

      gsap.from('.hero-copy .eyebrow', { opacity: 0, y: 16, duration: 0.7, delay: 0.12, ease: 'power2.out' })
      gsap.from('.hero-copy h1', { opacity: 0, y: 34, duration: 0.95, delay: 0.2, ease: 'power3.out' })
      gsap.from('.hero-copy .hero-intro, .hero-copy .button', { opacity: 0, y: 18, duration: 0.7, delay: 0.4, stagger: 0.12, ease: 'power2.out' })
      gsap.from('.hero-feature, .hero-stamp', { opacity: 0, y: 22, duration: 0.8, delay: 0.55, stagger: 0.13, ease: 'power3.out' })

      gsap.to('.hero-image', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.from('.proof-stat, .trust-card, .editorial-left, .editorial-stage .portrait-card, .editorial-right', {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.proof-section', start: 'top 72%', once: true },
      })

      gsap.from('.treatment-card', {
        autoAlpha: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.care-section', start: 'top 72%', once: true },
      })

      gsap.from('.journey-heading, .journey-step', {
        autoAlpha: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.journey-section', start: 'top 75%', once: true },
      })

      gsap.from('.clinic-photo img', {
        scale: 1.08,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.clinic-photo', start: 'top 80%', once: true },
      })

      gsap.from('.contact .contact-star, .contact .eyebrow, .contact h2, .contact>p:not(.eyebrow), .contact .button', {
        autoAlpha: 0,
        y: 20,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact', start: 'top 78%', once: true },
      })
    })

    return () => {
      context.revert()
      if (lenis) {
        gsap.ticker.remove(updateLenis)
        lenis.destroy()
      }
    }
  }, [reducedMotion])

  useEffect(() => {
  const hero = heroRef.current

  // Só ativa em dispositivos com cursor e respeita movimento reduzido
  if (
    !hero ||
    reducedMotion ||
    !window.matchMedia('(pointer: fine)').matches
  ) {
    return
  }

  const image = hero.querySelector<HTMLImageElement>('.hero-image')
  const feature = hero.querySelector<HTMLElement>('.hero-feature')

  if (!image || !feature) return

  const imageX = gsap.quickTo(image, 'x', {
    duration: 0.8,
    ease: 'power3.out',
  })
  const imageY = gsap.quickTo(image, 'y', {
    duration: 0.8,
    ease: 'power3.out',
  })
  const featureX = gsap.quickTo(feature, 'x', {
    duration: 0.8,
    ease: 'power3.out',
  })
  const featureY = gsap.quickTo(feature, 'y', {
    duration: 0.8,
    ease: 'power3.out',
  })

  const moveWithPointer = (event: PointerEvent) => {
    const bounds = hero.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    imageX(x * -10)
    imageY(y * -8)
    featureX(x * 12)
    featureY(y * 9)
  }

  const resetPosition = () => {
    imageX(0)
    imageY(0)
    featureX(0)
    featureY(0)
  }

  hero.addEventListener('pointermove', moveWithPointer)
  hero.addEventListener('pointerleave', resetPosition)

  return () => {
    hero.removeEventListener('pointermove', moveWithPointer)
    hero.removeEventListener('pointerleave', resetPosition)
  }
  }, [reducedMotion])

  const closeMenu = () => setMenuOpen(false)
  const changeSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + carouselSlides.length) % carouselSlides.length)
  }
  const reveal = reducedMotion ? {} : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, amount: 0.18 } }

  return (
    <main className="page-shell">
      <section ref={heroRef} className="hero" id="inicio">
        <img className="hero-image" src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=2200&q=90" alt="Mulher em um momento de cuidado com a pele" fetchPriority="high" />
        <div className="hero-overlay" />
        <header className="header">
          <a href="#inicio" className="brand" aria-label="Luana Lunke, início" onClick={closeMenu}>
            <span className="brand-symbol">LL</span>
            <span><strong>LUANA LUNKE</strong><small>CLÍNICA DE ESTÉTICA</small></span>
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
          <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Navegação principal">
            <a href="#essencia" onClick={closeMenu}>Nossa essência</a><a href="#cuidados" onClick={closeMenu}>Cuidados</a><a href="#jornada" onClick={closeMenu}>Como funciona</a>
            <a className="nav-cta" href="#contato" onClick={closeMenu}>Vamos conversar <Arrow /></a>
          </nav>
        </header>

        <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }}>
          <p className="eyebrow light"><span /> ESTÉTICA COM INTENÇÃO</p>
          <h1>BELEZA<br /><em>NO SEU TEMPO.</em></h1>
          <p className="hero-intro">Cuidado atento, tecnologia e naturalidade para revelar a beleza que já é sua.</p>
          <a className="button button-light" href="#essencia">Conheça nosso olhar <Arrow /></a>
        </motion.div>

        <a className="hero-feature" href="#cuidados">
          <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=300&q=85" alt="" />
          <span><small>UM OLHAR SÓ SEU</small><strong>Beleza com<br />naturalidade</strong><b>Descubra os cuidados <Arrow /></b></span>
        </a>
        <div className="hero-stamp"><strong>LL</strong><p>Seu cuidado<br />começa por você.</p><div className="avatar-dots"><i>✳</i><i>LL</i><i>+</i></div></div>
        <div className="hero-bottom"><span>ESTÉTICA · BEM-ESTAR · INDIVIDUALIDADE</span><a href="#essencia">ROLE PARA DESCOBRIR <b>↓</b></a></div>
      </section>

      <section className="proof-section" id="essencia">
        <div className="proof-top section-pad">
          <div className="proof-stat"><strong>01</strong><p>você no centro<br />do cuidado</p><small>UM PLANO POR VEZ</small></div>
          <div className="trust-card"><span className="trust-index">#01</span><div><strong>A escuta vem primeiro</strong><p>Um espaço para conversar, entender seus desejos e construir seu plano.</p></div></div>
        </div>
        <div className="editorial-stage section-pad">
          <h2 className="editorial-left"><span>CONHEÇA A</span><strong>Dra. Luana<br />Lunke</strong></h2>
          <a className="portrait-card" href="#clinica">
            <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=900&q=85" alt="Imagem temporária para substituir pelo retrato da Dra. Luana Lunke" loading="lazy" />
            <div><span>UM OLHAR ATENTO</span><strong>Cuidado com<br />presença.</strong></div>
          </a>
          <div className="editorial-right"><h2><span>ESTÉTICA COM</span><strong>escuta e<br />individualidade.</strong></h2><p>Uma abordagem que começa por conhecer você e respeitar o que faz sentido para o seu momento.</p></div>
        </div>
      </section>

      <section className="care-section section-pad" id="cuidados">
        <motion.div className="care-heading" {...reveal} variants={fadeUp}><div><p className="eyebrow dark"><span /> CUIDADO PENSADO PARA VOCÊ</p><h2>Um caminho<br /><em>feito em conjunto.</em></h2></div><p className="body-copy">Conheça algumas das possibilidades de cuidado. A indicação ideal é sempre construída depois de uma avaliação individual.</p></motion.div>
        <div className="treatment-grid">{treatments.map((item) => <article className="treatment-card" key={item.number}><div className="treatment-image"><img src={item.image} alt={item.alt} loading="lazy" /><span>{item.number}</span></div><div className="treatment-copy"><div><h3>{item.title}</h3><p>{item.description}</p></div><a href="#contato" aria-label={`Saiba mais sobre ${item.title}`}><Arrow /></a></div></article>)}</div>
      </section>

      <section
        ref={carouselRef}
        className="treatment-carousel"
        id="experiencias"
        aria-label="Conheça as possibilidades de cuidado"
        tabIndex={0}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null
        }}
        onTouchEnd={(event) => {
          const endX = event.changedTouches[0]?.clientX
          if (touchStartX.current === null || endX === undefined) return
          const distance = endX - touchStartX.current
          if (Math.abs(distance) > 45) changeSlide(distance > 0 ? -1 : 1)
          touchStartX.current = null
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') changeSlide(1)
          if (event.key === 'ArrowLeft') changeSlide(-1)
        }}
      >
        <img
          key={carouselSlides[activeSlide].title}
          className="treatment-carousel-image"
          src={carouselSlides[activeSlide].image}
          alt={carouselSlides[activeSlide].alt}
          loading="lazy"
        />
        <div className="treatment-carousel-shade" />
        <div className="treatment-carousel-top"><span>LUANA LUNKE <i>·</i> CLÍNICA DE ESTÉTICA</span><span>POSSIBILIDADES DE CUIDADO</span></div>
        <div className="treatment-carousel-copy" aria-live="polite" aria-atomic="true">
          <p className="eyebrow light"><span /> 0{activeSlide + 1} / 0{carouselSlides.length}</p>
          <h2>{carouselSlides[activeSlide].title}</h2>
          <p>{carouselSlides[activeSlide].description}</p>
          <a href="#contato" className="button button-light">Converse com a clínica <Arrow /></a>
        </div>
        <div className="treatment-carousel-controls">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Slide anterior"><Arrow /></button>
          <div className="treatment-carousel-dots" aria-label="Escolha um slide">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Ir para slide ${index + 1}: ${slide.title}`}
                aria-current={activeSlide === index ? 'true' : undefined}
                className={activeSlide === index ? 'is-active' : ''}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Próximo slide"><Arrow /></button>
        </div>
      </section>

      <section className="journey-section section-pad" id="jornada">
        <div className="journey-heading"><p className="eyebrow dark"><span /> COMO FUNCIONA</p><h2>Um cuidado que começa<br /><em>por ouvir você.</em></h2><p>Sem pressa e sem fórmulas prontas. Cada etapa é construída junto com você.</p></div>
        <div className="journey-steps">
          <article className="journey-step"><span>01</span><div><h3>Conversa</h3><p>Entendemos suas expectativas, sua rotina e o que faz sentido para você.</p></div><b>↗</b></article>
          <article className="journey-step"><span>02</span><div><h3>Avaliação</h3><p>Um momento para conhecer você e conversar sobre possibilidades de cuidado.</p></div><b>↗</b></article>
          <article className="journey-step"><span>03</span><div><h3>Plano individual</h3><p>Com as informações da avaliação, definimos juntas os próximos passos.</p></div><b>↗</b></article>
        </div>
      </section>

      <section className="clinic section-pad" id="clinica">
        <motion.div className="clinic-photo" {...reveal} variants={fadeUp}><img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1500&q=85" alt="Ambiente sereno da clínica" loading="lazy" /><span>UM ESPAÇO PARA SE REENCONTRAR</span></motion.div>
        <motion.div className="clinic-copy" {...reveal} variants={fadeUp}>
          <p className="eyebrow dark"><span /> UM CONVITE AO CUIDADO</p><h2>Mais do que<br />estética,<br /><em>presença.</em></h2><p>Um espaço pensado para receber você com tranquilidade. Aqui, cada detalhe convida a desacelerar e a olhar para si com carinho.</p><a href="#cuidados" className="text-link">Explore nossos cuidados <Arrow /></a>
        </motion.div>
      </section>

      <section className="contact" id="contato"><span className="contact-star">✳</span><p className="eyebrow light"><span /> SEU PRÓXIMO PASSO</p><h2>Vamos conversar<br /><em>sobre você?</em></h2><p>Conte para nós o que você busca. Será um prazer receber você.</p><a className="button button-light" href="https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação" target="_blank" rel="noreferrer">Agende sua avaliação <Arrow /></a><small>* Substitua o número do WhatsApp pelo contato da clínica.</small></section>

      <footer className="footer"><a href="#inicio" className="footer-brand">LUANA LUNKE</a><span>CLÍNICA DE ESTÉTICA · CUIDADO COM INTENÇÃO</span><a href="#inicio">VOLTAR AO TOPO ↑</a></footer>
    </main>
  )
}

export default App
