<template>
  <v-toolbar fixed color="grey darken-3" dark>
    <v-toolbar-title class="mr-4">
      <span
        class="home"
        @click="navigateTo({name: 'root'})">
        Home
      </span>
    </v-toolbar-title>
    <!-- <v-toolbar-items>
      <v-btn flat dark>
        Browse
      </v-btn>
    </v-toolbar-items>   -->
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat dark
        @click="navigateTo({name: 'login'})">
        Login
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn flat dark
        @click="navigateTo({name: 'register'})">
        Sign Up
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (Pageroute) {
      this.$router.push(Pageroute)
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer
}
.home:hover {
  color:cyan
}

</style>
