<template>
  <span class="repeater">{{ txt }}</span>
</template>

<script>
let timer = null

export default {
  name: 'DotRepeater',
  data () {
    return {
      txt: '...'
    }
  },
  mounted () {
    timer = setInterval(this.tick, 500)
  },
  beforeDestroy () {
    clearInterval(timer)
  },
  methods: {
    tick () {
      if (this.txt.length >= 5) this.txt = ''
      this.txt += '.'
    }
  }
}
</script>

<style lang="stylus" scoped>
.repeater
  position absolute
</style>
