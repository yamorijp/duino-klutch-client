<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Data" prop="data">
        <el-select v-model="form.data" placeholder="command...">
          <el-option v-for="item in commands" :key="item" :label="item" :value="item" />
        </el-select>
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
  name: 'FormIrCommand',
  props: ['resource', 'commands'],
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
      await client(this, this.resource + '/command', {params: this.form})
    }
  }
}
</script>
