<template>
  <header class="navbar">
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

  .navbar-content {
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;

    &__left,
    &__center,
    &__right {
      align-items: center;
      display: flex;
      gap: 20px;
      height: 100%;
    }

    &__left {
      justify-content: flex-start;
    }

    &__center {
      flex: 1;
      justify-content: center;
    }

    &__right {
      justify-content: flex-end;
    }
  }
}
</style>