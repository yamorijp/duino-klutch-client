<template>
  <span>
    <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px">
      <g class="column">
        <circle value="1" cx="12" cy="12" r="8" />
        <circle value="2" cx="12" cy="30" r="8" />
        <circle value="4" cx="12" cy="48" r="8" />
        <circle value="8" cx="12" cy="66" r="8" />
        <circle value="16" cx="12" cy="84" r="8" />
        <circle value="32" cx="12" cy="102" r="8" />
        <circle value="64" cx="12" cy="120" r="8" />
        <circle value="128" cx="12" cy="138" r="8" />
      </g>
      <g class="column">
        <circle value="1" cx="30" cy="12" r="8" />
        <circle value="2" cx="30" cy="30" r="8" />
        <circle value="4" cx="30" cy="48" r="8" />
        <circle value="8" cx="30" cy="66" r="8" />
        <circle value="16" cx="30" cy="84" r="8" />
        <circle value="32" cx="30" cy="102" r="8" />
        <circle value="64" cx="30" cy="120" r="8" />
        <circle value="128" cx="30" cy="138" r="8" />
      </g>
      <g class="column">
        <circle value="1" cx="48" cy="12" r="8" />
        <circle value="2" cx="48" cy="30" r="8" />
        <circle value="4" cx="48" cy="48" r="8" />
        <circle value="8" cx="48" cy="66" r="8" />
        <circle value="16" cx="48" cy="84" r="8" />
        <circle value="32" cx="48" cy="102" r="8" />
        <circle value="64" cx="48" cy="120" r="8" />
        <circle value="128" cx="48" cy="138" r="8" />
      </g>
      <g class="column">
        <circle value="1" cx="66" cy="12" r="8" />
        <circle value="2" cx="66" cy="30" r="8" />
        <circle value="4" cx="66" cy="48" r="8" />
        <circle value="8" cx="66" cy="66" r="8" />
        <circle value="16" cx="66" cy="84" r="8" />
        <circle value="32" cx="66" cy="102" r="8" />
        <circle value="64" cx="66" cy="120" r="8" />
        <circle value="128" cx="66" cy="138" r="8" />
      </g>
      <g class="column">
        <circle value="1" cx="84" cy="12" r="8" />
        <circle value="2" cx="84" cy="30" r="8" />
        <circle value="4" cx="84" cy="48" r="8" />
        <circle value="8" cx="84" cy="66" r="8" />
        <circle value="16" cx="84" cy="84" r="8" />
        <circle value="32" cx="84" cy="102" r="8" />
        <circle value="64" cx="84" cy="120" r="8" />
        <circle value="128" cx="84" cy="138" r="8" />
      </g>
      <g class="column">
        <circle value="1" cx="102" cy="12" r="8" />
        <circle value="2" cx="102" cy="30" r="8" />
        <circle value="4" cx="102" cy="48" r="8" />
        <circle value="8" cx="102" cy="66" r="8" />
        <circle value="16" cx="102" cy="84" r="8" />
        <circle value="32" cx="102" cy="102" r="8" />
        <circle value="64" cx="102" cy="120" r="8" />
        <circle value="128" cx="102" cy="138" r="8" />
      </g>
      <g class="column">
        <circle value="1" cx="120" cy="12" r="8" />
        <circle value="2" cx="120" cy="30" r="8" />
        <circle value="4" cx="120" cy="48" r="8" />
        <circle value="8" cx="120" cy="66" r="8" />
        <circle value="16" cx="120" cy="84" r="8" />
        <circle value="32" cx="120" cy="102" r="8" />
        <circle value="64" cx="120" cy="120" r="8" />
        <circle value="128" cx="120" cy="138" r="8" />
      </g>
      <g class="column">
        <circle value="1" cx="138" cy="12" r="8" />
        <circle value="2" cx="138" cy="30" r="8" />
        <circle value="4" cx="138" cy="48" r="8" />
        <circle value="8" cx="138" cy="66" r="8" />
        <circle value="16" cx="138" cy="84" r="8" />
        <circle value="32" cx="138" cy="102" r="8" />
        <circle value="64" cx="138" cy="120" r="8" />
        <circle value="128" cx="138" cy="138" r="8" />
      </g>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'InputMatrixLed',
  mounted () {
    Array.from(this.$el.getElementsByTagName('circle'))
      .forEach(el => el.addEventListener('click', this.toggle, true))
  },
  data () {
    return {
      value: '0000000000000000'
    }
  },
  methods: {
    toggle (event) {
      event.target.classList.toggle('on')
      this.calculate()
    },
    clear () {
      Array.from(this.$el.getElementsByClassName('on'))
        .forEach(el => el.classList.remove('on'))
      this.value = '0000000000000000'
      this.$emit('input', this.value)
    },
    calculate () {
      this.value = Array.from(this.$el.getElementsByClassName('column'))
        .map(g => {
          return Array.from(g.getElementsByClassName('on'))
            .map(circle => parseInt(circle.getAttribute('value')))
            .reduce((x, y) => x + y, 0)
            .toString(16)
            .padStart(2, '0')
        })
        .join('')
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
circle
  cursor pointer
  fill #c0c0c0
circle.on
  fill #f01000
</style>
