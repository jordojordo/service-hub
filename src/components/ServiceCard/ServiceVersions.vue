<template>
  <div
    v-if="props.versions > 0"
    class="service-versions__wrapper"
  >
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
    align-items: center;
    background-color: #f2f6fe;
    border-radius: 100px;
    color: #5888DB;
    display: flex;
    font-size: 1rem;
    font-size: 13px;
    font-weight: 600;
    gap: 8px;
    height: 33px;
    justify-content: center;
    line-height: 15.73px;
    width: 97px;
  }
}
</style>
