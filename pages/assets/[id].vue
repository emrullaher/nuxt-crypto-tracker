<script lang="ts" setup>
defineI18nRoute({
  paths: {
    en: '/assets/:id',
    tr: '/kripto-varliklar/:id',
    de: '/assets/:id',
  },
})

import type { Interval } from '~/types'

const route = useRoute()
const id = computed(() => route.params.id as string)

const limit = ref(20)

const { asset, histories, markets, fetchAsset, fetchAssetMarkets, fetchAssetHistory } = useAssets()

await fetchAsset(id.value)
await fetchAssetMarkets(id.value)

await fetchAssetHistory(id.value, 'm15')

const intervals: Interval[] = ['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1']
const interval = ref('d1')

const loadMore = () => {
  if (limit.value >= 2000) return
  limit.value += 20
  fetchAssetMarkets(id.value, limit.value)
}

const high = computed(() => {
  if (!histories.value.length) return 0
  return histories.value.reduce((acc, curr) => (acc.priceUsd > curr.priceUsd ? acc : curr)).priceUsd
})

const low = computed(() => {
  if (!histories.value.length) return 0
  return histories.value.reduce((acc, curr) => (acc.priceUsd < curr.priceUsd ? acc : curr)).priceUsd
})

const average = computed(() => {
  return parseInt(high.value + low.value) / 2
})

const change = computed(() => {
  if (!histories.value.length) return 0
  return (
    (histories.value[histories.value.length - 1].priceUsd - histories.value[0].priceUsd) / histories.value[0].priceUsd
  )
})

const chartData = computed(() => {
  return [
    {
      name: asset.value.symbol,
      data: histories.value.map((history) => history.priceUsd),
      categories: histories.value.map((history) => new Date(history.date).toLocaleDateString('en-US')),
    },
  ]
})

const handleInterval = (value: Interval) => {
  interval.value = value
  fetchAssetHistory(id.value, value)
}

useHead({
  title: `${asset.value.name} (${asset.value.symbol})`,
  meta: [{ name: 'description', content: `${asset.value.name} (${asset.value.symbol}) Page` }],
})
</script>

