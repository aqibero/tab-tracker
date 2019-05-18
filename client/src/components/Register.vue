<template>
  <v-container grid-list-md text-md-center fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex md6>
        <panel title="Register">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <form
              name="tab-tracker-form" autocomplete="off">
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
                autocomplete="new-password"
                ></v-text-field>
            </form>
            <br>
            <div v-html="error" v-if="error">
              <v-alert
              :value="true"
              color="cyan"
              icon="info"
              outline>
              {{ error }}
              </v-alert>
            </div>
            <br>
            <div class="success" v-html="success" />
            <br>
            <v-btn dark class="cyan" @click="register">Register</v-btn>
          </div>
        </panel>
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
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.success = 'Sucess'
      } catch (error) {
        this.error = error.response.data.error
      }
    }
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
