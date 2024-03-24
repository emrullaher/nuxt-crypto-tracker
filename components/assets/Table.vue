<script lang="ts" setup>
import type { Asset } from '~/types'

interface TableProps {
  assets: Asset[]
}

const props = defineProps<TableProps>()

const router = useRouter()

const localePath = useLocalePath()
</script>

<template>
  <div class="w-full overflow-hidden" v-bind="$attrs">
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.rank') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.name') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.price') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.market_cap') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.vwap') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.supply') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.volume') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.change_24h') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(asset, i) in assets"
            :key="asset.id"
            :class="{
              'border-b border-gray-200': i !== assets.length - 1,
              'bg-emerald-50': asset.isPriceUp,
              'bg-red-50': asset.isPriceUp === false,
            }"
            class="cursor-pointer transition duration-300 hover:bg-gray-100"
            @click="router.push(localePath(`/assets/${asset.id}`))"
          >
            <td class="px-1 py-4">
              <span>{{ asset.rank }}</span>
            </td>
            <td class="px-1 py-4">
              <div class="flex items-center space-x-2" style="min-width: 150px">
                <NuxtImg
                  :src="`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
                  alt=""
                  height="32"
                  width="32"
                />
                <span>{{ asset.name }}</span>
              </div>
            </td>
            <td class="px-1 py-4">
              <span>
                {{
                  Intl.NumberFormat('en', {
                    style: 'currency',
                    currency: 'USD',
                    maximumSignificantDigits: 7,
                  }).format(asset.priceUsd)
                }}
              </span>
            </td>
            <td class="px-1 py-4">
              <span>
                {{
                  Intl.NumberFormat('en', {
                    notation: 'compact',
                    style: 'currency',
                    currency: 'USD',
                    maximumSignificantDigits: 3,
                  }).format(asset.marketCapUsd)
                }}
              </span>
            </td>
            <td class="px-1 py-4">
              <span>
                {{
                  Intl.NumberFormat('en', {
                    style: 'currency',
                    currency: 'USD',
                    maximumSignificantDigits: 7,
                  }).format(asset.vwap24Hr)
                }}
              </span>
            </td>
            <td class="px-1 py-4">
              <span>
                {{
                  Intl.NumberFormat('en', {
                    notation: 'compact',
                    maximumSignificantDigits: 4,
                  }).format(asset.supply)
                }}
              </span>
            </td>
            <td class="px-1 py-4">
              <span>
                {{
                  Intl.NumberFormat('en', {
                    notation: 'compact',
                    style: 'currency',
                    currency: 'USD',
                    maximumSignificantDigits: 4,
                  }).format(asset.volumeUsd24Hr)
                }}
              </span>
            </td>
            <td :class="asset.changePercent24Hr < 1 ? 'text-red-500' : 'text-emerald-500'" class="px-1 py-4">
              <span>
                {{
                  Intl.NumberFormat('en', {
                    style: 'percent',
                    maximumSignificantDigits: 3,
                  }).format(asset.changePercent24Hr / 100)
                }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="assets.length <= 2000" class="mt-4 text-center">
      <button
        class="bg-blue-gradient rounded-full px-5 py-4 text-center text-base font-medium text-white transition duration-300 hover:shadow-md hover:shadow-[#0c66ee]/50"
        @click="$emit('loadMore')"
      >
        {{ $t('load_more') }}
      </button>
    </div>
  </div>
</template>
