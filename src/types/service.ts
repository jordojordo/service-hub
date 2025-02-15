export type ServiceType = 'REST' | 'HTTP'

export interface Developer {
  avatar: string
  email: string
  id: string
  name: string
}

export interface ServiceVersion {
  id: string
  /** A semver string */
  name: string
  description: string
  /** Only present if the service is published */
  developer: Developer
  updated_at: Date
}

export interface Metrics {
  latency: number
  uptime: number
  requests: number
  errors: number
}

export interface Service {
  id: string
  name: string
  description: string
  type: ServiceType
  published: boolean
  configured: boolean
  versions: ServiceVersion[]
  /** Only present if the service is configured */
  metrics?: Metrics
}
