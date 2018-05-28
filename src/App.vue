<template>
  <div id="app">
    <el-container>
      <el-header height="auto">
        <el-row>
          <h2>
            <el-button v-if="closable" class="transparent fr" @click="close">
              <i class="material-icons">close</i>
            </el-button>

            <btn-server-config />

            <router-link to="/" class="fl mgn5l">
              <small>{{host}}</small><br>
              <span>{{label}}</span>
            </router-link>
          </h2>
        </el-row>

        <el-row v-if="status === 'unavailable'">
          <p class="text-display pad20 mgn20">
            Service is un-reachable.<br>
            Please click <a @click="reconnect" class="link">here to reconnect</a> or click <i class="material-icons" style="position:relative; top:3px">language</i> icon to connect different server.
          </p>
        </el-row>
        <el-row v-if="status === 'loading'">
          <p class="text-display pad20 mgn20">
            Connecting to service<dot-repeater /><br>
            Please stand by.
          </p>
        </el-row>
      </el-header>

      <el-main>
        <transition name="el-zoom-in-bottom" mode="out-in" :duration="{enter:500,leave:0}">
          <router-view v-if="status === 'ok'" class="view" />
        </transition>
      </el-main>

      <el-footer>
        <a href="https://github.com/yamorijp/duino-klutch-client">
          <img class="github" src="/static/img/github-32x32.png" width="16" height="16" alt="github" />
          <span style="color: #fff">duino</span>
          <span style="color: #bbb">klutch</span>
        </a>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import DotRepeater from './components/DotRepeater'
import BtnServerConfig from './components/BtnServerConfig'

export default {
  name: 'App',
  components: {BtnServerConfig, DotRepeater},
  data () {
    return {
      closable: false
    }
  },
  methods: {
    close () {
      this.$router.push({name: 'root'})
    },
    reconnect () {
      // wait for a while
      this.$store.commit('status', 'loading')
      setTimeout(() => {
        this.$store.dispatch('connect')
      }, Math.random() * 2000 + 1000)
    }
  },
  computed: {
    host () {
      return this.$store.state.service.config.host
    },
    label () {
      return this.$store.state.service.config.label
    },
    status () {
      return this.$store.state.service.status
    }
  },
  watch: {
    '$route' (to, from) {
      this.closable = to.name !== 'root'
    }
  },
  mounted () {
    this.closable = this.$router.currentRoute.name !== 'root'
  }
}
</script>

<style lang="stylus" scoped>
#app
  margin-top 20px
.view
  opacity 1.0
  transition-property all
.v-leave
  opacity 1.0
  translateX(0)
.v-leave-active
  opacity 0.1
  translateX(-100px)
.v-enter
  opacity 0.1
.v-enter-active
  opacity 1.0
</style>
