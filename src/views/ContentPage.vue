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

export default {
  setup() {

    // Check that the page exists and then display content
    // or redirect if there is an error
    const { uid } = usePrismicPageContent();

    return {
      uid
    };
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
