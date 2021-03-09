<template>
  <div>

    <!-- The skip nav component -->
    <the-skip-nav />

    <!-- The header component -->
    <the-header />

    <!-- Page content -->
    <div class="w-full mx-auto container p-5">
      <main>
        <!-- Force a reload of the component on router path change using the key attribute -->
        <router-view :key="$route.fullPath" />
      </main>
    </div>

    <!-- The footer component -->
    <the-footer />
  </div>
</template>

<script>
import TheSkipNav from './components/TheSkipNav.vue'
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheSkipNav,
    TheHeader,
    TheFooter,
  }
}

</script>

<style>
</style>
