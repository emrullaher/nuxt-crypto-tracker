<script lang="ts" setup>
import type { Exchange } from '~/types'

interface TableProps {
  exchanges: Exchange[]
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
              {{ $t('headers.rank') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.name') }}
            </th>
            <th class="text-left text-sm font-semibold text-gray-500">
              {{ $t('headers.trading_pairs') }}
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
            v-for="(exchange, i) in exchanges"
            :key="exchange.exchangeId"
            :class="{
              'border-b border-gray-200': i !== exchanges.length - 1,
            }"
            class="cursor-pointer transition duration-300 hover:bg-gray-100"
          >
            <td class="px-1 py-4">
              <span>{{ exchange.rank }}</span>
            </td>
            <td class="px-1 py-4">
              <a :href="exchange.exchangeUrl" class="font-medium hover:underline" target="_blank">
                <span>{{ exchange.name }}</span>
              </a>
            </td>
            <td class="px-1 py-4">
              <span>{{
                Intl.NumberFormat('en', {
                  maximumSignificantDigits: 7,
                }).format(exchange.tradingPairs)
              }}</span>
            </td>
            <td class="px-1 py-4">
              <span>
                {{
                  Intl.NumberFormat('en', {
                    notation: 'compact',
                    style: 'currency',
                    currency: 'USD',
                    maximumSignificantDigits: 3,
                  }).format(exchange.volumeUsd)
                }}
              </span>
            </td>
            <td>
              <span>
                {{
                  Intl.NumberFormat('en', {
                    style: 'percent',
                    maximumSignificantDigits: 4,
                  }).format(exchange.percentTotalVolume / 100)
                }}
              </span>
            </td>
            <td>
              <div
                :class="{
                  'bg-green-500': exchange.socket,
                  'bg-red-500': !exchange.socket,
                }"
                class="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
