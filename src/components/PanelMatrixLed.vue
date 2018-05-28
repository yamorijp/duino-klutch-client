<template>
  <div class="panel-inner clickable next" @click="next">
    <div class="panel-content"><i class="material-icons">apps</i></div>
    <div class="panel-title">{{name}}</div>
  </div>
</template>

<script>
export default {
  name: 'PanelMatrixLed',
  props: ['resource', 'name'],
  methods: {
    next () {
      this.$router.push({
        name: 'matrix',
        query: {resource: this.resource, name: this.name}
      })
    }
  }
}
</script>
