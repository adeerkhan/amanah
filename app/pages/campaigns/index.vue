<script setup lang="ts">
import { campaigns } from '~/data/campaigns'

const search = ref('')
const risk = ref('all')
const status = ref('all')
const filtered = computed(() => campaigns.filter(c => (!search.value || `${c.title} ${c.creator}`.toLowerCase().includes(search.value.toLowerCase())) && (risk.value === 'all' || c.risk === risk.value) && (status.value === 'all' || c.status === status.value)))
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <p class="eyebrow">
      Operations
    </p><div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">
          Campaign queue
        </h1><p class="mt-2 muted">
          Search and triage fictional demo campaigns.
        </p>
      </div><span class="pill bg-[#e6f7ed] text-[#16734a]">{{ filtered.length }} visible</span>
    </div><div class="panel mt-8 flex flex-col gap-3 p-4 md:flex-row">
      <input
        v-model="search"
        aria-label="Search campaigns"
        placeholder="Search title or creator"
        class="rounded-lg border border-[#dfe6df] px-3 py-2 text-sm outline-none focus:border-[#1e7c50] md:w-80"
      ><select
        v-model="risk"
        aria-label="Filter risk"
        class="rounded-lg border border-[#dfe6df] px-3 py-2 text-sm"
      >
        <option value="all">
          All risk levels
        </option><option value="low">
          Low risk
        </option><option value="medium">
          Medium risk
        </option><option value="high">
          High risk
        </option>
      </select><select
        v-model="status"
        aria-label="Filter status"
        class="rounded-lg border border-[#dfe6df] px-3 py-2 text-sm"
      >
        <option value="all">
          All statuses
        </option><option value="pending">
          Pending
        </option><option value="in_review">
          In review
        </option><option value="needs_information">
          Needs information
        </option>
      </select>
    </div><div class="panel mt-4 overflow-x-auto">
      <table class="w-full min-w-[800px] text-left text-sm">
        <thead class="border-b border-[#e7ece7] bg-[#fafcf9] text-xs uppercase tracking-wider muted">
          <tr>
            <th class="px-5 py-4">
              Campaign
            </th><th>Creator</th><th>Category</th><th>Goal</th><th>Risk</th><th>Status</th><th>Age</th>
          </tr>
        </thead><tbody class="divide-y divide-[#e7ece7]">
          <tr
            v-for="campaign in filtered"
            :key="campaign.id"
            class="hover:bg-[#fafcf9]"
          >
            <td class="px-5 py-4">
              <NuxtLink
                :to="`/campaigns/${campaign.id}`"
                class="font-semibold text-[#1e7c50]"
              >{{ campaign.title }}</NuxtLink>
            </td><td>{{ campaign.creator }}</td><td>{{ campaign.category }}</td><td>${{ campaign.goal.toLocaleString() }}</td><td>
              <span
                class="pill"
                :class="`risk-${campaign.risk}`"
              >{{ campaign.risk }}</span>
            </td><td class="capitalize">
              {{ campaign.status.replace('_', ' ') }}
            </td><td class="muted">
              {{ campaign.age }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
