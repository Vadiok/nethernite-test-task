<template lang="pug">
v-hover
  template(v-slot:default="{ hover }")
    v-card.mb-3(
      :loading="isLoading"
      @click.native="viewDetails"
    )
      v-card-title {{ packageInfo.name }}
      v-card-text
        .text--secondary(
          v-if="packageInfo.description"
        ) {{ packageInfo.description }}
      v-fade-transition
        v-overlay.v-chip--clickable(
          v-if="hover"
          absolute
          color="#036358"
          @click.native="viewDetails"
          v-ripple
        )
          v-btn(
            color="primary"
          )
            v-icon.mr-2 mdi-magnify
            =' '
            | Details
</template>

<script>
import { PackageInfo } from '../../../api/entities/PackageInfo';
import { StoreNames } from '../../../store/StoreNames';

export default {
  name: 'SearchListItem',

  props: {
    packageInfo: {
      type: PackageInfo,
      required: true,
    },
  },

  computed: {
    isLoading() {
      return this.$store.getters[StoreNames.INFO_IS_LOADING]
        && this.$store.getters[StoreNames.INFO_NAME]
        && this.$store.getters[StoreNames.INFO_NAME] === this.packageInfo.name;
    },
  },

  methods: {
    viewDetails() {
      if (!this.isLoading) {
        this.$store.dispatch(StoreNames.INFO_LOAD, this.packageInfo.name);
      }
    },
  },
};
</script>
