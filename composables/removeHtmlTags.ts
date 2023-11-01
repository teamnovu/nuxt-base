export const removeHtmlTags = (html: string) => {
  if (!html) return null

  // Replace </p><p> with a newline
  html = html.replace(/<\/p>\s*<p>/g, '\n')
  // Remove all HTML tags
  return html.replace(/<\/?[^>]+(>|$)/g, '')
}
