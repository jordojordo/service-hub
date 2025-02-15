<template>
  <div>
    <NavBar>
      <template #right>
        <router-link to="/organization" class="item">
          <img src="@/assets/icons/icon-org.svg" alt="Two people together as a group" />
          <span>Organization</span>
        </router-link>
        <router-link to="/settings" class="item">
          <img src="@/assets/icons/icon-cog.svg" alt="A gear" />
          <span>Settings</span>
        </router-link>
        <router-link to="/profile" class="item profile">
          <img src="@/assets/icons/icon-user.svg" alt="A person" />
          <span>Profile</span>
        </router-link>
      </template>
    </NavBar>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<style lang="scss" scoped>
.main {
  background-color: #f8f8fa;

  /* Push content below the 70px navbar */
  padding-top: 70px;
  min-height: 100vh;
}

:deep(.item) {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  line-height: 18.15px;
  color: #fff;
  text-decoration: none;
}

:deep(.profile) {
  background-color: #072863;
}
</style>