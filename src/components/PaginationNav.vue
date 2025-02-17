<template>
  <div class="pagination">
    <button
      aria-label="Previous page"
      class="pagination__button"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <svg
        fill="none"
        height="9"
        viewBox="0 0 15 9"
        width="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.845703 4.49609L4.64258 0.699219V3.8457H14.9434V5.14648H4.64258V8.29297L0.845703 4.49609Z"
          fill="currentColor"
        />
      </svg>
    </button>

    <span class="pagination__info">
      {{ itemStart }} to {{ itemEnd }} of {{ totalItems }} services
    </span>

    <button
      aria-label="Next page"
      class="pagination__button"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <svg
        fill="none"
        height="9"
        viewBox="0 0 15 9"
        width="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.1543 4.49609L10.3574 0.699219V3.8457H0.0566406V5.14648H10.3574V8.29297L14.1543 4.49609Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
  totalItems: number
  pageSize: number
}>()

const emit = defineEmits(['update:modelValue'])

const currentPage = computed({
  get: () => props.modelValue,
  set: (val: number) => emit('update:modelValue', val),
})

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.pageSize)
})

/**
 * For "1 to 9 of 42 services", we compute the slice start and end.
 * Example: On page 2 with pageSize=9, itemStart = 10, itemEnd = 18
 */
const itemStart = computed(() => {
  return (currentPage.value - 1) * props.pageSize + 1
})
const itemEnd = computed(() => {
  return Math.min(currentPage.value * props.pageSize, props.totalItems)
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  align-items: center;
  display: flex;
  gap: 16px;

  &__button {
    align-items: center;
    background-color: #f8fafc;
    border: 1px solid #A6C6FF;
    border-radius: 50%;
    color: #1456CB;
    cursor: pointer;
    display: inline-flex;
    font-size: 18px;
    font-weight: 400;
    height: 44px;
    justify-content: center;
    padding: 0;
    vertical-align: middle;
    width: 44px;

    &:disabled {
      border: 1px solid #0000001A;
      color: #000;
      cursor: not-allowed;
      opacity: 0.25;
    }

    svg {
      pointer-events: none; /* Let clicks pass through to the button itself */
    }
  }

  &__info {
    color: #3c4557;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
