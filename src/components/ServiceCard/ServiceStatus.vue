<template>
  <div class="service-status">
    <div v-if="props.status" class="service-status__wrapper">
      <img src="@/assets/icons/icon-check.svg" alt="Checkmark" class="service-status__icon" />
      <span>Published to portal</span>
    </div>
    <div v-else-if="!loading" class="service-status__wrapper">
      <img src="@/assets/icons/icon-x.svg" alt="X" class="service-status__icon" />
      <span>Unpublished</span>
    </div>
    <div v-else class="service-status__wrapper">
      <img src="@/assets/icons/icon-spinner.svg" alt="Spinner" class="service-status__icon" />
      <span>In progress</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: boolean
  loading: boolean
}>()
</script>

<style lang="scss" scoped>
.service-status {
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: #3C4557B3;

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__icon {
    width: 20px;
    height: 20px;
  }
}
</style>
