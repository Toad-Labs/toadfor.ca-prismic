<template>
  <div>

    <!-- Content Block section template -->
    <section
      v-for="(contentBlock, index) in blocks" :key="'block-' + index" >

      <!-- Generic Content Blocks -->

      <!-- Rich Text block template -->
      <template v-if="contentBlock.type === 'richText'">
          <!-- Here :slice="slice" passes the data to the component -->
          <rich-text-content-block :block="contentBlock"></rich-text-content-block>
      </template>

      <!-- End Generic Content Blocks -->


      <!-- Blog Post Content Blocks -->




      <!-- End Blog Post Content Blocks -->


      <!-- Home Page Content Blocks -->

      <!-- Home Hero block template -->
      <template v-if="contentBlock.type === 'homeHero'">
          <!-- Here :slice="slice" passes the data to the component -->
          <home-hero-content-block :block="contentBlock"></home-hero-content-block>
      </template>

      <!-- Home Blog Posts content block template -->

      <template v-if="contentBlock.type === 'homeBlogPosts'">
        <!-- Here :slice="slice" passes the data to the component -->
        <home-blog-posts-content-block :block="contentBlock"></home-blog-posts-content-block>
      </template>


      <!-- End Home Page Content Blocks -->

    </section>
  </div>
</template>

<script>
// Imports for all content blocks
import RichTextContentBlock from "../components/content-blocks/RichTextContentBlock.vue";
import HomeHeroContentBlock from "../components/content-blocks/HomeHeroContentBlock.vue";
import HomeBlogPostsContentBlock from "../components/content-blocks/HomeBlogPostsContentBlock.vue";

export default {
  props: ['blocks'],
  components: {
    RichTextContentBlock,
    HomeHeroContentBlock,
    HomeBlogPostsContentBlock,
  },
}
</script>
