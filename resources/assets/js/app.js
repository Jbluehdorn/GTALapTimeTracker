import SPA from 'SPA'
import Main from './Main.vue'

import all from './routes/all.vue'
import cars from './routes/cars.vue'
import search from './routes/search.vue'
import searchResult from './routes/searchResult.vue'

const $vm = new SPA();

$vm
    .redirects({
      '/' : '/all'
    })
    .routes({
      '/all': {
        component: all
      },
      '/car': {
        component: cars
      },
      '/search/:id': {
        component: searchResult
      },
      '/search': {
        component: search
      }
    })
    .app(Main)
    .start('#app')