<template>
  <div class="mb-10">
    <section class="container mx-auto max-w-screen-xl">
      <div class="relative mx-auto grid max-w-screen-xl grid-cols-12 gap-x-6 py-2">
        <div class="col-span-12 lg:col-span-4" data-aos="flip-left" data-once="true">
          <div class="h-full w-full transform bg-white p-3 shadow-lg sm:shadow-md lg:rounded-xl lg:p-8">
            <div class="mb-10 flex items-center">
              <div class="flex">
                <div>
                  <NuxtImg
                    :src="`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
                    alt=""
                    height="50"
                    width="50"
                  />
                </div>
                <div class="ml-2">
                  <h6 class="mb-1 font-bold">{{ asset.name }} ({{ asset.symbol }})</h6>
                  <p class="font-medium text-slate-500">
                    {{
                      Intl.NumberFormat('en', {
                        style: 'currency',
                        currency: 'USD',
                        maximumSignificantDigits: 7,
                      }).format(asset.priceUsd)
                    }}
                    <span
                      :class="{
                        'text-green-600': asset.changePercent24Hr > 0,
                        'text-red-600': asset.changePercent24Hr < 0,
                      }"
                    >
                      {{
                        Intl.NumberFormat('en', {
                          style: 'percent',
                          maximumSignificantDigits: 3,
                        }).format(asset.changePercent24Hr / 100)
                      }}
                      <svg
                        v-if="asset.changePercent24Hr > 0"
                        class="inline-block h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 15l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                      <svg
                        v-else
                        class="inline-block h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
              <div class="quiz-medal ml-auto" data-aos="flip-right" data-aos-delay="300" data-aos-once="true">
                <div class="quiz-medal__circle quiz-medal__circle--gold">
                  <span> {{ asset.rank }} </span>
                </div>
                <div class="quiz-medal__ribbon quiz-medal__ribbon--left"></div>
                <div class="quiz-medal__ribbon quiz-medal__ribbon--right"></div>
              </div>
            </div>
            <div class="grid grid-cols-12 gap-5" data-aos="fade-up" data-aos-delay="700" data-aos-once="true">
              <div class="col-span-6">
                <p class="mb-1 font-medium text-[#1e293b]">
                  {{ $t('headers.market_cap') }}
                </p>
                <h6 class="text-sm">
                  {{
                    Intl.NumberFormat('en', {
                      notation: 'compact',
                      style: 'currency',
                      currency: 'USD',
                      maximumSignificantDigits: 3,
                    }).format(asset.marketCapUsd)
                  }}
                </h6>
              </div>
              <div class="col-span-6">
                <p class="mb-1 font-medium text-[#1e293b]">
                  {{ $t('headers.volume') }}
                </p>
                <h6 class="text-sm">
                  {{
                    Intl.NumberFormat('en', {
                      notation: 'compact',
                      style: 'currency',
                      currency: 'USD',
                      maximumSignificantDigits: 3,
                    }).format(asset.volumeUsd24Hr)
                  }}
                </h6>
              </div>
              <div class="col-span-6">
                <p class="mb-1 font-medium text-[#1e293b]">
                  {{ $t('headers.supply') }}
                </p>
                <h6 class="text-sm">
                  {{
                    Intl.NumberFormat('en', {
                      notation: 'compact',
                      maximumSignificantDigits: 4,
                    }).format(asset.supply)
                  }}
                  {{ asset.symbol }}
                </h6>
              </div>
              <div class="col-span-6">
                <p class="mb-1 font-medium text-[#1e293b]">
                  {{ $t('headers.vwap') }}
                </p>
                <h6 class="text-sm">
                  {{
                    Intl.NumberFormat('en', {
                      style: 'currency',
                      currency: 'USD',
                      maximumSignificantDigits: 7,
                    }).format(asset.vwap24Hr)
                  }}
                </h6>
              </div>
              <div class="col-span-12">
                <hr class="my-2 border-t border-gray-200" />
              </div>
              <div class="col-span-6">
                <p class="mb-1 font-medium text-[#1e293b]">
                  {{ $t('headers.high') }}
                </p>
                <h6 class="text-sm">
                  {{
                    Intl.NumberFormat('en', {
                      style: 'currency',
                      currency: 'USD',
                      maximumSignificantDigits: 7,
                    }).format(high)
                  }}
                </h6>
              </div>
              <div class="col-span-6">
                <p class="mb-1 font-medium text-[#1e293b]">
                  {{ $t('headers.low') }}
                </p>
                <h6 class="text-sm">
                  {{
                    Intl.NumberFormat('en', {
                      style: 'currency',
                      currency: 'USD',
                      maximumSignificantDigits: 7,
                    }).format(low)
                  }}
                </h6>
              </div>
              <div class="col-span-6">
                <p class="mb-1 font-medium text-[#1e293b]">
                  {{ $t('headers.average') }}
                </p>
                <h6 class="text-sm">
                  {{
                    Intl.NumberFormat('en', {
                      style: 'currency',
                      currency: 'USD',
                      maximumSignificantDigits: 7,
                    }).format(average)
                  }}
                </h6>
              </div>
              <div class="col-span-6">
                <p class="mb-1 font-medium text-[#1e293b]">
                  {{ $t('headers.change_24h') }}
                </p>
                <h6
                  :class="{
                    'text-green-600': change > 0,
                    'text-red-600': change < 0,
                  }"
                  class="text-sm"
                >
                  {{
                    Intl.NumberFormat('en', {
                      style: 'percent',
                      maximumSignificantDigits: 3,
                    }).format(change)
                  }}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="histories && histories.length"
          class="col-span-12 lg:col-span-8"
          data-aos="flip-up"
          data-aos-delay="300"
          data-aos-once="true"
        >
          <div class="h-full w-full transform bg-white p-3 shadow-lg sm:shadow-md lg:rounded-xl">
            <div class="grid grid-cols-12">
              <div class="lg:offset-1 order-1 col-span-12 text-right lg:order-2 lg:col-span-2">
                <div
                  class="inline-flex flex-wrap justify-center rounded bg-gray-200 shadow lg:flex-col"
                  data-aos="fade-up"
                  data-aos-delay="900"
                  data-aos-once="true"
                >
                  <button
                    v-for="_interval in intervals"
                    :key="_interval"
                    :class="{
                      'bg-blue-500 text-white': interval === _interval,
                      'bg-transparent text-gray-500': interval !== _interval,
                    }"
                    aria-current="false"
                    class="m-1 flex justify-center rounded border border-gray-200 px-5 py-2 text-sm font-medium"
                    @click="handleInterval(_interval)"
                  >
                    {{ _interval }}
                  </button>
                </div>
              </div>

              <div class="order-2 col-span-12 lg:order-1 lg:col-span-10">
                <ClientOnly>
                  <LineChart :data="chartData" :increase="change > 0" />
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto max-w-screen-xl">
      <div class="w-full transform rounded-xl bg-white p-6 shadow-lg sm:shadow-md">
        <AssetsMarketsTable
          v-if="markets && markets.length"
          :markets="markets"
          class="border-gray-200"
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-once="true"
          @loadMore="loadMore"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
