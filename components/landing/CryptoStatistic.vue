<script lang="ts" setup>
import type { Asset } from '~/types'

interface LandingCryptoStatisticProps {
  title: string
  datasets: Asset[]
}

const props = defineProps<LandingCryptoStatisticProps>()
</script>

<template>
  <div class="mt-6 w-full space-y-6 overflow-hidden lg:mt-0 lg:w-2/3 xl:w-1/3" v-bind="$attrs">
    <div class="flex w-full items-center justify-between">
      <span class="font-medium">{{ title }}</span>
      <NuxtLinkLocale
        class="flex items-center space-x-1 rounded-md px-3 py-1 text-sm font-medium text-blue-500 transition duration-300 hover:bg-blue-50"
        to="/coins"
      >
        <span>{{ $t('headers.more') }}</span>
        <ChevronRightIcon :size="16" />
      </NuxtLinkLocale>
    </div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full overflow-hidden px-2 py-2 align-middle sm:px-6">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="text-left text-sm font-medium text-gray-500">
                  {{ $t('headers.name') }}
                </th>
                <th class="text-left text-sm font-medium text-gray-500">
                  {{ $t('headers.price') }}
                </th>
                <th class="hidden text-left text-sm font-medium text-gray-500 sm:block">
                  {{ $t('headers.change_24h') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="asset in datasets" :key="asset.id" class="border-b border-gray-200">
                <td class="py-4 pr-2">
                  <div class="flex items-center space-x-2">
                    <NuxtImg
                      :src="`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
                      alt=""
                      height="20"
                      width="20"
                    />
                    <span>{{ asset.name }}</span>
                  </div>
                </td>
                <td class="py-4">
                  <div class="flex items-center">
                    <span>
                      {{
                        Intl.NumberFormat('en', {
                          style: 'currency',
                          currency: 'USD',
                          maximumSignificantDigits: 7,
                        }).format(asset.priceUsd)
                      }}
                    </span>
                  </div>
                </td>
                <td class="py-4">
                  <span>
                    {{
                      Intl.NumberFormat('en', {
                        notation: 'compact',
                        maximumSignificantDigits: 4,
                      }).format(asset.supply)
                    }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
