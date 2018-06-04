<template>
  <span>{{animatedValue}}</span>
</template>

<script>
import TweenLite from 'gsap/TweenLite'

export default {
  name: 'AnimatedNumber',
  props: {
    value: Number,
    digits: {
      type: Number,
      default: 0
    },
    empty: {
      type: String,
      default: '--'
    }
  },
  data () {
    return {
      tweenValue: null
    }
  },
  created () {
    this.tweenValue = this.value
  },
  computed: {
    animatedValue () {
      return this.tweenValue === null
        ? this.empty : this.tweenValue.toFixed(this.digits)
    }
  },
  watch: {
    value (v) {
      if (!this.isEmpty(v)) {
        if (this.tweenValue === null) this.tweenValue = 0
        TweenLite.to(this, 0.5, {tweenValue: v})
      } else {
        this.tweenValue = null
      }
    }
  },
  methods: {
    isEmpty (v) {
      return v === undefined || v === null || v === ''
    }
  }
}
</script>
