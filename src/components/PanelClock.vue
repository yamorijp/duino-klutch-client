<template>
  <div class="panel-inner clickable next" @click="next">
    <div class="panel-content verbose" v-if="verbose">
      <code class="main-l text-display">{{ clock }}<sup v-if="timer" class="small pad5l">T</sup></code>
      <span class="sub-tr smaller">{{ day }}</span>
      <span class="sub-br smaller">{{ calendar }}</span>
    </div>
    <div class="panel-content" v-if="!verbose">
      <code class="text-display">{{ clock }}<sup v-if="timer" class="small pad5l">T</sup></code>

    </div>
    <div class="panel-title">{{name}}</div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PanelClock',
  props: ['resource', 'name', 'verbose'],
  computed: {
    clock () {
      return this.datetime ? this.datetime.format('HH:mm') : '--:--'
    },
    calendar () {
      return this.datetime ? this.datetime.format('MM.DD') : ''
    },
    day () {
      return this.datetime ? this.datetime.format('ddd') : ''
    },
    timer () {
      const data = this.$store.state.service.resources[this.resource]
      return data && data.timer
    },
    datetime () {
      const data = this.$store.state.service.resources[this.resource]
      return data ? moment.unix(data.value) : null
    }
  },
  methods: {
    next () {
      this.$router.push({
        name: 'clock',
        query: {resource: this.resource, name: this.name}
      })
    }
  }
}
</script>
<style type="text/css" scoped>
  .verbose .main-l {
    margin-right:60px;
    padding-right:8px;
    border-right:1px solid #fff;
  }
  .sub-tr {
    position:absolute;
    right:0;
    top:2px;
    width:50px;
    text-align:left;
  }
  .sub-br {
    position:absolute;
    right:0;
    bottom:2px;
    width:50px;
    text-align:left;
  }
</style>
