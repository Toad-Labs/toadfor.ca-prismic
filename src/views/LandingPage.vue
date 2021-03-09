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
    <div v-else-if="loading === false">

      <div class="container w-2/3">

      <h1 class="mt-20 text-6xl text-brand-green-900 font-semibold">{{ landingPage.title }}</h1>

      <p
        v-if="landingPage.brief && landingPage.brief.length >= 0"
        class="mt-5 text-3xl font-medium text-brand-green-800 ">{{ landingPage.brief }}</p>

      </div>

      <!-- Cover Image -->
      <div
        v-if="landingPage.coverImage.src !== null"
        class="container xl:w-4/5">
        <img
            class="shadow-xl my-10 object-cover h-96 w-full"
            :src="landingPage.coverImage.src"
            :alt="landingPage.coverImage.alt" />
      </div>

      <div class="container w-2/3">
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
