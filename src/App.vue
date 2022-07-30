<template>
  <div id="app" v-cloak>
    <nav class="navbar">
      <div class="navbar-content showSearchBarMobile">

        <div class="sideNav" id="sideNav">
          <div class="sideNav-header">
            <div class="navbar-logo">
              <img class="logo" src="@/assets/img/logo.png" @click="goHome">
              <p @click="goHome">Salmi<span></span>Biblici</p>
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

        <div class="navbar-logo">
          <img src="@/assets/img/logo.png" @click="goHome">
          <h1 @click="goHome" :class="{ notActive: searchBarStatus[0].isSearchInputActive }">Salmi<span></span>Biblici</h1>

          <div class="search-bar-mobileIcon" alt="clicca per cercare un salmo" @click="searchBarStatus[0].isSearchInputActive=true; setFocusOnSearch()" :class="{ notActive: searchBarStatus[0].isSearchInputActive }">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
          </div>

          <div class="search-bar-mobileCloseIcon" alt="clicca per chiudere la ricerca" @click="searchBarStatus[0].isSearchInputActive=false" :class="{ active: searchBarStatus[0].isSearchInputActive, notActive: !searchBarStatus[0].isSearchInputActive }">
           <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
            </svg>
          </div>

          <div class="search-bar" :class="{ active: searchBarStatus[0].isSearchInputActive }">
            <input id="hideOnMenuOpen_bug" v-model="searchString" ref="searchInputRef" type="text"
               v-on:keyup="customSearch()"
               v-on:enter="customSearch()" 
               @focusout="focusOutFromSearchBar"  placeholder="Ricerca">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
          </div>

        <div class="searchResults" id="searchResults" v-if="searchBarStatus[0]['showSearchResults']">
          <div class="searchInfo">
            <div>
              <span>Risultati</span>
              <span class="subTitle">{{searchBarStatus[0].displayText}}</span>
            </div>
          </div>

          <!-- limito i risultati con slice -->
          <div class="searchResult_Content" v-if="searchBarStatus[0].searchResult">
            <div class="single" v-for="(item, key) in searchBarStatus[0].searchResult.slice(0,15)" @click="goToSalmo_and_closeMenu(item.titleWithNumber.split(' ')[1])">
                <span class="title" v-if="item.titleWithNumber">{{item.titleWithNumber}}</span> &#8226;
                <span class="rawTitle" v-if="item.title">{{item.title}}</span>
                <span class="description" v-if="salmi[item.titleWithNumber.split(' ')[1]-1]"><span>1.</span>{{salmi[item.titleWithNumber.split(' ')[1]-1].content[0]}} <span>2.</span>{{salmi[item.titleWithNumber.split(' ')[1]-1].content[1]}}</span>
            </div>
            <!-- link to salmo -->
          </div>
        </div>
        </div>
      

      </div>
    </nav>

    <router-view></router-view>
    
    <footer>Puoi sostenere questo progetto con una <a href="https://paypal.me/pools/c/8bFReaiLUk">donazione</a>.<br>
      Se vuoi inviarmi un feedback fallo via <a href="mailto:castenetto.andrea@gmail.com">email</a>. <br> <a
        href="#">Torna su ⬆</a> &bull; <a href="https://castenettoa.com"
        title="creato da Andrea Castenetto">castenettoa.com</a> <br>
        <a href="/blog/changelog">ChangeLog</a> </footer>

  </div>
</template>

<script>
import salmiListJson from "@/assets/json/salmi.json";
import salmiListJson_forSearch from "@/assets/json/salmiForSearch.json";
import {stateManager} from "@/stateManager.js";

