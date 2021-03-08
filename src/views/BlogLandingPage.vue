<template>
  <div class="container">

    <h1 class="mb-10 text-brand-green-900 text-5xl font-bold">Blog Posts</h1>

    <blog-teasers />

  </div>
</template>

<script>
import BlogTeasers from './../components/BlogTeasers.vue';

export default {
  components: {
    BlogTeasers,
  },
  setup() {

    return {
    }
  },
}
</script>
