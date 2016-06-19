<template>
  <div id="searchResult">
    <div v-if="error">
      <h1>Error</h1>
      <h3>Vehicle not found</h3>
    </div>
    <div class="loading" v-if="loading"><i class="fa fa-spin fa-spinner"></i></div>
    <div v-else transition="slide">
      <h1>{{vehicle.model}}</h1>
      <div class="col-xs-8">
        <blockquote>
          <p>{{vehicle.quoteBody}}</p>
          <footer>{{vehicle.quoteSource}}</footer>
        </blockquote>
      </div>
      <div class="col-xs-4" id="car-info">
        <img v-bind:src="image" class="img-thumbnail">
        <div class="table-responsive">
          <table class="table">
            <tr>
              <th>Make:</th>
              <td>{{vehicle.make}}</td>
            </tr>
            <tr>
              <th>Model:</th>
              <td>{{vehicle.model}}</td>
            </tr>
            <tr>
              <th>Class:</th>
              <td>{{vehicle.class}}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="col-xs-12">
        <hr>
        {{vehicle | json}}
      </div>
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
      console.log(this.$route.params);
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

          let image = rawHtml.getElementsByClassName('pi-image-thumbnail')[0];
          this.image = image.src;

          let quote = rawHtml.getElementsByClassName('quote')[0].innerText;

          this.vehicle.quoteBody = quote.slice(0, quote.indexOf('―'));
          this.vehicle.quoteSource = quote.slice(quote.indexOf('―') + 1, quote.indexOf('description.') > -1 ? quote.indexOf('description.') : quote.length);
        }, function(err) {
          store.errors.push("We couldn't find a photo of that vehicle!");
        }).finally(function() {
          this.loading = false;
        });
      }
    }
  }
</script>
