<script lang="ts" setup>
interface LandingStepProps {
  step: Record<string, any>
}

const props = defineProps<LandingStepProps>()
</script>
<template>
  <div class="max-w-[280px] xl:max-w-[363px] space-y-6 sm:space-y-3 text-center">
    <NuxtImg :src="`/img/getting-started/${step.img}`" alt="" class="max-w-[245px] mx-auto" />
    <h3 class="text-xl text-neutral-800 font-semibold">{{ step.title }}</h3>
    <p class="text-sm text-gray-700 leading-relaxed">
      {{ step.description }}
    </p>
  </div>
</template>
