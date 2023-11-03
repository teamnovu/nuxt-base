<!--
  Displays a cms button in the bottom left corner of the screen when
  not in production mode to link the corresponding backend page

  Place this button in e.g. in the [...url].vue

  <CmsButton v-if="entry.edit_url" :edit-url="entry.edit_url" />

  REQUIREMENTS
  - RuntimeConfig public.APP_ENV
  - entry.edit_url
-->



<template>
  <DevOnly>
    <a
      v-if="showButton"
      target="_blank"
      :href="editUrl"
      class="fixed bottom-10 left-10 z-50 rounded bg-black px-2 py-1 text-white shadow"
    >
      CMS
    </a>
  </DevOnly>
</template>

<script setup>
defineProps({
  editUrl: {
    type: String,
    required: true,
  },
})
const config = useRuntimeConfig()
const showButton = computed(() => config.public.APP_ENV !== 'production')
</script>
