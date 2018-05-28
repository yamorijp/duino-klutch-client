<template>
  <div>
    <div class="tool clearfix">
      <el-button class="transparent fr tool-button" @click="next">
        Next Message
      </el-button>
      <el-button class="transparent fr tool-button" @click="clear">
        Reset {{name}}
      </el-button>
      <h4>{{name}}</h4>
    </div>

    <div>
      <el-tabs :tab-position="tabStyle" v-model="activeTab">
        <el-tab-pane label="Message" name="message">
          <form-matrix-message :resource="resource" />
        </el-tab-pane>
        <el-tab-pane label="Columns" name="columns">
          <form-matrix-columns :resource="resource" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <media :query="{maxWidth: 576}" @media-enter="tabStyle = 'top'" @media-leave="tabStyle = 'left'" />
  </div>
</template>

<script>
import Media from 'vue-media'
import client from '../api/client'
import FormMatrixMessage from '../components/FormMatrixMessage'
import FormMatrixColumns from '../components/FormMatrixColumns'

export default {
  name: 'MatrixView',
  components: { Media, FormMatrixMessage, FormMatrixColumns },
  props: ['resource', 'name'],
  data () {
    return {
      tabStyle: 'left',
      activeTab: 'message'
    }
  },
  methods: {
    async next () {
      await client(this, this.resource + '/next')
    },
    async clear () {
      await client(this, this.resource + '/clear')
    }
  }
}
</script>
