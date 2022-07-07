<template>
  <div class="homepage">    



    <main>
      <h2>I 150 salmi biblici della Bibbia, comodamente accessibili.</h2>
      <p>Qui sotto trovi l'elenco ordinato di tutti i 150 Salmi Biblici. 
      Se vuoi effettuare una <b>ricerca</b> puoi farlo utilizzando la ricerca del tuo Browser Web ed inserire il
       numero o il titolo del Salmo. 
       Clicca qui per scoprire le <a v-on:click="goToWords()" style="cursor: pointer;">parole più ricorrenti 
       nei Salmi Biblici</a> o qui per conoscere di più <a v-on:click="goToBlog1()" style="cursor: pointer;">sul libro dei salmi e i suoi 5 libri</a>.   
       
       </p>
      
      <div class="psalms-option-menu">
        <button class="small-button colorfull-light-green" v-on:click="getCasualSalmo()">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24"> <!-- dice icon -->
              <path fill="currentColor" d="M19.78,3H11.22C10.55,3 10,3.55 10,4.22V8H16V14H19.78C20.45,14 21,13.45 21,12.78V4.22C21,3.55 20.45,3 19.78,3M12.44,6.67C11.76,6.67 11.21,6.12 11.21,5.44C11.21,4.76 11.76,4.21 12.44,4.21A1.23,1.23 0 0,1 13.67,5.44C13.67,6.12 13.12,6.67 12.44,6.67M18.56,12.78C17.88,12.79 17.33,12.24 17.32,11.56C17.31,10.88 17.86,10.33 18.54,10.32C19.22,10.31 19.77,10.86 19.78,11.56C19.77,12.23 19.23,12.77 18.56,12.78M18.56,6.67C17.88,6.68 17.33,6.13 17.32,5.45C17.31,4.77 17.86,4.22 18.54,4.21C19.22,4.2 19.77,4.75 19.78,5.44C19.78,6.12 19.24,6.66 18.56,6.67M4.22,10H12.78A1.22,1.22 0 0,1 14,11.22V19.78C14,20.45 13.45,21 12.78,21H4.22C3.55,21 3,20.45 3,19.78V11.22C3,10.55 3.55,10 4.22,10M8.5,14.28C7.83,14.28 7.28,14.83 7.28,15.5C7.28,16.17 7.83,16.72 8.5,16.72C9.17,16.72 9.72,16.17 9.72,15.5A1.22,1.22 0 0,0 8.5,14.28M5.44,11.22C4.77,11.22 4.22,11.77 4.22,12.44A1.22,1.22 0 0,0 5.44,13.66C6.11,13.66 6.66,13.11 6.66,12.44V12.44C6.66,11.77 6.11,11.22 5.44,11.22M11.55,17.33C10.88,17.33 10.33,17.88 10.33,18.55C10.33,19.22 10.88,19.77 11.55,19.77A1.22,1.22 0 0,0 12.77,18.55H12.77C12.77,17.88 12.23,17.34 11.56,17.33H11.55Z" />
          </svg>
          <span>mi sento fortunato</span>
        </button>

        <button class="small-button" v-on:click="scrollToBottom()">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M12,17L17,12H14V8H10V12H7L12,17Z" />
          </svg>
          <span>scorri alla fine</span>
        </button>
      </div>

      <div class="elencoSalmi">
        <div class="single-salmo" v-bind:key="key" v-for="(salmo, key) in salmi">
          <span class="book-nuber" v-if="key+1 == 1"><h3>Libro 1</h3></span>

          <button :title="salmo.description">
            <div class="salmo-secondary-info">
              <span class="salmo-number">salmo {{ salmo.titleWithNumber.split('Salmo')[1].trim() }}</span> 

              <div class="share" :title="'condividi il salmo numero ' + salmo.titleWithNumber.split('Salmo')[1].trim()" v-on:click="shareSalmo(key)">
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12S8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5S19.66 2 18 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12S4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91S20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08M18 4C18.55 4 19 4.45 19 5S18.55 6 18 6 17 5.55 17 5 17.45 4 18 4M6 13C5.45 13 5 12.55 5 12S5.45 11 6 11 7 11.45 7 12 6.55 13 6 13M18 20C17.45 20 17 19.55 17 19S17.45 18 18 18 19 18.45 19 19 18.55 20 18 20Z" />
                </svg>
              </div>

              <div class="star" v-on:click="addToFavorites(key+1)" title="Aggiungi-Rimuovi dai preferiti">
                    <svg v-if="!salmo.favorite" xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="bi bi-star" viewBox="0 0 18 18">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>

                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFAE42" class="bi bi-star-fill" viewBox="0 0 18 18"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path></svg>
                </div>
            </div>
            <b class="salmo-title" v-on:click="goToSalmo(key + 1)">{{ salmo.title }}</b> → 
            <span class="salmo-description" v-on:click="goToSalmo(key + 1)"><b>1.</b> {{ salmo.content[0]}} <b>2.</b> {{ salmo.content[1] }}</span>
          </button>

          <span v-if="key+1 == 41"><h3>Libro 2</h3></span>
          <span v-if="key+1 == 72"><h3>Libro 3</h3></span>
          <span v-if="key+1 == 89"><h3>Libro 4</h3></span>
          <span v-if="key+1 == 106"><h3>Libro 5</h3></span>
        </div>
      </div>

      <div class="psalms-option-menu">
        <button class="small-button" v-on:click="scrollToTop()">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21M12,7L7,12H10V16H14V12H17L12,7Z" />
          </svg>
          <span>torna su</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
