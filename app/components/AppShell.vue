<template>
  <div class="min-h-screen lg:flex">
    <aside class="w-full border-b border-[#dfe6df] bg-[#17211b] px-5 py-5 text-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:px-6">
      <div class="flex items-center justify-between lg:block">
        <NuxtLink
          to="/"
          class="flex items-center gap-3"
        ><span class="grid size-9 place-items-center rounded-xl bg-[#b6e4c5] font-bold text-[#17211b]">A</span><span><strong class="block tracking-[.2em]">AMANAH</strong><small class="text-[#a4b5a9]">Review Copilot</small></span></NuxtLink>
        <span class="rounded-full border border-[#56705d] px-2 py-1 text-[10px] uppercase tracking-wider text-[#b6e4c5] lg:mt-8 lg:inline-block">Demo environment</span>
      </div>
      <nav class="mt-6 flex gap-2 overflow-auto lg:mt-10 lg:block lg:space-y-2">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-[#b8c8bc] hover:bg-[#29382d] hover:text-white"
        >{{ item.label }}</NuxtLink>
      </nav>
      <div class="mt-8 hidden rounded-xl border border-[#3b5141] p-4 text-xs text-[#b8c8bc] lg:block">
        <strong class="text-white">Human-led decisions</strong><p class="mt-2 leading-5">
          AI surfaces evidence and recommends next steps. Reviewers retain authority.
        </p>
      </div>
    </aside>
    <main class="min-w-0 flex-1">
      <header class="flex items-center justify-between border-b border-[#dfe6df] bg-white px-5 py-4 lg:px-10">
        <div>
          <span class="eyebrow">Trust & Safety Operations</span><p class="mt-1 text-sm font-medium">
            AI-assisted review for human-led decisions
          </p>
        </div><div class="flex items-center gap-3 text-sm">
          <span class="hidden text-[#718078] sm:inline">Reviewer: Samira Ibrahim</span><span class="size-8 rounded-full bg-[#d9eee0] text-center leading-8 font-semibold">SI</span>
        </div>
      </header><div class="px-5 py-8 lg:px-10">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const nav = [{ label: 'Overview', to: '/' }, { label: 'Campaign queue', to: '/campaigns' }, { label: 'Policy knowledge', to: '/knowledge' }, { label: 'Evaluation', to: '/evals' }]
</script>
