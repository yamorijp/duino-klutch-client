<script>
import {Button} from 'element-ui'

export default {
  name: 'BtnSubmit',
  extends: Button,
  computed: {
    requesting () {
      return this.$store.state.service.requesting
    },
    buttonDisabled () {
      return this.disabled || (this.elForm || {}).disabled || this.requesting
    }
  }
}
</script>
