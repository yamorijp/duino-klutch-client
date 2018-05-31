<template>
  <el-popover placement="bottom-end" v-model="popover" transition="el-zoom-in-top">
    <div class="tc">
      <input-matrix-led v-for="i in n" v-model="matrix[i-1]" :key="i" ref="inputs" />
    </div>

    <div class="tr mgn10t">
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
import InputMatrixLed from './InputMatrixLed'

export default {
  name: 'PickerMatrix',
  components: {InputMatrixLed},
  props: ['n'],
  data () {
    return {
      matrix: [],
      popover: false,
      value: ''
    }
  },
  created () {
    for (let i = 0; i < this.n; i++) {
      this.matrix[i] = '0000000000000000'
    }
  },
  computed: {
    preview () {
      return this.matrix.join('')
    }
  },
  methods: {
    clear () {
      this.$refs.inputs.forEach(vm => vm.clear())
    },
    apply () {
      const value = this.matrix.join('')
      if (this.value !== value) {
        this.$emit('input', value)
        this.$emit('change', value)
        this.value = value
      }
      this.popover = false
    },
    cancel () {
      this.popover = false
    }
  }
}
</script>
