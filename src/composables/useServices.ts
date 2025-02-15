import { ref, onMounted } from 'vue'
import axios from 'axios'

import type { Service } from '@/types'

export default function useServices(autoFetch = true) {
  const services = ref<Service[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const getServices = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const { data } = await axios.get<Service[]>('/api/services')
      services.value = data
    } catch (err: any) {
      // Use the error message if available, otherwise a generic error message.
      error.value = err.message || 'An error occurred while fetching services.'
    } finally {
      loading.value = false
    }
  }

  if (autoFetch) {
    onMounted(() => {
      getServices()
    })
  }

  return {
    services,
    loading,
    error,
    getServices, // Expose the function for manual refresh if needed.
  }
}
