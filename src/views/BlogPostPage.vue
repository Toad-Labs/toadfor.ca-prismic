<template>
  <div class="container">

    <!-- Error state -->
    <div v-if="error">
      <p class="text-red-600 text-lg">An error has occured...</p>
      <p class="text-red-600">{{ error }}</p>
    </div>
    <!-- Loading state -->
    <div v-else-if="loading">
      <p class=" text-brand-green-900 text-lg">Loading...</p>
    </div>
    <!-- Loaded state -->
    <div v-else-if="!loading">
      <h1 class=" text-6xl text-brand-green-900">{{ blogPost.title }}</h1>

      <div v-if="blogPost.date">
        <p class="text-sm text-gray-600">
          {{ Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(blogPost.date) }}
        </p>
      </div>

      <div v-if="blogPost.coverImageSrc">
        <img
          class=" h-52"
          :src="blogPost.coverImageSrc"
          :alt="blogPost.coverImageAlt" />
      </div>

      <!-- Content Blocks -->
      <content-block :blocks="blogPost.contentBlocks" />

      <div class=" bg-red-200">
        {{ blogPost }}
      </div>
    </div>


<!--
    <p>{{ error }}</p>

    <p>{{ slices }}</p>

    <p>{{ documentId }}</p>-->
  </div>
</template>

<script>
// import BlogPost from '../models/blog-post'
import { reactive, toRefs, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getBlogPostDataById } from '../services/prismic/api';
import ContentBlock from '../components/ContentBlock.vue';

export default {
  components : {
    ContentBlock
  },
  setup() {

    const { loading, error, blogPost } = usePrismicBlogPostContent()

    return {
      loading,
      error,
      blogPost,
    };
  },
}
function usePrismicBlogPostContent() {

  // Setup reactive elements
  const state = reactive({
    loading: true,
    found: null,
    error: null,
    blogPost: null,
  });

  const router = useRouter();

  // Get the current page parameter
  state.uid = useRoute().params.uid;


  getBlogPostDataById(
    state.uid,
      (data) => {
        console.log('Response Data from blog-post', data);

        state.found = data.found;
        state.error = data.error;
        state.blogPost = data.blogPost;
        state.loading = false;
      },
      (err) => {
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
