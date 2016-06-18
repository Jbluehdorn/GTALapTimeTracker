<template>
  <div class="row">
    <nav-bar></nav-bar>
    <div class="col-xs-3 col-sm-2 sidebar">
      <side-bar></side-bar>
    </div>
    <div class="col-xs-9 col-xs-offset-3 col-sm-10 col-sm-offset-2" id="main-content-wrapper">
      <ul class="alert alert-danger" role="alert" v-show="shown" transition="bounce">
        <li v-for="error in errors" track-by="$index">{{error}}</li>
        <i class="fa fa-times dismiss-alert" @click="hide()"></i>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import SideBar from './components/SideBar.vue'
  import store from './components/store.js'
  import Vue from 'vue'

  export default {
    data() {
      return {
        errors: store.errors,
        hideErrors: false
      }
    },
    init() {
      var self = this;
      Vue.transition('bounce', {
        afterLeave: function(el) {
          store.errors = [];
          this.errors = store.errors;
        }
      });
    },
    computed: {
      shown: function() {
        return !!this.errors.length && !this.hideErrors;
      }
    },
    methods: {
      hide: function() {
        this.hideErrors = true;
      }
    },
    watch: {
      'errors': function(oldVal, newVal) {
        this.hideErrors = false;
      }
    },
    components: {
      NavBar,
      SideBar
    }
  }
</script>
