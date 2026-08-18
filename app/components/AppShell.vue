<template>
  <div class="app">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="sidebar-brand-mark">
          <Icon name="lucide:shield-check" :size="18" />
        </span>
        <span class="sidebar-brand-text">
          <strong>AMANAH</strong>
          <small>Review Copilot</small>
        </span>
      </div>

      <div class="sidebar-section">
        <p class="sidebar-label">Workspace</p>
        <NuxtLink to="/" class="sidebar-link">
          <Icon name="lucide:layout-dashboard" :size="16" />
          Overview
        </NuxtLink>
        <NuxtLink to="/campaigns" class="sidebar-link">
          <Icon name="lucide:clipboard-list" :size="16" />
          Review queue
          <span class="nav-badge">27</span>
        </NuxtLink>
        <NuxtLink to="/portfolio" class="sidebar-link">
          <Icon name="lucide:radar" :size="16" />
          Portfolio radar
        </NuxtLink>
        <NuxtLink to="/knowledge" class="sidebar-link">
          <Icon name="lucide:book-open" :size="16" />
          Policy library
        </NuxtLink>
        <NuxtLink to="/evals" class="sidebar-link">
          <Icon name="lucide:bar-chart-3" :size="16" />
          Evaluation
        </NuxtLink>
      </div>

      <div class="sidebar-section" style="margin-top:auto">
        <NuxtLink to="/campaigns/urgent-medical" class="sidebar-link" style="color:var(--c-accent-light)">
          <Icon name="lucide:alert-triangle" :size="16" />
          High-risk demo
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
          <button class="topbar-icon" aria-label="Search">
            <Icon name="lucide:search" :size="15" />
          </button>
          <button class="topbar-icon" aria-label="Notifications">
            <Icon name="lucide:bell" :size="15" />
          </button>
          <span class="topbar-date">18 Aug 2026</span>
        </div>
      </header>
      <div class="page">
        <slot />
      </div>
    </main>

    <div class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast-${toast.type}`"
        @click="dismiss(toast.id)"
      >
        <Icon
          :name="toast.type === 'success' ? 'lucide:check-circle' : toast.type === 'error' ? 'lucide:x-circle' : toast.type === 'warning' ? 'lucide:alert-triangle' : 'lucide:info'"
          :size="14"
        />
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { toasts, dismiss } = useAppToast()
</script>
