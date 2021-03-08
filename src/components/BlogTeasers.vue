<template>
  <div>

      <!-- TODO: this should be a UL -->

      <div
        v-for="blogTeaser in blogTeasers"
        :key="blogTeaser.uid">

        <router-link
          :to="`/blog/` + blogTeaser.uid">
          <div
            class="mb-10 p-5 rounded-2xl border border-brand-green-200 bg-brand-green-50
                  hover:bg-brand-green-100 transition-all ease-in duration-100">
            <p
              class="text-xl">
              {{ blogTeaser.title }}
            </p>
            <p
              class="text-sm text-brand-green-800">
              <span
                class="created-at">
                {{ Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(blogTeaser.date)) }}
              </span>
            </p>
          </div>
        </router-link>

        <!--<p class="blog-post-meta"><span class="created-at">{{ Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(post.first_publication_date)) }}</span></p>-->
      </div>

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
