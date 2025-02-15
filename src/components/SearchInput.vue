<template>
  <input
    class="search-input"
    :placeholder="props.placeholder"
    type="text"
    :value="props.modelValue"
    @input="handleInput"
  >
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search services...',
  },
})

const emits = defineEmits(['update:modelValue'])

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement

  emits('update:modelValue', target.value)
}
</script>

<style scoped>
.search-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 8px 12px;
  width: 100%;
}
</style>
