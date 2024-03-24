<script lang="ts" setup>
interface PartnerImageProps {
  img: string
}

const props = defineProps<PartnerImageProps>()
</script>
<template>
  <div>
    <NuxtImg :src="`/img/partner/${img}`" alt="" class="sm:w-1/2 lg:w-72 mx-auto" />
  </div>
</template>
