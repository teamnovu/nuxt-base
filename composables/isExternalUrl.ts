export const isExternalUrl = (url: string) => {
  if (!url) return null
  const regex = /^(https?:\/\/)/
  return regex.test(url)
}
