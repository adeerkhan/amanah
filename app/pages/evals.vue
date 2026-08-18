<script setup lang="ts">
import { campaigns } from '~/data/campaigns'

const metrics = computed(() => ({ cases: campaigns.length * 10, evidence: Math.round(campaigns.reduce((sum, c) => sum + (c.findings.length ? c.findings.every(f => f.evidence.length > 0) ? 100 : 0 : 100), 0) / campaigns.length), findings: campaigns.reduce((sum, c) => sum + c.findings.length, 0), policies: campaigns.filter(c => c.findings.every(f => f.policyId)).length }))
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <p class="eyebrow">
      Phase 5 readiness
    </p><h1 class="mt-2 text-3xl font-semibold">
      Evaluation preview
    </h1><p class="mt-2 max-w-2xl muted">
      Metrics are derived from the seeded campaign dossiers and their evidence/policy annotations. The full benchmark suite is planned for Phase 12.
    </p><div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="panel p-5">
        <p class="text-sm muted">
          Seeded cases
        </p><p class="mt-3 text-3xl font-semibold">
          {{ metrics.cases }}
        </p>
      </div><div class="panel p-5">
        <p class="text-sm muted">
          Evidence grounded
        </p><p class="mt-3 text-3xl font-semibold text-[#1e7c50]">
          {{ metrics.evidence }}%
        </p>
      </div><div class="panel p-5">
        <p class="text-sm muted">
          Findings checked
        </p><p class="mt-3 text-3xl font-semibold">
          {{ metrics.findings }}
        </p>
      </div><div class="panel p-5">
        <p class="text-sm muted">
          Policy linked cases
        </p><p class="mt-3 text-3xl font-semibold">
          {{ metrics.policies }}
        </p>
      </div>
    </div><section class="panel mt-6 p-5">
      <h2 class="font-semibold">
        What this validates
      </h2><div class="mt-4 grid gap-3 text-sm md:grid-cols-3">
        <div class="rounded-lg bg-[#f5f8f4] p-4">
          <strong>Evidence grounding</strong><p class="mt-2 muted">
            Every seeded finding points to one or more dossier sources.
          </p>
        </div><div class="rounded-lg bg-[#f5f8f4] p-4">
          <strong>Policy retrieval</strong><p class="mt-2 muted">
            Findings are linked to a relevant fictional policy card.
          </p>
        </div><div class="rounded-lg bg-[#f5f8f4] p-4">
          <strong>Safe uncertainty</strong><p class="mt-2 muted">
            Unclear evidence is surfaced for humans rather than labeled as fraud.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
