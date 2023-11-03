/**
 * Register composables which can be used in templates.
 */
export default defineNuxtPlugin(() => {
  return {
    provide: {
      isExternalUrl,
      removeHtmlTags,
      useTarget,
    },
  }
})
