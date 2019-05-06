<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>

      <v-flex xs6 class="ml-2">
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

    <!-- <v-layout>
      <v-flex xs6>
        <panel title="YouTube Video">
        </panel>
      </v-flex>
      <v-flex xs6 class="ml-2">
        <panel title="Lyrics">
          <v-container fluid grid-list-md>
            <v-textarea
            auto-grow
            aria-readonly
            v-model="song.lyrics"
            ></v-textarea>
          </v-container>
        </panel>
      </v-flex>
      <v-flex xs6>
        <panel title="Tabs" class="ml-2">
          <v-container fluid grid-list-md>
            <v-textarea auto-grow readonly label="Tabs" v-model="song.tab">
            </v-textarea>
          </v-container>
        </panel>
      </v-flex>
    </v-layout> -->
  </div>
</template>
<script>
import SongMetadata from './SongMetadata'
import YouTube from './YouTube'
import Tab from './Tab'
import Lyrics from './Lyrics'
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
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
    Panel,
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
