<template>
  <span>
    <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="100px" viewBox="-1 -1 12 20">
      <g style="fill-rule:evenodd; stroke:#f0f0f6; stroke-width:0.25; stroke-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;">
        <polygon class="seg" value="1" points=" 1,1 2,0 8,0 9,1 8,2 2,2" />
        <polygon class="seg" value="2" points=" 9,1 10,2 10,8 9,9 8,8 8,2" />
        <polygon class="seg" value="4" points=" 9,9 10,10 10,16 9,17 8,16 8,10" />
        <polygon class="seg" value="8" points=" 9,17 8,18 2,18 1,17 2,16 8,16" />
        <polygon class="seg" value="16" points=" 1,17 0,16 0,10 1,9 2,10 2,16" />
        <polygon class="seg" value="32" points=" 1,9 0,8 0,2 1,1 2,2 2,8" />
        <polygon class="seg" value="64" points=" 1,9 2,8 8,8 9,9 8,10 2,10" />
      </g>
    </svg>

    <svg v-if="ex === 'colon'" xmlns="http://www.w3.org/2000/svg" width="20px" height="100px">
      <g class="seg" value="128">
        <circle cx="10" cy="30" r="5" />
        <circle cx="10" cy="70" r="5" />
      </g>
    </svg>

    <svg v-if="ex === 'period'" xmlns="http://www.w3.org/2000/svg" width="20px" height="100px">
      <g class="seg" value="128">
        <circle cx="10" cy="90" r="5" />
      </g>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'InputSegmentLed',
  props: ['ex'],
  mounted () {
    Array.from(this.$el.getElementsByClassName('seg'))
      .forEach(el => el.addEventListener('click', this.toggle, true))
  },
  data () {
    return {
      value: '00'
    }
  },
  methods: {
    toggle (event) {
      const el = event.target.classList.contains('seg') ? event.target : event.target.parentElement
      el.classList.toggle('on')
      this.calculate()
    },
    clear () {
      Array.from(this.$el.getElementsByClassName('on'))
        .forEach(el => el.classList.remove('on'))
      this.value = '00'
      this.$emit('input', this.value)
    },
    calculate () {
      this.value = Array.from(this.$el.getElementsByClassName('on'))
        .map(el => parseInt(el.getAttribute('value')))
        .reduce((x, y) => x + y, 0)
        .toString(16)
        .padStart(2, '0')
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
polygon.seg
g.seg circle
  cursor pointer
  fill #c0c0c0

polygon.seg.on
g.seg.on circle
  fill #f01000
</style>
