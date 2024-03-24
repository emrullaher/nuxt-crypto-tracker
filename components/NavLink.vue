<script lang="ts" setup>
interface LinkProps {
  name: string
  url: string
}

const props = defineProps<LinkProps>()
</script>

<template>
  <li class="w-full">
    <NuxtLinkLocale
      :to="url"
      class="focus:shadow-outline inline-block rounded-lg bg-transparent py-2 text-sm text-[#666666] hover:text-gray-900 focus:outline-none md:px-4"
    >
      {{ name }}
    </NuxtLinkLocale>
  </li>
</template>
