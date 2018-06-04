<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Data" prop="data">
        <el-input placeholder="hex string..." v-model="form.data">
          <template slot="append">
            <picker-matrix v-model="form.data" :n="2" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <btn-submit type="primary" @click="submit">Submit</btn-submit>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import client from '../api/client'
import PickerMatrix from './PickerMatrix'

export default {
  name: 'FormMatrixColumns',
  components: {PickerMatrix},
  props: ['resource'],
  data () {
    return {
      form: {
        data: undefined
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
      await client(this, this.resource + '/columns', {params: this.form})
    }
  }
}
</script>
