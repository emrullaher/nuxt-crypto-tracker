<script lang="ts" setup>
import type { Market } from '~/types'
import Table from '~/components/exchange/Table.vue'

interface TableProps {
  markets: Market[]
}

const props = defineProps<TableProps>()
</script>

<template>
  <div class="w-full overflow-hidden" v-bind="$attrs">
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.exchange') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.pair') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.price') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.volume') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">{{ $t('headers.total') }} %</th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.status') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(market, i) in markets"
            :key="market.marketId"
            :class="{
              'border-b border-gray-200': i !== markets.length - 1,
            }"
            class="cursor-pointer transition duration-300 hover:bg-gray-100"
          >
            <td class="px-1 py-4">
              <span>{{ market.exchangeId }}</span>
            </td>
            <td class="px-1 py-4">
              <span>{{ `${market.baseSymbol}/${market.quoteSymbol}` }}</span>
            </td>
            <td class="px-1 py-4">
              <span>
                {{
                  Intl.NumberFormat('en', {
                    style: 'currency',
                    currency: 'USD',
                    maximumSignificantDigits: 7,
                  }).format(market.priceUsd)
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
                  }).format(market.volumeUsd24Hr)
                }}
              </span>
            </td>
            <td>
              <span>
                {{
                  Intl.NumberFormat('en', {
                    style: 'percent',
                    maximumSignificantDigits: 4,
                  }).format(market.volumePercent / 100)
                }}
              </span>
            </td>
            <td>
              <div class="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 bg-green-500"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="markets.length <= 2000" class="mt-4 text-center">
      <button
        class="bg-blue-gradient rounded-full px-5 py-4 text-center text-base font-medium text-white transition duration-300 hover:shadow-md hover:shadow-[#0c66ee]/50"
        @click="$emit('loadMore')"
      >
        {{ $t('load_more') }}
      </button>
    </div>
  </div>
</template>
