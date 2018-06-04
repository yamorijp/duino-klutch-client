<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Data" prop="data">
        <el-input placeholder="hex string..." v-model="form.data" />
      </el-form-item>
      <el-form-item label="Type" prop="type">
        <el-select v-model="form.type" placeholder="type">
          <el-option v-for="item in types" :key="item[1]" :label="item[0]" :value="item[1]" />
        </el-select>
      </el-form-item>
      <el-form-item label="Bits" prop="bits">
        <el-input-number v-model="form.bits" :min="1" :max="1000" />
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
  name: 'FormIrSend',
  props: ['resource'],
  data () {
    return {
      form: {
        data: undefined,
        type: undefined,
        bits: undefined
      },
      types: [
        ['RC5', 1],
        ['RC6', 2],
        ['NEC', 3],
        ['SONY', 4],
        ['PANASONIC', 5],
        ['JVC', 6],
        ['SAMSUNG', 7],
        ['WHYNTER', 8],
        ['AIWA_RC_T501', 9],
        ['LG', 10],
        ['SANYO', 11],
        ['MITSUBISHI', 12],
        ['DISH', 13],
        ['SHARP', 14],
        ['COOLIX', 15],
        ['DAIKIN', 16],
        ['DENON', 17],
        ['KELVINATOR', 18],
        ['SHERWOOD', 19],
        ['MITSUBISHI_AC', 20],
        ['RCMM', 21],
        ['SANYO_LC7461', 22],
        ['RC5X', 23],
        ['GREE', 24],
        ['PRONTO', 25],
        ['NEC_LIKE', 26],
        ['ARGO', 27],
        ['TROTEC', 28],
        ['NIKAI', 29],
        ['RAW', 30],
        ['GLOBALCACHE', 31],
        ['TOSHIBA_AC', 32],
        ['FUJITSU_AC', 33],
        ['MIDEA', 34],
        ['MAGIQUEST', 35],
        ['LASERTAG', 36],
        ['CARRIER_AC', 37],
        ['HAIER_AC', 38],
        ['MITSUBISHI2', 39],
        ['HITACHI_AC', 40]
      ],
      rules: {
        data: [
          {required: true}
        ],
        type: [
          {required: true}
        ],
        bits: [
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
      await client(this, this.resource + '/send', {params: this.form})
    }
  }
}
</script>
