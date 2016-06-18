global.Vue = require('vue');
global.VueRouter = require('vue-router');
global.VueResource = require('vue-resource');

var router = new VueRouter();
var foo = Vue.extend({
  template: '#testtemplate'
});

var bar = Vue.extend({
  template: '<p>This is bar!</p>'
});

var App = Vue.extend({});

router
  .redirect({
    '/': '/foo'
  })
  .map({
    '/foo': {
      component: foo
    },
    '/bar': {
      component: bar
    }
  })
  .start(App, '#app');


var thing = new Vue({
  el: '#test',
  data: {
    name: 'jimbob'
  }
})
