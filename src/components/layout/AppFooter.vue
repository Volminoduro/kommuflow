<template>
  <footer :class="[COLOR_CLASSES.footerBg]">
    <div :class="['border-t-3 mb-1', COLOR_CLASSES.borderPrimary]"></div>
    <div class="px-8 py-3">
      <div :class="['flex justify-between items-center text-xs', COLOR_CLASSES.footerText]">
        <p>{{ $t('divers.footer_title') }}</p>
        <p>{{ $t('divers.footer_steles_update') }} xx.xx.xxxx</p>
        <p>{{ $t('divers.footer_disclaimer') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { COLOR_CLASSES } from '@/constants/colors'
</script>
