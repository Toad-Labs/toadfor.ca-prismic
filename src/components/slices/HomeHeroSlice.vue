<template>
  <div>

    <!-- Title -->
    <h1 class="text-blue-600 text-6xl w-1/2 my-10">{{ title }}</h1>

    <!-- Text -->
    <div>
      <p
      class="text-xl"
      v-for="(paragraph, index) in text"
      :key="index">
      {{ paragraph }}
      </p>
    </div>

    <!-- Image -->
    <div
      class=" w-1/2"
      v-if="imageSrc"
      >
      <img
        :alt="imageAlt"
        :src="imageSrc"
        />
    </div>

    <div class="mt-40 border-t border-black border-b">
      {{ slice }}
    </div>

  </div>
</template>

<script>
import PrismicDOM from 'prismic-dom';

import { ref } from 'vue';

export default {
  props: {
    slice: {
      type: Object,
      required: true
    }
  },
  setup(props) {

    const title = ref(null);
    const text = ref([]);
    const imageAlt = ref(null);
    const imageSrc = ref(null);

    // Set the title
    title.value = PrismicDOM.RichText.asText(props.slice.primary.hero_title);

    // Walk through array of objects and grab all the text
    props.slice.primary.hero_text.forEach(element => {
      text.value.push(element.text)
    });

    // Get the image alt
    imageAlt.value = props.slice.primary.hero_image.alt;

    // Get the image src
    imageSrc.value = props.slice.primary.hero_image.url;

    return {
      title,
      text,
      imageAlt,
      imageSrc
    }

  }
}
</script>
