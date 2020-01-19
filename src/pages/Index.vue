<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
    <Login> </Login>
  </q-page>
</template>

<script>
import Login from './Login';

export default {
  name: 'PageIndex',
  comments: {
    Login,
  },
};
</script>
