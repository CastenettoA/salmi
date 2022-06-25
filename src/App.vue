<template>
  <div id="app" v-cloak>
    <nav class="navbar">
      <div class="navbar-content">
        <!-- <div class="menu"></div> -->
        <div class="navbar-logo" v-on:click="goHome()">
          <img src="https://cdn0.iconfinder.com/data/icons/education-869/53/23-512.png">
          <p>Salmi<span></span>Biblici</p>
        </div>
        <!-- <div class="search-bar"></div> -->
        <!-- <div class="light-mode"></div> -->
      </div>
    </nav>

    <div class="content">
      <router-view></router-view>
      <footer>Puoi sostenere questo progetto con una <a href="https://paypal.me/pools/c/8bFReaiLUk">donazione</a>.<br>
        Se vuoi inviarmi un feedback fallo via <a href="mailto:castenetto.andrea@gmail.com">email</a>. <br> <a
          href="#">Torna su ⬆</a> &bull; <a href="https://castenettoa.com"
          title="creato da Andrea Castenetto">castenettoa.com</a> </footer>
    </div>

  </div>
</template>

<script>

export default {
  name: "App",
  data: function () {
    return {
      colorMode: 'chiaro'
    };
  },

  computed: {
    readableColorMode() {
      return (this.colorMode == 'chiaro') ? 'tema chiaro' : 'tema scuro';
    }
  },

  mounted() {
    if (localStorage.colorMode) { // check user preferred color mode
      this.colorMode = localStorage.colorMode;
      this.changeStyleSheet();
    }
  },

  watch: {
    colorMode(newVal) { // update color mode on user choice
      localStorage.colorMode = newVal;
      this.changeStyleSheet();
    }
  },

  methods: {
    changeColorMode: function () {
      let c = this.colorMode == 'chiaro' ? 'scuro' : 'chiaro';
      this.colorMode = c;
    },
    changeStyleSheet: function () { // css version light/dark
      let c = this.colorMode == 'chiaro' ? 'light' : 'dark';
      document.getElementById("water-css").setAttribute("href", 'https://cdn.jsdelivr.net/npm/water.css@2/out/' + c + '.css');
    },
    goHome: function () {
      if (this.$route.name == 'home') return;
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
