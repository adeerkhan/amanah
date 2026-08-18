<template>
  <div class="app-frame">
    <aside class="sidebar">
      <div class="brand"><span class="brand-mark">A</span><span><strong>AMANAH</strong><small>Campaign review copilot</small></span></div>
      <div class="demo-chip"><i /> Demo workspace</div>
      <nav class="side-nav" aria-label="Primary navigation">
        <p class="nav-label">Workspace</p>
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="nav-item"><span class="nav-icon">{{ item.icon }}</span>{{ item.label }}<b v-if="item.count">{{ item.count }}</b></NuxtLink>
        <p class="nav-label nav-label-spaced">System</p>
        <NuxtLink to="/knowledge" class="nav-item"><span class="nav-icon">⌘</span>Policy library</NuxtLink>
        <NuxtLink to="/evals" class="nav-item"><span class="nav-icon">◌</span>Evaluation</NuxtLink>
      </nav>
      <div class="sidebar-footer"><span class="avatar">SI</span><span><strong>Samira Ibrahim</strong><small>Trust & Safety reviewer</small></span><span class="dots">···</span></div>
    </aside>
    <main class="main-frame">
      <header class="topbar"><div class="breadcrumb"><span class="live-dot" /> Internal operations <span>/</span> Demo environment</div><div class="top-actions"><button class="icon-button" aria-label="Search">⌕</button><button class="icon-button" aria-label="Notifications">♧</button><span class="top-date">18 Aug 2026</span></div></header>
      <div class="page-wrap"><slot /></div>
    </main>
  </div>
</template>
<script setup lang="ts">
const nav = [{ label: 'Overview', to: '/', icon: '↗' }, { label: 'Review queue', to: '/campaigns', icon: '≡', count: 27 }]
</script>
