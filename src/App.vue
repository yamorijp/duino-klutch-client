<template>
  <div id="app">
    <loading-indicator />
    <div class="container">
      <header height="auto">
        <el-row>
          <h2>
            <el-button v-if="closable" class="transparent fr" @click="close">
              <i class="material-icons">close</i>
            </el-button>

            <btn-server-chooser />

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
      </header>

      <section class="main">
        <transition name="el-zoom-in-bottom" mode="out-in" :duration="{enter:200,leave:0}">
          <router-view v-if="status === 'ok'" class="view" />
        </transition>
      </section>

      <footer>
        <a href="https://github.com/yamorijp/duino-klutch-client">
          <img class="github" src="/static/img/github-32x32.png" width="16" height="16" alt="github" />
          <span style="color: #fff">duino</span>
          <span style="color: #bbb">klutch</span>
        </a>
        <a :href="apidoc">api</a>
      </footer>
    </div>
  </div>
</template>

<script>
import DotRepeater from './components/DotRepeater'
import BtnServerChooser from './components/BtnServerChooser'
import LoadingIndicator from './components/LodingIndicator'

export default {
  name: 'App',
  components: {BtnServerChooser, DotRepeater, LoadingIndicator},
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
    },
    apidoc () {
      const server = this.$store.state.service.config
      const proto = server.secure ? 'https' : 'http'
      const port = server.httpPort === 80 ? '' : `:${server.httpPort}`
      return `${proto}://${server.host}${port}/docs`
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
footer a:nth-child(2)
  padding-left 5px
  margin-left 5px
  border-left 1px solid #999
</style>
