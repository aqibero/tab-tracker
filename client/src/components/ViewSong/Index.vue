<template>
  <div>
    <v-layout fluid md6>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>

      <v-flex xs6 md6 class="ml-2">
        <you-tube :youtubeId="song.youtubeId" />
      </v-flex>
    </v-layout>

    <v-layout class="mt-2">
      <v-flex xs6>
        <tab :song="song" />
      </v-flex>

      <v-flex xs6 class="ml-2">
        <lyrics :song="song" />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import SongMetadata from './SongMetadata'
import YouTube from './YouTube'
import Tab from './Tab'
import Lyrics from './Lyrics'
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: null
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  components: {
    SongMetadata,
    YouTube,
    Lyrics,
    Tab
  }
}
</script>
<style scoped>
.v-textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  border-style: none;
  border-color:transparent;
  overflow: auto;
  padding:40px;
}
</style>
