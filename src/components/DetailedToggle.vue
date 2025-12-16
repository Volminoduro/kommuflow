<template>
  <button
    @click="toggle"
    class="px-3 py-1 rounded-md border transition-colors flex items-center gap-2"
    :class="buttonClasses"
  >
    <span v-if="detailed" class="text-sm font-medium">{{ $t('divers.display_detailed') }}</span>
    <span v-else class="text-sm font-medium">{{ $t('divers.display_simple') }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

const detailed = useLocalStorage('kommuflow_detailed_view', false)

function toggle() {
  detailed.value = !detailed.value
}

const buttonClasses = computed(() => {
  return detailed.value
    ? 'bg-white/10 border-white/20 text-white'
    : 'bg-transparent border-white/10 text-white/70'
})
</script>

<style scoped>
.text-white-70 { color: rgba(255,255,255,0.7); }
</style>
