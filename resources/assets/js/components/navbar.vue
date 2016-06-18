<template>
  <nav class="navbar-inverse navbar navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" v-link="{path: '/foo'}">GTA Lap Tracker</a>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    ready() {
      console.log('navbar initialized!');
    }
  }
</script>
