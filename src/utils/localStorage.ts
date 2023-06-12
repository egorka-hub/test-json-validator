const storage = {
  get: (key: string): string | null => {
    const result = localStorage.getItem(key)

    if (!result) return null
    try {
      // Нужна только строка (без экранирований)
      // return JSON.parse(result)
      return result
    } catch {
      return result
    }
  },
  set: (key: string, value: string | NonNullable<unknown> | []): void => {
    localStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    )
  },
  clear: (): void => {
    localStorage.clear()
  }
}
export default storage
