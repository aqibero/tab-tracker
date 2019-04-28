<template>
  <v-container grid-list-md text-md-center fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex md6>
        <panel title="Login">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              v-model="email"
              placeholder="Email"
            ></v-text-field>
            <br>
            <v-text-field
              name="password"
              v-model="password"
              type="password"
              placeholder="Password"
              ></v-text-field>
            <br>
            <div class="error" v-html="error" />
            <br>
            <div class="success" v-html="success" />
            <br>
            <v-btn dark class="cyan" @click="login">Login</v-btn>
          </div>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
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
    async login () {
      this.error = ''
      this.success = ''
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.success = 'Login Successful'
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.error {
  background-color:#ffffff !important;
  color: red;
}
.success {
  color: green;
  background-color:#ffffff !important;
}
</style>
