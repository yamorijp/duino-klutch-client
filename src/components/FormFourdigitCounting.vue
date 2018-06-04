<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="From" prop="from">
        <el-input-number v-model="form.from" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="To" prop="to">
        <el-input-number v-model="form.to" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="Step" prop="step">
        <el-input-number v-model="form.step" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="Brightness" prop="brightness">
        <el-input-number v-model="form.brightness" :min="1" :max="7" />
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
  name: 'FormFourdigitCounting',
  props: ['resource'],
  data () {
    return {
      form: {
        from: undefined,
        to: undefined,
        step: undefined,
        brightness: undefined
      },
      rules: {
      }
    }
  },
  methods: {
    async submit () {
      this.$refs.form.validate(v => v ? this.send() : false)
    },
    async send () {
      await client(this, this.resource + '/counting', {params: this.form})
    }
  }
}
</script>
