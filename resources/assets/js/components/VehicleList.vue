<template>
  <div id="VehicleList">
    <div class="loading" v-if="loading"><i class="fa fa-spin fa-spinner"></i></div>
    <div class="table-responsive" v-else>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Class</th>
            <th>Best Lap</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehicle in vehicles | orderBy 'bestLap'" track-by="$index">
            <td>{{vehicle.make}}</td>
            <td>{{vehicle.model}}</td>
            <td>{{vehicle.class}}</td>
            <td>{{vehicle.bestLap}} sec</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import store from './store.js'
  import linq from 'jslinq'

  export default {
    ready() {
      this.get();
    },
    data() {
      return {
        vehiclesToRetrieve: store.vehiclesToRetrieve,
        vehicles: store.vehicles,
        loading: false
      }
    },
    methods: {
      get() {
        var self = this;
        this.loading = true;
        if(!store.vehicles.length) {
          store.getVehicles();

          self.vehicles = store.vehicles;
        }

        if(self.vehiclesToRetrieve !== 'all') {
          self.filter();
        } else {
          self.loading = false;
        }
      },
      filter() {
        let self = this;
        let query = this.vehiclesToRetrieve;

        this.vehicles = linq(this.vehicles)
          .where(function(vehicle) {
            return vehicle.make.includes(query) || vehicle.model.includes(query) || vehicle.class.includes(query) || vehicle.type.includes(query);
          })
          .toList();

        this.loading = false;
      }
    }
  }
</script>
