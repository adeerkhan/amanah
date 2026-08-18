<template>
  <div class="app">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="sidebar-brand-mark">A</span>
        <span class="sidebar-brand-text">
          <strong>AMANAH</strong>
          <small>Review Copilot</small>
        </span>
      </div>

      <div class="sidebar-section">
        <p class="sidebar-label">Workspace</p>
        <NuxtLink to="/" class="sidebar-link">
          <span>◻</span>
          Overview
        </NuxtLink>
        <NuxtLink to="/campaigns" class="sidebar-link">
          <span>☰</span>
          Review queue
          <span class="nav-badge">27</span>
        </NuxtLink>
        <NuxtLink to="/knowledge" class="sidebar-link">
          <span>◈</span>
          Policy library
        </NuxtLink>
        <NuxtLink to="/evals" class="sidebar-link">
          <span>◇</span>
          Evaluation
        </NuxtLink>
      </div>

      <div class="sidebar-footer">
        <span class="sidebar-avatar">SI</span>
        <span>
          <strong>Samira Ibrahim</strong>
          <small>Trust & Safety</small>
        </span>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <div class="topbar-left">
          <span class="topbar-dot" />
          Internal operations
          <span class="topbar-sep">/</span>
          Demo environment
        </div>
        <div class="topbar-right">
          <button class="topbar-icon" aria-label="Search">⌕</button>
          <button class="topbar-icon" aria-label="Notifications">♡</button>
          <span class="topbar-date">18 Aug 2026</span>
        </div>
      </header>
      <div class="page">
        <slot />
      </div>
    </main>
  </div>
</template>
