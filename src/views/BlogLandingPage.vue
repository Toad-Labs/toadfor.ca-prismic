<template>
  <div class="container">

    <h1 class="mb-10 text-brand-green-900 text-5xl font-bold">Blog Posts</h1>

    <blog-teasers />

  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiEndpoint as prismicApiEndpoint } from './../services/prismic-config';
import Prismic from '@prismicio/client';
import BlogTeasers from './../components/BlogTeasers.vue';



export default {
  components: {
    BlogTeasers,
  },
  setup() {

    // If there is an error push it to the not found page


    // Check if the uid exists
    // If not send to Not Found
    //const { fetchPageContent } = usePrismicPageContent();

    //const { error, slices, documentId } = fetchPageContent(id.value);

    return {
    }
  },
}
</script>
