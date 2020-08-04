import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // 新增顏色
        dhyellow: '#F9e54E',
        dhorange: '#F8981D',
        dhred: '#E12E4B',
        dhblue: '#5BBDC8'
      }
    }
  }
})
