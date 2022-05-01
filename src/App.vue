<template>
  <div class="app">
    <app-header />
    <app-content />
  </div>
</template>

<script>
import storage from '@/services/storage';
import { PAYMENTS } from '@/constants/storageKeys';

export default {

  name: 'App',

  beforeCreate() {
    const payments = storage.get(PAYMENTS);

    if (payments) {
      this.$store.commit('setState', { isCached: true });
      this.$store.commit('setState', { data: JSON.parse(payments) });
    }
  },
};
</script>
