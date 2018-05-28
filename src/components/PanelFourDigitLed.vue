<template>
  <div class="panel-inner clickable next" @click="next">
    <div class="panel-content"><i class="material-icons">money</i></div>
    <div class="panel-title">{{name}}</div>
  </div>
</template>

<script>
export default {
  name: 'PanelFourDigitLed',
  props: ['resource', 'name'],
  methods: {
    next () {
      this.$router.push({
        name: 'fourdigit',
        query: {resource: this.resource, name: this.name}
      })
    }
  }
}
</script>
