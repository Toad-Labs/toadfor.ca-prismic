<template>
  <div>
    <h1>Page template: {{ uid }}</h1>

<!--
    <p>{{ error }}</p>

    <p>{{ slices }}</p>

    <p>{{ documentId }}</p>-->
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiEndpoint as prismicApiEndpoint } from './../services/prismic-config';
import Prismic from '@prismicio/client';

export default {
  setup() {

    // If there is an error push it to the not found page


    // Check if the uid exists
    // If not send to Not Found
    //const { fetchPageContent } = usePrismicPageContent();

    //const { error, slices, documentId } = fetchPageContent(id.value);

    return usePrismicPageContent();
  },
}
function usePrismicPageContent() {

  // Setup reactive elements
  const state = reactive({
    uid: null,
    found: null,
    error: null,
    slices: null,
    documentId: null,
  });

  const router = useRouter();

  // Get the current page parameter
  state.uid = useRoute().params.uid;

  // Check if the uid is a valid page from prismic
  Prismic.client(prismicApiEndpoint).query([
    Prismic.Predicates.at('document.id', state.uid),
    Prismic.Predicates.at('document.type', 'page')
  ])
    .then(response => {
      // response is the response object, response.results holds the documents

      // Check if a result was found
      if(response.results.length === 0) {
        state.found = false;
        console.log('Fail!', state.found);
      }
      else {
        console.log('Found:', response);
        //state.documentId = response.results[0].id;
        //state.slices = response.results[0].data.page_content;
      }

    })
    .catch((errorResponse) => {
      console.log('Error', errorResponse);
      // state.error = errorResponse;
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
