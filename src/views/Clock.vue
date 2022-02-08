<template>
  <div>
    <div class="tool clearfix">
      <btn-submit class="transparent fr tool-button" @click="clear">
        Clear {{name}}
      </btn-submit>
      <h4>{{name}}</h4>
    </div>

    <div>
      <el-tabs :tab-position="tabStyle" v-model="activeTab">
        <el-tab-pane label="Timer" name="timer">
          <form-clock-timer :resource="resource" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <media :query="{maxWidth: 576}" @media-enter="tabStyle = 'top'" @media-leave="tabStyle = 'left'" />
  </div>
</template>

<script>
import Media from 'vue-media'
import client from '../api/client'
import FormClockTimer from '../components/FormClockTimer'

export default {
  name: 'ClockView',
  components: { Media, FormClockTimer },
  props: ['resource', 'name'],
  data () {
    return {
      tabStyle: 'left',
      activeTab: 'timer'
    }
  },
  methods: {
    async clear () {
      await client(this, this.resource + '/clear')
    }
  }
}
</script>
