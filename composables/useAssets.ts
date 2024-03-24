import type { Asset, History, Market } from '~/types'

export default function useAssets() {
  const config = useRuntimeConfig()

  const asset = ref({} as Asset)
  const assets = ref([] as Asset[])
  const histories = ref([] as History[])
  const markets = ref([] as Market[])

  async function fetchAsset(id: string) {
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/assets/${id}`)
      asset.value = data as Asset
    } catch (error) {
      console.error('Error fetching coin:', error)
    }
  }

  async function fetchAssets(limit = 20) {
    try {
      const offset = assets.value.length
      const { data } = await $fetch(`${config.public.apiUrl}/assets?limit=${limit}&offset=${offset}`)
      if (assets.value && assets.value.length) {
        assets.value = [...assets.value, ...data]
      } else {
        assets.value = data as Asset[]
      }
    } catch (error) {
      console.error('Error fetching assets:', error)
    }
  }

  async function fetchAssetHistory(id: string, interval: string) {
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/assets/${id}/history?interval=${interval}`)
      histories.value = data as History[]
    } catch (error) {
      console.error('Error fetching coin history:', error)
    }
  }

  async function fetchAssetMarkets(id: string, limit = 20) {
    try {
      const offset = markets.value.length
      const { data } = await $fetch(`${config.public.apiUrl}/assets/${id}/markets?limit=${limit}&offset=${offset}`)
      if (markets.value && markets.value.length) {
        markets.value = [...markets.value, ...data]
      } else {
        markets.value = data as Market[]
      }
    } catch (error) {
      console.error('Error fetching coin markets:', error)
    }
  }

  return {
    asset,
    assets,
    histories,
    markets,
    fetchAsset,
    fetchAssets,
    fetchAssetHistory,
    fetchAssetMarkets,
  }
}
