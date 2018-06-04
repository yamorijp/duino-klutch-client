<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Min" prop="min">
        <el-input-number v-model="form.min" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="Max" prop="max">
        <el-input-number v-model="form.max" :min="0" :max="9999" />
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
  name: 'FormFourdigitRoll',
  props: ['resource'],
  data () {
    return {
      form: {
        min: undefined,
        max: undefined,
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
      await client(this, this.resource + '/roll', {params: this.form})
    }
  }
}
</script>
