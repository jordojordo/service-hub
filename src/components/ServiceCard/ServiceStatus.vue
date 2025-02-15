<template>
  <div class="service-status">
    <div
      v-if="props.status"
      class="service-status__wrapper"
    >
      <img
        alt="Checkmark"
        class="service-status__icon"
        src="@/assets/icons/icon-check.svg"
      >
      <span>Published to portal</span>
    </div>
    <div
      v-else-if="!loading"
      class="service-status__wrapper"
    >
      <img
        alt="X"
        class="service-status__icon"
        src="@/assets/icons/icon-x.svg"
      >
      <span>Unpublished</span>
    </div>
    <div
      v-else
      class="service-status__wrapper"
    >
      <img
        alt="Spinner"
        class="service-status__icon"
        src="@/assets/icons/icon-spinner.svg"
      >
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
  color: #3C4557B3;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;

  &__wrapper {
    align-items: center;
    display: flex;
  }

  &__icon {
    height: 20px;
    width: 20px;
  }
}
</style>
