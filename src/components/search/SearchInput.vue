<template lang="pug">
v-text-field(
  flat
  solo-inverted
  hide-details
  prepend-inner-icon="mdi-magnify"
  label="Search packages..."
  clearable
  v-model="query"
)
</template>

<script>
import { StoreNames } from '../../store/StoreNames';

export default {
  name: 'SearchInput',

  data: () => ({
    query: '',
  }),

  watch: {
    query(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$store.dispatch(StoreNames.SEARCH_LOAD, {
          query: newValue,
          acceptEmpty: true,
        });
      }
    },
  },
};
</script>
