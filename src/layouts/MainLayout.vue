<template>
  <div>
    <NavBar>
      <template #right>
        <router-link
          class="item"
          to="/organization"
        >
          <img
            alt="Two people together as a group"
            src="@/assets/icons/icon-org.svg"
          >
          <span>Organization</span>
        </router-link>
        <router-link
          class="item"
          to="/settings"
        >
          <img
            alt="A gear"
            src="@/assets/icons/icon-cog.svg"
          >
          <span>Settings</span>
        </router-link>
        <router-link
          class="item profile"
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

:deep(.item) {
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 15px;
  font-weight: 600;
  gap: 8px;
  line-height: 18.15px;
  text-decoration: none;
}

:deep(.profile) {
  background-color: #072863;
}
</style>