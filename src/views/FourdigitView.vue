<template>
  <div>
    <div class="tool clearfix">
      <el-button class="transparent fr tool-button" @click="clear">
        Reset {{name}}
      </el-button>
      <h4>{{name}}</h4>
    </div>

    <div>
      <el-tabs :tab-position="tabStyle" v-model="activeTab">
        <el-tab-pane label="Number" name="number">
          <form-fourdigit-number :resource="resource" />
        </el-tab-pane>
        <el-tab-pane label="Segments" name="segments">
          <form-fourdigit-segments :resource="resource" />
        </el-tab-pane>
        <el-tab-pane label="Counting" name="counting">
          <form-fourdigit-counting :resource="resource" />
        </el-tab-pane>
        <el-tab-pane label="Roll" name="roll">
          <form-fourdigit-roll :resource="resource" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <media :query="{maxWidth: 576}" @media-enter="tabStyle = 'top'" @media-leave="tabStyle = 'left'" />
  </div>
</template>

<script>
import Media from 'vue-media'
import client from '../api/client'
import FormFourdigitNumber from '../components/FormFourdigitNumber'
import FormFourdigitSegments from '../components/FormFourdigitSegments'
import FormFourdigitCounting from '../components/FormFourdigitCounting'
import FormFourdigitRoll from '../components/FormFourdigitRoll'

export default {
  name: 'FourdigitView',
  components: { Media, FormFourdigitNumber, FormFourdigitSegments, FormFourdigitCounting, FormFourdigitRoll },
  props: ['resource', 'name'],
  data () {
    return {
      tabStyle: 'left',
      activeTab: 'number'
    }
  },
  methods: {
    async clear () {
      await client(this, this.resource + '/clear')
    }
  }
}
</script>
