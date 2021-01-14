import Vue from 'vue'
import App from './App.vue'
//importing only esm/components/modal/modal to reduce bundle size
import { BModal } from 'bootstrap-vue/esm/components/modal/modal'

Vue.component( 'b-modal', BModal )

new Vue({
  el: '#app',
  render: h => h(App)
})
