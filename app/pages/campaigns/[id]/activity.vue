<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <NuxtLink
      :to="`/campaigns/${route.params.id}`"
      class="font-semibold text-[#1e7c50]"
    >← Return to review</NuxtLink><h1 class="mt-5 text-3xl font-semibold">
      Review activity
    </h1><div class="panel mt-8 max-w-2xl divide-y divide-[#e7ece7]">
      <div
        v-for="event in ['Campaign added to review queue', 'Documents indexed for comparison', 'Structured profile available', 'Policy retrieval ready']"
        :key="event"
        class="flex gap-4 p-5 text-sm"
      >
        <span class="mt-1 size-2 rounded-full bg-[#1e7c50]" /><div>
          <strong>{{ event }}</strong><p class="mt-1 muted">
            18 Aug 2026 · Demo environment
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
