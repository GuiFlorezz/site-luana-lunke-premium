import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface WhatsAppPreviewDialogProps {
  open: boolean
  topic: string
  onClose: () => void
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path
        d="M3.5 10h12m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
    </svg>
  )
}

export function WhatsAppPreviewDialog({ open, topic, onClose }: WhatsAppPreviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const message = `Olá, Dra. Luana! Vi no site a seção sobre “${topic}” e gostaria de saber mais. Você poderia me orientar sobre esse cuidado?`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="quiz-dialog whatsapp-preview-dialog"
      aria-labelledby="whatsapp-preview-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="quiz-panel whatsapp-preview-panel">
        <header className="quiz-header">
          <a href="#inicio" className="quiz-brand" onClick={onClose}>
            <span>LL</span>
            <small>LUANA LUNKE · CLÍNICA DE ESTÉTICA</small>
          </a>
          <button className="quiz-close" type="button" onClick={onClose} aria-label="Fechar prévia">
            <span />
            <span />
          </button>
        </header>

        <motion.div
          className="whatsapp-preview-content"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <p className="eyebrow dark"><span /> PRÉVIA DA MENSAGEM</p>
          <h2 id="whatsapp-preview-title">Revise antes de continuar</h2>
          <p className="quiz-intro">Esta mensagem foi preparada com base no assunto que você escolheu no carrossel.</p>

          <div className="whatsapp-message-preview">
            <small>MENSAGEM PARA O WHATSAPP</small>
            <p>{message}</p>
          </div>

          <div className="whatsapp-preview-actions">
            <button className="quiz-back" type="button" onClick={onClose}>Voltar ao carrossel</button>
            <a className="button button-dark" href={whatsappUrl} target="_blank" rel="noreferrer">
              Abrir WhatsApp <ArrowIcon />
            </a>
          </div>
          <p className="quiz-privacy-note">O WhatsApp abrirá com o texto preenchido. Você poderá escolher o contato da Dra. Luana, revisar a mensagem e decidir se deseja enviá-la.</p>
        </motion.div>
      </div>
    </dialog>
  )
}
