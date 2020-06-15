<template lang="pug">
v-app
  TheAppHeader
  v-main
    v-container.content-max-width
      SearchList
      PackageInfo
  TheAppFooter
</template>

<script>
import TheAppHeader from './components/layout/TheAppHeader.vue';
import SearchList from './components/search/list/SearchList.vue';
import TheAppFooter from './components/layout/TheAppFooter.vue';
import PackageInfo from './components/search/package-info/PackageInfo.vue';

export default {
  name: 'App',

  components: {
    PackageInfo,
    TheAppFooter,
    SearchList,
    TheAppHeader,
  },

  data: () => ({
    //
  }),
};
</script>
