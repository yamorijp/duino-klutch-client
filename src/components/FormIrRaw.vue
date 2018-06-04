<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Data" prop="data">
        <el-input type="textarea" :autosize="{minRows:2, maxRows:8}" placeholder="raw data..." v-model="form.data" />
      </el-form-item>
      <el-form-item label="Hz" prop="hz">
        <el-input-number v-model="form.hz" placeholder="hz" :min="1" :max="1000" />
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
  name: 'FormIrRaw',
  props: ['resource'],
  data () {
    return {
      form: {
        data: undefined,
        hz: undefined
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
      await client(this, this.resource + '/raw', {params: this.form})
    }
  }
}
</script>
