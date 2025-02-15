<template>
  <section
    v-if="developers && developers.length"
    class="service-developers"
  >
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
      <!-- If we have an avatar URL -->
      <img
        v-if="developer.avatar"
        :alt="developer.name"
        :src="developer.avatar"
      >
      <!-- Otherwise, show initials -->
      <span
        v-else
        class="service-developers__initials"
      >
        {{ getInitials(developer.name) }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { ServiceVersion, Developer } from '@/types'

const props = defineProps<{
  versions: ServiceVersion[]
}>()

const developers = ref<Developer[]>([])

onMounted(() => {
  const devs = props.versions.map(v => v.developer).filter(Boolean)
  developers.value = Array.from(new Set(devs.map(d => d.id)))
    .map(id => devs.find(d => d.id === id)!)
})

const visibleDevelopers = computed(() => {
  return developers.value.length <= 2 ? developers.value : developers.value.slice(0, 2)
})

function getInitials(name: string): string {
  const names = name.split(' ')

  if (names.length === 1) {
    return names[0].charAt(0)
  }

  return names[0].charAt(0) + names[names.length - 1].charAt(0)
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