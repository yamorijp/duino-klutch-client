<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Data" prop="data">
        <el-input placeholder="ascii text..." v-model="form.data" />
      </el-form-item>
      <el-form-item label="N" prop="n">
        <el-input-number v-model="form.n" :min="-1" :max="100" />
      </el-form-item>
      <el-form-item label="Instant" prop="instant">
        <el-switch v-model="form.instant" active-value="1" inactive-value="0" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import client from '../api/client'

export default {
  name: 'FormMatrixMessage',
  props: ['resource'],
  data () {
    return {
      form: {
        data: undefined,
        n: undefined,
        instant: undefined
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
      await client(this, this.resource + '/message', {params: this.form})
    }
  }
}
</script>

<style scoped>

</style>
