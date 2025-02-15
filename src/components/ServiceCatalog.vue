<template>
  <div class="service-catalog">
    <div class="service-catalog__masthead">
      <div>
        <h1>Service Hub</h1>
        <p>
          Organize services, manage and track versioning and API service documentation.&nbsp;
          <a href="google.com" target="_blank">Learn more</a>
        </p>
      </div>
      <div v-if="!loading">
        <SearchInput
          data-testid="search-input"
          v-model="searchQuery"
          placeholder="Search services..."
        />
      </div>
    </div>
    <div v-if="loading">
      Loading services...
    </div>
    <div v-else>
      <ul v-if="filteredServices.length" class="catalog">
        <li
          v-for="service in filteredServices"
          :key="service.id"
          class="service"
        >
          <ServiceCard :service="service" :loading="loading" />
        </li>
      </ul>
      <div v-else data-testid="no-results">
        No services
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import useServices from '@/composables/useServices';
import ServiceCard from '@/components/ServiceCard/ServiceCard.vue';
import SearchInput from '@/components/SearchInput.vue';

const { services, loading } = useServices();
const searchQuery = ref('');

const filteredServices = computed(() => {
  if (!searchQuery.value.trim()) {
    return services.value;
  };

  return services.value.filter(service =>
    service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;

  &__masthead {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;

    h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      line-height: 36px;
      color: #3C4557;
    }

    p {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      color: #3C4557;
    }

    a {
      color: #1354c6;
    }
  }
}

.catalog {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 40px;
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
}

</style>
