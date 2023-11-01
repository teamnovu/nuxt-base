export default defineAppConfig({
  myLayer: {
    name: '@teamnovu/nuxt-base'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
