<template>
  <div id="searchResult">
    <div v-if="error">
      <h1>Error</h1>
      <h3>Vehicle not found</h3>
    </div>
    <div class="loading" v-if="loading"><i class="fa fa-spin fa-spinner"></i></div>
    <div v-else transition="slide">
      <h1>{{vehicle.make}} {{vehicle.model}}</h1>
      <img v-bind:src="image" />
      {{vehicle | json}}
    </div>
    {{loading}}
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
          this.search(this.vehicle.make + ' ' + this.vehicle.model)
        }
      },
      search(term) {
        this.$http({
          url: 'https://www.googleapis.com/customsearch/v1',
          method: 'GET',
          data: {
            q: term,
            cx: store.googleSearch.cx,
            key: store.googleSearch.key,
            searchType: 'image'
          }
        }).then(function(response) {
          console.log(response.data.items);
          this.image = response.data.items[0].link;
        }, function(err) {
          console.log(err);
          store.errors.push('It failed!');
        }).finally(function() {
          this.loading = false;
        });
      }
    }
  }
</script>
