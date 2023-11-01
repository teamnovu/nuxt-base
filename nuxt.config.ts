const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: IN_DEVELOPMENT,

    timeline: {
      enabled: true,
    },
  },

  modules: [
    'nuxt-graphql-client'
  ],
})
