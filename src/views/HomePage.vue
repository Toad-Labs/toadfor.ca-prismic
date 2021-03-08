<template>
  <div class="container">

    <!-- Check if there was an error loading the home page data -->
    <div v-if="error">
      {{ error }}
    </div>

    <div v-else-if="loading">
      <p>I am loading...</p>
    </div>

    <div v-else-if="!loading">
      <!-- Content Blocks -->
      <content-block :blocks="homeContent.contentBlocks" />
    </div>

  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { getHomeContentData } from '../services/prismic/home-content';
import ContentBlock from '../components/ContentBlock.vue';

export default {
  setup() {

    const { loading, error, homeContent } = usePrismicHomePageContent();

    return {
      loading,
      error,
      homeContent,
    }

  },
  components: {
    ContentBlock,
  }
}
function usePrismicHomePageContent() {

  // Setup reactive elements
  const state = reactive({
    loading: true,
    found: null,
    error: null,
    homeContent: null,
  });

  // Call the API service and get back a HomeContent object
  getHomeContentData(
      (data) => {

        // Information from the payload
        state.found = data.found;
        state.error = data.error;
        state.homeContent = data.homeContent;

        // Set the loading value to false
        // TODO: setup a loading state
        state.loading = false;
      },
      (err) => {
        // TODO: Add error processing
        state.error = err.error;
      });

  return {
    ...toRefs(state),
  }
}
</script>
