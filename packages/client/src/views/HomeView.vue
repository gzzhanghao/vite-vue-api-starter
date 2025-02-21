<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';

const { state } = useAsyncState(async () => {
  const res = await fetch('/api/hello');
  return res.text();
}, undefined);
</script>

<template>
  <div class="u-w-100vw u-h-100vh">
    {{ state }}
  </div>
</template>
