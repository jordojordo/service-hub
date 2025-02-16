<template>
  <div class="search-input__wrapper">
    <img class="search-input__icon" src="@/assets/icons/icon-search.svg" alt="Magnifying glass">
    <input
      class="search-input"
      type="text"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      @input="handleInput"
    />
  </div>
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

<style lang="scss" scoped>
.search-input {
  width: 100%;
  padding: 10px 16px 10px 40px;
  font-size: 1rem;
  border: 1px solid #E7E7EC;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: #6F7787;

  &__wrapper {
    position: relative;
    width: 209px;
    height: 44px;
  }

  &__icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    pointer-events: none;
  }

  &:focus {
    outline: none;
    border-color: #3C4557;
  }
}
</style>
