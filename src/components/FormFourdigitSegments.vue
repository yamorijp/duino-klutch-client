<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Data" prop="data">
        <el-input clearable placeholder="hex string..." v-model="form.data">
          <template slot="append">
            <picker-four-segments v-model="form.data" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Brightness" prop="brightness">
        <el-input-number v-model="form.brightness" :min="1" :max="7" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import client from '../api/client'
import PickerFourSegments from './PickerFourSegments'

export default {
  components: {PickerFourSegments},
  name: 'FormFourdigitSegments',
  props: ['resource'],
  data () {
    return {
      form: {
        data: undefined,
        brightness: undefined
      },
      rules: {
        data: [
          {required: true}
        ]
      }
    }
  },
  methods: {
    async submit () {
      this.$refs.form.validate(v => v ? this.send() : false)
    },
    async send () {
      await client(this, this.resource + '/segments', {params: this.form})
    }
  }
}
</script>
