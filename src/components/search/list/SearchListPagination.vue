<template lang="pug">
v-pagination.text-center(
  v-if="visible"
  v-model="page"
  :length="pagesTotal"
  total-visible="7"
)
</template>

<script>
import { StoreNames } from '../../../store/StoreNames';

export default {
  name: 'SearchListPagination',

  data: () => ({
    page: 1,
  }),

  computed: {
    storePage() {
      return this.$store.getters[StoreNames.SEARCH_PAGE];
    },
    pagesTotal() {
      return this.$store.getters[StoreNames.SEARCH_PAGES_TOTAL];
    },
    visible() {
      return this.pagesTotal > 1;
    },
  },

  watch: {
    storePage: {
      immediate: true,
      handler() {
        if (this.storePage !== this.page) {
          this.page = this.storePage;
        }
      },
    },
    page(newValue, oldValue) {
      if ((newValue !== oldValue) && (newValue !== this.storePage)) {
        this.$store.dispatch(StoreNames.SEARCH_LOAD, {
          page: newValue,
        });
      }
    },
  },
};
</script>
