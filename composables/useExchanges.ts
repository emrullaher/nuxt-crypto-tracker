import type { Exchange } from '~/types'

export default function useAssets() {
  const config = useRuntimeConfig()
  const exchanges = ref([] as Exchange[])

  async function fetchExchanges(limit = 20) {
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/exchanges`)
      exchanges.value = data as Exchange[]
    } catch (error) {
      console.error('Error fetching assets:', error)
    }
  }

  return {
    exchanges,
    fetchExchanges,
  }
}
