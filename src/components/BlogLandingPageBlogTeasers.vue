<template>
  <div class="container xl:w-1/2">

      <!-- TODO: this should be a UL -->
      <h2 class="sr-only">Blog Posts</h2>

      <ul>

        <li
          v-for="blogTeaser in blogTeasers"
          :key="blogTeaser.uid"
          class="my-10">

          <router-link
            :to="`/blog/` + blogTeaser.uid">
            <div class=" bg-gray-50  pl-5 py-8 rounded-2xl
              hover:bg-brand-green-100 transition-all ease-in duration-200">

              <!-- Title -->
              <h3
                class="text-xl font-semibold text-brand-green-900">
                {{ blogTeaser.title }}
              </h3>

              <!-- Date -->
              <p
                class="text-lg text-brand-green-800">
                <span
                  class="created-at">
                  {{ Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(blogTeaser.date)) }}
                </span>
              </p>

            </div>

          </router-link>

        </li>

      </ul>

  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { getBlogTeaserData } from '../services/prismic/api';

export default {
  setup() {

    // If there is an error push it to the not found page

    const { loading, error, blogTeasers }  = usePrismicBlogTeasersContent();

    // Check if the uid exists
    // If not send to Not Found
    //const { fetchPageContent } = usePrismicPageContent();

    //const { error, slices, documentId } = fetchPageContent(id.value);

    return {
      loading,
      error,
      blogTeasers,
    }
  },
}
function usePrismicBlogTeasersContent() {

  // Setup reactive elements
  const state = reactive({
    found: null,
    loading: true,
    error: null,
    blogTeasers: null,
  });

  getBlogTeaserData(
      (data) => {
        console.log('Response Data from blog-teaser', data);

        state.found = data.found;
        state.error = data.error;
        state.blogTeasers = data.blogTeasers;
        state.loading = false;
      },
      (err) => {
        // TO DO: Add error processing
        state.error = err.error;
      });

  return {
    ...toRefs(state),
  }

}
</script>
