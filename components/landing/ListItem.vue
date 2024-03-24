<script lang="ts" setup>
interface LandingListItemProps {
  title: string
}

const props = defineProps<LandingListItemProps>()
</script>

<template>
  <li class="space-y-2">
    <div class="flex items-center space-x-2">
      <CheckCircleIcon :size="20" class="text-[#0c66ee]" />
      <span>{{ title }}</span>
    </div>
    <slot></slot>
  </li>
</template>
