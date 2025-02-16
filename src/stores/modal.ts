import type { Component } from 'vue'
import { defineStore } from 'pinia'

export interface ModalOptions {
  component: Component | string // the dynamic component to load
  componentProps?: Record<string, any> // props to pass to the component
  header?: string // optional header text
}

export const useModalStore = defineStore('modal', {
  state: () => ({
    isModalOpen: false,
    modalOptions: null as ModalOptions | null,
  }),

  actions: {
    openModal(options: ModalOptions) {
      this.modalOptions = options
      this.isModalOpen = true
    },
    closeModal() {
      this.modalOptions = null
      this.isModalOpen = false
    },
  },
})
