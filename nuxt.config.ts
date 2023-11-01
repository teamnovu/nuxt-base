// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'nuxt-graphql-client'
  ],

  components: [
    {
      path: '~/components/base',
      global: true,
    },
  ]
})
