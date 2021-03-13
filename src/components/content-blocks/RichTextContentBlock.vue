<template>
  <div class="container sm:w-full md:w-4/5 lg:w-3/5 xl:w-1/2">
    <div class="base-content">
      <div v-html="block.contentHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['block'],
  setup () {

  }
}
</script>
