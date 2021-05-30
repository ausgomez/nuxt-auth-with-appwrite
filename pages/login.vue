<template>
  <div class="bg-blue-300">
    <div>user --> {{ $auth.user }}</div>
    <p>--> {{ $auth.loggedIn }}</p>

    <h1>Login</h1>

    <input type="text" v-model="email" />
    <input type="text" v-model="password" />

    <button
      class="p-5 bg-green-300 text-white font-bold rounded"
      v-on:click="login()"
      v-if="!$auth.loggedIn"
    >
      Login Perro
    </button>
    <button
      class="p-5 bg-red-300 text-white font-bold rounded"
      v-on:click="logout()"
      v-else
    >
      Logout Perro
    </button>

    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>

<script>
export default {
  // middleware: 'auth',
  data: () => ({
    email: 'nieve@gmail.com',
    password: 'sonic123',
  }),
  methods: {
    async login() {
      await this.$auth
        .loginWith('customStrategy', {
          email: this.email,
          password: this.password,
        })
        .then(async (response) => {
          console.log('correct login')
          // await this.$auth.setUser({ user: 'hey' })
          this.$router.push('/')
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async logout() {
      await this.$auth
        .logout()
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.error(err))
    },
  },
}
</script>

<style>
</style>