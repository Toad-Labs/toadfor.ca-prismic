<template>
  <li class="my-5 p-5 bg-gray-200">
    <a :href="blogListItemInfo.href">
      <p>{{ blogListItemInfo.title }}</p>
      <p>{{ blogListItemInfo.date }}</p>
      <p>{{ blogListItemInfo }}</p>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    blogListItemInfo: Object,
  },

  setup(props) {

  }
}
</script>

<style>

</style>
