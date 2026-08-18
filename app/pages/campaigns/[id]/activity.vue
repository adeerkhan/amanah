<script setup lang="ts">
const route = useRoute()
const { getCampaign } = useCampaigns()
const { getWorkflow } = useReviewWorkflow()
const campaign = getCampaign(route.params.id as string)!
if (!campaign) throw createError({ statusCode: 404, statusMessage: 'Campaign not found' })
const workflow = getWorkflow(campaign.id)
const baseline = [{ id: 'queue', label: 'Case added to review queue', detail: 'Demo campaign dossier indexed', timestamp: '09:14', tone: 'evidence' as const }, { id: 'ingest', label: 'Documents ingested', detail: `${campaign.documents.length} source documents available`, timestamp: '09:15', tone: 'evidence' as const }]
const events = computed(() => [...workflow.events, ...baseline])
</script>
<template>
  <div class="activity-page"><NuxtLink :to="`/campaigns/${campaign.id}`" class="back-link">← Return to case</NuxtLink><div class="activity-heading"><div><p class="eyebrow">Phase 8 · Audit trail</p><h1>Review activity</h1><p>Every AI and reviewer interaction for <strong>{{ campaign.title }}</strong>.</p></div><span class="case-id">{{ events.length }} events recorded</span></div><section class="timeline panel"><div v-for="item in events" :key="item.id" class="timeline-item"><span class="timeline-dot" :class="`timeline-${item.tone}`" /><div class="timeline-copy"><div><strong>{{ item.label }}</strong><time>{{ item.timestamp }}</time></div><p>{{ item.detail }}</p></div></div></section></div>
</template>
