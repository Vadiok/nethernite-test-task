<template lang="pug">
v-app-bar.content-min-width(
  app
  :color="`teal ${isDarkTheme && 'darken-4'}`"
  dark
)
  v-row.d-flex.justify-space-between
    v-col.hidden-sm-and-down(
      sm="1"
    )
    v-col.content-max-width(
      cols="10"
    )
      SearchInput
    v-col.d-flex.justify-end(
      cols="2"
      sm="1"
    )
      ThemeSwitch
  v-progress-linear(
    absolute
    bottom
    :active="isLoading"
    :indeterminate="isLoading"
    color="green accent-3"
  )
</template>

<script>
import ThemeSwitch from '../theme-switch/ThemeSwitch.vue';
import SearchInput from '../search/SearchInput.vue';
import { StoreNames } from '../../store/StoreNames';

export default {
  name: 'TheAppHeader',

  components: {
    SearchInput,
    ThemeSwitch,
  },

  computed: {
    isDarkTheme() {
      return this.$vuetify.theme.dark;
    },
    isLoading() {
      return this.$store.getters[StoreNames.SEARCH_IS_LOADING];
    },
  },
};
</script>
