<script setup lang="ts">
import type { AppError } from '~/composables/useErrorHandler'

defineProps<{ errors: AppError[] }>()
const emit = defineEmits<{ dismiss: [id: string] }>()
</script>

<template>
  <div v-if="errors.length" style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px">
    <div
      v-for="error in errors"
      :key="error.id"
      style="display:flex;gap:10px;padding:10px 14px;border-radius:var(--radius-md);font-size:12px;border:1px solid"
      :style="{
        background: error.type === 'conflicting_evidence' ? 'var(--c-warning-light)' : 'var(--c-danger-light)',
        borderColor: error.type === 'conflicting_evidence' ? 'var(--c-warning)' : 'var(--c-danger)',
        color: error.type === 'conflicting_evidence' ? 'var(--c-warning-dark)' : 'var(--c-danger-dark)'
      }"
    >
      <span style="flex-shrink:0;font-size:14px">{{ error.type === 'conflicting_evidence' ? '⚠' : '✕' }}</span>
      <div style="flex:1">
        <strong style="display:block;margin-bottom:2px">{{ error.title }}</strong>
        <p style="margin:0 0 4px;opacity:.8">{{ error.message }}</p>
        <small style="opacity:.7">{{ error.recovery }}</small>
      </div>
      <button style="background:none;border:none;color:inherit;cursor:pointer;font-size:14px;padding:0" @click="emit('dismiss', error.id)">✕</button>
    </div>
  </div>
</template>
