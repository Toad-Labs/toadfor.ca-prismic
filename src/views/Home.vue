<template>
  <div class="container">

    <!-- Check if there was an error loading the home page data -->
    <div v-if="error">
      {{ error }}
    </div>
    <!-- The data is loaded so we can render the home page content -->
    <div v-else-if="loaded">

       <!-- Slice section template -->
      <section
        v-for="(section, index) in sections"
        :key="'section-' + index">

        <!-- Home Hero section component -->
        <template v-if="section.type === 'hero'">
          <!-- Here :slice="slice" passes the data to the component -->
          <home-hero :section="section"></home-hero>
        </template>

        <!-- Home Hero section component -->
        <template v-if="section.type === 'blog_articles'">
          <!-- Here :slice="slice" passes the data to the component -->
          <home-blog-articles v-bind="section"></home-blog-articles>
        </template>

      </section>

    </div>

  </div>
</template>

<script>
import useHomeContent from './../composables/home-content';
import HomeHero from '../components/HomeHero.vue';
import HomeBlogArticles from '../components/HomeBlogArticles.vue';

export default {
  setup() {

    const { sections, error, load, loaded } = useHomeContent();

    // Load the homepage content
    load();

    return {
      sections,
      error,
      loaded,
    }

  },
  components: {
    HomeHero,
    HomeBlogArticles,
  }
}
</script>
