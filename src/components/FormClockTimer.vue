<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Presets">
        <el-button-group>
          <el-button class="transparent" @click="preset(180, 0, 33)">3min-Alarm</el-button>
          <el-button class="transparent" @click="preset(1800, 21, 20)">30m-Switch</el-button>
          <el-button class="transparent" @click="preset(0, 0, 0)">Nothing</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="Pre Action" prop="pre">
        <el-select v-model="form.pre" placeholder="type" value="">
          <el-option v-for="item in actions" :key="item[1]" :label="item[0]" :value="item[1]" />
        </el-select>
      </el-form-item>
      <el-form-item label="Delay" prop="delay">
        <el-input-number prefix-icon="el-icon-time" placeholder="duration..." v-model="form.delay" :min="0" :max="65535" />
        <code class="mgn10 x-large"><i class="el-icon-time"></i> {{ preview }}</code>
        <div>
          <el-button-group>
            <el-button class="transparent" @click="form.delay+=30">+30s</el-button>
            <el-button class="transparent" @click="form.delay+=60">+1M</el-button>
            <el-button class="transparent" @click="form.delay+=300">+5M</el-button>
            <el-button class="transparent" @click="form.delay+=600">+10M</el-button>
            <el-button class="transparent" @click="form.delay+=1800">+30M</el-button>
            <el-button class="transparent" @click="form.delay+=3600">+1H</el-button>
            <el-button class="transparent" @click="form.delay=0">RESET</el-button>
          </el-button-group>
        </div>

      </el-form-item>
      <el-form-item label="Post Action" prop="post">
        <el-select v-model="form.post" placeholder="type" value="">
          <el-option v-for="item in actions" :key="item[1]" :label="item[0]" :value="item[1]" />
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
  name: 'FormClockTimer',
  props: ['resource'],
  data () {
    return {
      form: {
        pre: 21,
        delay: 1800,
        post: 20
      },
      actions: [
        ['NOTHING', 0],
        ['SW1_OFF', 10],
        ['SW1_ON', 11],
        ['SW2_OFF', 20],
        ['SW2_ON', 21],
        ['BUZZER_CLEAR', 30],
        ['BUZZER_BEEP', 31],
        ['BUZZER_BEEP_2', 32],
        ['BUZZER_REPEAT', 33]
      ],
      rules: {
        data: []
      }
    }
  },
  methods: {
    async add (n = 0) {
      this.form.duration += n
    },
    async submit () {
      this.$refs.form.validate(v => v ? this.send() : false)
    },
    async send () {
      await client(this, this.resource + '/timer', {params: this.form})
    },
    preset (delay, pre = 0, post = 0) {
      this.form.delay = delay
      this.form.pre = pre
      this.form.post = post
    }
  },
  computed: {
    preview () {
      const mm = parseInt((this.form.delay / 60).toString()).toString().padStart(2, '0')
      const ss = (this.form.delay % 60).toString().padStart(2, '0')
      return `${mm}:${ss}`
    }
  }
}
</script>
