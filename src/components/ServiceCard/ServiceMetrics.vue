<template>
  <section class="service-metrics">
    <ul
      v-if="props.metrics"
      class="service-metrics__wrapper"
    >
      <li>
        <span class="service-metrics__stat">{{ props.metrics.latency }}ms&nbsp;</span>
        <span class="service-metrics__stat-description">latency</span>
      </li>
      <li>
        <span class="service-metrics__stat">{{ formattedUptime }}&nbsp;</span>
        <span class="service-metrics__stat-description">uptime</span>
      </li>
      <li>
        <span class="service-metrics__stat">{{ formattedRequests }}&nbsp;</span>
        <span class="service-metrics__stat-description">requests&nbsp;&#x00B7;&nbsp;</span>
        <span class="service-metrics__stat">{{ formattedErrors }}&nbsp;</span>
        <span class="service-metrics__stat-description">errors</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Metrics } from '@/types'

const props = defineProps<{
  metrics: Metrics
}>()

const formattedUptime = computed(() => {
  return formatAsPercentage(props.metrics.uptime)
})

const formattedErrors = computed(() => {
  return formatAsPercentage(props.metrics.errors)
})

// Format requests: below 1,000 shows as-is, between 1,000 and 1,000,000 uses "k", 1,000,000+ uses "m"
const formattedRequests = computed(() => {
  const requests = Number(props.metrics.requests)
  if (isNaN(requests)) {
    return '0'
  }

  if (requests >= 1_000_000) {
    // Format to one decimal place (e.g., 1.2m)
    return `${(requests / 1_000_000).toFixed(1)}m`
  }

  if (requests >= 1000) {
    // Format to a whole number in thousands (e.g., 827k)
    return `${(requests / 1000).toFixed(0)}k`
  }
  return requests.toString()
})

function formatAsPercentage(num: number): string {
  const uptimeNum = Number(num)

  if (isNaN(uptimeNum)) {
    return '0.00%'
  }

  return `${ (uptimeNum * 100).toFixed(2) }%`
}
</script>

<style lang="scss" scoped>
.service-metrics {
  &__wrapper {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Each li has a pseudo-element for the colored dot */
  &__wrapper li {
    align-items: center;
    display: flex;
    padding-left: 15px;
    position: relative;
  }
  &__wrapper li::before {
    background-color: #42D782;
    border-radius: 50%;
    content: '';
    display: block;
    height: 6px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;    /* Dot size */
  }

  &__stat {
    color: #3c4556;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
  }

  &__stat-description {
    color: #707888;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
  }
}
</style>