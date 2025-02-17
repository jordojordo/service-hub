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
        <div class="navbar__links-wrapper">
          <router-link
            class="navbar__item organization"
            to="/organization"
          >
            <img
              alt="Two people together as a group"
              src="@/assets/icons/icon-org.svg"
            >
            <span>Organization</span>
          </router-link>
          <router-link
            class="navbar__item settings"
            to="/settings"
          >
            <img
              alt="A gear"
              src="@/assets/icons/icon-cog.svg"
            >
            <span>Settings</span>
          </router-link>
        </div>
        <router-link
          class="navbar__item profile"
          to="/profile"
        >
          <img
            alt="A person"
            src="@/assets/icons/icon-user.svg"
          >
          <!-- Hardcoded for now... -->
          <span>Katherine Ellis</span>
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
  gap: 24px;
  left: -20px;
  min-height: 100vh;
  padding: 40px;

  /* Push content below the 70px navbar */
  top: 83px;

  @media (max-width: 768px) {
    left: 0px;
    padding: 0px;
  }
}

.navbar {
  &__logo {
    align-items: center;
    display: flex;
    height: 25.48px;
    justify-content: flex-start;
    padding-left: 18px;
  }

  &__links-wrapper {
    display: flex;
    gap: 8px;
    height: 44px;
    max-width: 263px;

    & > .organization, & > .settings {
      border-radius: 0 24px 24px 0;
      gap: 12px;
      opacity: 80%;
      padding: 18px 0px 18px 12px;

      & > img {
        width: 20px;
      }

      & > span {
        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    & > .organization {
      width: 144px;
    }

    & > .settings {
      width: 111px;
    }

    @media (max-width: 768px) {
      & > .organization, & > .settings {
        width: 20px;
      }
    }
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

    &.profile {
      align-items: center;
      background-color: #072863;
      display: flex;
      gap: 16px;
      height: 100%;
      justify-content: center;
      width: 188px;

      @media (max-width: 768px) {
        width: 44px;
      }

      & > img {
        border-radius: 30px;
        height: 30px;
        width: 30px;
      }

      & > span {
        font-size: 15px;
        font-weight: 500;
        line-height: 18.15px;
        opacity: 80%;

        @media (max-width: 768px) {
          display: none;
        }
      }
    }
  }
}
</style>