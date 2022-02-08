<template>
  <div>
    <el-row>
      <el-col :span="8" v-if="sensorHandlers.length">
        <h3>Sensor</h3>
        <div class="panels">
          <div class="panel" v-for="item in sensorHandlers" :key="item.resource">
            <panel-hygro-thermo-sensor v-if="item.type === 'HygroThermoSensor'" :resource="item.resource" :name="item.name" />
            <panel-analog-sensor v-if="item.type === 'AnalogSensor'" :resource="item.resource" :name="item.name" />
            <panel-clock v-if="item.type === 'Clock'" :resource="item.resource" :name="item.name" />
          </div>
        </div>
      </el-col>

      <el-col :span="8" v-if="switchHandlers.length">
        <h3>Switch</h3>
        <div class="panels">
          <div class="panel" v-for="item in switchHandlers" :key="item.resource">
            <panel-output-switch v-if="item.type === 'OutputSwitch'" :resource="item.resource" :name="item.name" />
            <panel-input-switch v-if="item.type === 'InputSwitch'" :resource="item.resource" :name="item.name" />
            <panel-input-switch v-if="item.type === 'MotionInputSwitch'" :resource="item.resource" :name="item.name" style_="motion" />
          </div>
        </div>
      </el-col>

      <el-col :span="8" v-if="ledHandlers.length">
        <h3>LED</h3>
        <div class="panels">
          <div class="panel" v-for="item in ledHandlers" :key="item.resource">
            <panel-matrix-led v-if="item.type === 'MatrixLed'" :resource="item.resource" :name="item.name" />
            <panel-rgb-led v-if="item.type === 'RGBLed'" :resource="item.resource" :name="item.name" />
            <panel-four-digit-led v-if="item.type === 'FourDigitLed'" :resource="item.resource" :name="item.name" />
          </div>
        </div>
      </el-col>

      <el-col :span="8" v-if="deviceHandlers.length">
        <h3>Devices</h3>
        <div class="panels">
          <div class="panel" v-for="item in deviceHandlers" :key="item.resource">
            <panel-display v-if="item.type === 'Display'" :resource="item.resource" :name="item.name" />
            <panel-buzzer v-if="item.type === 'Buzzer'" :resource="item.resource" :name="item.name" />
          </div>
        </div>
      </el-col>

      <el-col :span="8" v-if="irHandlers.length">
        <h3>IR</h3>
        <div class="panels">
          <div class="panel" v-for="item in irHandlers" :key="item.resource">
            <panel-ir-transmitter v-if="item.type === 'IRTransmitter'" :resource="item.resource" :name="item.name" :x="false" />
            <panel-ir-transmitter v-if="item.type === 'MyHomeIRTransmitter'" :resource="item.resource" :name="item.name" :x="true" />
          </div>
        </div>
      </el-col>
    </el-row>

    <panel-debug v-if="showDebugPanel" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PanelHygroThermoSensor from '../components/PanelHygroThermoSensor'
import PanelAnalogSensor from '../components/PanelAnalogSensor'
import PanelBuzzer from '../components/PanelBuzzer'
import PanelDisplay from '../components/PanelDisplay'
import PanelClock from '../components/PanelClock'
import PanelInputSwitch from '../components/PanelInputSwitch'
import PanelOutputSwitch from '../components/PanelOutputSwitch'
import PanelMatrixLed from '../components/PanelMatrixLed'
import PanelRgbLed from '../components/PanelRgbLed'
import PanelFourDigitLed from '../components/PanelFourDigitLed'
import PanelIrTransmitter from '../components/PanelIrTransmitter'
import PanelDebug from '../components/PanelDebug'

export default {
  name: 'DashboardView',
  components: {
    PanelHygroThermoSensor,
    PanelAnalogSensor,
    PanelBuzzer,
    PanelDisplay,
    PanelClock,
    PanelOutputSwitch,
    PanelInputSwitch,
    PanelMatrixLed,
    PanelRgbLed,
    PanelFourDigitLed,
    PanelIrTransmitter,
    PanelDebug
  },
  data () {
    return {
      showDebugPanel: false
    }
  },
  computed: {
    handlers () {
      return this.$store.state.service.handlers
    },
    ...mapGetters([
      'sensorHandlers', 'switchHandlers', 'ledHandlers', 'irHandlers', 'deviceHandlers'
    ])
  }
}
</script>
