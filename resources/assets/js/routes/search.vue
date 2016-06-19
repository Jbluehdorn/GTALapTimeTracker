<template>
  <div id="search">
    <div class="col-xs-12 form-group">
      <div class="inner-addon large">
        <input type="text" class="form-control input-lg" v-model="searchVehicle" placeholder="Search" id="vehicleSearch">
        <i class="fa fa-search"></i>
      </div>
      <button type="button" @click="search" class="btn btn-primary">Go!</button>
    </div>
    {{vehicles | json}}
  </div>
</template>

<script>
import linq from 'jslinq'
import typeahead from 'typeahead'
import store from '../components/store.js'

export default {
  ready() {
    this.initializeTypeahead();
  },
  data() {
    return {
      searchVehicle: '',
      vehicles: store.getVehicles()
    }
  },
  methods: {
    search() {

    },
    initializeTypeahead() {
      let vehicleNames = [];
      this.vehicles.forEach(function(vehicle) {
        vehicleNames.push(vehicle.make + ' ' + vehicle.model);
      });

      var el = document.getElementById('vehicleSearch');

      // source is an array of items
      var ta = typeahead(el, {
        source: vehicleNames
      });
    }
  }
}
</script>
