import type { Prices } from '~/types'

export default function usePrices() {
  const config = useRuntimeConfig()

  const prices = ref({} as Prices)

  if (process.server) {
    return {
      prices,
    }
  }

  const WS_API_URL = `${config.public.wsUrl}/prices?assets=ALL`
  const ws = new WebSocket(WS_API_URL)
  onMounted(() => {
    ws.onopen = () => {
      console.log('connected')
    }

    ws.onmessage = (event) => {
      prices.value = JSON.parse(event.data as Prices)
    }
  })

  onUnmounted(() => {
    ws.close()
  })

  const route = useRoute()
  watch(
    () => route.path,
    () => {
      ws.close()
    },
  )
  return {
    prices,
  }
}
