<script lang="ts" setup>
const open = ref(false)
const dropdownNavbar = ref(false)

const dropdownToggler = () => {
  dropdownNavbar.value = !dropdownNavbar.value
}
</script>

<template>
  <nav id="navbar" class="relative z-10 w-full text-neutral-800">
    <div class="mx-auto flex max-w-screen-xl flex-col px-8 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex flex-col items-center space-x-4 lg:flex-row xl:space-x-8">
        <div class="flex w-full flex-row items-center justify-between py-2 md:py-6">
          <div>
            <NuxtLinkLocale to="/">
              <NuxtImg alt="Nefa Logo" class="w-24 xl:w-28" src="/img/logo/nefa.svg" />
            </NuxtLinkLocale>
          </div>
          <button class="focus:shadow-outline rounded-lg focus:outline-none lg:hidden" @click="open = !open">
            <SegmentIcon v-if="!open" :size="24" />
            <CloseIcon v-else :size="24" />
          </button>
        </div>
        <ul
          :class="[open ? 'flex' : 'hidden lg:flex']"
          class="flex h-auto w-full flex-grow origin-top flex-col space-y-3 pb-4 duration-300 lg:flex-row lg:items-center lg:justify-end lg:space-y-0 lg:pb-0 xl:space-x-2"
        >
          <NavLink :name="$t('navigation_links.assets')" class="text-nowrap" url="/coins" />
          <NavLink :name="$t('navigation_links.exchanges')" class="text-nowrap" url="/exchanges" />
          <!--          <NavLink name="Watchlist" url="#" />-->
          <!--          <NavLink name="NFT" url="#" />-->
          <!--          <NavLink name="Portfolio" url="#" />-->
          <!--          <li class="group relative">-->
          <!--            <button-->
          <!--              class="focus:shadow-outline flex items-center rounded-lg bg-transparent py-2 text-sm text-[#666666] hover:text-gray-900 focus:outline-none md:px-4"-->
          <!--              @blur="dropdownToggler"-->
          <!--              @click="dropdownToggler"-->
          <!--            >-->
          <!--              <span>Products</span>-->
          <!--              <ChevronUpIcon v-if="dropdownNavbar" :size="16" />-->
          <!--              <ChevronDownIcon v-else :size="16" />-->
          <!--            </button>-->
          <!--            <transition name="transform-fade-down">-->
          <!--              <ul-->
          <!--                v-if="dropdownNavbar"-->
          <!--                class="max-w-42 flex flex-col rounded-md py-1 pl-2 lg:absolute lg:bg-white lg:pl-0 lg:shadow-md"-->
          <!--              >-->
          <!--                <li>-->
          <!--                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Exchange</a>-->
          <!--                </li>-->
          <!--                <li>-->
          <!--                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Wallet</a>-->
          <!--                </li>-->
          <!--                <li>-->
          <!--                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Explorer</a>-->
          <!--                </li>-->
          <!--                <li>-->
          <!--                  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Charts</a>-->
          <!--                </li>-->
          <!--              </ul>-->
          <!--            </transition>-->
          <!--          </li>-->
        </ul>
      </div>
      <div :class="[open ? 'flex' : 'hidden lg:flex']" class="flex-wrap space-x-3 align-middle">
        <base-button class="text-gradient border border-[#0c66ee] bg-inherit px-8 py-3 xl:px-10">
          {{ $t('navigation_links.login') }}
        </base-button>
        <base-button class="bg-gradient-to-r from-[#468ef9] to-[#0c66ee] px-8 py-3 text-white xl:px-10">
          {{ $t('navigation_links.sign_up') }}
        </base-button>
        <language-select class="mb-auto mt-4 lg:mt-auto" />
      </div>
    </div>
  </nav>
</template>
