<template>
  <button
    class="service-create-button"
    @click="onCreateService"
  >
    <img src="@/assets/icons/icon-plus.svg" alt="Plus sign" />
    <span>Service Package</span>
  </button>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'

import { useModalStore } from '@/stores/modal'

import ServiceCreateForm from '@/components/ServiceCreateForm.vue';

const modalStore = useModalStore()

const emits = defineEmits<{
  (event: 'serviceCreated'): void;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #07A88D;
  border: none;
  border-radius: 100px;
  gap: 8px;
  color: white;
  cursor: pointer;
  width: 197px;
  height: 44px;
  padding: 12px 24px 12px 16px;
  transition: background-color 0.1s;

  & span {
    min-width: 129px;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>