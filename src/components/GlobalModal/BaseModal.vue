<template>
  <transition name="modal-fade">
    <div
      v-if="props.visible"
      class="modal-overlay"
      @click.self="close"
    >
      <div class="modal-container">
        <main class="modal-body">
          <slot />
        </main>

        <footer class="modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['close'])

function close() {
  emits('close')
}
</script>

<style scoped>
/* Basic overlay: covers the screen, dim background. */
.modal-overlay {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
}

.modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  max-width: 830px;
  overflow-y: auto;
  padding: 1rem;
  position: relative;
  width: 100%;
}

.modal-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.close-button {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
}

.modal-body {
  margin-top: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

/* Transition for fade in/out */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.1s ease;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
