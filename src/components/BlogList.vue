<template>
  <div>
    <h2>Blog List:</h2>

    <p>Capacity: {{ blogPosts.length }}</p>

    <ul v-if="blogPosts">
      <blog-list-item
        v-for="(blogPost, index) in blogPosts"
        :blogListItemInfo="blogPost"
        :index="index"
        :key="blogPost"/>
    </ul>
    <div v-else>
      <p>No attending</p>
    </div>

  </div>
</template>

<script>
import useBlogList from '../composables/blog-list';

import BlogListItem from './BlogListItem.vue';

export default {
  setup() {

    const { blogPosts } = useBlogList();

    console.log( blogPosts.value );

    return { blogPosts };

  },

  components: {
    BlogListItem,
  },
}
</script>

<style>

</style>
