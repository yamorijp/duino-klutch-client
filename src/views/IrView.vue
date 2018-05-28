<template>
  <div>
    <div class="tool clearfix">
      <h4>{{name}}</h4>
    </div>

    <div>
      <el-tabs :tab-position="tabStyle" v-model="activeTab">
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
import FormIrRaw from '../components/FormIrRaw'
import FormIrSend from '../components/FormIrSend'

export default {
  name: 'IrView',
  components: { Media, FormIrRaw, FormIrSend },
  props: ['resource', 'name'],
  data () {
    return {
      tabStyle: 'left',
      activeTab: 'raw',
      commands: []
    }
  }
}
</script>
