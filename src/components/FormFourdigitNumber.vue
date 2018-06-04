<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Data" prop="data">
        <el-input-number placeholder="number..." v-model="form.data" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="Leading Zero" prop="leading_zero">
        <el-switch v-model="form.leading_zero" active-value="1" inactive-value="0" />
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
  name: 'FormFourdigitNumber',
  props: ['resource'],
  data () {
    return {
      form: {
        data: undefined,
        leading_zero: undefined,
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
      await client(this, this.resource + '/number', {params: this.form})
    }
  }
}
</script>

<style scoped>

</style>
