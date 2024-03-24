<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLocale = computed(() => locales.value.find((l) => l.code === locale.value))

const isOpen = ref(false)
</script>

<template>
  <div class="relative my-auto">
    <button
      class="flex items-center justify-center rounded bg-white px-3 py-3 text-gray-500 shadow-lg focus:outline-none"
      @click="isOpen = !isOpen"
    >
      <span :class="'fi-' + currentLocale.flag" class="fi w-6"></span>
      <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12.586l-4.293-4.293-1.414 1.414L10 15.414l5.707-5.707-1.414-1.414z" fill-rule="evenodd"></path>
      </svg>
    </button>
    <div
      v-if="isOpen"
      class="absolute right-0 top-0 z-30 mt-12 min-w-full rounded bg-white text-sm text-gray-700 shadow-md"
    >
      <span class="absolute right-0 top-0 -mt-1 mr-3 h-3 w-3 rotate-45 transform bg-white"></span>
      <div class="relative z-10 overflow-auto rounded bg-white">
        <ul class="list-reset py-1">
          <template v-for="(locale, i) in locales" :key="i">
            <li>
              <button
                class="flex w-full px-4 py-2 no-underline transition-colors duration-100 hover:bg-gray-100 hover:no-underline"
                @click="
                  () => {
                    setLocale(locale.code)
                    switchLocalePath(locale.code)
                    isOpen = false
                  }
                "
              >
                <span :class="'fi-' + locale.flag" class="fi mr-2 inline-block"></span>
                <span class="inline-block"> {{ locale.name }} </span>
                <template v-if="locale.name === currentLocale.name">
                  <span class="m-auto pl-2">
                    <svg
                      class="fill-teal-950"
                      height="12"
                      viewBox="0 0 50 50"
                      width="12"
                      x="0px"
                      xmlns="http://www.w3.org/2000/svg"
                      y="0px"
                    >
                      <path
                        d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"
                      ></path>
                    </svg>
                  </span>
                </template>
              </button>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
