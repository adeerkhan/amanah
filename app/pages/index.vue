<script setup lang="ts">
const { priority } = useReviewWorkflow()
const queue = computed(() => priority.value)

const stats = [
  { label: 'Pending reviews', value: '27', change: '+4 today', icon: 'lucide:clock', accent: false },
  { label: 'High attention', value: '04', change: '2 escalated', icon: 'lucide:alert-triangle', accent: true },
  { label: 'Needs evidence', value: '09', change: '34% of queue', icon: 'lucide:file-question', accent: false },
  { label: 'Median review time', value: '11m', change: '↓ 18% this week', icon: 'lucide:timer', accent: false }
]
</script>

<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:32px">
      <div>
        <p class="eyebrow" style="margin:0 0 8px">Tuesday · 18 August 2026</p>
        <h1 style="margin:0;font-size:clamp(28px,4vw,40px);font-weight:600;letter-spacing:-.04em;line-height:1.1">
          Good morning, Samira.
        </h1>
        <p style="margin:8px 0 0;color:var(--c-text-secondary);font-size:14px">
          Here's what needs a careful look today.
        </p>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:11px;color:var(--c-text-tertiary);display:flex;align-items:center;gap:6px">
          <span class="topbar-dot" style="display:inline-block" />
          All systems operational
        </span>
        <NuxtLink to="/campaigns/urgent-medical" class="btn btn-primary">
          <Icon name="lucide:external-link" :size="14" />
          Open high-risk demo
        </NuxtLink>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px">
      <article
        v-for="stat in stats"
        :key="stat.label"
        class="panel stat-card"
      >
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <span style="font-size:12px;color:var(--c-text-secondary)">{{ stat.label }}</span>
          <span
            style="width:28px;height:28px;border-radius:var(--radius-sm);display:grid;place-items:center"
            :style="{
              background: stat.accent ? 'var(--c-danger-light)' : 'var(--c-surface-alt)',
              color: stat.accent ? 'var(--c-danger)' : 'var(--c-text-tertiary)'
            }"
          >
            <Icon :name="stat.icon" :size="14" />
          </span>
        </div>
        <strong
          style="display:block;font-size:30px;font-weight:600;letter-spacing:-.04em;margin-bottom:4px"
          :style="{ color: stat.accent ? 'var(--c-danger)' : 'var(--c-text)' }"
        >{{ stat.value }}</strong>
        <small style="font-size:11px;color:var(--c-text-tertiary)">{{ stat.change }}</small>
      </article>
    </div>

    <div style="display:grid;grid-template-columns:1fr 280px;gap:16px;align-items:start">
      <div class="panel">
        <div style="display:flex;justify-content:space-between;align-items:end;padding:20px 20px 16px;border-bottom:1px solid var(--c-border)">
          <div>
            <p class="eyebrow" style="margin:0 0 4px">AI priority queue</p>
            <h2 style="margin:0;font-size:18px;font-weight:600">Cases needing attention</h2>
          </div>
          <NuxtLink to="/campaigns" class="btn btn-secondary" style="font-size:11px;padding:5px 10px">
            View all
            <Icon name="lucide:arrow-right" :size="12" />
          </NuxtLink>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr 70px 40px;padding:10px 20px;font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--c-text-tertiary);border-bottom:1px solid var(--c-border)">
          <span>Campaign</span>
          <span>Priority reason</span>
          <span>Risk</span>
          <span>Age</span>
        </div>

        <NuxtLink
          v-for="(campaign, index) in queue"
          :key="campaign.id"
          :to="`/campaigns/${campaign.id}`"
          class="queue-row"
        >
          <div style="display:flex;align-items:center;gap:10px;min-width:0">
            <span style="font-size:11px;color:var(--c-text-tertiary);flex-shrink:0">{{ String(index + 1).padStart(2, '0') }}</span>
            <div style="min-width:0">
              <strong style="display:block;font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ campaign.title }}</strong>
              <small style="color:var(--c-text-tertiary);font-size:11px">{{ campaign.creator }} · {{ campaign.category }}</small>
            </div>
          </div>
          <div style="color:var(--c-text-secondary);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
            {{ campaign.findings[0]?.title || 'Complete dossier' }}
          </div>
          <span class="pill" :class="`pill-${campaign.risk}`">{{ campaign.risk }}</span>
          <span style="color:var(--c-text-tertiary);font-size:11px">{{ campaign.age }}</span>
        </NuxtLink>
      </div>

      <aside style="display:grid;gap:16px;align-content:start">
        <div class="radar-card">
          <p class="eyebrow" style="color:#64748b;margin:0 0 12px">Portfolio radar</p>
          <h2 style="margin:0 0 8px;font-size:18px;font-weight:600;line-height:1.3">
            A pattern worth<br>a closer look
          </h2>
          <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6">
            3 cases share beneficiary evidence gaps. This is a prioritization signal, not an accusation.
          </p>
          <NuxtLink to="/portfolio" style="display:inline-flex;align-items:center;gap:4px;margin-top:16px;color:var(--c-accent);font-size:11px;font-weight:600">
            Inspect cases <Icon name="lucide:arrow-right" :size="12" />
          </NuxtLink>
          <div
            style="position:absolute;right:-18px;bottom:-18px;width:80px;height:80px;border-radius:50%;border:1px solid rgba(255,255,255,.12);display:grid;place-items:center"
          >
            <div style="text-align:center;line-height:1">
              <strong style="display:block;font-size:20px;color:white">3</strong>
              <small style="font-size:9px;color:#64748b">cases</small>
            </div>
          </div>
        </div>

        <div class="panel" style="padding:20px">
          <p class="eyebrow" style="margin:0 0 12px">Review principle</p>
          <blockquote style="margin:0 0 16px;color:var(--c-text);font-size:14px;line-height:1.5;font-style:italic;border-left:2px solid var(--c-accent);padding-left:12px">
            "AI doesn't decide who deserves trust. It helps reviewers see the evidence faster."
          </blockquote>
          <div style="display:flex;align-items:center;gap:8px;font-size:11px;color:var(--c-text-tertiary)">
            <span class="sidebar-avatar" style="width:20px;height:20px;font-size:8px;background:var(--c-border)">A</span>
            Amanah design principle
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.stat-card { padding: 16px 18px; }
.queue-row {
  display: grid;
  grid-template-columns: 1fr 1fr 70px 40px;
  gap: 12px;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid var(--c-border);
  font-size: 12px;
  transition: background .1s;
}
.queue-row:hover { background: var(--c-surface-alt); }
.radar-card {
  border-radius: var(--radius-lg);
  padding: 24px;
  color: var(--c-text-inverse);
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  position: relative;
  overflow: hidden;
}
</style>
