<script setup lang="ts">
import { campaigns } from '~/data/campaigns'

const stats = [{ label: 'Pending reviews', value: '27', tone: 'text-[#1e7c50]' }, { label: 'High risk', value: '4', tone: 'text-[#b04437]' }, { label: 'Needs information', value: '9', tone: 'text-[#9a6410]' }, { label: 'Completed today', value: '18', tone: 'text-[#1e7c50]' }, { label: 'Median review time', value: '11m', tone: 'text-[#17211b]' }]
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p class="eyebrow">
          Tuesday, 18 August 2026
        </p><h1 class="mt-2 text-3xl font-semibold tracking-tight">
          Review queue
        </h1><p class="mt-2 muted">
          A clear view of the cases that need human attention.
        </p>
      </div><NuxtLink
        to="/campaigns/urgent-medical"
        class="rounded-lg bg-[#1e7c50] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#17623f]"
      >Open high-risk demo</NuxtLink>
    </div><div class="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="panel p-5"
      >
        <p class="text-sm muted">
          {{ stat.label }}
        </p><p
          class="mt-3 text-3xl font-semibold"
          :class="stat.tone"
        >
          {{ stat.value }}
        </p>
      </div>
    </div><div class="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]">
      <section class="panel overflow-hidden">
        <div class="flex items-center justify-between border-b border-[#e7ece7] px-5 py-4">
          <div>
            <h2 class="font-semibold">
              Priority review queue
            </h2><p class="mt-1 text-sm muted">
              Sorted by evidence severity and missing information
            </p>
          </div><NuxtLink
            to="/campaigns"
            class="text-sm font-semibold text-[#1e7c50]"
          >View all</NuxtLink>
        </div><div class="divide-y divide-[#e7ece7]">
          <NuxtLink
            v-for="campaign in campaigns"
            :key="campaign.id"
            :to="`/campaigns/${campaign.id}`"
            class="grid gap-3 px-5 py-4 hover:bg-[#fafcf9] md:grid-cols-[1.6fr_1fr_100px_120px] md:items-center"
          ><div><p class="font-medium">{{ campaign.title }}</p><p class="mt-1 text-xs muted">{{ campaign.creator }} · {{ campaign.category }}</p></div><p class="text-sm">${{ campaign.goal.toLocaleString() }}</p><span
            class="pill w-fit"
            :class="`risk-${campaign.risk}`"
          >{{ campaign.risk }} risk</span><p class="text-sm muted">{{ campaign.age }} old</p></NuxtLink>
        </div>
      </section><aside class="panel p-5">
        <p class="eyebrow">
          Portfolio signal
        </p><h2 class="mt-3 text-lg font-semibold">
          Documentation gaps are driving today’s queue
        </h2><p class="mt-3 text-sm leading-6 muted">
          9 campaigns are waiting on evidence. Amanah groups missing documents and source conflicts so reviewers can work the highest-impact cases first.
        </p><div class="mt-5 space-y-3 text-sm">
          <div class="flex justify-between">
            <span>Missing documentation</span><strong>9</strong>
          </div><div class="flex justify-between">
            <span>Beneficiary inconsistencies</span><strong>3</strong>
          </div><div class="flex justify-between">
            <span>Senior review suggested</span><strong>2</strong>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
