import { vi, describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'

import servicesData from '../../../mocks/services'
import { useModalStore } from '../../stores/modal'

import ServiceCatalog from '../ServiceCatalog.vue'

// A helper to wait until all pending promises resolve.
const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0))

// Mock the axios module for fetching API services
const mockedResponses = new Map()
  .set('/api/services', vi.fn(() => ({
    data: servicesData,
  })))

vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios')
  return {
    default: {
      ...actual.default,
      // Mock get request responses
      get: (url: string) => vi.fn().mockResolvedValue(mockedResponses.get(url) !== undefined
        ? mockedResponses.get(url)()
        : undefined)(),
    },
  }
})

beforeEach(() => {
  // Make sure the default mock returns the real services
  mockedResponses.get('/api/services').mockReturnValue({ data: servicesData })
})

// Example component test for ServiceCatalog.vue
describe('ServiceCatalog', () => {
  it('shows the SearchInput component', async () => {
    // No `mockedResponses` modification needed; just use the default mocked response
    const wrapper = mount(ServiceCatalog, { global: { plugins: [createPinia()] } })

    expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
  })

  it('properly handles no services returned from the API', async () => {
    // Provide a custom `mockedResponses` response payload instead of using the default mocked response
    mockedResponses.get('/api/services').mockReturnValue({
      data: [],
    })

    const wrapper = mount(ServiceCatalog, { global: { plugins: [createPinia()] } })

    expect(wrapper.findTestId('no-results').isVisible()).toBe(true)
  })

  it('filters services based on search input', async () => {
    // Mount with a stub for ServiceCard, so we can see how many are rendered
    const wrapper = mount(ServiceCatalog, {
      global: {
        plugins: [createPinia()],
        stubs: {
          ServiceCard: {
            props: ['service', 'loading'],
            template: '<div data-testid="service-card">{{ service.name }}</div>',
          },
        },
      },
    })

    // Flush microtasks & wait for vue to update the dom
    await flushPromises()
    await nextTick()

    const cardsAfterMount = wrapper.findAll('[data-testid="service-card"]')
    expect(cardsAfterMount.length).toBe(3)

    const inputEl = wrapper.find('.search-input')
    await inputEl.setValue('Luxurious')

    // Wait 350 ms in real time for the debounce
    await new Promise(resolve => setTimeout(resolve, 350))

    await flushPromises()
    await nextTick()

    const cardsAfterFilter = wrapper.findAll('[data-testid="service-card"]')
    expect(cardsAfterFilter.length).toBe(1)
    expect(cardsAfterFilter[0].text()).toContain('Luxurious')
  })

  it('resets current page when filtered services change', async () => {
    // Stub ServiceCard as above.
    const wrapper = mount(ServiceCatalog, {
      global: {
        plugins: [createPinia()],
        stubs: {
          ServiceCard: {
            props: ['service', 'loading'],
            template:
              '<div data-testid="service-card">{{ service.name }}</div>',
          },
        },
      },
    })

    await flushPromises()
    await nextTick()

    // Manually set the current page to simulate a user navigating to page 2.
    wrapper.vm.currentPage = 2

    // Change the search query so that the filtered list shrinks.
    const inputEl = wrapper.find('.search-input')
    await inputEl.setValue('Concrete') // Matches "Luxurious Concrete Soap"

    await new Promise(resolve => setTimeout(resolve, 350))

    await flushPromises()
    await nextTick()

    // When the filtered list changes the watch should reset currentPage to 1.
    expect(wrapper.vm.currentPage).toBe(1)
  })

  it('opens service detail modal when a service is clicked', async () => {
    // Stub ServiceCard to emit the click event with its service payload.
    const wrapper = mount(ServiceCatalog, {
      global: {
        plugins: [createPinia()],
        stubs: {
          ServiceCard: {
            props: ['service', 'loading'],
            template:
              '<div data-testid="service-card" @click="$emit(\'click-service\', service)">{{ service.name }}</div>',
          },
        },
      },
    })

    await flushPromises()
    await nextTick()

    const modalStore = useModalStore()
    const openModalSpy = vi.spyOn(modalStore, 'openModal')

    // Simulate clicking the first service card.
    const firstCard = wrapper.findTestId('service-card')
    await firstCard.trigger('click')

    expect(openModalSpy).toHaveBeenCalledWith({
      component: expect.any(Object), // This should be markRaw(ServiceDetail)
      componentProps: { service: servicesData[0] },
    })
  })

  it('closes modal when service is created', async () => {
    // Stub ServiceCreateButton to render a button that emits "service-created".
    const wrapper = mount(ServiceCatalog, {
      global: {
        plugins: [createPinia()],
        stubs: {
          ServiceCreateButton: {
            template:
              '<button data-testid="service-create-button" @click="$emit(\'service-created\')">Create Service</button>',
          },
        },
      },
    })

    await flushPromises()
    await nextTick()

    const modalStore = useModalStore()
    const closeModalSpy = vi.spyOn(modalStore, 'closeModal')

    const createButton = wrapper.find('[data-testid="service-create-button"]')
    await createButton.trigger('click')

    expect(closeModalSpy).toHaveBeenCalled()
  })
})
