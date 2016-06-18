<template>
  <div id="searchResult">
    <div v-if="error">
      <h1>Error</h1>
      <h3>Vehicle not found</h3>
    </div>
    <div class="loading" v-if="loading"><i class="fa fa-spin fa-spinner"></i></div>
    <div v-else transition="slide">
      <h1>{{vehicle.make}} {{vehicle.model}}</h1>
      <img v-bind:src="image" class="img-thumbnail img-responsive">

      <hr>
      {{vehicle | json}}
    </div>
  </div>
</template>

<script>
  import store from '../components/store.js'
  import linq from 'jslinq'

  export default {
    data() {
      return {
        image: '',
        loading: false,
        vehicle: {}
      }
    },
    ready() {
      this.getVehicle(parseInt(this.$route.params.id));
    },
    computed: {
      error() {
        return !this.loading && !this.vehicle;
      }
    },
    methods: {
      getVehicle(id) {
        this.loading = true;
        if(!store.vehicles.length) {
          store.getVehicles();
        }

        this.vehicle = linq(store.vehicles).firstOrDefault(function(vehicle) {
          return vehicle.id === id;
        });

        if(!this.vehicle) {
          store.errors.push('Vehicle not found!');
          this.loading = false;
        } else {
          this.search(this.vehicle.model)
        }
      },
      search(model) {
        this.loading = true;
        this.$http({
          url: 'http://gta.wikia.com/wiki/' + model,
          method: 'GET'
        }).then(function(response) {
          let rawHtml = document.createElement('html');
          rawHtml.innerHTML = response.data;
          let image = rawHtml.getElementsByClassName('pi-image-thumbnail');
          this.image = image[0].src;
        }, function(err) {
          store.errors.push("We couldn't find a photo of that vehicle!");
        }).finally(function() {
          this.loading = false;
        });
      }
    }
  }
</script>
