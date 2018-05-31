<template>
  <el-popover placement="bottom-end" v-model="popover" transition="el-zoom-in-top">
    <div class="tc">
      <input-segment-led ref="digit0" v-model="segments[0]" />
      <input-segment-led ref="digit1" v-model="segments[1]" ex="colon" />
      <input-segment-led ref="digit2" v-model="segments[2]" />
      <input-segment-led ref="digit3" v-model="segments[3]" />
    </div>

    <div class="tr mgn10t">
      <el-button disabled class="fl">{{preview}}</el-button>
      <el-button type="text" @click="clear">Clear</el-button>
      <el-button type="primary" @click="apply">Apply</el-button>
    </div>

    <div slot="reference">
      <el-button @click="popover = !popover" icon="el-icon-edit-outline">
      </el-button>
    </div>
  </el-popover>
</template>

<script>
import InputSegmentLed from './InputSegmentLed'

export default {
  name: 'PickerFourSegments',
  components: {InputSegmentLed},
  props: ['data'],
  data () {
    return {
      segments: ['00', '00', '00', '00'],
      popover: false,
      value: ''
    }
  },
  computed: {
    preview () {
      return this.segments.join('')
    }
  },
  methods: {
    apply () {
      const value = this.segments.join('')
      if (this.value !== value) {
        this.$emit('input', value)
        this.$emit('change', value)
        this.value = value
      }
      this.popover = false
    },
    clear () {
      this.$refs.digit0.clear()
      this.$refs.digit1.clear()
      this.$refs.digit2.clear()
      this.$refs.digit3.clear()
    },
    cancel () {
      this.popover = false
    }
  }
}
</script>
