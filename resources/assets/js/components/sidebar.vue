<template>
  <ul class="nav nav-sidebar">
    <li>
      <a v-link="{path: '/all', activeClass: 'active', exact: true}">
        <i class="fa fa-home"></i> All
      </a>
    </li>
    <li>
      <a v-link="{path: '/car', activeClass: 'active', exact: true}">
        <i class="fa fa-car"></i> Cars
      </a>
    </li>
    <li>
      <a v-link="{path: '/search', activeClass: 'active', exact: true}">
        <i class="fa fa-car"></i> Test
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    ready() {
      console.log('sidebar initialized');
    }
  }
</script>
