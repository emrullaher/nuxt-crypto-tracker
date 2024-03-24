import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import PlusThickIcon from 'vue-material-design-icons/PlusThick.vue'
import MinusThickIcon from 'vue-material-design-icons/MinusThick.vue'
import ArrowUpIcon from 'vue-material-design-icons/ArrowUp.vue'
import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue'
import CheckCircleIcon from 'vue-material-design-icons/CheckCircle.vue'
import SegmentIcon from 'vue-material-design-icons/Segment.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'

export default defineNuxtPlugin({
  async setup(nuxtApp) {
    nuxtApp.vueApp.component('ChevronDownIcon', ChevronDownIcon)
    nuxtApp.vueApp.component('ChevronUpIcon', ChevronUpIcon)
    nuxtApp.vueApp.component('ChevronRightIcon', ChevronRightIcon)
    nuxtApp.vueApp.component('PlusThickIcon', PlusThickIcon)
    nuxtApp.vueApp.component('MinusThickIcon', MinusThickIcon)
    nuxtApp.vueApp.component('ArrowUpIcon', ArrowUpIcon)
    nuxtApp.vueApp.component('ArrowRightIcon', ArrowRightIcon)
    nuxtApp.vueApp.component('CheckCircleIcon', CheckCircleIcon)
    nuxtApp.vueApp.component('SegmentIcon', SegmentIcon)
    nuxtApp.vueApp.component('CloseIcon', CloseIcon)
  },
})
