<template>
  <q-page class="flex flex-center">
    {{ $t('success') }}
    {{ $auth.check() }}
    {{ $auth.user().created_at }}
    <q-btn color="primary" @click="$auth.logout()">
      {{ $t('auth.logout.logout') }}
    </q-btn>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  components: {}
}
</script>
