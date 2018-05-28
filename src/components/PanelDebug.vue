<template>
  <el-row>
    <el-col :span="8">
      <h3>Debug</h3>
      <div class="panels">
        <div class="panel">
          <panel-hygro-thermo-sensor resource="/sensor/ht" name="Hygrothermo" />
        </div>
        <div class="panel">
          <panel-analog-sensor resource="/sensor/brightness" name="Analog" />
        </div>
        <div class="panel">
          <panel-output-switch resource="/switch/relay" name="OutputSw" />
        </div>
        <div class="panel">
          <panel-input-switch resource="/switch/motion" name="InputSw" />
        </div>
        <div class="panel">
          <panel-matrix-led resource="/led/matrix" name="Matrix" />
        </div>
        <div class="panel">
          <panel-rgb-led resource="/led/rgb" name="RGB" />
        </div>
        <div class="panel">
          <panel-four-digit-led resource="/led/4digit" name="FourDigit" />
        </div>
        <div class="panel">
          <panel-ir-transmitter resource="/ir/transmitter" name="IR+" :x="true"/>
        </div>
        <div class="panel">
          <panel-ir-transmitter resource="/ir/transmitter" name="IR" :x="false"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import PanelHygroThermoSensor from '../components/PanelHygroThermoSensor'
import PanelAnalogSensor from '../components/PanelAnalogSensor'
import PanelInputSwitch from '../components/PanelInputSwitch'
import PanelOutputSwitch from '../components/PanelOutputSwitch'
import PanelMatrixLed from '../components/PanelMatrixLed'
import PanelRgbLed from '../components/PanelRgbLed'
import PanelFourDigitLed from '../components/PanelFourDigitLed'
import PanelIrTransmitter from '../components/PanelIrTransmitter'

export default {
  name: 'DashboardView',
  components: {
    PanelHygroThermoSensor,
    PanelAnalogSensor,
    PanelOutputSwitch,
    PanelInputSwitch,
    PanelMatrixLed,
    PanelRgbLed,
    PanelFourDigitLed,
    PanelIrTransmitter
  }
}
</script>
