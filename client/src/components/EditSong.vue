<template>
  <v-layout>
    <v-flex xs4>
      <panel title='Song Metadata'>
        <v-text-field label='Title' required :rules="[required]" v-model="song.title"></v-text-field>
        <v-text-field label='Artist' required :rules="[required]" v-model="song.artist"></v-text-field>
        <v-text-field label='Genre' required :rules="[required]" v-model="song.genre"></v-text-field>
        <v-text-field label='Album' required :rules="[required]" v-model="song.album"></v-text-field>
        <v-text-field
          label='Album Image Url'
          required
          :rules='[required]'
          v-model='song.albumImageUrl'
        ></v-text-field>
        <v-text-field label='Youtube ID' required :rules="[required]" v-model="song.youtubeId"></v-text-field>
      </panel>
    </v-flex>
    <v-flex xs6>
      <panel title="Song Structure" class="ml-2">
        <v-textarea label="Tab" required :rules="[required]" v-model="song.lyrics"></v-textarea>
        <v-textarea label="Lyrics" required :rules="[required]" v-model="song.tab"></v-textarea>
      </panel>
      <br>
      <div class="ml-2" v-if="error">
        <v-alert :value="true" color="error" icon="info" outline>{{ error }}</v-alert>
      </div>
      <br>
      <v-btn dark class="cyan" @click="save">Save Song</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: value => !!value || 'Required'
    }
  },
  methods: {
    async save () {
      // console.log('Save Clicked')
      // Validate the all mandatory fields were satistified
      this.error = null
      const areAllFieldsFilledIn = Object.keys(this.song).every(
        key => !!this.song[key]
      )
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      try {
        const songId = this.$store.state.route.params.songId
        await SongsService.put(this.song)
        this.$router.push({
          name: 'songs',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
<style scoped>
.danger-alert {
  color: red;
}
</style>
