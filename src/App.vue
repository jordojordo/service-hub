<template>
  <div>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
// Unscoped styles for html and body
html {
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
}

.main {
  position: relative;
  top: 83px;
}
</style>
