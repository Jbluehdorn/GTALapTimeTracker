<template>
  <div id="cars" transition="slide">
    <div>
      <h1>Cars</h1>
      <vehicle-list></vehicle-list>
    </div>
  </div>
</template>

<script>
  import store from '../components/store.js'
  import vehicleList from '../components/VehicleList.vue'

  export default {
    created() {
      store.vehiclesToRetrieve = 'car';
    },
    components: {
      vehicleList
    }
  }
</script>
