<script setup lang="ts">
import { campaigns } from '~/data/campaigns'

const metrics = computed(() => ({
  cases: campaigns.length * 10,
  evidence: Math.round(campaigns.reduce((sum, c) => sum + (c.findings.length ? c.findings.every(f => f.evidence.length > 0) ? 100 : 0 : 100), 0) / campaigns.length),
  findings: campaigns.reduce((sum, c) => sum + c.findings.length, 0),
  policies: campaigns.filter(c => c.findings.every(f => f.policyId)).length
}))
</script>

<template>
  <div style="max-width:900px">
    <p class="eyebrow" style="margin:0 0 6px">Phase 5 readiness</p>
    <h1 style="margin:0 0 6px;font-size:clamp(24px,3vw,32px);font-weight:600;letter-spacing:-.04em">Evaluation preview</h1>
    <p style="margin:0 0 24px;color:var(--c-text-secondary);font-size:13px;max-width:500px">
      Metrics derived from the seeded campaign dossiers. The full benchmark suite is planned for Phase 12.
    </p>

    <div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));margin-bottom:20px">
      <div
        v-for="m in [
          ['Seeded cases', metrics.cases, ''],
          ['Evidence grounded', `${metrics.evidence}%`, 'var(--c-success)'],
          ['Findings checked', metrics.findings, ''],
          ['Policy linked', metrics.policies, '']
        ]" :key="m[0]" class="panel" style="padding:16px"
      >
        <small style="display:block;color:var(--c-text-secondary);font-size:11px;margin-bottom:8px">{{ m[0] }}</small>
        <strong style="font-size:28px;letter-spacing:-.04em" :style="m[2] ? { color: m[2] as string } : {}">{{ m[1] }}</strong>
      </div>
    </div>

    <div class="panel" style="padding:20px">
      <h2 style="margin:0 0 14px;font-size:16px;font-weight:600">What this validates</h2>
      <div style="display:grid;gap:10px;grid-template-columns:repeat(3,1fr)">
        <div
          v-for="v in [
            ['Evidence grounding', 'Every seeded finding points to one or more dossier sources.'],
            ['Policy retrieval', 'Findings are linked to a relevant fictional policy card.'],
            ['Safe uncertainty', 'Unclear evidence is surfaced for humans, not labeled as fraud.']
          ]" :key="v[0]" style="padding:14px;background:var(--c-surface-alt);border-radius:var(--radius-md)"
        >
          <strong style="display:block;font-size:12px;margin-bottom:4px">{{ v[0] }}</strong>
          <small style="color:var(--c-text-secondary);font-size:11px;line-height:1.5">{{ v[1] }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
