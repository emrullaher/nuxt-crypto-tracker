<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'

interface chartProps {
  data: {
    name: string
    data: number[]
    categories: string[]
  }[]
  increase: boolean
}

const props = defineProps<chartProps>()

const color = computed(() => {
  return props.increase ? '#34c38f' : '#f46a6a'
})

const options = {
  chart: {
    type: 'area',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    show: false,
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    opposite: true,
    labels: {
      formatter: (val: number) =>
        new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'USD',
          maximumSignificantDigits: 5,
        }).format(val),
    },
    tooltip: {
      show: false,
      enabled: false,
    },
  },
  tooltip: {
    followCursor: true,
    y: {
      formatter: (val: number) =>
        new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'USD',
          maximumSignificantDigits: 5,
        }).format(val),
    },
  },
  colors: [color.value],
}

const series = props.data.map((item) => ({
  name: item.name,
  data: item.data,
}))

props.data.forEach((item) => {
  options.xaxis.categories = item.categories
})

const chart = ref<null | VueApexCharts>(null)

watch(
  () => props.data,
  (newVal) => {
    if (chart) {
      chart.value.updateSeries([
        {
          data: newVal[0].data,
          xaxis: {
            categories: newVal[0].categories,
          },
          color: color.value,
        },
      ])
    }
  },
)
</script>

<template>
  <VueApexCharts
    :key="series"
    ref="chart"
    :options="options"
    :series="series"
    height="400"
    width="100%"
  ></VueApexCharts>
</template>
