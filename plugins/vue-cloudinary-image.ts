import CloudinaryImage from '@teamnovu/vue-cloudinary-image'
import AppImage from '@teamnovu/vue-cloudinary-image-statamic'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CloudinaryImage, {
    cloudinaryBaseUrl: nuxtApp.$config.public.CLOUDINARY_BASE_URL,
  })

  nuxtApp.vueApp.use(AppImage, {})
})
