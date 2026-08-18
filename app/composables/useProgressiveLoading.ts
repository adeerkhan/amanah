export interface LoadingStep {
  label: string
  status: 'pending' | 'running' | 'done' | 'error'
}

export function useProgressiveLoading() {
  const steps = ref<LoadingStep[]>([])
  const isRunning = ref(false)
  const currentStep = ref(-1)

  function start(labels: string[]) {
    steps.value = labels.map(label => ({ label, status: 'pending' }))
    currentStep.value = 0
    isRunning.value = true
    steps.value[0]!.status = 'running'
  }

  async function advance() {
    if (currentStep.value >= 0 && currentStep.value < steps.value.length) {
      steps.value[currentStep.value]!.status = 'done'
    }
    currentStep.value++
    if (currentStep.value < steps.value.length) {
      steps.value[currentStep.value]!.status = 'running'
      await new Promise(r => setTimeout(r, 200))
    } else {
      isRunning.value = false
    }
  }

  function fail(_message: string) {
    if (currentStep.value >= 0 && currentStep.value < steps.value.length) {
      steps.value[currentStep.value]!.status = 'error'
    }
    isRunning.value = false
  }

  function reset() {
    steps.value = []
    currentStep.value = -1
    isRunning.value = false
  }

  return { steps, isRunning, currentStep, start, advance, fail, reset }
}
