<template>
  <v-container grid-list-md text-md-center fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex md6>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>

          <div class="pl-4 pr-4 pt-2 pb-2">
            <input
              type="email"
              name="email"
              v-model="email"
              placeholder="email" />
            <br>
            <input
              type="password"
              name="password"
              v-model="password"
              placeholder="password" />
            <br>
            <div class="error" v-html="error" />
            <br>
            <div class="success" v-html="success" />
            <br>
            <v-btn class="cyan" @click="register">Register</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: '',
      success: ''
    }
  },
  methods: {
    async register () {
      this.error = ''
      this.success = ''
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.success = 'Registration succeeded'
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red
}
.success {
  color: green
}
</style>
