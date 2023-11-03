/**
 * A Nuxt3 composable that determines the appropriate `target` attribute for an anchor tag.
 * It uses the provided 'to' parameter to check whether a URL is external and should therefore open in a new tab.
 * If the 'target' parameter is specified by the user, it takes precedence over the automatic detection.
 * This composable returns null as the default behavior if no URL is provided,
 * '_blank' for opening in a new tab/window, or '_self' for the default behavior when the URL is internal.
 *
 * @param {string} to - The URL to which the link points.
 * @param {string | null} target - Optional. The target attribute specified by the user, can be 'self' or 'blank'.
 * @returns {string} The target attribute value for the anchor tag.
 */

export const useTarget = (to: string, target: string | null) => {
  if (!to) return null

  // If the user can define the target for a link in the CMS, it will taken into account here
  if (target === 'self') return '_self'
  if (target === 'blank') return '_blank'

  // Else check if the link is external or not
  return isExternalUrl(to) ? '_blank' : '_self'
}

/**
 * Checks if a given URL is external by testing for 'http://' or 'https://' prefixes.
 *
 * @param {string} url - The URL to be checked.
 * @returns {boolean|null} True if the URL is external, false if not, or null if the URL is empty.
 */
function isExternalUrl(url: string) {
  if (!url) return null
  const regex = /^(https?:\/\/)/
  return regex.test(url)
}
