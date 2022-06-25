<template>
  <div class="homepage">
    <h1><span class="gradient">404</span> &bull; pagina non trovata 🤔</h1>
    <p>
      Siamo spiacenti ma non siamo riusciti a trovare la pagina che stai
      cercando.
    </p>
    <button v-on:click="goHome()">&larr; Vai alla <b>homepage</b></button>
  </div>
</template>

<script>
export default { 
  name: "PageNotFound",
  data: function () {
    return {};
  },

  created: function () {},

  methods: {
    goHome: function () {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss">
</style> 