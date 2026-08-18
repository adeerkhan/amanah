<script setup lang="ts">
import { runEvaluation } from '~/data/evaluation'

const results = ref<ReturnType<typeof runEvaluation> | null>(null)
const running = ref(false)
const steps = ['Reading evaluation cases…', 'Running AI analysis…', 'Comparing findings…', 'Computing metrics…']
const currentStep = ref(0)

async function runEval() {
  running.value = true
  currentStep.value = 0
  for (let i = 0; i < steps.length; i++) {
    currentStep.value = i
    await new Promise(r => setTimeout(r, 400))
  }
  results.value = runEvaluation()
  running.value = false
}

onMounted(() => runEval())
</script>

<template>
  <div style="max-width:960px">
    <p class="eyebrow" style="margin:0 0 6px">Phase 12 · Evaluation</p>
    <h1 style="margin:0 0 6px;font-size:clamp(24px,3vw,32px);font-weight:600;letter-spacing:-.04em">Evaluation dashboard</h1>
    <p style="margin:0 0 20px;color:var(--c-text-secondary);font-size:13px;max-width:520px">
      Automated evaluation over 12 seeded fictional cases. Measures finding precision, recommendation accuracy, and evidence grounding.
    </p>

    <div v-if="running" class="panel" style="padding:24px;margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <span style="width:20px;height:20px;border:2px solid var(--c-border);border-top-color:var(--c-accent);border-radius:50%;animation:spin .6s linear infinite" />
        <strong style="font-size:13px">Running evaluation…</strong>
      </div>
      <div
        v-for="(step, i) in steps" :key="step" style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:12px"
        :style="{ color: i <= currentStep ? 'var(--c-text)' : 'var(--c-text-tertiary)' }"
      >
        <span
          style="width:16px;height:16px;border-radius:50%;display:grid;place-items:center;font-size:9px"
          :style="{
            background: i < currentStep ? 'var(--c-success-light)' : i === currentStep ? 'var(--c-accent-light)' : 'var(--c-surface-alt)',
            color: i < currentStep ? 'var(--c-success)' : i === currentStep ? 'var(--c-accent)' : 'var(--c-text-tertiary)'
          }"
        >{{ i < currentStep ? '✓' : i === currentStep ? '✦' : '' }}</span>
        {{ step }}
      </div>
    </div>

    <template v-if="results">
      <div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));margin-bottom:20px">
        <div
          v-for="m in [
            ['Cases evaluated', results.totalCases, ''],
            ['Finding precision', `${results.findingPrecision}%`, results.findingPrecision >= 90 ? 'var(--c-success)' : 'var(--c-warning)'],
            ['Finding recall', `${results.findingRecall}%`, results.findingRecall >= 85 ? 'var(--c-success)' : 'var(--c-warning)'],
            ['Recommendation agreement', `${results.recommendationAgreement}%`, results.recommendationAgreement >= 85 ? 'var(--c-success)' : 'var(--c-warning)'],
            ['Evidence grounding', `${results.evidenceGrounding}%`, 'var(--c-success)'],
            ['Unsupported claims', `${results.unsupportedClaims}%`, results.unsupportedClaims <= 5 ? 'var(--c-success)' : 'var(--c-danger)'],
            ['False positive rate', `${results.falsePositiveRate}%`, results.falsePositiveRate <= 10 ? 'var(--c-success)' : 'var(--c-warning)'],
            ['Risk accuracy', `${results.riskAccuracy}%`, results.riskAccuracy >= 80 ? 'var(--c-success)' : 'var(--c-warning)']
          ]" :key="m[0]" class="panel" style="padding:14px"
        >
          <small style="display:block;color:var(--c-text-secondary);font-size:10px;margin-bottom:6px">{{ m[0] }}</small>
          <strong style="font-size:24px;letter-spacing:-.04em" :style="m[2] ? { color: m[2] as string } : {}">{{ m[1] }}</strong>
        </div>
      </div>

      <div class="panel" style="padding:20px">
        <h2 style="margin:0 0 14px;font-size:16px;font-weight:600">What this validates</h2>
        <div style="display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
          <div
            v-for="v in [
              ['Evidence grounding', 'Every seeded finding points to one or more dossier sources.'],
              ['Policy retrieval', 'Findings are linked to a relevant fictional policy card.'],
              ['Safe uncertainty', 'Unclear evidence is surfaced for humans, not labeled as fraud.'],
              ['Risk calibration', 'Risk scores match expected severity across all test cases.'],
              ['False positive control', 'Legitimate campaigns are not incorrectly flagged.']
            ]" :key="v[0]" style="padding:14px;background:var(--c-surface-alt);border-radius:var(--radius-md)"
          >
            <strong style="display:block;font-size:12px;margin-bottom:4px">{{ v[0] }}</strong>
            <small style="color:var(--c-text-secondary);font-size:11px;line-height:1.5">{{ v[1] }}</small>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
