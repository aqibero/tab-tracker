<template>
  <panel title="Songs">
    <v-btn class="cyan accent-2"
      slot="action"
      @click="navigateTo({name: 'songs-create'})"
      light
      small
      absolute
      right
      sticky
      fab>
      <v-icon>add_circle</v-icon>
    </v-btn>
    <div class="song" v-for="song in songs" :key="song.id">
      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
          <div class="song-artist">
            {{song.artist}}
          </div>
          <div class="song-genre">
            {{song.genre}}
          </div>
          <v-btn
            dark
            class="cyan"
            @click="navigateTo({
              name: 'song',
              params: {
                songId: song.id
                }
            })">
            View
          </v-btn>
        </v-flex>

        <v-flex xs6>
          <img class="albun-image" v-bind:src="song.albumImageUrl" />
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
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

<style scooped>
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
