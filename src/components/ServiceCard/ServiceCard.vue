<template>
  <section
    class="service-card"
    :class="{
      'service-card--published': props.service.published,
      'service-card--unpublished': !props.service.published,
    }"
  >
    <!-- Header: Status + Versions -->
    <header class="service-card__header">
      <div class="service-card__header-left">
        <ServiceStatus
          :loading="loading"
          :status="props.service.published"
        />
      </div>
      <div class="service-card__header-right">
        <ServiceVersions :versions="props.service.versions.length" />
      </div>
    </header>

    <!-- Main Content: Name + Description -->
    <main class="service-card__body">
      <h2 class="service-card__title">
        {{ props.service.name }}
      </h2>
      <p class="service-card__description">
        {{ props.service.description }}
      </p>
    </main>

    <!-- Footer: Metrics + Developers -->
    <footer class="service-card__footer">
      <div class="service-card__footer-left">
        <ServiceMetrics
          v-if="props.service.metrics"
          :metrics="props.service.metrics"
        />
      </div>
      <div class="service-card__footer-right">
        <ServiceDevelopers :versions="props.service.versions" />
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import type { Service } from '@/types'

import ServiceStatus from '@/components/ServiceCard/ServiceStatus.vue'
import ServiceVersions from '@/components/ServiceCard/ServiceVersions.vue'
import ServiceMetrics from '@/components/ServiceCard/ServiceMetrics.vue'
import ServiceDevelopers from '@/components/ServiceCard/ServiceDevelopers.vue'

const props = defineProps<{
  service: Service
  loading: boolean
}>()
</script>

<style lang="scss" scoped>
.service-card {
  background-color: #fff;
  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 24px;
  transition: box-shadow 0.2s ease-in-out;
  width: 100%;

  /* Header */
  &__header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  &__header-left,
  &__header-right {
    align-items: center;
    display: flex;
  }

  /* Main Body */
  &__body {
    margin-top: 0.75rem;
  }
  &__title {
    color: #3C4557;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
  }
  &__description {
    color: #707888;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }

  /* Footer */
  &__footer {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: auto; /* push footer to the bottom if the card grows */
    margin-top: 1rem;
  }
  &__footer-left,
  &__footer-right {
    align-items: center;
    display: flex;
  }
}

.service-card:hover {
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}
</style>
