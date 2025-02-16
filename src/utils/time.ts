const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // Determine the largest time unit to use
  if (seconds < 60) {
    return rtf.format(-seconds, 'second')
  }

  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return rtf.format(-minutes, 'minute')
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return rtf.format(-hours, 'hour')
  }

  const days = Math.floor(hours / 24)

  return rtf.format(-days, 'day')
}
