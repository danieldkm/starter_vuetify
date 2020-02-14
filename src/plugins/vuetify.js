import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt.js'

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    lang: {
        locales: { pt },
        current: 'pt2',
    }
})