export default {
  name: "App",
  data: function () {
    return {
      colorMode: 'chiaro',
      searchString: '',
      salmi: salmiListJson.items,
      salmiForSearch: salmiListJson_forSearch.items,
      stopWords: ["a","abbastanza","abbia","abbiamo","abbiano","abbiate","accidenti","ad","adesso","affinché","agl","agli","ahime","ahimè","ai","al","alcuna","alcuni","alcuno","all","alla","alle","allo","allora","altre","altri","altrimenti","altro","altrove","altrui","anche","ancora","anni","anno","ansa","anticipo","assai","attesa","attraverso","avanti","avemmo","avendo","avente","aver","avere","averlo","avesse","avessero","avessi","avessimo","aveste","avesti","avete","aveva","avevamo","avevano","avevate","avevi","avevo","avrai","avranno","avrebbe","avrebbero","avrei","avremmo","avremo","avreste","avresti","avrete","avrà","avrò","avuta","avute","avuti","avuto","basta","ben","bene","benissimo","brava","bravo","buono","c","caso","cento","certa","certe","certi","certo","che","chi","chicchessia","chiunque","ci","ciascuna","ciascuno","cima","cinque","cio","cioe","cioè","circa","citta","città","ciò","co","codesta","codesti","codesto","cogli","coi","col","colei","coll","coloro","colui","come","cominci","comprare","comunque","con","concernente","conclusione","consecutivi","consecutivo","consiglio","contro","cortesia","cos","cosa","cosi","così","cui","d","da","dagl","dagli","dai","dal","dall","dalla","dalle","dallo","dappertutto","davanti","degl","degli","dei","del","dell","della","delle","dello","dentro","detto","deve","devo","di","dice","dietro","dire","dirimpetto","diventa","diventare","diventato","dopo","doppio","dov","dove","dovra","dovrà","dovunque","due","dunque","durante","e","ebbe","ebbero","ebbi","ecc","ecco","ed","effettivamente","egli","ella","entrambi","eppure","era","erano","eravamo","eravate","eri","ero","esempio","esse","essendo","esser","essere","essi","ex","fa","faccia","facciamo","facciano","facciate","faccio","facemmo","facendo","facesse","facessero","facessi","facessimo","faceste","facesti","faceva","facevamo","facevano","facevate","facevi","facevo","fai","fanno","farai","faranno","fare","farebbe","farebbero","farei","faremmo","faremo","fareste","faresti","farete","farà","farò","fatto","favore","fece","fecero","feci","fin","finalmente","finche","fine","fino","forse","forza","fosse","fossero","fossi","fossimo","foste","fosti","fra","frattempo","fu","fui","fummo","fuori","furono","futuro","generale","gente","gia","giacche","giorni","giorno","giu","già","gli","gliela","gliele","glieli","glielo","gliene","grande","grazie","gruppo","ha","haha","hai","hanno","ho","i","ie","ieri","il","improvviso","in","inc","indietro","infatti","inoltre","insieme","intanto","intorno","invece","io","l","la","lasciato","lato","le","lei","li","lo","lontano","loro","lui","lungo","luogo","là","ma","macche","magari","maggior","mai","male","malgrado","malissimo","me","medesimo","mediante","meglio","meno","mentre","mesi","mezzo","mi","mia","mie","miei","mila","miliardi","milioni","minimi","mio","modo","molta","molti","moltissimo","molto","momento","mondo","ne","negl","negli","nei","nel","nell","nella","nelle","nello","nemmeno","neppure","nessun","nessuna","nessuno","niente","no","noi","nome","non","nondimeno","nonostante","nonsia","nostra","nostre","nostri","nostro","novanta","nove","nulla","nuovi","nuovo","o","od","oggi","ogni","ognuna","ognuno","oltre","oppure","ora","ore","osi","ossia","ottanta","otto","paese","parecchi","parecchie","parecchio","parte","partendo","peccato","peggio","per","perche","perchè","perché","percio","perciò","perfino","pero","persino","persone","però","piedi","pieno","piglia","piu","piuttosto","più","po","pochissimo","poco","poi","poiche","possa","possedere","posteriore","posto","potrebbe","preferibilmente","presa","press","prima","primo","principalmente","probabilmente","promesso","proprio","puo","pure","purtroppo","può","qua","qualche","qualcosa","qualcuna","qualcuno","quale","quali","qualunque","quando","quanta","quante","quanti","quanto","quantunque","quarto","quasi","quattro","quel","quella","quelle","quelli","quello","quest","questa","queste","questi","questo","qui","quindi","quinto","realmente","recente","recentemente","registrazione","relativo","riecco","rispetto","salvo","sara","sarai","saranno","sarebbe","sarebbero","sarei","saremmo","saremo","sareste","saresti","sarete","sarà","sarò","scola","scopo","scorso","se","secondo","seguente","seguito","sei","sembra","sembrare","sembrato","sembrava","sembri","sempre","senza","sette","si","sia","siamo","siano","siate","siete","sig","solito","solo","soltanto","sono","sopra","soprattutto","sotto","spesso","sta","stai","stando","stanno","starai","staranno","starebbe","starebbero","starei","staremmo","staremo","stareste","staresti","starete","starà","starò","stata","state","stati","stato","stava","stavamo","stavano","stavate","stavi","stavo","stemmo","stessa","stesse","stessero","stessi","stessimo","stesso","steste","stesti","stette","stettero","stetti","stia","stiamo","stiano","stiate","sto","su","sua","subito","successivamente","successivo","sue","sugl","sugli","sui","sul","sull","sulla","sulle","sullo","suo","suoi","tale","tali","talvolta","tanto","te","tempo","terzo","th","ti","titolo","tra","tranne","tre","trenta","triplo","troppo","trovato","tu","tua","tue","tuo","tuoi","tutta","tuttavia","tutte","tutti","tutto","uguali","ulteriore","ultimo","un","una","uno","uomo","va","vai","vale","vari","varia","varie","vario","verso","vi","vicino","visto","vita","voi","volta","volte","vostra","vostre","vostri","vostro","è"],
      stateManager,
      searchBarStatus: [{
        isSearchInputActive: false,
        showSearchResults: false,
        defaultDisplayText: 'I risultati della tua ricerca vengono mostrati qui sotto. Clicca su un risultato per accedere al contenuto completo.',
        displayText: 'I risultati della tua ricerca vengono mostrati qui sotto. Clicca su un risultato per accedere al contenuto completo.',
        searchResult: salmiListJson.items[6],
        resultOfSearch: null
      }],
      idx: null // future search index by Lunr-js
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

  beforeDestroy() {
    document.removeEventListener('click', this.onDocumentClick);
  },

  mounted() {
    document.addEventListener('click', this.onDocumentClick);

    if (localStorage.colorMode) { // check user preferred color mode
      this.colorMode = localStorage.colorMode;
      this.changeStyleSheet();
    }

    // check and set user FAVORITES
    let favoritePsalms = localStorage.getItem('favoritePsalms');
    if(favoritePsalms) {
      favoritePsalms = favoritePsalms.split(','); // arr like ['2','32']
      this.stateManager.set(favoritePsalms.length);
    }

    // init website search
    this.lunrjs_init();
},

  watch: {
    colorMode(newVal) { // update color mode on user choice
      localStorage.colorMode = newVal;
      this.changeStyleSheet();
    },

    '$route' (to, from) {
      this.sideNavClose();
    },
    
  },

  methods: {
    goToSalmo_and_closeMenu: function(n) {
      this.searchBarStatus[0].showSearchResults = false;
      this.displayText = this.defaultDisplayText;
      this.searchString = '';
      this.$router.push({ name: "salmo", params: { number: n } });
    },
    onDocumentClick: function(e) { 
      let parent = document.querySelector('#searchResults');
      if(e && e.target && parent) {
        // if there is parent the 'rearch result are showing'
        // when isContained is false so HIDE search res.
     
        let isContained = parent.contains(e.target);
        if(!isContained) {
          this.searchBarStatus[0].showSearchResults = false;
          this.displayText = this.defaultDisplayText;
          this.searchString = '';
        }
      }
    },  
    changeColorMode: function () {
      let c = this.colorMode == 'chiaro' ? 'scuro' : 'chiaro';
      this.colorMoode = c;
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

    lunrjs_init: function() { 
      /* build the search index in var 'idx' using lunr() func... 3 steps:
          - tell Lunr the reference field (usally a numeric-unique-id)
          - tell L. the list of fields part of search (title, desc, content...)
          - tell L. the dataset.

          ...is possibile to "Prebuilding Lunr.js's search index", see: https://opensource.com/article/21/11/client-side-javascript-search-lunrjs
          ...Lurn non da possibilità di cercare solo una certa quantità di risultati,
             per grosse query potrebbe essere lento e poco funzionale.
      */

      let self = this;
      this.idx = lunr(function() {
        this.ref('titleWithNumber') // usually a number-unique-id
        this.field('titleWithNumber') 
        this.field('title') 
        this.field('content') 

        if(self.salmiForSearch) {
          self.salmiForSearch.forEach(function(doc) { // build index from salmi json list
             if(doc.content && typeof(doc.content) != 'string') { // typeof for avoid a js-error
              doc.content = doc.content.join(); // for index the array of string I convert to 1 string (see stackoverflow)
             }
             this.add(doc);       

          }, this);
        }
      }); // if no error we build successfully the index.
    },

    lunrjs_search: function(searchQuery) {
      // init a simple L. search
      let self = this;
      let results = this.idx.search(searchQuery);

      if(results.length && self.salmiForSearch) {
      // little work to get the full element (salmo/i) from the small search result item
      let results_full = results.map(function (item) {
          return self.salmiForSearch.filter(function (value, index, arr) {
              return value.titleWithNumber == item.ref;
          })[0];
      });

        // now i show the search results
        this.searchBarStatus[0].displayText = 'Ecco i risultati della tua ricerca';
        this.searchBarStatus[0].searchResult = results_full;
        this.searchBarStatus[0]['showSearchResults'] = true;
      }
    },

    setFocusOnSearch: function() {
         setTimeout(x => { // fix the strange bug with timeouts
            this.$refs.searchInputRef.focus();
          }, 100);    
    },

    customSearch: function() { // model: this.searchString
    // and if user search Salmo 10? or n/numero 1? libro 3?
    // todo: validate inputs from h@ck3rs!!1!

    let searchString = this.searchString.trim(),
        isInt = false;

    if(!searchString) { // la searchString è vuota.
      this.hideSearchResults();
      return;
    } 

    if(this.isInt(searchString)) isInt = true;
    if(isInt) searchString = parseInt(searchString); // set 01 to 1

      
      if(!isInt && searchString.trim().length > 1) { 
        //se non è un numero, se la stringa è più lunga di 1 avvio la ricerca con Lunr.js
        // todo: set search delay .300sec
        this.lunrjs_search(searchString);

      } else if (isInt && searchString > 0 && searchString < 151) { 
        // il numero è valido, restituisco il salmo (bug: 01 is working)
        let mess = 'Clicca qui sotto per leggere il salmo numero ' + searchString;
        let quest = 'GoToSalmoNumber';
        let items = [this.salmi[searchString-1]]; 

        this.printSearchResults(mess, quest, items);
      } else {
        // nessun risultato
        let mess = 'La parola che stai cercando è troppo corta oppure il numero che hai inserito non è valido.';
        let quest = 'itemNotFount';
        this.printSearchResults(mess, quest);
      }
    },
    hideSearchResults: function() {
      this.searchBarStatus[0].displayText = this.searchBarStatus[0].defaultDisplayText;
      this.searchBarStatus[0]['showSearchResults'] = false;
      this.searchString = '';
      this.searchBarStatus[0].isSearchInputActive = false;

    },
    printSearchResults: function(mess, quest, items) {
      if(quest && quest == 'itemNotFount') {
        // show 'la ricerca non ha prodotto risultati'
        this.searchBarStatus[0].displayText = mess;
        this.searchBarStatus[0].searchResult = [];

      } else if(quest && quest == 'GoToSalmoNumber') {
        // show the current salmo in Search Result
        this.searchBarStatus[0].displayText = mess;
        this.searchBarStatus[0].searchResult = items;
        this.searchBarStatus[0]['showSearchResults'] = true;
      }
      
      else {
        // nessuno dei prececedenti, quindi:
        // show 'la ricerca non ha prodotto risultati'
        this.searchBarStatus[0]['showSearchResults'] = true;
      }
    },
    focusOutFromSearchBar: function(e) {
        //  this.searchBarStatus[0].isSearchInputActive = false;
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
