<script setup lang="ts">
const route = useRoute()
const { getCampaign } = useCampaigns()
const { getWorkflow } = useReviewWorkflow()
const campaign = getCampaign(route.params.id as string)!
if (!campaign) throw createError({ statusCode: 404, statusMessage: 'Campaign not found' })
const workflow = getWorkflow(campaign.id)
const baseline = [
  { id: 'queue', label: 'Case added to review queue', detail: 'Demo campaign dossier indexed', timestamp: '09:14', tone: 'evidence' as const },
  { id: 'ingest', label: 'Documents ingested', detail: `${campaign.documents.length} source documents available`, timestamp: '09:15', tone: 'evidence' as const }
]
const events = computed(() => [...workflow.events, ...baseline])
</script>

<template>
  <div>
    <NuxtLink :to="`/campaigns/${campaign.id}`" style="font-size:12px;color:var(--c-text-secondary)">
      ← Return to case
    </NuxtLink>

    <div style="display:flex;justify-content:space-between;align-items:end;margin:24px 0 20px">
      <div>
        <p class="eyebrow" style="margin:0 0 4px">Phase 8 · Audit trail</p>
        <h1 style="margin:0 0 4px;font-size:clamp(24px,3vw,32px);font-weight:600;letter-spacing:-.04em">Review activity</h1>
        <p style="margin:0;color:var(--c-text-secondary);font-size:12px">
          Every AI and reviewer interaction for <strong>{{ campaign.title }}</strong>.
        </p>
      </div>
      <span style="font-size:11px;color:var(--c-text-tertiary)">{{ events.length }} events recorded</span>
    </div>

    <div class="panel" style="max-width:680px;padding:12px 20px">
      <div
        v-for="item in events"
        :key="item.id"
        style="display:flex;gap:14px;padding:16px 0;border-bottom:1px solid var(--c-border)"
      >
        <span
          style="width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:5px"
          :style="{
            background: item.tone === 'ai' ? 'var(--c-success)' : item.tone === 'human' ? 'var(--c-info)' : 'var(--c-warning)',
            boxShadow: `0 0 0 3px ${item.tone === 'ai' ? 'var(--c-success-light)' : item.tone === 'human' ? 'var(--c-info-light)' : 'var(--c-warning-light)'}`
          }"
        />
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
            <strong style="font-size:12px">{{ item.label }}</strong>
            <span style="color:var(--c-text-tertiary);font-size:10px;flex-shrink:0">{{ item.timestamp }}</span>
          </div>
          <p style="margin:4px 0 0;color:var(--c-text-secondary);font-size:11px">{{ item.detail }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
