<template>
  <div class="service-details">
    <h2 class="service-details__name">
      {{ props.service.name }}
    </h2>
    <p class="service-details__description">
      {{ props.service.description }}
    </p>

    <div class="versions">
      <h3>Versions ({{ props.service.versions.length }})</h3>
      <div
        v-for="version in props.service.versions"
        :key="version.id"
        class="version-row"
      >
        <!-- Left side: version number + description -->
        <div class="version-row__left">
          <span class="version__number">v{{ version.name }}</span>
          <span class="version__description">{{ version.description }}</span>
        </div>

        <!-- Center: type pill -->
        <div class="version-row__center">
          <span
            class="version__type"
            :class="{ 'version__type--active': props.service.type.toLowerCase() === 'http' }"
          >
            HTTP
          </span>

          <span
            class="version__type"
            :class="{ 'version__type--active': props.service.type.toLowerCase() === 'rest' }"
          >
            REST
          </span>
        </div>

        <!-- Right side: developer info + updated date -->
        <div class="version-row__right">
          <div class="version__developer">
            <div class="version__developer-info">
              <img
                v-if="version.developer?.avatar"
                alt="Developer avatar"
                class="version__developer-avatar"
                :src="version.developer.avatar"
              >
              <span class="version__developer-name">
                {{ version.developer?.name }}
              </span>
            </div>
            <span class="version__developer-updated">
              {{ formatTimeAgo(version.updated_at) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { formatRelativeTime } from '@/utils/time'


const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
})

function formatTimeAgo(dateString: string) {
  return formatRelativeTime(dateString)
}
</script>

<style scoped lang="scss">
.service-details {
  &__name {
    color: #3C4557;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  &__description {
    color: #3C4557;
    margin-top: 0.5rem;
  }
}

.versions {
  margin-top: 1.5rem;
}

.version-row {
  align-items: start;
  border-bottom: 1px solid #e5e5e5;
  column-gap: 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  padding: 1rem 0;

  &:last-child {
    border-bottom: none;
  }

  &__center {
    align-items: center;
    display: flex;
    justify-content: flex-start;
  }

  &__right {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

/* --- Individual version details --- */
.version {
  &__number {
    color: #3C4557;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__description {
    -webkit-box-orient: vertical;
    color: #3C4557;
    display: -webkit-box;
    font-size: 14px;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    max-height: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__type {
    background-color: #F8F8FA;
    border-radius: 4px;
    color: #1155CB;
    font-size: 12px;
    font-weight: 500;
    padding: 1.5px 6px 2.5px 6px;
    text-transform: uppercase;

    &--active {
      background-color: #BDD3F9;
    }
  }

  &__developer {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &-info {
      align-items: center;
      display: flex;
      gap: 0.5rem;
    }

    &-avatar {
      border-radius: 50%;
      height: 32px;
      object-fit: cover;
      width: 32px;
    }

    &-name {
      color: #3C4557;
      display: block;
      font-size: 14px;
      font-weight: 500;
    }

    &-updated {
      color: #8A8A8A;
      display: block;
      font-size: 12px;
    }
  }
}
</style>