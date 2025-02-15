<template>
  <header class="navbar">
    <div class="header-content">
      <div
        class="app-navbar-logo"
      >
        <router-link
          class="item"
          to="/"
        >
          <img
            alt="Kong Konnect"
            src="@/assets/logo/konnect-header.svg"
          >
        </router-link>
      </div>
      <div class="navbar-content">
        <div class="navbar-content__left">
          <slot name="left" />
        </div>
        <div class="navbar-content__center">
          <slot name="center" />
        </div>
        <div class="navbar-content__right">
          <slot name="right" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  background: linear-gradient(#09224F, #073382);
  height: 70px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99;

  .header-content {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-between;
  }

  .app-navbar-logo {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    margin-right: 32px;
    max-width: calc(240px - 32px);
    min-width: calc(240px - 32px);
    padding-left:  20px;
  }

  .app-navbar-links,
  :deep(.app-navbar-links),
  :slotted(.app-navbar-links) {
    align-items: center;
    display: flex;
    height: 100%;

    a {
      align-items: center;
      align-self: stretch;
      border-bottom: 4px solid transparent;
      color: white;
      display: flex;
      font-size: 1rem;
      padding: 4px 20px;
      text-decoration: none;
      transition: all .2s ease-in-out;
      white-space: nowrap;

      &.router-link-active,
      &.active {
        border-color: #84E5AE;
      }
    }
  }

  .navbar-content {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 20px;
    height: 100%;
    justify-content: space-between;
    width: 100%;

    &__left,
    &__center,
    &__right {
      align-items: center;
      display: flex;
      flex: 1;
      gap: 20px;
      height: 100%;
    }

    &__left {
      justify-content: flex-start;
    }

    &__center {
      justify-content: center;
    }

    &__right {
      justify-content: flex-end;
    }
  }
}
</style>