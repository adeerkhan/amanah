<script setup lang="ts">
import { policies } from '~/data/policies'

const query = ref('')
const visible = computed(() => policies.filter(policy => !query.value || `${policy.title} ${policy.summary} ${policy.keywords.join(' ')}`.toLowerCase().includes(query.value.toLowerCase())))
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <p class="eyebrow">
      Internal knowledge base
    </p><h1 class="mt-2 text-3xl font-semibold">
      Policy library
    </h1><p class="mt-2 max-w-2xl muted">
      Concise fictionalized operating guidance used to ground recommendations. This is demo policy, not private LaunchGood documentation.
    </p><input
      v-model="query"
      class="panel mt-8 w-full px-4 py-3 text-sm outline-none"
      placeholder="Search policies"
    ><div class="mt-5 grid gap-4 md:grid-cols-2">
      <article
        v-for="policy in visible"
        :key="policy.id"
        class="panel p-5"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <h2 class="font-semibold">
              {{ policy.title }}
            </h2><p class="mt-1 text-xs font-semibold text-[#1e7c50]">
              {{ policy.section }}
            </p>
          </div><span class="rounded-lg bg-[#eef6ef] px-2 py-1 text-xs text-[#1e7c50]">{{ policy.keywords.length }} topics</span>
        </div><p class="mt-4 text-sm leading-6 muted">
          {{ policy.summary }}
        </p><ul class="mt-4 space-y-2 text-sm">
          <li
            v-for="item in policy.guidance"
            :key="item"
            class="flex gap-2"
          >
            <span class="text-[#1e7c50]">✓</span><span>{{ item }}</span>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>
