<template>
  <div>
    <h1>HOME</h1>
    {{ this.$auth.user }}
    == {{ this.$auth.loggedIn }}
    <br />
    <nuxt-link to="/login">Home</nuxt-link>
  </div>
</template>

<script>
export default {
  // middleware: 'auth',
  data: () => ({}),
}
</script>

<style>
</style>