/*

problema: i salmi che iniziano con un nome Lamed -, nella prima riga manca il nome.
*/

// @ is an alias to /src
import salmiListJson from "@/assets/json/salmi.json";
import {stateManager} from "@/stateManager.js";

export default {
  name: "Home",
  data: function () {
    return {
      salmi: salmiListJson.items,
      stateManager
    };
  },

  created: function() {
    document.title = 'Tutti i Salmi • elenco dei 150 Salmi Biblici';
    document.getElementsByTagName('meta')["description"].content = " I salmi contengono un sunto di tutta la dottrina dell'Antico Testamento. I salmisti non parlano che a Dio o di Dio e delle altre cose solo in relazione con Lui. Possiamo dire che è un manuale di pregriera che Dio stesso ha voluto dare ai suoi figli. Servì di preghiera al Redentore, agli Apostoli, a Maria; manuale di preghiera e meditazione.";
  
    // check if favorite exist, if so, update the salmi json
    let favoritePsalms = localStorage.getItem('favoritePsalms');
    if(favoritePsalms) {
      favoritePsalms = favoritePsalms.split(','); // arr like ['2','32']

      for(let el of favoritePsalms) {
        // set salmo to favorite 
        let salmo = this.salmi[el-1];
        if(salmo) {
          salmo.favorite = true;
        }
      }
    }
  },

  methods: {
    goToSalmo: function (n) {
      this.$router.push({ name: "salmo", params: { number: n } });
    },

    goToBook: function (n) {
      this.$router.push({ name: "book", params: { number: n } });
    },

    goToPenitenziali: function () {
      this.$router.push({ name: "penitenziali" });
    },

    goToBlog1: function () {
      this.$router.push({ name: "libroDeiSalmi" });
    },

    goToWords: function () {
      this.$router.push({ name: "words" });
    },

    getCasualSalmo: function() { // go to a random salmo page
      let randomSalmoNum = Math.floor(Math.random()*149)+1; // todo: check if 150 is shown
      this.$router.push({ name: "salmo", params: { number: randomSalmoNum }});
    },

    scrollToTop: function() {
       window.scrollTo({ top: 0, behavior: 'auto' });
    },

    scrollToBottom: function() {
      const scrollingElement = (document.scrollingElement || document.body);
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    },

    addToFavorites: function(psalmNumber) { 
      let favoritePsalms = localStorage.getItem('favoritePsalms'); // [1,2,5]
      if(!favoritePsalms) {
        localStorage.setItem('favoritePsalms', psalmNumber); // add salmo to local storage
        this.salmi[psalmNumber-1].favorite = true; // add favorite to salmi array
        this.stateManager.salmi_favorite_count = 1;
      } else {
        if(!favoritePsalms.split(',').includes(psalmNumber.toString())) {
          localStorage.setItem('favoritePsalms', favoritePsalms + ',' + psalmNumber);
          this.salmi[psalmNumber-1].favorite = true;
          this.stateManager.salmi_favorite_count = localStorage.getItem('favoritePsalms').split(',').length;
        } else {
          // current salmo is already favorite. I remove it.
          let fp = favoritePsalms.split(',');  // split the array
          let i = fp.indexOf(psalmNumber.toString()); // find the index of the element to remove
          fp.splice(i, 1); // remove 1 element at index 'i'
          localStorage.setItem('favoritePsalms', fp); // remove psalm from favorite in local storage
          this.salmi[psalmNumber-1].favorite = false; // remove favorite from salmi array
          this.stateManager.salmi_favorite_count--;
        }
      }
    },

    shareSalmo: function(salmoNumber) {
        let salmoNLink = Number(salmoNumber)+1;
        let salmoTitle = this.salmi[salmoNumber].titleWithNumber + ' • ' + this.salmi[salmoNumber].title,
            salmoContent = "“" + this.salmi[salmoNumber].content[0] + ' ' + this.salmi[salmoNumber].content[1] + "”";

          if (navigator.share) { // web share api works!
            navigator.share({
              title: salmoTitle,
              text: salmoContent,
              url: 'https://castenettoa.com/app/salmi/s/' + salmoNLink,
            })
              .then(() => console.log('Successful share'))
              .catch((error) => console.log('Error sharing', error));
          } else {
            // no Web Share APi support, fallback with vue3-clipboard..!
            window.prompt("Copia negli appunti con Ctrl+C, Enter e poi condividi il salmo dove preferisci.", salmoTitle + " (https://castenettoa.com/app/salmi/s/" + salmoNLink + ") " + salmoContent); 
          }
    }


  },

  filters: {
    truncateWord: function(text, length, suffix) {
      if(text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    }
  }
};
</script>

<style lang="scss">
</style>