export interface AccordionItem {
  title: string
  description: string
}

export interface StepItem {
  img: string
  title: string
  description: string
}

export interface Asset {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
  explorer: string
  isPriceUp: boolean | null
}

export interface Exchange {
  exchangeId: string
  name: string
  rank: string
  percentTotalVolume: string
  volumeUsd: string
  tradingPairs: string
  socket: boolean
  exchangeUrl: string
  updated: number
}

export interface Prices {
  [key: string]: string
}

export interface History {
  priceUsd: string
  time: number
}

export interface Market {
  exchangeId: string
  baseId: string
  quoteId: string
  baseSymbol: string
  quoteSymbol: string
  volumeUsd24Hr: string
  priceUsd: string
  volumePercent: string
}

export enum Interval {
  m1 = '1m',
  m5 = '5m',
  m15 = '15m',
  m30 = '30m',
  h1 = '1h',
  h2 = '2h',
  h6 = '6h',
  h12 = '12h',
  d1 = '1d',
}
