<template>
  <div id="app" v-cloak>
    <nav class="navbar">
      <div class="navbar-content">

        <div class="sideNav" id="sideNav">
          <div class="sideNav-header">
            <div class="navbar-logo" v-on:click="goHome()">
              <img src="https://cdn0.iconfinder.com/data/icons/education-869/53/23-512.png">
              <p>Salmi<span></span>Biblici</p>
            </div>
            <a href="javascript:void(0)" class="sideNav-closeButton" v-on:click="sideNavClose()">&times;</a>
          </div>

          <a href="/preferiti">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>
            <span>Preferiti</span></a>
          <a href="/parole-evocatrici">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z" />
            </svg>
            <span>Parole Evocatrici</span></a>
        </div>
        <span class="sideNav-openButton" v-on:click="sideNavOpen()">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </span>

        <div class="body-overlay" id="bodyOverlay" v-on:click="sideNavClose()"></div>

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
    sideNavOpen: function () {
      document.getElementById('sideNav').style.width = "285px";
      document.getElementById('bodyOverlay').style.height = "100%";
      document.getElementById('bodyOverlay').style.opacity = "1";
      document.body.style.overflow = 'hidden';
    },
    sideNavClose: function () {
      document.getElementById('sideNav').style.width = "0";
      document.getElementById('bodyOverlay').style.height = "0%";
      document.getElementById('bodyOverlay').style.opacity = "0";
      document.body.style.overflow = 'scroll';

    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
