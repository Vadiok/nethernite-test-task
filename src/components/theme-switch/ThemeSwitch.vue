<template lang="pug">
v-btn(
  icon
  @click="toggleTheme"
)
  v-icon {{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
</template>

<script>
export default {
  name: 'ThemeSwitch',

  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    },
  },

  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
