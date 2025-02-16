<template>
  <BaseModal
    :visible="modalStore.isModalOpen"
    @close="modalStore.closeModal"
  >
    <template #header>
      <!-- Render a header if provided -->
      <h2 v-if="modalStore.modalOptions?.header">
        {{ modalStore.modalOptions.header }}
      </h2>
    </template>

    <!-- Dynamic body: renders whichever component was provided -->
    <component
      :is="modalStore.modalOptions.component"
      v-if="modalStore.modalOptions"
      v-bind="modalStore.modalOptions.componentProps"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal'

import BaseModal from '@/components/GlobalModal/BaseModal.vue'

const modalStore = useModalStore()
</script>

