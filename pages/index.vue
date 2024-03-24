<script lang="ts" setup>
const $t = useI18n().t

import type { AccordionItem, Asset, StepItem } from '~/types'

const { assets, fetchAssets } = useAssets()

await fetchAssets(20)

const currencySelected = ref({
  img: 'country-icon/eng.png',
  name: 'USD',
})
const currencies = ref([
  {
    img: 'country-icon/eng.png',
    name: 'USD',
  },
])
const cryptoSelected = ref({
  img: 'crypto-icon/bitcoin.png',
  name: 'BTC',
})
const cryptocurrencies = ref([
  {
    img: 'crypto-icon/bitcoin.png',
    name: 'BTC',
  },
])

const trendings = ref<Asset[]>(assets.value.slice(0, 4))
const topGainers = ref<Asset[]>(assets.value.slice(5, 9))
const recents = ref<Asset[]>(assets.value.slice(assets.value.length - 4, assets.value.length))

const accordions = ref<AccordionItem[]>([
  {
    title: $t('sections.support.questions.1.question'),
    description: $t('sections.support.questions.1.answer'),
  },
  {
    title: $t('sections.support.questions.2.question'),
    description: $t('sections.support.questions.2.answer'),
  },
  {
    title: $t('sections.support.questions.3.question'),
    description: $t('sections.support.questions.3.answer'),
  },
  {
    title: $t('sections.support.questions.4.question'),
    description: $t('sections.support.questions.4.answer'),
  },
])

const steps = ref<StepItem[]>([
  {
    img: 'sign-up.png',
    title: $t('sections.get_started.steps.sign_up.title'),
    description: $t('sections.get_started.steps.sign_up.description'),
  },
  {
    img: 'fund.png',
    title: $t('sections.get_started.steps.fund.title'),
    description: $t('sections.get_started.steps.fund.description'),
  },
  {
    img: 'buy-crypto.png',
    title: $t('sections.get_started.steps.buy_crypto.title'),
    description: $t('sections.get_started.steps.buy_crypto.description'),
  },
])

const onScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="w-full">
    <!-- Hero section -->
    <section id="hero" class="w-full pb-24">
      <BaseSection>
        <div class="col-span-12 mt-12 space-y-4 px-6 text-center sm:space-y-6 sm:text-left lg:col-span-6 xl:mt-10">
          <span class="text-gradient text-base font-semibold uppercase" data-aos="fade-right" data-aos-once="true">
            {{ $t('sections.signup.title') }}
          </span>
          <h1
            class="text-[2.5rem] font-bold capitalize leading-tight sm:pr-8 sm:text-5xl xl:pr-10 xl:text-6xl"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <i18n-t keypath="sections.signup.description" tag="span">
              <template #fastest>
                <span class="text-header-gradient">{{ $t('sections.signup.fastest') }}</span>
              </template>
            </i18n-t>
          </h1>
          <p class="paragraph hidden sm:block" data-aos="fade-down" data-aos-delay="300" data-aos-once="true">
            {{ $t('sections.buy_sell.title') }}
          </p>
          <div
            class="mt-2 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            data-aos="fade-up"
            data-aos-delay="700"
            data-aos-once="true"
          >
            <BaseButton
              class="max-w-full border border-[#0c66ee] bg-gradient-to-r from-[#468ef9] to-[#0c66ee] px-8 py-4 text-white"
            >
              {{ $t('sections.buy_sell.cta') }}
            </BaseButton>
            <BaseButton
              class="text-gradient flex max-w-full items-center justify-center border border-[#0c66ee] bg-inherit px-6 py-4"
            >
              <span> {{ $t('sections.buy_sell.cta_link') }}</span>
              <ChevronDownIcon :size="20" class="mt-1 text-[#0c66ee]" />
            </BaseButton>
          </div>
        </div>
        <div class="col-span-12 hidden sm:block lg:col-span-6">
          <div class="w-full">
            <NuxtImg alt="" class="-mt-4" data-aos="fade-up" data-aos-once="true" src="/img/hero-image.webp" />
          </div>
        </div>
        <NuxtImg
          class="absolute bottom-12 left-4 hidden w-6 sm:block xl:bottom-16 xl:left-0"
          data-aos="fade-up"
          data-aos-delay="300"
          src="/img/pattern/ellipse-1.png"
        />
        <NuxtImg
          class="absolute right-64 top-4 hidden w-6 sm:right-96 sm:top-10 sm:block xl:right-[32rem]"
          data-aos="fade-up"
          data-aos-delay="300"
          src="/img/pattern/ellipse-2.png"
        />
        <NuxtImg
          class="absolute bottom-56 right-24 hidden w-6 sm:block"
          data-aos="fade-up"
          data-aos-delay="300"
          src="/img/pattern/ellipse-3.png"
        />
        <NuxtImg
          class="absolute right-16 top-20 hidden w-8 sm:top-28 sm:block lg:left-[30rem] lg:right-0"
          data-aos="fade-up"
          data-aos-delay="300"
          src="/img/pattern/star.png"
        />
      </BaseSection>
    </section>

    <!-- Crypto statistic section -->
    <section
      class="mx-2 max-w-screen-xl transform rounded-[2.25rem] bg-white px-4 py-6 pb-20 shadow-lg sm:mx-auto sm:rounded-xl sm:px-6 sm:py-8 sm:shadow-md lg:-translate-y-12 lg:px-0"
    >
      <div class="flex w-full flex-col items-center justify-center lg:flex-row">
        <LandingCryptoStatistic
          v-if="trendings && trendings.length"
          :datasets="trendings"
          :title="$t('sections.statistics.trending')"
          class="border-gray-200 lg:px-8 xl:border-r"
          data-aos="fade-up"
        />
        <LandingCryptoStatistic
          v-if="topGainers && topGainers.length"
          :datasets="topGainers"
          :title="$t('sections.statistics.top_gainers')"
          class="border-gray-200 lg:px-8 xl:border-r"
          data-aos="fade-up"
          data-aos-delay="150"
        />
        <LandingCryptoStatistic
          v-if="recents && recents.length"
          :datasets="recents"
          :title="$t('sections.statistics.recently_added')"
          class="lg:px-8"
          data-aos="fade-up"
          data-aos-delay="300"
        />
      </div>
    </section>

    <!-- Buy and trade section -->
    <section class="my-24 w-full">
      <BaseSection>
        <LandingBuyTradeImage class="mb-8 sm:hidden" />
        <div class="col-span-12 mt-4 space-y-6 px-4 lg:col-span-6 xl:mt-20" data-aos="fade-right">
          <h2 class="text-4xl font-semibold sm:pr-8 xl:pr-12">
            {{ $t('sections.buy_trade.title') }}
          </h2>
          <p class="paragraph">
            {{ $t('sections.buy_trade.bonus_offer') }}
          </p>
          <div class="space-y-6 lg:pr-12">
            <LandingExchange
              :exchange-selected="currencySelected"
              :exchanges="currencies"
              :title="$t('sections.buy_trade.amount')"
              default-value="5.000"
              name="amount"
              type="number"
            />
            <LandingExchange
              :exchange-selected="cryptoSelected"
              :exchanges="cryptocurrencies"
              :title="$t('sections.buy_trade.get')"
              default-value="0.10901"
              name="get"
              type="number"
            />
            <BaseButton class="bg-blue-gradient w-full px-5 py-4 text-base font-medium text-white">
              {{ $t('sections.buy_trade.cta') }}
            </BaseButton>
          </div>
        </div>
        <LandingBuyTradeImage class="hidden sm:block" data-aos="fade-left" />
      </BaseSection>
    </section>

    <!-- Partners section -->
    <section class="bg-partner relative my-24 max-w-full overflow-hidden shadow sm:mx-6 sm:rounded-2xl">
      <div class="flex w-full flex-col items-center justify-center space-y-4 px-6 py-16 text-center sm:px-0">
        <h3 class="text-2xl font-semibold text-neutral-800" data-aos="flip-down">
          {{ $t('sections.partners.title') }}
        </h3>
        <p class="paragraph" data-aos="flip-down">
          {{ $t('sections.partners.description') }}
        </p>
        <div class="flex flex-wrap items-center justify-center" data-aos="fade-up">
          <LandingPartnerImage
            v-for="img in ['clever.png', 'diamon-cutts.png', 'swiss-finance.png', 'gambio.png']"
            :key="img"
            :img="img"
          />
        </div>
      </div>
    </section>

    <!-- Credit card section -->
    <section class="my-36 w-full">
      <BaseSection data-aos="fade-down">
        <div class="col-span-12 lg:col-span-7">
          <div class="w-full">
            <NuxtImg alt="" class="w-[95%]" src="/img/nefa-cc.webp" />
          </div>
        </div>
        <div class="col-span-12 mt-20 space-y-6 px-4 sm:px-6 lg:col-span-5">
          <h2 class="text-4xl font-semibold">
            <i18n-t keypath="sections.credit_card.title" tag="span">
              <template #NEFA>
                <span class="text-header-gradient">NEFA</span>
              </template>
            </i18n-t>
          </h2>
          <p class="paragraph">
            {{ $t('sections.credit_card.description') }}
          </p>
          <ul class="space-y-4 sm:space-y-2">
            <LandingListItem :title="$t('sections.credit_card.perks.purchases')" />
            <LandingListItem :title="$t('sections.credit_card.perks.earn_rewards')" />
            <LandingListItem :title="$t('sections.credit_card.perks.annual_fee')" />
          </ul>
          <BaseButton
            class="text-gradient w-full border border-[#0c66ee] bg-inherit px-10 py-4 text-base sm:max-w-[240px]"
          >
            {{ $t('sections.credit_card.cta') }}
          </BaseButton>
        </div>
      </BaseSection>
    </section>

    <!-- Advanced trading tools section -->
    <section class="bg-trading-tools relative my-20 max-w-full overflow-hidden rounded-2xl py-16 shadow sm:mx-4">
      <div class="relative mx-auto grid max-w-screen-xl grid-cols-12 gap-x-6 px-4 sm:px-2">
        <LandingTradingToolImage class="sm:hidden" />
        <div class="col-span-12 mt-8 space-y-8 px-4 sm:space-y-6 sm:px-6 lg:col-span-6" data-aos="fade-right">
          <h2 class="text-4xl font-semibold">
            <i18n-t keypath="sections.trading_tools.title" tag="span">
              <template #tools>
                <span class="text-header-gradient">{{ $t('sections.trading_tools.tools') }}</span>
              </template>
            </i18n-t>
          </h2>
          <div class="space-y-2">
            <h4 class="text-lg font-medium">
              {{ $t('sections.trading_tools.features.professional_access.title') }}
            </h4>
            <p class="paragraph text-sm xl:text-base">
              {{ $t('sections.trading_tools.features.professional_access.description') }}
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="text-lg font-medium">
              {{ $t('sections.trading_tools.features.api.title') }}
            </h4>
            <p class="paragraph text-sm xl:text-base">
              {{ $t('sections.trading_tools.features.api.description') }}
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="text-lg font-medium">
              {{ $t('sections.trading_tools.features.support.title') }}
            </h4>
            <p class="paragraph text-sm xl:text-base">
              {{ $t('sections.trading_tools.features.support.description') }}
            </p>
          </div>
          <div class="flex flex-col sm:flex-row">
            <BaseButton class="text-gradient border border-[#4A8FF6] bg-inherit px-10 py-4 text-base">
              {{ $t('sections.trading_tools.cta') }}
            </BaseButton>
            <BaseButton class="rounded-full bg-inherit px-10 py-4 text-center text-[#4A8FF6] underline">
              {{ $t('sections.trading_tools.learn_more') }}
            </BaseButton>
          </div>
        </div>
        <LandingTradingToolImage class="hidden sm:block" data-aos="fade-left" />
      </div>
    </section>

    <!-- Industry-leading security section -->
    <section class="my-24 w-full">
      <div class="relative mx-auto grid max-w-screen-xl grid-cols-12 gap-x-6 px-8">
        <div class="col-span-12 lg:col-span-6" data-aos="fade-right">
          <div class="w-full">
            <NuxtImg alt="" class="w-full" src="/img/industry-leading-security.webp" />
          </div>
        </div>
        <div class="col-span-12 mt-8 space-y-8 sm:space-y-6 lg:col-span-5 xl:px-8" data-aos="fade-up">
          <h2 class="text-4xl font-semibold">
            {{ $t('sections.security.title') }}
          </h2>
          <ul class="space-y-8 sm:space-y-4">
            <LandingListItem :title="$t('sections.security.safety.title')">
              <p class="text-sm leading-relaxed text-gray-700">
                {{ $t('sections.security.safety.description') }}
              </p>
            </LandingListItem>
            <LandingListItem :title="$t('sections.security.keys.title')">
              <p class="text-sm leading-relaxed text-gray-700">
                {{ $t('sections.security.keys.description') }}
              </p>
            </LandingListItem>
            <LandingListItem :title="$t('sections.security.certifications.title')">
              <p class="text-sm leading-relaxed text-gray-700">
                {{ $t('sections.security.certifications.description') }}
              </p>
            </LandingListItem>
          </ul>
        </div>
      </div>
    </section>

    <!-- Getting started section -->
    <section class="bg-trading-tools relative my-24 max-w-full overflow-hidden shadow sm:mx-4 sm:rounded-2xl xl:mx-10">
      <div class="flex w-full flex-col items-center py-16">
        <h2 class="text-center text-3xl font-semibold sm:text-4xl" data-aos="flip-down">
          {{ $t('sections.get_started.title') }}
        </h2>
        <div
          class="relative mt-16 flex w-full flex-col items-center justify-between space-y-12 px-4 sm:mt-8 lg:flex-row lg:space-y-0 xl:px-10"
          data-aos="fade-up"
        >
          <LandingStep v-for="step in steps" :key="step.title" :step="step" />
          <NuxtImg
            alt=""
            class="absolute left-64 top-32 hidden w-24 lg:inline-block xl:left-[22rem] xl:w-[9.5rem]"
            src="/img/getting-started/arrow.png"
          />
          <NuxtImg
            alt=""
            class="absolute right-64 top-32 hidden w-24 lg:inline-block xl:right-[22rem] xl:w-[9.5rem]"
            src="/img/getting-started/arrow.png"
          />
        </div>
      </div>
    </section>

    <!-- FAQ section -->
    <section class="my-24 w-full">
      <BaseSection>
        <div class="col-span-12 lg:col-span-6" data-aos="fade-right" data-aos-delay="150">
          <div class="w-full">
            <NuxtImg alt="" class="w-full" src="/img/faq.webp" />
          </div>
        </div>
        <div class="col-span-12 mt-8 px-4 sm:px-6 lg:col-span-6" data-aos="fade-left" data-aos-delay="150">
          <span class="text-gradient mb-4 text-base font-semibold uppercase sm:mb-2">
            {{ $t('sections.support.title') }}
          </span>
          <h2 class="mb-10 text-3xl font-semibold sm:mb-6 sm:text-4xl">
            {{ $t('sections.support.faq') }}
          </h2>

          <ul class="shadow-box">
            <BaseAccordion v-for="(accordion, index) in accordions" :key="index" :accordion="accordion" />
          </ul>
        </div>
      </BaseSection>
    </section>

    <div class="my-10 flex w-full justify-center">
      <button
        class="flex items-center space-x-2 rounded-md border border-[#DDDDDD] bg-[#FAFAFA] px-6 py-3 text-gray-700 hover:bg-gray-100 hover:shadow-md"
        data-aos="flip-down"
        data-aos-delay="150"
        @click="onScrollTop"
      >
        <span>{{ $t('back_to_top') }}</span>
        <ArrowUpIcon :size="20" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.text-header-gradient {
  background: rgb(57, 132, 244);
  background: linear-gradient(169.4deg, #3984f4 -6.01%, #0cd3ff 36.87%, #2f7cf0 78.04%, #0e65e8 103.77%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bg-partner {
  background: url('../img/partner/background.png');
  background-size: cover;
  background-position: center;
}

.bg-trading-tools {
  background: url('../img/bg-trading-tools.webp');
  background-size: cover;
  background-position: center;
}

.max-h-0 {
  max-height: 0;
}
</style>
