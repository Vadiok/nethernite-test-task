<template lang="pug">
v-footer.text-center
  .container.py-0.content-max-width
    a.text-decoration-none.text--primary(
      :href="link"
      target="_blank"
    )
      v-icon mdi-github
      =' '
      | {{ name }}
</template>

<script>
export default {
  name: 'TheAppFooter',

  computed: {
    name: () => 'Vlad Tokarev',
    link: () => 'https://github.com/Vadiok/nethernite-test-task',
  },
};
</script>
