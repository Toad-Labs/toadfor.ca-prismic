<template>
  <div class="base-content">
    <div v-html="block.contentHTML"></div>
  </div>
</template>

<script>
export default {
  props: ['block'],
  setup () {

  }
}
</script>
