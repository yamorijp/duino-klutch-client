<template>
  <div class="panel-inner clickable next" @click="next">
    <div class="panel-content"><i class="material-icons">group_work</i></div>
    <div class="panel-title">{{name}}</div>
  </div>
</template>

<script>
export default {
  name: 'PanelRgbLed',
  props: ['resource', 'name'],
  methods: {
    next () {
      this.$router.push({
        name: 'rgb',
        query: {resource: this.resource, name: this.name}
      })
    }
  }
}
</script>
