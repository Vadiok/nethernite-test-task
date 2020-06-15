<template lang="pug">
v-dialog(
  v-model="isOpen"
  scrollable
  max-width="1024px"
)
  v-card(
    v-if="item"
  )
    v-card-title.teal.white--text(
      :class="{ 'darken-4': isDarkTheme }"
    ) {{ item.name }}
    v-icon.white--text.close-icon(
      @click="close"
    ) mdi-close
    v-divider
    v-card-subtitle.mt-4
      v-row
        v-col(
          cols="9"
        )
          v-btn.text-lowercase.text-wrap(
            v-if="item.repository"
            small
            depressed
            color="info"
            @click.prevent="openInNewTab(item.repository.url)"
          )
            v-icon.mr-2 mdi-open-in-new
            | {{ item.repository.url }}
        v-col.text-right(
          cols="3"
        )
          v-icon.mr-2 mdi-package
          | {{ item.version }}
    v-divider(
      v-if="item.description"
    )
    v-card-subtitle.mt-4(
      v-if="item.description"
    )
      div {{ item.description }}
    v-divider(
      v-if="hasKeywords"
    )
    v-card-text.mt-4(
      v-if="hasKeywords"
    )
      .body-1.mb-2 Keywords
      v-chip.mr-2(
        small
        v-for="word in keywords"
        :key="word"
      ) {{ word }}
    v-divider
    v-card-actions(
      v-if="item.owner"
    )
      v-list-item(
        @click="openInNewTab(item.owner.link)"
      )
        v-list-item-avatar(
          v-if="item.owner.avatar"
        )
          v-img(
            :src="item.owner.avatar"
          )
        v-list-item-content
          v-list-item-title.d-flex.justify-space-between.flex-wrap
            div {{ item.owner.name }}
            div.text-wrap(
              v-if="item.owner.link"
            )
              v-icon mdi-open-in-new
              =' '
              | {{ item.owner.link }}
</template>

<script>
import { StoreNames } from '../../../store/StoreNames';

export default {
  name: 'PackageInfo',

  data: () => ({
    isOpen: false,
  }),

  computed: {
    item() {
      return this.$store.getters[StoreNames.INFO_ITEM];
    },
    keywords() {
      return this.item ? this.item.keywords : [];
    },
    hasKeywords() {
      return !!this.keywords.length;
    },
    isDarkTheme() {
      return this.$vuetify.theme.dark;
    },
  },

  watch: {
    isOpen(value) {
      if (!value) {
        this.$store.dispatch(StoreNames.INFO_CLEAR);
      }
    },
    item(value) {
      if (value && !this.isOpen) {
        this.isOpen = true;
      } else if (!value && this.isOpen) {
        this.isOpen = false;
      }
    },
  },

  methods: {
    close() {
      this.isOpen = false;
    },
    openInNewTab(link) {
      if (link) {
        window.open(link, '_blank');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.close-icon {
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 14px;
}
</style>
