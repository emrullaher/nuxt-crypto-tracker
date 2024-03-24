<script lang="ts" setup>
interface Accordion {
  title: string
  description: string
}

interface AccordionProps {
  accordion: Accordion
}

const props = defineProps<AccordionProps>()

const selected = ref(false)

const toggleSelected = () => {
  selected.value = !selected.value
}
</script>

<template>
  <li class="relative border-b-2 border-gray-200">
    <button class="w-full py-4 text-left" type="button" @click="toggleSelected">
      <div class="flex items-center justify-between">
        <span class="font-medium">{{ accordion.title }}</span>
        <ChevronUpIcon v-if="selected" :size="20" />
        <ChevronDownIcon v-else :size="20" />
      </div>
    </button>

    <transition name="slide">
      <div v-if="selected" class="relative overflow-hidden transition-all duration-700" style="">
        <div class="py-2">
          <p class="text-sm text-gray-700 tracking-wide leading-relaxed">
            {{ accordion.description }}
          </p>
        </div>
      </div>
    </transition>
  </li>
</template>
