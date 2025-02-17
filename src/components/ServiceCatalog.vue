<template>
  <div class="service-catalog">
    <div class="service-catalog__masthead">
      <div class="service-catalog__header">
        <h1>Service Hub</h1>
        <p>
          Organize services, manage and track versioning and API service documentation.&nbsp;
          <a
            href="google.com"
            target="_blank"
          >Learn more</a>
        </p>
      </div>
      <div
        v-if="!loading"
        class="service-catalog__actions"
      >
        <SearchInput
          v-model="searchQuery"
          data-testid="search-input"
          placeholder="Search"
        />
        <ServiceCreateButton @service-created="onServiceCreated" />
      </div>
    </div>
    <div
      v-if="loading"
      class="spinner"
    >
      <img
        alt="Loading..."
        src="@/assets/icons/icon-spinner.svg"
      >
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
            @click-service="onServiceClicked"
          />
        </li>
      </ul>
      <div
        v-else
        class="no-results"
        data-testid="no-results"
      >
        No services found.
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
import { ref, computed, watch, markRaw } from 'vue'

import type { Service } from '@/types'

import { useModalStore } from '@/stores/modal'
import { debounce } from '@/utils/debounce'
import useServices from '@/composables/useServices'

import ServiceCard from '@/components/ServiceCard/ServiceCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import ServiceCreateButton from '@/components/ServiceCreateButton.vue'
import Pagination from '@/components/PaginationNav.vue'
import ServiceDetail from '@/components/ServiceDetail.vue'

const { services, loading } = useServices()
const modalStore = useModalStore()

const searchQuery = ref('')
const debouncedSearchQuery = ref(searchQuery.value)
const currentPage = ref(1)
const pageSize = 9

const updateDebouncedSearchQuery = debounce((val: string) => {
  debouncedSearchQuery.value = val
}, 300)

// Filter the services based on the debounced query.
const filteredServices = computed(() => {
  const query = debouncedSearchQuery.value.trim().toLowerCase()

  if (!query) {
    return services.value
  }

  return services.value.filter(service =>
    service.name.toLowerCase().includes(query) ||
    service.description.toLowerCase().includes(query) ||
    service.type.toLowerCase().includes(query),
  )
})

// Slice the filtered array to show only the services for the current page
const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize

  return filteredServices.value.slice(start, end)
})

function onServiceClicked(service: Service) {
  modalStore.openModal({
    component: markRaw(ServiceDetail),
    componentProps: { service },
  })
}

function onServiceCreated() {
  modalStore.closeModal()
}

watch(searchQuery, (neuQuery) => {
  updateDebouncedSearchQuery(neuQuery)
})

// Whenever the filtered list changes, reset currentPage to 1
watch(filteredServices, () => {
  currentPage.value = 1
})
</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin: 0 auto;
    padding: 2px;
  }

  .spinner img {
    width: 36px;
  }

  &__masthead {
    align-items: flex-start;
    display: flex;
    gap: 16px;
    justify-content: space-between;

    &__header {
      max-width: 890px;
    }

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

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  &__actions {
    display: flex;
    gap: 24px;

    @media (max-width: 768px) {
      justify-content: center;
      width: 100%;
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

  @media (max-width: 768px) {
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 2rem auto 0;
}

.no-results {
  color: #3C4557;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin: 2rem 0;
  text-align: center;
}
</style>
