<template>
  <div>

    <!-- Error state -->
    <div v-if="error">
      <p class="text-red-600 text-lg">An error has occured...</p>
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- Loading state -->
    <div v-else-if="loading === true">
      <p class=" text-brand-green-900 text-lg">Loading...</p>
    </div>

    <!-- Loaded state -->
    <div
      v-else-if="loading === false"
      class="">

      <!-- Page Title Block -->
      <!-- DEBUG: md:bg-red-500 lg:bg-none md:w-4/5 lg:w-1/2 -->
      <div class="container xl:w-1/2 mt-28 mb-24">

        <h1 class="text-7xl text-brand-green-900 font-semibold">{{ blogLandingPage.title }}</h1>

        <p
          v-if="blogLandingPage.brief && blogLandingPage.brief.length >= 0"
          class="md:w-2/3 mt-10 text-3xl font-medium text-brand-green-700">{{ blogLandingPage.brief }}</p>

      </div>

      <!-- Blog Teasers -->
      <blog-teasers />

    </div>

  </div>
</template>

<script>
import { reactive, watch, toRefs } from 'vue';
import { getBlogLandingPageData } from '../services/prismic/api';
import BlogTeasers from '../components/BlogLandingPageBlogTeasers.vue';

export default {
  components: {
    BlogTeasers,
  },
  setup() {

    const { loading, error, blogLandingPage } = usePrismicBlogLandingPageContent()

    return {
      loading,
      error,
      blogLandingPage,
    };

  },
}
// Check that the page exists and then display content
// or redirect if there is an error
function usePrismicBlogLandingPageContent() {

  // Setup reactive elements
  const state = reactive({
    uid: null,
    loading: true,
    error: null,
    blogLandingPage: null,
  });

  // Check if the uid is a valid page from prismic
  getBlogLandingPageData(
    (data) => {

      console.log('Blog Landing Page Component data:', data);

      state.found = data.found;
      state.error = data.error;
      state.blogLandingPage = data.blogLandingPage;
      state.loading = false;
    },
    (err) => {
        console.error(err);
      // TO DO: Add error processing
      state.error = err.error;
    });

  // Watch function to track the found state
  // If found is false forward user to the not-found page
  watch(
    () => state.found,
    (found, prevFound) => {
      if (!found) {
        state.error = true;
      }
    }
  )

  return {
    ...toRefs(state),
  }


}
</script>
