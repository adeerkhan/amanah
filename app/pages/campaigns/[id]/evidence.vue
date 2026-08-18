<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <NuxtLink :to="`/campaigns/${route.params.id}`" style="font-size:12px;color:var(--c-text-secondary)">
      ← Return to review
    </NuxtLink>
    <h1 style="margin:16px 0 6px;font-size:clamp(24px,3vw,32px);font-weight:600;letter-spacing:-.04em">Evidence viewer</h1>
    <p style="color:var(--c-text-secondary);font-size:13px">
      Evidence is available within the campaign workspace so comparisons stay in context.
    </p>
  </div>
</template>
