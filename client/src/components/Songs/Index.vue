<template>
  <v-container grid-list-md text-md-center fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex md6>
        <songs-search-panel />
        <songs-panel class="mt-2"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import SongsService from '@/services/SongsService'
export default {
  components: {
    SongsPanel,
    SongsSearchPanel
  },
  data () {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    // Do a request to the backend for all the songs
    this.songs = (await SongsService.index()).data
    // console.log('songs', this.songs)
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow:hidden;
}

.song-title {
  font-size:30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}

.albun-image {
width: 70%;
margin: 0 auto;
}

</style>
