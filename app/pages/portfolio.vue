<script setup lang="ts">
const { signals, portfolioStats } = usePortfolioRadar()
</script>

<template>
  <div>
    <p class="eyebrow" style="margin:0 0 6px">Portfolio intelligence</p>
    <h1 style="margin:0 0 6px;font-size:clamp(24px,3vw,32px);font-weight:600;letter-spacing:-.04em">Risk radar</h1>
    <p style="margin:0 0 24px;color:var(--c-text-secondary);font-size:13px;max-width:520px">
      Patterns detected across all campaigns. These are prioritization signals for investigation, not automated accusations.
    </p>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">
      <div class="panel" style="padding:16px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <Icon name="lucide:folder" :size="14" style="color:var(--c-text-tertiary)" />
          <small style="color:var(--c-text-secondary);font-size:11px">Total campaigns</small>
        </div>
        <strong style="font-size:28px;letter-spacing:-.04em">{{ portfolioStats.total }}</strong>
      </div>
      <div class="panel" style="padding:16px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <Icon name="lucide:alert-circle" :size="14" style="color:var(--c-danger)" />
          <small style="color:var(--c-text-secondary);font-size:11px">Total findings</small>
        </div>
        <strong style="font-size:28px;letter-spacing:-.04em;color:var(--c-danger)">{{ portfolioStats.totalFindings }}</strong>
      </div>
      <div class="panel" style="padding:16px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <Icon name="lucide:file-text" :size="14" style="color:var(--c-text-tertiary)" />
          <small style="color:var(--c-text-secondary);font-size:11px">Documents indexed</small>
        </div>
        <strong style="font-size:28px;letter-spacing:-.04em">{{ portfolioStats.totalDocuments }}</strong>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;margin-bottom:28px">
      <article v-for="signal in signals" :key="signal.id" class="panel" style="padding:16px">
        <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;margin-bottom:8px">
          <h3 style="margin:0;font-size:13px;display:flex;align-items:center;gap:6px">
            <Icon
              :name="signal.severity === 'critical' ? 'lucide:alert-triangle' : signal.severity === 'warning' ? 'lucide:alert-circle' : 'lucide:info'"
              :size="14"
              :style="{ color: signal.severity === 'critical' ? 'var(--c-danger)' : signal.severity === 'warning' ? 'var(--c-warning)' : 'var(--c-info)' }"
            />
            {{ signal.label }}
          </h3>
          <span
            style="width:28px;height:28px;border-radius:var(--radius-sm);display:grid;place-items:center;font-size:13px;font-weight:700;flex-shrink:0"
            :style="{
              background: signal.severity === 'critical' ? 'var(--c-danger-light)' : signal.severity === 'warning' ? 'var(--c-warning-light)' : 'var(--c-info-light)',
              color: signal.severity === 'critical' ? 'var(--c-danger)' : signal.severity === 'warning' ? 'var(--c-warning)' : 'var(--c-info)'
            }"
          >{{ signal.count }}</span>
        </div>
        <p style="margin:0 0 10px;color:var(--c-text-secondary);font-size:12px;line-height:1.5">{{ signal.detail }}</p>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          <NuxtLink
            v-for="id in signal.campaignIds"
            :key="id"
            :to="`/campaigns/${id}`"
            style="padding:3px 8px;background:var(--c-surface-alt);border-radius:4px;font-size:10px;color:var(--c-accent-dark);font-weight:500;display:inline-flex;align-items:center;gap:4px"
          >
            <Icon name="lucide:external-link" :size="10" /> {{ id }}
          </NuxtLink>
        </div>
      </article>
    </div>

    <div class="panel" style="padding:20px">
      <h2 style="margin:0 0 14px;font-size:16px;font-weight:600;display:flex;align-items:center;gap:8px">
        <Icon name="lucide:bar-chart-3" :size="18" style="color:var(--c-text-tertiary)" />
        Risk distribution
      </h2>
      <div style="display:flex;gap:12px;align-items:center">
        <div style="flex:1;height:8px;background:var(--c-surface-alt);border-radius:8px;overflow:hidden;display:flex">
          <div style="background:var(--c-danger)" :style="{ width: `${(portfolioStats.high / portfolioStats.total) * 100}%` }" />
          <div style="background:var(--c-warning)" :style="{ width: `${(portfolioStats.medium / portfolioStats.total) * 100}%` }" />
          <div style="background:var(--c-success)" :style="{ width: `${(portfolioStats.low / portfolioStats.total) * 100}%` }" />
        </div>
        <div style="display:flex;gap:14px;font-size:11px">
          <span style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:2px;background:var(--c-danger)" />{{ portfolioStats.high }} high</span>
          <span style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:2px;background:var(--c-warning)" />{{ portfolioStats.medium }} medium</span>
          <span style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:2px;background:var(--c-success)" />{{ portfolioStats.low }} low</span>
        </div>
      </div>
    </div>
  </div>
</template>
