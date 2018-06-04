<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Data" prop="data">
        <el-input class="color-input" placeholder="hex string..." v-model="form.data">
          <template slot="append">
            <el-color-picker v-model="form.data" popper-class="el-popover el-popper" />
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

export default {
  name: 'FormRgbOn',
  props: ['resource'],
  data () {
    return {
      form: {
        data: ''
      },
      rules: {
        data: []
      }
    }
  },
  methods: {
    async submit () {
      this.$refs.form.validate(v => v ? this.send() : false)
    },
    async send () {
      await client(this, this.resource + '/on', {params: this.form})
    }
  }
}
</script>
