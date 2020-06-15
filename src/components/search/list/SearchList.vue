<template lang="pug">
div.content-max-width
  v-overlay(
    absolute
    :value="isLoading"
  )
    v-progress-circular(
      indeterminate
      size="70"
    )
  h1.display-1.text-center.mt-3.mb-3(
    v-if="listClear"
  ) NPM Package Info
  v-alert(
    v-if="noItems"
    type="warning"
  ) No items found...
    br
    | Try to find another package.
  div
    SearchListItem(
      v-for="item in items"
      :key="item.name"
      :packageInfo="item"
    )
    SearchListPagination
</template>

<script>
import { StoreNames } from '../../../store/StoreNames';
import SearchListPagination from './SearchListPagination.vue';
import SearchListItem from './SearchListItem.vue';

export default {
  name: 'SearchList',

  components: {
    SearchListItem,
    SearchListPagination,
  },

  computed: {
    noItems() {
      return this.$store.getters[StoreNames.SEARCH_TOTAL] === 0;
    },
    listClear() {
      return this.$store.getters[StoreNames.SEARCH_IS_CLEAR];
    },
    isLoading() {
      return this.$store.getters[StoreNames.SEARCH_IS_LOADING];
    },
    items() {
      return this.$store.getters[StoreNames.SEARCH_ITEMS];
    },
  },
};
</script>
