<template>
  <div class="service-catalog">
    <div class="service-catalog__masthead">
      <div>
        <h1>Service Hub</h1>
        <p>
          Organize services, manage and track versioning and API service documentation.&nbsp;
          <a
            href="google.com"
            target="_blank"
          >Learn more</a>
        </p>
      </div>
      <div v-if="!loading">
        <SearchInput
          v-model="searchQuery"
          data-testid="search-input"
          placeholder="Search services..."
        />
      </div>
    </div>
    <div v-if="loading">
      Loading services...
    </div>
    <div v-else>
      <ul
        v-if="paginatedServices.length"
        class="catalog"
      >
        <li
          v-for="service in paginatedServices"
          :key="service.id"
          class="service"
        >
          <ServiceCard
            :loading="loading"
            :service="service"
          />
        </li>
      </ul>
      <div
        v-else
        data-testid="no-results"
      >
        No services
      </div>

      <div
        v-if="filteredServices.length"
        class="pagination-container"
      >
        <Pagination
          v-model="currentPage"
          :page-size="pageSize"
          :total-items="filteredServices.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import { debounce } from '@/utils/debounce'
import useServices from '@/composables/useServices'

import ServiceCard from '@/components/ServiceCard/ServiceCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import Pagination from '@/components/PaginationNav.vue'

const { services, loading } = useServices()

const searchQuery = ref('')
const debouncedSearchQuery = ref(searchQuery.value)
const currentPage = ref(1)
const pageSize = 9

const updateDebouncedSearchQuery = debounce((val: string) => {
  debouncedSearchQuery.value = val
}, 300)

watch(searchQuery, (neuQuery) => {
  updateDebouncedSearchQuery(neuQuery)
})

// Filter the services based on the debounced query.
const filteredServices = computed(() => {
  const query = debouncedSearchQuery.value.trim().toLowerCase()
  if (!query) return services.value

  return services.value.filter(service =>
    service.name.toLowerCase().includes(query) ||
    service.description.toLowerCase().includes(query) ||
    service.type.toLowerCase().includes(query),
  )
})

// Whenever the filtered list changes, reset currentPage to 1
watch(filteredServices, () => {
  currentPage.value = 1
})

// Slice the filtered array to show only the services for the current page
const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize

  return filteredServices.value.slice(start, end)
})
</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;

  &__masthead {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    h1 {
      color: #3C4557;
      font-size: 32px;
      font-weight: 700;
      line-height: 36px;
      margin: 0;
    }

    p {
      color: #3C4557;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }

    a {
      color: #1354c6;
    }
  }
}

.catalog {
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 2rem auto 0;
}
</style>
