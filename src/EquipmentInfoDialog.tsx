import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface EquipmentInfoDialogProps {
  open: boolean
  onClose: () => void
}

const careResources = [
  {
    number: '01',
    title: 'Tecnologias estéticas',
    description: 'Equipamentos selecionados de acordo com o procedimento indicado e as necessidades de cada pessoa.',
  },
  {
    number: '02',
    title: 'Produtos profissionais',
    description: 'Produtos para higienização, preparo e cuidado da pele, escolhidos conforme cada protocolo.',
  },
  {
    number: '03',
    title: 'Materiais de apoio',
    description: 'Materiais utilizados durante o atendimento de acordo com o cuidado realizado e as orientações de segurança.',
  },
]

export function EquipmentInfoDialog({ open, onClose }: EquipmentInfoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="quiz-dialog equipment-dialog"
      aria-labelledby="equipment-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="quiz-panel equipment-dialog-panel">
        <header className="quiz-header">
          <a href="#inicio" className="quiz-brand" onClick={onClose}>
            <span>LL</span>
            <small>LUANA LUNKE · CLÍNICA DE ESTÉTICA</small>
          </a>
          <button className="quiz-close" type="button" onClick={onClose} aria-label="Fechar informações">
            <span />
            <span />
          </button>
        </header>

        <motion.div
          className="equipment-dialog-content"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <p className="eyebrow dark"><span /> CUIDADO COM CRITÉRIO</p>
          <h2 id="equipment-dialog-title">Tecnologia e cuidado em cada etapa.</h2>
          <p className="quiz-intro">Os recursos são escolhidos conforme o procedimento e a avaliação individual. Cada cuidado tem seus próprios produtos, equipamentos e materiais.</p>

          <div className="equipment-resource-list">
            {careResources.map((resource) => (
              <article className="equipment-resource" key={resource.number}>
                <span>{resource.number}</span>
                <div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="quiz-privacy-note">A lista específica de marcas e equipamentos pode ser incluída após confirmação da clínica.</p>
        </motion.div>
      </div>
    </dialog>
  )
}
