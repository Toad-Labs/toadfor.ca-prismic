<template>
  <div>

    <div v-if="block.error">
      <p>Error: {{ block.error }}</p>
    </div>

    <div v-else-if="loading">
      Loading...
    </div>
    <div v-else-if="!loading">

      <div class="bg-brand-green-50">
        <div class="w-full mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:pt-24 lg:px-8">
          <h2 class="text-4xl font-extrabold text-brand-green-900 tracking-tight">
            {{ block.title }}
          </h2>
          <p class="mt-4 max-w-3xl text-xl text-brand-green-800">
            {{ block.text }}
          </p>

          <ul class="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            <li
              v-for="blogTeaser in blogTeasers"
              :key="blogTeaser.id"
              class="">
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
            </li>
          </ul>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { getBlogTeaserDataByIds } from '../../services/prismic/api';

export default {
  props: ['block'],
  /*
  props: {
    heading: {
      type: String
    },
    text: {
      type: String
    },
    articleIds: {
      type: Object,
      required: true,
    }
  },
  */
  setup(props) {

    //const { blogs, error, load } = useBlogSummariesContent();
    const { loading, error, blogTeasers }  = usePrismicBlogTeasersContent(props.block?.blogPostIds);

    // Check if ids is an array and if it has any values
    // props.articleIds ? load(props.articleIds) : error.value = "Error with article ids";

    return {
      error,
      loading,
      blogTeasers,
    };
  }
}

function usePrismicBlogTeasersContent(blogPostIds) {

  // Setup reactive elements
  const state = reactive({
    found: null,
    loading: true,
    error: null,
    blogTeasers: null,
  });

  getBlogTeaserDataByIds(
      blogPostIds,
      (data) => {

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
