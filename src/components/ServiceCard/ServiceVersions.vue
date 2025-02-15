<template>
  <div v-if="props.versions > 0" class="service-versions__wrapper">
    <span>{{ props.versions }}</span>
    <span>{{ props.versions > 1 ? ' versions' : ' version' }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  versions: number
}>()
</script>

<style lang="scss" scoped>
.service-versions {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 97px;
    height: 33px;
    gap: 8px;
    border-radius: 100px;
    font-size: 1rem;
    color: #5888DB;
    background-color: #f2f6fe;
    font-size: 13px;
    font-weight: 600;
    line-height: 15.73px;
  }
}
</style>
