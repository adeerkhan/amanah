<script setup lang="ts">
import { campaigns } from '~/data/campaigns'

const search = ref('')
const risk = ref('all')
const status = ref('all')
const filtered = computed(() => campaigns.filter(c =>
  (!search.value || `${c.title} ${c.creator}`.toLowerCase().includes(search.value.toLowerCase()))
  && (risk.value === 'all' || c.risk === risk.value)
  && (status.value === 'all' || c.status === status.value)
))
</script>

<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:24px">
      <div>
        <p class="eyebrow" style="margin:0 0 6px">Operations</p>
        <h1 style="margin:0;font-size:clamp(26px,3vw,34px);font-weight:600;letter-spacing:-.04em">Campaign queue</h1>
        <p style="margin:6px 0 0;color:var(--c-text-secondary);font-size:13px">Search and triage demo campaigns.</p>
      </div>
      <span class="pill pill-low">{{ filtered.length }} visible</span>
    </div>

    <div class="panel" style="display:flex;gap:10px;padding:12px 14px;margin-bottom:12px;flex-wrap:wrap">
      <input
        v-model="search"
        aria-label="Search campaigns"
        placeholder="Search title or creator…"
        style="flex:1;min-width:200px;padding:7px 10px;border:1px solid var(--c-border);border-radius:var(--radius-sm);font-size:13px;outline:none;transition:border-color .12s"
      >
      <select
        v-model="risk"
        aria-label="Filter risk"
        style="padding:7px 10px;border:1px solid var(--c-border);border-radius:var(--radius-sm);font-size:13px;color:var(--c-text-secondary)"
      >
        <option value="all">All risk levels</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        v-model="status"
        aria-label="Filter status"
        style="padding:7px 10px;border:1px solid var(--c-border);border-radius:var(--radius-sm);font-size:13px;color:var(--c-text-secondary)"
      >
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in_review">In review</option>
        <option value="needs_information">Needs info</option>
      </select>
    </div>

    <div class="panel" style="overflow-x:auto">
      <table style="width:100%;min-width:740px;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="border-bottom:1px solid var(--c-border)">
            <th
              v-for="col in ['Campaign', 'Creator', 'Category', 'Goal', 'Risk', 'Status', 'Age']" :key="col"
              style="padding:10px 16px;font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--c-text-tertiary);text-align:left;background:var(--c-surface-alt)"
            >
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="campaign in filtered"
            :key="campaign.id"
            style="border-bottom:1px solid var(--c-border);transition:background .1s"
            @mouseenter="($event.currentTarget as HTMLElement).style.background='var(--c-surface-alt)'"
            @mouseleave="($event.currentTarget as HTMLElement).style.background=''"
          >
            <td style="padding:12px 16px">
              <NuxtLink :to="`/campaigns/${campaign.id}`" style="font-weight:600;color:var(--c-accent-dark)">
                {{ campaign.title }}
              </NuxtLink>
            </td>
            <td style="padding:12px 16px;color:var(--c-text-secondary)">{{ campaign.creator }}</td>
            <td style="padding:12px 16px;color:var(--c-text-secondary)">{{ campaign.category }}</td>
            <td style="padding:12px 16px">${{ campaign.goal.toLocaleString() }}</td>
            <td style="padding:12px 16px"><span class="pill" :class="`pill-${campaign.risk}`">{{ campaign.risk }}</span></td>
            <td style="padding:12px 16px;text-transform:capitalize;color:var(--c-text-secondary)">{{ campaign.status.replace('_', ' ') }}</td>
            <td style="padding:12px 16px;color:var(--c-text-tertiary)">{{ campaign.age }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
