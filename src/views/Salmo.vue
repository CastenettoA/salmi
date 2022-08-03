<template>
  <main>
    <div class="single-salmo" v-if="salmi[numeroSalmo-1]">
      <header :class="[{ animationShow_v2_fast: stateManager.animationEnabled}, 'bgSea' ]">
        <h1 :title="'Sei sul salmo numero ' + numeroSalmo">{{ salmi[numeroSalmo - 1].titleWithNumber }} &bull; {{ salmi[numeroSalmo - 1].title }}</h1>
        <p v-if="salmi[numeroSalmo - 1].description">{{ salmi[numeroSalmo - 1].description }}</p>

        <div class="psalms-option-menu">
          <button class="small-button colorfull-yellow-hover" v-on:click="addToFavorites(numeroSalmo)">
            <svg style="margin-top: 2px;" v-if="!salmi[numeroSalmo-1].favorite" xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="bi bi-star" viewBox="0 0 18 18"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
            <svg style="margin-top: 2px;" v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFAE42" class="bi bi-star-fill" viewBox="0 0 18 18"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path></svg>
            <span v-if="!salmi[numeroSalmo-1].favorite" >aggiungi ai preferiti</span>
            <span v-else>preferito</span>
          </button>

          <button class="small-button colorfull-red-blue-hover" v-on:click="shareSalmo(numeroSalmo-1)">
            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12S8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5S19.66 2 18 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12S4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91S20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08M18 4C18.55 4 19 4.45 19 5S18.55 6 18 6 17 5.55 17 5 17.45 4 18 4M6 13C5.45 13 5 12.55 5 12S5.45 11 6 11 7 11.45 7 12 6.55 13 6 13M18 20C17.45 20 17 19.55 17 19S17.45 18 18 18 19 18.45 19 19 18.55 20 18 20Z" />
            </svg>
            <span>condividi</span>
          </button>
        </div>
      </header>


      <div :class="[{ animationShow_v3_fast: stateManager.animationEnabled}, 'salmoContent' ]">
        <div
          class="prose"
          v-bind:key="key"
          v-for="(item, key) in salmi[numeroSalmo - 1].content"
        >
          <p class="prose-row">
            <span class="prose-number"
              ><span>{{ key + 1 }}</span></span
            >
            
            <!-- idea per un eventuale possibilità di agg. versetto ai preferiti -->
            <!--
               <span class="star" title="Aggiungi-Rimuovi verso dai preferiti">
                    <svg v-if="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="bi bi-star" viewBox="0 0 18 18">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>

                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFAE42" class="bi bi-star-fill" viewBox="0 0 18 18"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path></svg>
            </span> -->
            {{ item }}
          </p>
        </div>
      </div>

      <small class="copyright-sanpaolo">
        <svg style="width:19px;height:19px; opacity: .7;" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
          <span>Il testo biblico è tratto da <a href="https://www.edizionisanpaolo.it/">LA BIBBIA. Nuova versione dai testi originali</a>, San Paolo Edizioni 2010.</span>
        </small>
        <br />

      <div class="menu-b">
        <button v-on:click="goBack()" :disabled="numeroSalmo <= 1">
          Salmo Precedente
        </button>
        <button v-on:click="goNext()" :disabled="numeroSalmo >= salmi.length">
          Salmo Successivo
        </button>
      </div>

      
    </div>

    <div v-else>
          <h1><span class="gradient">404</span> &bull; Salmo non trovato 🤔</h1>
          <p>
            Siamo spiacenti ma non siamo riusciti a trovare la pagina che stai
            cercando.
          </p>
          <button v-on:click="goHome()">&larr; Vai alla <b>homepage</b></button>
    </div>
  </main>

  <!-- identazione e design: 
  https://stackoverflow.com/questions/14734564/how-to-semantically-tag-poem-text  x semantica html 
  https://www.bibbiaedu.it/CEI2008/at/Sal/82/
  -->
</template>

<script>
import salmi from "@/assets/json/salmi.json";
import {stateManager} from "@/stateManager.js";


export default {
  data: function () {
    return {
      salmi: salmi.items,
      numeroSalmo: this.$route.params.number,
      stateManager
    };
  },
  
  watch: {

    '$route' (to, from) {
      if(to.params.number) {
        // i update the surrent salmo. Likely changed by a search event
        this.numeroSalmo = to.params.number;
      }
    },
    
  },


  created: function(){
    this.scrollToTop();
    
    if(this.salmi[this.numeroSalmo-1]) {
      this.updateDocumentTitleAndMeta(this.numeroSalmo-1);
    }

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
    scrollToTop() { // needed because the windwos was not to top... try to belive it
        window.scrollTo(0,0);
    },
    updateDocumentTitleAndMeta: function(n) {
          document.title = this.salmi[n].titleWithNumber + ' • ' + this.salmi[n].title;
          document.getElementsByTagName('meta')["description"].content = this.salmi[n].titleWithNumber + ': ' + this.salmi[n].description;
    },
    // in vue, se la rotta si aggiorna ma il componente è lo stesso i dati non vengono aggiornati;
    // è necessario farlo manually (in questo caso con i -- e ++, oppure con beforeUpdates)
    goBack: function () {
      this.$router.push({
        name: "salmo",
        params: { number: --this.numeroSalmo },
      });

      this.updateDocumentTitleAndMeta(this.numeroSalmo-1);
      this.scrollToTop();
    },
    goNext: function () {
      this.$router.push({
        name: "salmo",
        params: { number: ++this.numeroSalmo },
      });

      this.updateDocumentTitleAndMeta(this.numeroSalmo-1);
      this.scrollToTop(); 
    },
    goHome: function () {
      this.$router.push({ name: "home" });
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
        let salmoTitle = this.salmi[salmoNumber].titleWithNumber + ' • ' + this.salmi[salmoNumber].title,
            salmoContent = "“" + this.salmi[salmoNumber].content[0] + ' ' + this.salmi[salmoNumber].content[1] + "”";

          if (navigator.share) { // web share api works!
            navigator.share({
              title: salmoTitle,
              text: salmoContent,
              url: this.$route.params.number,
            })
              .then(() => console.log('Successful share'))
              .catch((error) => console.log('Error sharing', error));
          } else {
            // no Web Share APi support, fallback with vue3-clipboard..!
            window.prompt("Copia negli appunti con Ctrl+C, Enter e poi condividi il salmo dove preferisci.\"", salmoTitle + '\" (www.castenettoa.com' + this.$route.href + ') ' + salmoContent); 
          }
    }
  },
};
</script>


<style lang="scss">
</style>