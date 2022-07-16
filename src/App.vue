<template>
  <div id="app" v-cloak>
    <nav class="navbar">
      <div class="navbar-content">

        <div class="sideNav" id="sideNav">
          <div class="sideNav-header">
            <div class="navbar-logo" v-on:click="goHome()">
              <img src="@/assets/img/logo.png">
              <p>Salmi<span></span>Biblici</p>
            </div>
            <a href="javascript:void(0)" class="sideNav-closeButton" v-on:click="sideNavClose()">&times;</a>
          </div>

            <router-link to="/favorites">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>
            <span>Preferiti <b class="favoriteNumber">{{stateManager.salmi_favorite_count}}</b></span></router-link>
          <router-link to="/parole-di-luce">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z" />
            </svg>
            <span>Parole di Luce</span></router-link>

            <a href="https://paypal.com/paypalme/castenettoa">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M16 12C18.76 12 21 9.76 21 7S18.76 2 16 2 11 4.24 11 7 13.24 12 16 12M21.45 17.6C21.06 17.2 20.57 17 20 17H13L10.92 16.27L11.25 15.33L13 16H15.8C16.15 16 16.43 15.86 16.66 15.63S17 15.12 17 14.81C17 14.27 16.74 13.9 16.22 13.69L8.95 11H7V20L14 22L22.03 19C22.04 18.47 21.84 18 21.45 17.6M5 11H.984V22H5V11Z" />
              </svg>
              <span>Fai una Donazione</span></a>
        </div>
        <span class="sideNav-openButton" v-on:click="sideNavOpen()">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </span>

        <div class="body-overlay" id="bodyOverlay" v-on:click="sideNavClose()"></div>

        <div class="navbar-logo" v-on:click="goHome()">
          <img src="@/assets/img/logo.png">
          <h1>Salmi<span></span>Biblici</h1>


          <!-- <div class="search-bar">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
            <input id="hideOnMenuOpen_bug" v-model="searchString" type="text" v-on:keyup="customSearch()" placeholder="Ricerca">
          </div> -->
        </div>
        <!-- <div class="light-mode"></div> -->
      </div>
    </nav>

    <router-view></router-view>
    
    <footer>Puoi sostenere questo progetto con una <a href="https://paypal.me/pools/c/8bFReaiLUk">donazione</a>.<br>
      Se vuoi inviarmi un feedback fallo via <a href="mailto:castenetto.andrea@gmail.com">email</a>. <br> <a
        href="#">Torna su ⬆</a> &bull; <a href="https://castenettoa.com"
        title="creato da Andrea Castenetto">castenettoa.com</a> </footer>

  </div>
</template>

<script>
import salmiListJson from "@/assets/json/salmi.json";
import {stateManager} from "@/stateManager.js";

export default {
  name: "App",
  data: function () {
    return {
      colorMode: 'chiaro',
      searchString: '',
      salmi: salmiListJson.items,
      stateManager
    };
  },

  computed: {
    readableColorMode() {
      return (this.colorMode == 'chiaro') ? 'tema chiaro' : 'tema scuro';
    },
    currentRouteName() {
      return this.$route.name;
    }
  },

  mounted() {
    if (localStorage.colorMode) { // check user preferred color mode
      this.colorMode = localStorage.colorMode;
      this.changeStyleSheet();
    }

    let favoritePsalms = localStorage.getItem('favoritePsalms');
    if(favoritePsalms) {
      favoritePsalms = favoritePsalms.split(','); // arr like ['2','32']
      this.stateManager.set(favoritePsalms.length);
    }
    // 'https://castenettoa.com/app/salmi/s/1',
    // 'https://castenettoa.com/app/salmi/s/2',
    let url = '';
    for(let x=1; x <= 150; x++) {
       url = url + " 'https://castenettoa.com/app/salmi/s/" + x + "',\n";
    }
          console.log(url);
},

  watch: {
    colorMode(newVal) { // update color mode on user choice
      localStorage.colorMode = newVal;
      this.changeStyleSheet();
    },

    '$route' () {
      this.sideNavClose();
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

      // overlay on the searchabar not work, this is a bug fix
      // document.getElementById('hideOnMenuOpen_bug').style.opacity = "0.05"; 
      document.body.style.overflow = 'hidden';
    },
    sideNavClose: function () {
      document.getElementById('sideNav').style.width = "0";
      document.getElementById('bodyOverlay').style.height = "0%";
      document.getElementById('bodyOverlay').style.opacity = "0";
      // document.getElementById('hideOnMenuOpen_bug').style.opacity = "1";

      document.body.style.overflow = 'scroll';
    },
    customSearch: function() { // model: this.searchString
    // and if user search Salmo 10? or n/numero 1? libro 3?

    let searchString = this.searchString.trim(),
        isInt = false;

    if(!searchString) return;
    if(this.isInt(searchString)) isInt = true;
    if(isInt) searchString = parseInt(searchString); // set 01 to 1

      
      if(!isInt && searchString.trim().length > 2) {
        //se non è un numero, se la stringa è più lunga di 2 avvio la ricerca
        console.log('searching...', searchString);

      } else if (isInt && searchString > 0 && searchString < 151) {
        // il numero è valido, restituisco il salmo (bug: 01 is working)
        console.log('hey, eccoti il salmo', searchString);


      } else {
        console.log('stringa troppo corta oppure numbero non valido... no results', searchString);
      }
      // try lurn
      // https://www.google.com/search?q=lunrjs+vue&oq=lunrjs+vue&aqs=chrome..69i57j33i10i160l3.2460j0j4&sourceid=chrome&ie=UTF-8
  // or see --->  // https://en.wikipedia.org/wiki/Full-text_search
      // 1- if user search only one number, return the single salmo (es: 7 return/go to salmo 7)
      // 2- if user search a string ("le vie del signore") search this string on the
      //    'title' and 'description[]' property of the arrays
    },

     isInt: function(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseInt(value))
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/light.css";
@import "@/assets/scss/main.scss";
</style>
