<template>
  <div>
    <NavBar>
      <template #left>
        <router-link
          class="navbar__logo"
          to="/"
        >
          <img
            alt="Kong Konnect"
            src="@/assets/logo/konnect-header.svg"
          >
        </router-link>
      </template>

      <template #right>
        <router-link
          class="navbar__item"
          to="/organization"
        >
          <img
            alt="Two people together as a group"
            src="@/assets/icons/icon-org.svg"
          >
          <span>Organization</span>
        </router-link>
        <router-link
          class="navbar__item"
          to="/settings"
        >
          <img
            alt="A gear"
            src="@/assets/icons/icon-cog.svg"
          >
          <span>Settings</span>
        </router-link>
        <router-link
          class="navbar__item profile"
          to="/profile"
        >
          <img
            alt="A person"
            src="@/assets/icons/icon-user.svg"
          >
          <span>Profile</span>
        </router-link>
      </template>
    </NavBar>

    <GlobalModal />

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import GlobalModal from '@/components/GlobalModal/GlobalModal.vue'
</script>

<style lang="scss" scoped>
.main {
  background-color: #f8f8fa;
  min-height: 100vh;

  /* Push content below the 70px navbar */
  padding-top: 70px;
}

.navbar {
  &___logo {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    margin-right: 32px;
    max-width: calc(240px - 32px);
    min-width: calc(240px - 32px);
  }

  &__item {
    align-items: center;
    color: #fff;
    display: flex;
    font-size: 15px;
    font-weight: 600;
    gap: 8px;
    line-height: 18.15px;
    text-decoration: none;
  }

  &__item.profile {
    background-color: #072863;
    border-radius: 20px;
    padding: 0 12px;
  }
}
</style>