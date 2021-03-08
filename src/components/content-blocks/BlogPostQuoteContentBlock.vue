<template>
  <!-- TODO: Add error handling for this component -->
  <div
    v-if="block">
      <figure
        class="my-32">
        <blockquote cite="https://www.huxley.net/bnw/four.html">
            <p class="text-6xl text-gray-600">{{ block.quote.text }}</p>
        </blockquote>
        <figcaption
          v-if="block.quote.author !== null || block.quote.author?.length > 0"
          class="text-gray-400">
          — {{ block.quote.author }}</figcaption>
      </figure>
  </div>
</template>

<script>
export default {
  props: ['block'],
  setup () {

  }
}
</script>
