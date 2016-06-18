<template>
  <div id="allVehicles" transition="slide">
    <div class="loading" v-if="loading"><i class="fa fa-spinner fa-spin"></i></div>
    <div v-else>
      <h1>All Vehicles</h1>
      <vehicle-list></vehicle-list>
    </div>
  </div>
</template>

<script>
  import store from '../components/store.js'
  import vehicleList from '../components/VehicleList.vue'

  export default {
    data() {
      return {
        loading: store.loading
      }
    },
    created() {
      store.vehiclesToRetrieve = 'all';
    },
    ready() {

    },
    components: {
      vehicleList
    }
  }
</script>
