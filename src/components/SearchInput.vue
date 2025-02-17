<template>
  <div class="search-input__wrapper">
    <img
      alt="Magnifying glass"
      class="search-input__icon"
      src="@/assets/icons/icon-search.svg"
    >
    <input
      class="search-input"
      :placeholder="props.placeholder"
      type="text"
      :value="props.modelValue"
      @input="handleInput"
    >
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
  border: 1px solid #E7E7EC;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  padding: 10px 16px 10px 40px;
  width: 100%;

  &__wrapper {
    height: 44px;
    position: relative;
    width: 209px;

    @media (max-width: 768px) {
      max-width: 300px;
      width: 70%;
    }
  }

  &__icon {
    height: 20px;
    left: 8px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
  }

  &:focus {
    border-color: #3C4557;
    outline: none;
  }
}
</style>
