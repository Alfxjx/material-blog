export function formatTime(time) {
  if (!time) {
    return ''
  }
  time = time.toString()
  return time.slice(0, 10)
}
