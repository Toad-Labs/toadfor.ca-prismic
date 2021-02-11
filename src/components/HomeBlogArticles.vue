<template>
  <div>

    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>

    <div v-else>

      <div class="bg-brand-green-50">
        <div class="w-full mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:pt-24 lg:px-8">
          <h2 class="text-4xl font-extrabold text-brand-green-900 tracking-tight">
            {{ heading }}
          </h2>
          <p class="mt-4 max-w-3xl text-xl text-brand-green-800">
            {{ text }}
          </p>

          <ul class="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            <li
              v-for="blog in blogs"
              :key="blog.id"
              class="">
              <a
                class="bg-brand-green-400 border border-brand-green-600 shadow-lg block my-10 p-4 rounded-lg"
                href="#">{{ blog.title }}</a>
            </li>
          </ul>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import useBlogSummariesContent from './../composables/blog-summaries-content';

export default {
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
  setup(props) {

    const { blogs, error, load } = useBlogSummariesContent();

    // Check if ids is an array and if it has any values
    props.articleIds ? load(props.articleIds) : error.value = "Error with article ids";

    return {
      error,
      blogs,
    };
  }
}
</script>
