<template>
  <section
    class="service-developers"
  >
    <div
      v-if="isLoading || !allAvatarsLoaded"
      class="spinner"
    >
      <img
        alt="Loading..."
        src="@/assets/icons/icon-spinner.svg"
      >
    </div>

    <template v-else>
      <!-- If there are more than 2, show a circle indicating the remaining count -->
      <div
        v-if="developers.length > 2"
        class="service-developers__avatar service-developers__avatar--extra"
        :style="{ zIndex: 3 }"
      >
        <span class="service-developers__initials">
          +{{ developers.length - 2 }}
        </span>
      </div>

      <!-- Show up to 2 developer avatars -->
      <div
        v-for="(developer, index) in visibleDevelopers"
        :key="developer.id"
        class="service-developers__avatar"
        :style="{ zIndex: visibleDevelopers.length - index }"
      >
        <img
          v-if="developer.avatar"
          :alt="developer.name"
          :src="developer.avatar"
        >

        <span
          v-else
          class="service-developers__initials"
        >
          {{ getInitials(developer.name) }}
        </span>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import type { ServiceVersion, Developer } from '@/types'

const props = defineProps<{
  versions: ServiceVersion[] | null
}>()

const imageLoaded = reactive<Record<string, boolean>>({})

const isLoading = computed(() => props.versions == null)

const developers = computed<Developer[]>(() => {
  const uniqueDevelopers = new Map<string, Developer>()

  props.versions?.forEach((version) => {
    const dev = version.developer

    if (dev && !uniqueDevelopers.has(dev.id)) {
      uniqueDevelopers.set(dev.id, dev)
    }
  })

  return Array.from(uniqueDevelopers.values())
})

const visibleDevelopers = computed(() => {
  return developers.value.length <= 2 ? developers.value : developers.value.slice(0, 2)
})

// Preload avatar images for developers that have one.
watch(
  developers,
  (newDevelopers) => {
    newDevelopers.forEach((dev) => {
      if (dev.avatar && imageLoaded[dev.id] !== true) {
        const img = new Image()

        img.onload = () => {
          imageLoaded[dev.id] = true
        }

        img.onerror = () => {
          imageLoaded[dev.id] = false
        }

        img.src = dev.avatar
      }
    })
  },
  { immediate: true },
)

const allAvatarsLoaded = computed(() => {
  return visibleDevelopers.value.every((dev) => {
    if (dev.avatar) {
      return imageLoaded[dev.id] === true
    }

    return true
  })
})

function getInitials(name: string): string {
  if (!name) {
    return ''
  }

  const initials = name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()

  return initials.substring(0, 2)
}
</script>

<style lang="scss" scoped>
.service-developers {
  align-items: center;
  display: inline-flex;

  &__avatar {
    align-items: center;
    background-color: #eee;
    border-radius: 50%;
    display: flex;
    height: 36px;
    justify-content: center;
    overflow: hidden;
    width: 36px;

    /* Overlap subsequent avatars with negative margin */
    & + .service-developers__avatar {
      margin-left: -10px;
    }

    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  &__initials {
    color: #333;
    font-size: 0.75rem;
  }

  &__avatar--extra {
    background-color: #f1f1f8;
    border: 2px solid #fff;
    color: #777D8A;
    font-size: 12px;
    font-weight: 600;
    line-height: 24px;
  }
}
</style>