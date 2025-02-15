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
        <ServiceStatus :status="props.service.published" :loading="loading" />
      </div>
      <div class="service-card__header-right">
        <ServiceVersions :versions="props.service.versions.length" />
      </div>
    </header>

    <!-- Main Content: Name + Description -->
    <main class="service-card__body">
      <h2 class="service-card__title">{{ props.service.name }}</h2>
      <p class="service-card__description">{{ props.service.description }}</p>
    </main>

    <!-- Footer: Metrics + Developers -->
    <footer class="service-card__footer">
      <div class="service-card__footer-left">
        <ServiceMetrics v-if="props.service.metrics" :metrics="props.service.metrics" />
      </div>
      <div class="service-card__footer-right">
        <ServiceDevelopers :versions="props.service.versions" />
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import type { Service } from '@/types';

import ServiceStatus from '@/components/ServiceCard/ServiceStatus.vue';
import ServiceVersions from '@/components/ServiceCard/ServiceVersions.vue';
import ServiceMetrics from '@/components/ServiceCard/ServiceMetrics.vue';
import ServiceDevelopers from '@/components/ServiceCard/ServiceDevelopers.vue';

const props = defineProps<{
  service: Service,
  loading: boolean
}>();
</script>

<style lang="scss" scoped>
.service-card {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease-in-out;
  width: 100%;
  height: 100%;
  justify-content: space-between;

  /* Header */
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__header-left,
  &__header-right {
    display: flex;
    align-items: center;
  }

  /* Main Body */
  &__body {
    margin-top: 0.75rem;
  }
  &__title {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
    color: #3C4557;
  }
  &__description {
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: #707888;
  }

  /* Footer */
  &__footer {
    margin-top: auto; /* push footer to the bottom if the card grows */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }
  &__footer-left,
  &__footer-right {
    display: flex;
    align-items: center;
  }
}

.service-card:hover {
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}
</style>
