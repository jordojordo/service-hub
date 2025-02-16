<template>
  <div>
    <h2>
      Create Service Package
    </h2>
    <p>
      Create a new service to manage and track versioning and API service documentation.
    </p>
    <button
      class="button"
      @click="onCreateService"
    >
      Create Package
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ onServiceCreated?: () => void }>()

function onCreateService() {
  alert('Service created!')
  props.onServiceCreated && props.onServiceCreated()
}
</script>

<style scoped>
h2 {
  color: #3C4557;
  font-size: 24px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
}

p {
  color: #3C4557;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.button {
  background-color: #07A88D;
  border: none;
  border-radius: 100px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  transition: background-color 0.1s;
}
</style>