<template>
  <el-popover placement="bottom-start" v-on:show="reset" v-model="popover" transition="el-zoom-in-top">
    <h4 class="mgn0t tc">Server Configuration</h4>

    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="Label" prop="label">
        <el-select
          v-model="form.label"
          filterable allow-create default-first-option clearabl
          @change="select"
          placeholder="Select or create">
          <template>
            <li class="el-select-dropdown__header">Select or create a new one</li>
          </template>
          <el-option v-for="item in servers" :key="item.label" :label="item.label" :value="item.label">
            <btn-server-chooser-item :server="item" />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Host" prop="host">
        <el-input clearable placeholder="duino-k.local" v-model="form.host" />
      </el-form-item>
      <el-form-item label="HTTP Port" prop="httpPort">
        <el-input-number v-model="form.httpPort" :min="0" :max="65535"/>
      </el-form-item>
      <el-form-item label="WS Port" prop="wsPort">
        <el-input-number v-model="form.wsPort" :min="0" :max="65535"/>
      </el-form-item>
      <el-form-item label="Cover" prop="cover">
        <el-input clearable placeholder="http://unsplash.com/photo..." type="url" v-model="form.cover" />
      </el-form-item>
    </el-form>

    <div class="tr">
      <el-button type="text" class="fl" @click="demo">Demo</el-button>
      <el-button type="text" @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="apply" :disabled="!modifyed">Apply</el-button>
    </div>

    <el-button slot="reference" class="transparent fl">
      <i class="material-icons">language</i>
    </el-button>
  </el-popover>
</template>

<script>
import BtnServerChooserItem from './BtnServerChooserItem'

export default {
  components: {BtnServerChooserItem},
  name: 'BtnServerChooser',
  data () {
    return {
      form: {
        host: '',
        label: '',
        httpPort: 80,
        wsPort: 81,
        cover: ''
      },
      rules: {
        host: [
          {required: true}
        ],
        label: [
          {required: true}
        ],
        httpPort: [
          {required: true}
        ],
        wsPort: [
          {required: true}
        ],
        cover: [
          {type: 'url'}
        ]
      },
      popover: false
    }
  },
  computed: {
    modifyed () {
      const names = ['host', 'label', 'httpPort', 'wsPort', 'cover']
      return !!names.find(name => this.$store.state.service.config[name] !== this.form[name])
    },
    servers () {
      return this.$store.state.service.servers
    }
  },
  methods: {
    reset () {
      Object.assign(this.form, this.$store.state.service.config)
      this.$refs.form.clearValidate()
    },
    async apply () {
      const r = await this.$refs.form.validate()
      if (r) {
        this.popover = false
        await this.$store.dispatch('saveConfig', this.form)
        this.$router.push({name: 'root'})
      }
    },
    cancel () {
      this.popover = false
    },
    select (value) {
      const server = this.$store.getters.server(value)
      this.form.host = server.host
      this.form.httpPort = server.httpPort
      this.form.wsPort = server.wsPort
      this.form.cover = server.cover
    },
    demo () {
      this.form.host = 'duino-k.herokuapp.com'
      this.form.label = 'Demo Server #1'
      this.form.httpPort = 80
      this.form.wsPort = 80
    }
  }
}
</script>
