<template>
  <panel title="Lyrics">
    <v-textarea
      readonly
      v-model="song.lyrics"
    ></v-textarea>
  </panel>
</template>

<script>
export default {
  props: ['song']
}
</script>
<style scoped>
.v-textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 10px;
}
</style>
