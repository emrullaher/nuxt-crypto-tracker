<template>
  <footer class="mx-auto max-w-screen-xl px-8">
    <div class="w-full border-y border-[#DDDDDD]">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <div
          class="flex w-full flex-col border-[#DDDDDD] py-6 sm:w-1/2 sm:flex-row sm:space-x-10 sm:border-r-0 sm:px-6 sm:py-12 md:w-full lg:w-full xl:w-fit"
        >
          <div class="mb-6 sm:mb-0 sm:hidden xl:block">
            <a class="block" href="#">
              <NuxtImg alt="Nefa Logo" class="-mt-2 w-24 min-w-[6rem]" src="/img/logo/nefa.svg" />
            </a>
          </div>
          <ul class="space-y-4">
            <NavLink :name="$t('navigation_links.cryptocurrency')" url="#" />
            <NavLink :name="$t('navigation_links.exchanges')" url="#" />
            <NavLink :name="$t('navigation_links.watchlist')" url="#" />
            <NavLink :name="$t('navigation_links.portfolio')" url="#" />
            <NavLink :name="$t('navigation_links.nft')" url="#" />
          </ul>
        </div>
        <div
          class="w-full border-t border-[#DDDDDD] py-6 sm:w-1/2 sm:border-t sm:px-16 sm:py-12 md:w-full lg:w-full lg:border-r xl:w-fit xl:border-r"
        >
          <ul class="space-y-4">
            <NavLink :name="$t('navigation_links.products')" url="#" />
            <NavLink :name="$t('navigation_links.about_us')" url="#" />
            <NavLink :name="$t('navigation_links.careers')" url="#" />
            <NavLink :name="$t('navigation_links.blog')" url="#" />
            <NavLink :name="$t('navigation_links.security')" url="#" />
          </ul>
        </div>
        <div
          class="w-full border-t border-[#DDDDDD] py-6 sm:w-1/2 sm:border-r-0 sm:border-t-0 sm:px-16 sm:py-12 md:w-full md:border-t lg:w-full xl:w-fit"
        >
          <ul class="space-y-4">
            <NavLink :name="$t('navigation_links.help_center')" url="#" />
            <NavLink :name="$t('navigation_links.contact_us')" url="#" />
            <NavLink :name="$t('navigation_links.system_status')" url="#" />
            <NavLink :name="$t('navigation_links.area_of_availability')" url="#" />
            <NavLink :name="$t('navigation_links.privacy_policy')" url="#" />
          </ul>
        </div>
        <div
          class="w-full space-y-4 border-[#DDDDDD] py-6 sm:w-1/2 sm:border-t sm:px-10 sm:py-12 md:w-full md:border-t lg:w-full xl:w-[22rem]"
        >
          <h5 class="focus:shadow-outline text-sm font-medium text-[#666666] focus:outline-none">Newsletter</h5>
          <p class="focus:shadow-outline text-sm text-[#666666] focus:outline-none">
            <i18n-t keypath="footer_information.mobile_notification">
              <template #br>
                <span><br class="sm:hidden" /></span>
              </template>
            </i18n-t>
          </p>
          <div class="flex items-center space-x-2">
            <input
              class="w-full rounded-lg border border-[#AAAAAA] px-2 py-4 text-sm placeholder-[#888] focus:outline-none sm:rounded-md sm:py-3"
              placeholder="Enter your email"
              type="text"
            />
            <button
              class="bg-blue-gradient rounded-md px-4 py-4 text-white transition duration-300 hover:shadow-md sm:py-3"
            >
              <ArrowRightIcon :size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="py-8 text-center text-sm text-[#666666] hover:text-gray-900 sm:py-4">
      <i18n-t keypath="footer_information.copyright">
        <template #date>{{ new Date().getFullYear() }}</template>
      </i18n-t>
    </div>
  </footer>
</template>
<script lang="ts" setup></script>
