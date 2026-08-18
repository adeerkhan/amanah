<script setup lang="ts">
import { policies } from '~/data/policies'

const query = ref('')
const visible = computed(() => policies.filter(p => !query.value || `${p.title} ${p.summary} ${p.keywords.join(' ')}`.toLowerCase().includes(query.value.toLowerCase())))
</script>

<template>
  <div style="max-width:960px">
    <p class="eyebrow" style="margin:0 0 6px">Internal knowledge base</p>
    <h1 style="margin:0 0 6px;font-size:clamp(24px,3vw,32px);font-weight:600;letter-spacing:-.04em">Policy library</h1>
    <p style="margin:0 0 20px;color:var(--c-text-secondary);font-size:13px;max-width:500px">
      Concise fictionalized operating guidance used to ground recommendations. This is demo policy, not private documentation.
    </p>
    <input
      v-model="query"
      placeholder="Search policies…"
      class="panel"
      style="width:100%;padding:10px 14px;font-size:13px;border:1px solid var(--c-border);outline:none;transition:border-color .12s;margin-bottom:16px"
    >
    <div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(340px,1fr))">
      <article v-for="policy in visible" :key="policy.id" class="panel" style="padding:18px">
        <div style="display:flex;justify-content:space-between;align-items:start;gap:10px;margin-bottom:10px">
          <div>
            <h2 style="margin:0;font-size:14px">{{ policy.title }}</h2>
            <span style="color:var(--c-accent);font-size:10px;font-weight:600">{{ policy.section }}</span>
          </div>
          <span style="padding:2px 8px;background:var(--c-surface-alt);border-radius:99px;font-size:10px;color:var(--c-text-secondary)">{{ policy.keywords.length }} topics</span>
        </div>
        <p style="margin:0 0 12px;color:var(--c-text-secondary);font-size:12px;line-height:1.6">{{ policy.summary }}</p>
        <ul style="margin:0;padding:0;list-style:none">
          <li v-for="g in policy.guidance" :key="g" style="display:flex;gap:6px;padding:4px 0;font-size:12px;color:var(--c-text-secondary)">
            <span style="color:var(--c-success);flex-shrink:0">✓</span>
            {{ g }}
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>
