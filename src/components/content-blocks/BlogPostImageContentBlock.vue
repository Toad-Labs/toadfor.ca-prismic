<template>
  <!-- TODO: Add error handling for this component -->
  <div
    v-if="block">
      <img
        class="shadow-xl my-20"
        :src="block.image.src"
        :alt="block.image.alt" />
  </div>
</template>

<script>
export default {
  props: ['block'],
  setup () {

  }
}
</script>
