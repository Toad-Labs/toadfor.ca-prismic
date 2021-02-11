import { reactive, toRefs } from 'vue';
import PrismicClient from '../services/prismicClient'

/*
 * Data structure for blog posts
 * blogs: [
 * {
 *  id: '',
 *  title: '',
 *  url: '',
 * }
 * ]
 */

const state = reactive({
  error: null,
  blogs: null,
  loaded: false,
});


export default function useBlogSummariesContent() {

  /*
   * Load function
   */
  function load(ids) {

    // Check if the argument that is passed in is an array of ids
    if (!ids?.length) {
      state.error = 'UseBlogSummariesContent: argument failed';
      console.error(state.error);
    }
    else {
      // Only load data if it hasn't been loaded:
      // TODO: Check ids - against the ids that have already been cached
      //  Only load if new ids have been added
      if (!state.loaded) {
        try {
            // Get the Blog Summaries from the Prismic Content Service and then
            // commit the blog summaries to the local store
            PrismicClient.getBlogSummariesDataByIds(
              ids,
              (data) => {
                console.log('Response Data from getBlogSummariesDataByIds', data);
                state.blogs = data;
              }, (err) => {
                // TO DO: Add error processing
                state.error = err;
              });

            state.loaded = true;

        } catch (e) {
          state.error = e;
        }
      }
    }
  }

  return {
    ...toRefs(state),
    load,
  };

}
