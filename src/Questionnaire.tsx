import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type FocusId =
  | 'expression-lines'
  | 'facial-contour'
  | 'lips'
  | 'skin-care'
  | 'skin-texture'
  | 'stretch-marks'
  | 'plasma'
  | 'laser'
  | 'unsure'

type LaserGoal = 'hair' | 'tattoo' | 'spots' | 'unsure'
type QuizStep = 'focus' | 'laser-goal' | 'result'

const focusOptions: Array<{
  id: FocusId
  title: string
  description: string
}> = [
  {
    id: 'expression-lines',
    title: 'Linhas de expressão',
    description: 'Testa, entre as sobrancelhas ou ao redor dos olhos.',
  },
  {
    id: 'facial-contour',
    title: 'Contorno ou proporções do rosto',
    description: 'Quero conversar sobre equilíbrio e harmonia facial.',
  },
  {
    id: 'lips',
    title: 'Volume ou contorno dos lábios',
    description: 'Quero conhecer possibilidades de cuidado labial.',
  },
  {
    id: 'skin-care',
    title: 'Cravos ou oleosidade',
    description: 'Minha pele parece oleosa, obstruída ou sem viço.',
  },
  {
    id: 'skin-texture',
    title: 'Textura, cicatrizes ou marcas',
    description: 'Quero conversar sobre a textura ou marcas na pele.',
  },
  {
    id: 'stretch-marks',
    title: 'Estrias',
    description: 'Quero conhecer opções de cuidado para estrias.',
  },
  {
    id: 'plasma',
    title: 'Jato de plasma',
    description: 'Quero saber mais sobre esse procedimento.',
  },
  {
    id: 'laser',
    title: 'Remoção a laser',
    description: 'Pelos, tatuagem, micropigmentação ou manchas.',
  },
  {
    id: 'unsure',
    title: 'Ainda não sei',
    description: 'Prefiro conversar sobre o que faz sentido para mim.',
  },
]

const laserOptions: Array<{
  id: LaserGoal
  title: string
}> = [
  { id: 'hair', title: 'Redução de pelos' },
  { id: 'tattoo', title: 'Tatuagem ou micropigmentação' },
  { id: 'spots', title: 'Manchas ou vasinhos' },
  { id: 'unsure', title: 'Ainda não sei' },
]

const focusResults: Record<Exclude<FocusId, 'laser'>, string> = {
  'expression-lines': 'Botox',
  'facial-contour': 'Harmonização facial',
  lips: 'Preenchimento labial',
  'skin-care': 'Limpeza de pele ou peeling de carbono',
  'skin-texture': 'Microagulhamento ou avaliação individual da pele',
  'stretch-marks': 'Tratamento de estrias',
  plasma: 'Jato de plasma',
  unsure: 'Conversa inicial com a Dra. Luana',
}

const laserResults: Record<LaserGoal, string> = {
  hair: 'Remoção a laser para pelos',
  tattoo: 'Remoção a laser de tatuagem ou micropigmentação',
  spots: 'Avaliação sobre laser para manchas ou vasinhos',
  unsure: 'Conversa sobre as opções de remoção a laser',
}

const WHATSAPP_PHONE = ''

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

interface QuestionnaireProps {
  open: boolean
  onClose: () => void
}