$gold-medal: #f9ad0e;
$silver-medal: #d1d7da;
$bronze-medal: #df7e08;
$neutral-medal: #d1d7da;

.quiz-medal {
  position: relative;
  margin-bottom: 16px;
}

.quiz-medal__circle {
  font-size: 28px;
  font-weight: 500;
  width: 56px;
  height: 56px;
  border-radius: 100%;
  color: white;
  text-align: center;
  line-height: 46px;
  vertical-align: middle;
  position: relative;
  border-width: 0.2em;
  border-style: solid;
  z-index: 1;

  // Default colors
  box-shadow:
    inset 0 0 0 darken($neutral-medal, 15%),
    2px 2px 0 rgba(0, 0, 0, 0.08);
  border-color: lighten(adjust-hue($neutral-medal, 10), 10%);
  text-shadow: 2px 2px 0 darken($neutral-medal, 20%);
  background: linear-gradient(to bottom right, $neutral-medal 50%, darken($neutral-medal, 5%) 50%);

  &.quiz-medal__circle--gold {
    box-shadow:
      inset 0 0 0 darken($gold-medal, 15%),
      2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: lighten(adjust-hue($gold-medal, 10), 10%);
    text-shadow: 0 0 4px darken($gold-medal, 20%);
    background: linear-gradient(to bottom right, $gold-medal 50%, darken($gold-medal, 5%) 50%);
  }

  &.quiz-medal__circle--silver {
    box-shadow:
      inset 0 0 0 darken($silver-medal, 15%),
      2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: lighten(adjust-hue($silver-medal, 10), 10%);
    text-shadow: 0px 0px 4px darken($silver-medal, 20%);
    background: linear-gradient(to bottom right, $silver-medal 50%, darken($silver-medal, 5%) 50%);
  }

  &.quiz-medal__circle--bronze {
    box-shadow:
      inset 0 0 0 darken($bronze-medal, 15%),
      2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: lighten(adjust-hue($bronze-medal, 10), 10%);
    text-shadow: 0 0 4px darken($bronze-medal, 20%);
    background: linear-gradient(to bottom right, $bronze-medal 50%, darken($bronze-medal, 5%) 50%);
  }
}

.quiz-medal__ribbon {
  content: '';
  display: block;
  position: absolute;
  border-style: solid;
  border-width: 6px 10px;
  width: 0;
  height: 20px;
  top: 50px;
}

.quiz-medal__ribbon--left {
  border-color: #fc402d #fc402d transparent #fc402d;
  left: 8px;
  transform: rotate(20deg) translateZ(-32px);
}

.quiz-medal__ribbon--right {
  left: 28px;
  border-color: darken(#fc402d, 10%) darken(#fc402d, 10%) transparent darken(#fc402d, 10%);
  transform: rotate(-20deg) translateZ(-48px);
}
</style>
