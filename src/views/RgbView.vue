<template>
  <div>
    <div class="tool clearfix">
      <btn-submit class="transparent fr tool-button" @click="off">
        Reset {{name}}
      </btn-submit>
      <h4>{{name}}</h4>
    </div>

    <div>
      <el-tabs :tab-position="tabStyle" v-model="activeTab">
        <el-tab-pane label="On" name="on">
          <form-rgb-on resource="/led/rgb" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <media :query="{maxWidth: 576}" @media-enter="tabStyle = 'top'" @media-leave="tabStyle = 'left'" />
  </div>
</template>

<script>
import Media from 'vue-media'
import client from '../api/client'
import FormRgbOn from '../components/FormRgbOn'

export default {
  name: 'RgbView',
  components: { Media, FormRgbOn },
  props: ['resource', 'name'],
  data () {
    return {
      tabStyle: 'left',
      activeTab: 'on'
    }
  },
  methods: {
    async off () {
      await client(this, this.resource + '/off')
    }
  }
}
</script>
