<template>
  <div>
    <div class="tool clearfix">
      <h4>{{name}}</h4>
    </div>

    <div>
      <el-tabs :tab-position="tabStyle" v-model="activeTab">
        <el-tab-pane label="Command" name="command">
          <form-ir-command :resource="resource" :commands="commands" />
        </el-tab-pane>
        <el-tab-pane label="Raw" name="raw">
          <form-ir-raw :resource="resource" />
        </el-tab-pane>
        <el-tab-pane label="Send" name="send">
          <form-ir-send :resource="resource" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <media :query="{maxWidth: 576}" @media-enter="tabStyle = 'top'" @media-leave="tabStyle = 'left'" />
  </div>
</template>

<script>
import Media from 'vue-media'
import client from '../api/client'
import FormIrCommand from '../components/FormIrCommand'
import FormIrRaw from '../components/FormIrRaw'
import FormIrSend from '../components/FormIrSend'

export default {
  name: 'IrxView',
  components: { Media, FormIrCommand, FormIrRaw, FormIrSend },
  props: ['resource', 'name'],
  data () {
    return {
      tabStyle: 'left',
      activeTab: 'command',
      commands: []
    }
  },
  created () {
    this.getCommands()
  },
  methods: {
    async getCommands () {
      const data = await client(this, this.resource + '/commands', {}, true)
      this.commands = data.commands
    }
  }
}
</script>
