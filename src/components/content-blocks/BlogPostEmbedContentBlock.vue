<template>
  <!-- TODO: Add error handling for this component -->
  <!-- TODO: Lots of dom manipulations that could be cleaned up -->
  <div
    v-if="block && block.embed.html !== null"
    v-html="block.embed.html"
    class="blog-embed-element relative h-0" style="padding-top: 56.25%">

  </div>
</template>

<script>
import { watch, onMounted } from 'vue';

export default {
  props: ['block'],
  setup (props) {

    // Go through the embed html
    // and remove the height and width
    // attributes

    // mounted - we have to manipulate the dom only after the
    // setup function runs
    onMounted(() => {
      var el = document.querySelector('.blog-embed-element iframe');

      console.log('Element:', el, props.block.embed.html);

      if (el) {
        // Remove the height and width that comes from prismic
        el.removeAttribute('height');
        el.removeAttribute('width');

        // Add the width and height classes
        el.classList.add('w-full', 'absolute', 'inset-0', 'h-full');
      }

    })

  }
}
</script>