export function Questionnaire({ open, onClose }: QuestionnaireProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [step, setStep] = useState<QuizStep>('focus')
  const [focus, setFocus] = useState<FocusId | null>(null)
  const [laserGoal, setLaserGoal] = useState<LaserGoal | null>(null)
  const [shareConsent, setShareConsent] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    setStep('focus')
    setFocus(null)
    setLaserGoal(null)
    setShareConsent(false)
  }, [open])

  const selectedFocus = focusOptions.find((option) => option.id === focus)
  const suggestedTopic = focus === 'laser'
    ? laserGoal ? laserResults[laserGoal] : 'Remoção a laser'
    : focus ? focusResults[focus] : ''

  const whatsappMessage = [
    'Olá, Dra. Luana! Respondi ao questionário inicial do site.',
    selectedFocus ? `Meu interesse: ${selectedFocus.title}.` : '',
    laserGoal ? `Objetivo com laser: ${laserOptions.find((option) => option.id === laserGoal)?.title}.` : '',
    suggestedTopic ? `Gostaria de conversar sobre: ${suggestedTopic}.` : '',
    'Entendo que essa sugestão é apenas um ponto de partida para uma avaliação profissional.',
  ].filter(Boolean).join('\n')

  const whatsappBase = WHATSAPP_PHONE
    ? `https://wa.me/${WHATSAPP_PHONE}`
    : 'https://wa.me/'
  const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(whatsappMessage)}`

  const chooseFocus = (choice: FocusId) => {
    setFocus(choice)
    setLaserGoal(null)
    setShareConsent(false)
    setStep(choice === 'laser' ? 'laser-goal' : 'result')
  }

  const chooseLaserGoal = (choice: LaserGoal) => {
    setLaserGoal(choice)
    setShareConsent(false)
    setStep('result')
  }

  const goBack = () => {
    setShareConsent(false)
    setStep(step === 'laser-goal' ? 'focus' : focus === 'laser' ? 'laser-goal' : 'focus')
  }

  const restart = () => {
    setStep('focus')
    setFocus(null)
    setLaserGoal(null)
    setShareConsent(false)
  }

  const progressValue = step === 'focus' ? 1 : 2

  return (
    <dialog
      ref={dialogRef}
      className="quiz-dialog"
      aria-labelledby="quiz-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="quiz-panel">
        <header className="quiz-header">
          <a href="#inicio" className="quiz-brand" onClick={onClose}>
            <span>LL</span>
            <small>LUANA LUNKE · CLÍNICA DE ESTÉTICA</small>
          </a>
          <button className="quiz-close" type="button" onClick={onClose} aria-label="Fechar questionário">
            <span />
            <span />
          </button>
        </header>

        <div className="quiz-progress-wrap">
          <div
            className="quiz-progress"
            role="progressbar"
            aria-label="Progresso do questionário"
            aria-valuemin={1}
            aria-valuemax={2}
            aria-valuenow={progressValue}
          >
            <span style={{ width: `${progressValue * 50}%` }} />
          </div>
          <small>{step === 'focus' ? 'PASSO 1 DE 2' : 'PASSO 2 DE 2'}</small>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            className="quiz-step"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {step === 'focus' && (
              <>
                <p className="eyebrow dark"><span /> QUESTIONÁRIO INICIAL</p>
                <h2 id="quiz-dialog-title">O que você gostaria de conhecer?</h2>
                <p className="quiz-intro">Escolha o assunto que mais combina com o que você busca hoje.</p>
                <div className="quiz-options">
                  {focusOptions.map((option) => (
                    <button className="quiz-option" key={option.id} type="button" onClick={() => chooseFocus(option.id)}>
                      <span className="quiz-option-copy">
                        <strong>{option.title}</strong>
                        <small>{option.description}</small>
                      </span>
                      <ArrowIcon />
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 'laser-goal' && (
              <>
                <p className="eyebrow dark"><span /> UM POUCO MAIS</p>
                <h2 id="quiz-dialog-title">Qual é o seu objetivo com o laser?</h2>
                <p className="quiz-intro">Isso ajuda a preparar uma conversa mais direcionada.</p>
                <div className="quiz-options quiz-options-compact">
                  {laserOptions.map((option) => (
                    <button className="quiz-option" key={option.id} type="button" onClick={() => chooseLaserGoal(option.id)}>
                      <span className="quiz-option-copy"><strong>{option.title}</strong></span>
                      <ArrowIcon />
                    </button>
                  ))}
                </div>
                <button className="quiz-back" type="button" onClick={goBack}>← Voltar às opções</button>
              </>
            )}

            {step === 'result' && (
              <>
                <p className="eyebrow dark"><span /> UM PONTO DE PARTIDA</p>
                <h2 id="quiz-dialog-title">Um assunto para conversar</h2>
                <div className="quiz-result">
                  <small>COM BASE NO QUE VOCÊ SELECIONOU</small>
                  <strong>{suggestedTopic}</strong>
                  <p>A indicação do procedimento depende de uma avaliação individual com a Dra. Luana.</p>
                </div>
                <label className="quiz-consent">
                  <input
                    type="checkbox"
                    checked={shareConsent}
                    onChange={(event) => setShareConsent(event.target.checked)}
                  />
                  <span>Quero abrir o WhatsApp com este resumo para revisar antes de enviar.</span>
                </label>
                {shareConsent ? (
                  <a className="button button-dark quiz-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                    Continuar para o WhatsApp <ArrowIcon />
                  </a>
                ) : (
                  <button className="button button-dark quiz-whatsapp" type="button" disabled>
                    Continuar para o WhatsApp <ArrowIcon />
                  </button>
                )}
                <p className="quiz-privacy-note">O site não salva suas respostas. O WhatsApp abrirá com uma mensagem preenchida; você poderá escolher o contato e decidir se deseja enviá-la.</p>
                <div className="quiz-result-actions">
                  <button className="quiz-back" type="button" onClick={goBack}>← Voltar</button>
                  <button className="quiz-restart" type="button" onClick={restart}>Refazer questionário</button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </dialog>
  )
}
