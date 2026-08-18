<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <NuxtLink
      :to="`/campaigns/${route.params.id}`"
      class="font-semibold text-[#1e7c50]"
    >← Return to review</NuxtLink><h1 class="mt-5 text-3xl font-semibold">
      Evidence viewer
    </h1><p class="mt-2 muted">
      Evidence is available within the campaign workspace so comparisons stay in context.
    </p>
  </div>
</template>
