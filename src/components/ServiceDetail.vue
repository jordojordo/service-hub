<template>
  <div class="service-details">
    <h2 class="service-details__name">
      {{ props.service?.name || '' }}
    </h2>

    <div class="versions">
      <h3>Versions ({{ props.service?.versions?.length }})</h3>
      <div
        v-for="version in props.service?.versions"
        :key="version?.id"
        class="version-row"
      >
        <!-- First: version number -->
        <div class="version-row__first">
          <span class="version__number">v{{ version?.name || '' }}</span>
        </div>

        <!-- Second: description -->
        <div class="version-row__second">
          <span class="version__description">{{ version?.description || '' }}</span>
        </div>

        <!-- Third: type pill -->
        <div class="version-row__third">
          <span
            class="version__type"
            :class="{ 'version__type--active': props.service?.type?.toLowerCase() === 'http' }"
          >
            HTTP
          </span>

          <span
            class="version__type"
            :class="{ 'version__type--active': props.service?.type?.toLowerCase() === 'rest' }"
          >
            REST
          </span>
        </div>

        <!-- Fourth: developer info + updated date -->
        <div class="version-row__fourth">
          <div class="version__developer">
            <img
              v-if="version.developer?.avatar"
              alt="Developer avatar"
              class="version__developer-avatar"
              :src="version.developer.avatar"
            >

            <div class="version__developer-info">
              <span class="version__developer-name">
                {{ version.developer?.name ? truncateDeveloperName(version.developer.name) : '' }}
              </span>
              <span class="version__developer-updated">
                {{ version?.updated_at ? formatTimeAgo(version.updated_at) : '' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatRelativeTime } from '@/utils/time'

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
})

function truncateDeveloperName(name: string): string {
  const parts = name.split(' ')

  if (parts.length > 1) {
    // Use the first part (first name) and the first letter of the last part (last name)
    return `${parts[0]} ${parts[parts.length - 1][0]}.`
  }

  return name
}


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
}

.versions {
  gap: 32px;
  margin-top: 1.5rem;

  h3 {
    color: #0B172D;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }
}

.version-row {
  align-items: start;
  border-bottom: 1px solid #F1F1F5;
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  padding: 1rem 0;

  &:last-child {
    border-bottom: none;
  }

  &__first {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  &__third {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    max-width: 120px;
    min-width: 100px;
  }

  &__fourth {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    min-width: 140px;
    width: 140px;
  }
}

/* --- Individual version details --- */
.version {
  &__number {
    color: #262626;
    font-size: 13px;
    font-weight: 600;
    line-height: 24px;
  }

  &__description {
    -webkit-box-orient: vertical;
    color: #8A8A8A;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }

  &__type {
    background-color: #F8F8FA;
    border-radius: 4px;
    color: #1155CB;
    font-size: 10px;
    font-weight: 500;
    line-height: 14px;
    opacity: 90%;
    padding: 1.5px 6px 2.5px 6px;
    text-transform: uppercase;

    &--active {
      background-color: #BDD3F9;
    }
  }

  &__developer {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;

    &-avatar {
      border-radius: 50%;
      height: 20px;
      object-fit: cover;
      width: 20px;
    }
    &-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      white-space: nowrap;
    }
    &-name {
      color: #3C4557;
      font-size: 13px;
      font-weight: 600;
      line-height: 24px;
    }

    &-updated {
      color: #8A8A8A;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
    }
  }
}

@media (max-width: 768px) {
  .version-row {
    gap: 16px;
    grid-template-columns: 1fr 1fr;
    padding: 0.75rem 0;
  }

  .version-row__first,
  .version-row__second {
    grid-column: span 2;
  }

  .version-row__third,
  .version-row__fourth {
    grid-column: auto;
  }

  .version__number, .version__developer-name {
    font-size: 14px;
  }
}
</style>