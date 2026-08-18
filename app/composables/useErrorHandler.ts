export interface AppError {
  id: string
  type: 'document_unreadable' | 'model_unavailable' | 'conflicting_evidence' | 'validation_failed' | 'insufficient_evidence'
  title: string
  message: string
  recovery: string
  timestamp: string
}

export function useErrorHandler() {
  const errors = ref<AppError[]>([])

  const errorTemplates: Record<AppError['type'], Omit<AppError, 'id' | 'timestamp'>> = {
    document_unreadable: {
      type: 'document_unreadable',
      title: 'Document unreadable',
      message: 'Could not reliably extract information from this document.',
      recovery: 'Human verification required.'
    },
    model_unavailable: {
      type: 'model_unavailable',
      title: 'AI service unavailable',
      message: 'The review engine is temporarily unavailable.',
      recovery: 'Campaign remains in manual review queue.'
    },
    conflicting_evidence: {
      type: 'conflicting_evidence',
      title: 'Conflicting evidence detected',
      message: 'Multiple sources provide contradictory information.',
      recovery: 'AI recommendation suppressed. Senior review recommended.'
    },
    validation_failed: {
      type: 'validation_failed',
      title: 'AI response failed validation',
      message: 'The model output did not match the expected schema.',
      recovery: 'Retrying analysis…'
    },
    insufficient_evidence: {
      type: 'insufficient_evidence',
      title: 'Insufficient evidence',
      message: 'Not enough data for a reliable recommendation.',
      recovery: 'Request additional documentation before proceeding.'
    }
  }

  function reportError(type: AppError['type'], overrides?: Partial<AppError>) {
    const template = errorTemplates[type]
    const error: AppError = {
      ...template,
      id: crypto.randomUUID(),
      timestamp: new Date().toLocaleTimeString(),
      ...overrides
    }
    errors.value.unshift(error)
    return error
  }

  function dismissError(id: string) {
    errors.value = errors.value.filter(e => e.id !== id)
  }

  function clearErrors() {
    errors.value = []
  }

  return { errors, reportError, dismissError, clearErrors }
}
