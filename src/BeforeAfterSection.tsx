type BeforeAfterCase = {
  id: string
  title: string
  treatment: string
  period: string
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
}

// Troque os campos vazios pelas imagens reais de cada caso.
const cases: BeforeAfterCase[] = [
  {
    id: '01',
    title: 'Caso 01',
    treatment: 'Nome do cuidado',
    period: 'Período entre as imagens',
    beforeImage: '',
    afterImage: '',
    beforeAlt: 'Cliente antes do cuidado',
    afterAlt: 'Cliente depois do cuidado',
  },
  {
    id: '02',
    title: 'Caso 02',
    treatment: 'Nome do cuidado',
    period: 'Período entre as imagens',
    beforeImage: '',
    afterImage: '',
    beforeAlt: 'Cliente antes do cuidado',
    afterAlt: 'Cliente depois do cuidado',
  },
  {
    id: '03',
    title: 'Caso 03',
    treatment: 'Nome do cuidado',
    period: 'Período entre as imagens',
    beforeImage: '',
    afterImage: '',
    beforeAlt: 'Cliente antes do cuidado',
    afterAlt: 'Cliente depois do cuidado',
  },
]

function CaseImage({ image, alt, label }: { image: string; alt: string; label: string }) {
  return (
    <div className="before-after-image">
      {image ? (
        <img src={image} alt={alt} loading="lazy" />
      ) : (
        <div className="before-after-placeholder">
          <span aria-hidden="true">＋</span>
          <small>ADICIONE A FOTO</small>
        </div>
      )}
      <span className="before-after-image-label">{label}</span>
    </div>
  )
}

export function BeforeAfterSection() {
  return (
    <section className="before-after-section section-pad" id="resultados" aria-labelledby="before-after-title">
      <div className="before-after-heading">
        <div>
          <p className="eyebrow dark"><span /> HISTÓRIAS DE CUIDADO</p>
          <h2 id="before-after-title">Cada jornada,<br /><em>um resultado único.</em></h2>
        </div>
        <p className="before-after-intro">Conheça algumas jornadas de cuidado acompanhadas pela Dra. Luana. Cada pessoa tem seu tempo e seus próprios resultados.</p>
      </div>

      <div className="before-after-grid">
        {cases.map((item) => (
          <article className="before-after-card" key={item.id}>
            <div className="before-after-pair">
              <CaseImage image={item.beforeImage} alt={item.beforeAlt} label="ANTES" />
              <CaseImage image={item.afterImage} alt={item.afterAlt} label="DEPOIS" />
            </div>
            <div className="before-after-caption">
              <span className="before-after-number">{item.id}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.treatment} <span>·</span> {item.period}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="before-after-note">As imagens devem ser feitas em condições semelhantes. Os resultados variam de pessoa para pessoa.</p>
    </section>
  )
}
