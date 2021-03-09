<template>
  <div>
    <h1>Page template</h1>

    <p>{{ uid }}</p>

<!--
    <p>{{ error }}</p>

    <p>{{ slices }}</p>

    <p>{{ documentId }}</p>-->
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getLandingPageDataByUid } from '../services/prismic/api';

export default {
  setup() {

    const { loading, error, uid } = usePrismicLandingPageContent()

    return {
      loading,
      error,
      uid,
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
  });

  // Get the current page parameter from the router
  const router = useRouter();
  state.uid = useRoute().params.uid;

  // Check if the uid is a valid page from prismic
  getLandingPageDataByUid(
    state.uid,
      (data) => {
        console.log('hello');
        console.log('Response Data from landing-page data source', data);

        state.found = data.found;
        state.error = data.error;

        state.loading = false;
      },
      (err) => {
         console.log(err);
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
