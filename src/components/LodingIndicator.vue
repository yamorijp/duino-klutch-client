<template>
  <div v-show="visible" class="indicator"></div>
</template>

<script>
export default {
  name: 'LoadingIndicator',
  data () {
    return {
      visible: false
    }
  },
  watch: {
    '$store.state.service.requesting' (value, old) {
      if (value) {
        this.visible = true
      } else {
        // アニメーション終了まで表示
        this.$el.addEventListener('animationiteration', e => {
          this.visible = false
        }, {once: true, capture: false})
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes interminate
  0%
    opacity 0
    width 0
    background #409eff
  80%
    opacity 1
    width 100%
  100%
    opacity 0

.indicator
  position fixed
  top 0
  left 0
  right 0
  pointer-events none
  height 2px
  margin 0 auto
  animation interminate 1.2s 0s ease-in-out infinite backwards
</style>
