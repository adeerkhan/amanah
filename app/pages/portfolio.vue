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
        <small style="display:block;color:var(--c-text-secondary);font-size:11px;margin-bottom:6px">Total campaigns</small>
        <strong style="font-size:28px;letter-spacing:-.04em">{{ portfolioStats.total }}</strong>
      </div>
      <div class="panel" style="padding:16px">
        <small style="display:block;color:var(--c-text-secondary);font-size:11px;margin-bottom:6px">Total findings</small>
        <strong style="font-size:28px;letter-spacing:-.04em;color:var(--c-danger)">{{ portfolioStats.totalFindings }}</strong>
      </div>
      <div class="panel" style="padding:16px">
        <small style="display:block;color:var(--c-text-secondary);font-size:11px;margin-bottom:6px">Documents indexed</small>
        <strong style="font-size:28px;letter-spacing:-.04em">{{ portfolioStats.totalDocuments }}</strong>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;margin-bottom:28px">
      <article v-for="signal in signals" :key="signal.id" class="panel" style="padding:16px">
        <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;margin-bottom:8px">
          <h3 style="margin:0;font-size:13px">{{ signal.label }}</h3>
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
            style="padding:3px 8px;background:var(--c-surface-alt);border-radius:4px;font-size:10px;color:var(--c-accent-dark);font-weight:500"
          >
            {{ id }}
          </NuxtLink>
        </div>
      </article>
    </div>

    <div class="panel" style="padding:20px">
      <h2 style="margin:0 0 14px;font-size:16px;font-weight:600">Risk distribution</h2>
      <div style="display:flex;gap:12px;align-items:center">
        <div style="flex:1;height:8px;background:var(--c-surface-alt);border-radius:8px;overflow:hidden;display:flex">
          <div style="background:var(--c-danger)" :style="{ width: `${(portfolioStats.high / portfolioStats.total) * 100}%` }" />
          <div style="background:var(--c-warning)" :style="{ width: `${(portfolioStats.medium / portfolioStats.total) * 100}%` }" />
          <div style="background:var(--c-success)" :style="{ width: `${(portfolioStats.low / portfolioStats.total) * 100}%` }" />
        </div>
        <div style="display:flex;gap:14px;font-size:11px">
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:var(--c-danger);margin-right:4px;vertical-align:middle" />{{ portfolioStats.high }} high</span>
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:var(--c-warning);margin-right:4px;vertical-align:middle" />{{ portfolioStats.medium }} medium</span>
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:var(--c-success);margin-right:4px;vertical-align:middle" />{{ portfolioStats.low }} low</span>
        </div>
      </div>
    </div>
  </div>
</template>
