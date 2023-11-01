<template>
  <div>
    <h1>Hello novu Developer!</h1>
    <pre>{{ myLayer }}</pre>
  </div>
</template>

<script setup lang="ts">
const { myLayer } = useAppConfig()
</script>
