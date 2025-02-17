<template>
  <div class="container">
    <h1>Page not found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link to="/">
      Go back to the home page
    </router-link>
  </div>
</template>

<style scoped>
.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  justify-content: center;
  left: 20px;
  margin: 0 auto;
  padding: 40px;
  position: relative;
  text-align: center;
}

@media (max-width: 768px) {
  .container {
    left: 0;
  }
}

h1 {
  color: #3C4557;
  font-size: 32px;
  font-weight: 700;
  line-height: 36px;
}

p {
  color: #3C4557;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

a {
  color: #1354c6;
}
</style>