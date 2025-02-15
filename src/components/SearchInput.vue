<template>
  <input
    type="text"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    @input="handleInput"
    class="search-input"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search services...'
  }
});

const emits = defineEmits(['update:modelValue']);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;

  emits('update:modelValue', target.value);
}
</script>

<style scoped>
.search-input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
}
</style>
