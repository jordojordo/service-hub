<template>
  <button
    class="service-create-button"
    @click="onCreateService"
  >
    <img
      alt="Plus sign"
      src="@/assets/icons/icon-plus.svg"
    >
    <span>Service Package</span>
  </button>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'

import { useModalStore } from '@/stores/modal'

import ServiceCreateForm from '@/components/ServiceCreateForm.vue'

const modalStore = useModalStore()

const emits = defineEmits<{
  (event: 'serviceCreated'): void
}>()

const onCreateService = () => {
  modalStore.openModal({
    component: markRaw(ServiceCreateForm),
    componentProps: {
      // pass a callback prop instead of relying on event emission
      onServiceCreated: () => {
        emits('serviceCreated')
      },
    },
  })
}
</script>

<style lang="scss" scoped>
.service-create-button {
  align-items: center;
  background-color: #07A88D;
  border: none;
  border-radius: 100px;
  color: white;
  cursor: pointer;
  display: flex;
  gap: 8px;
  height: 44px;
  justify-content: center;
  padding: 12px 24px 12px 16px;
  transition: background-color 0.1s;
  width: 197px;

  @media (max-width: 768px) {
    padding: 0;
    width: 44px;
  }

  & span {
    font-family: 'Headline/H3', 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 600;
    min-width: 129px;

    @media (max-width: 768px) {
      display: none;
    }
  }
}
</style>