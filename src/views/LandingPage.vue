<template>


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

        <h1 class="text-7xl text-brand-green-900 font-semibold">{{ landingPage.title }}</h1>

        <p
          v-if="landingPage.brief && landingPage.brief.length >= 0"
          class="md:w-2/3 mt-10 text-3xl font-medium text-brand-green-700">{{ landingPage.brief }}</p>

      </div>

      <!-- Cover Image -->
      <div
        v-if="landingPage.coverImage.src !== null"
        class="container xl:w-3/5">
        <img
            class="shadow-2xl mb-20 object-cover h-96 w-full rounded-md"
            :src="landingPage.coverImage.src"
            :alt="landingPage.coverImage.alt" />
      </div>

      <div>
        <!-- Content Blocks -->
        <content-block :blocks="landingPage.contentBlocks" />
      </div>


  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getLandingPageDataByUid } from '../services/prismic/api';
import ContentBlock from '../components/ContentBlock.vue';

export default {
  components : {
    ContentBlock
  },
  setup() {

    const { loading, error, landingPage } = usePrismicLandingPageContent()

    return {
      loading,
      error,
      landingPage,
    };

  },
}
// Check that the page exists and then display content
// or redirect if there is an error
function usePrismicLandingPageContent() {

  // Setup reactive elements
  const state = reactive({
    uid: null,
    loading: true,
    error: null,
    landingPage: null,
  });

  // Get the current page parameter from the router
  const router = useRouter();
  state.uid = useRoute().params.uid;

  // Check if the uid is a valid page from prismic
  getLandingPageDataByUid(
    state.uid,
      (data) => {

        console.log('Landing Page Component data:', data);

        state.found = data.found;
        state.error = data.error;
        state.landingPage = data.landingPage;
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
        router.push({ path: '/404' })
      }
    }
  )

  return {
    ...toRefs(state),
  }

}
</script>
