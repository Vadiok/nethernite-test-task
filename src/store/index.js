import Vue from 'vue';
import Vuex from 'vuex';
import PackageSearchModule from './package-search/packageSearchStore';
import PackageInfoModule from './package-search/packageInfoStore';
import { packageInfoNamespace, packageSearchNamespace } from './StoreNames';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    [packageSearchNamespace]: PackageSearchModule,
    [packageInfoNamespace]: PackageInfoModule,
  },
});
