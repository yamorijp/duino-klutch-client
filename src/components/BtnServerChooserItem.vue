<template>
  <div>
    <span class="fl">
      {{ server.label }}<br>
      <small>{{ server.host }}</small>
    </span>
    <span class="fr"><el-button class="text-danger" type="text" icon="el-icon-circle-close" @click.stop="del" /></span>
  </div>
</template>

<script>
export default {
  name: 'BtnServerChooserItem',
  props: ['server'],
  methods: {
    del () {
      this.$store.dispatch('deleteServer', this.server.label)
    }
  }
}
</script>
