<template>
  <main>
    <div class="single-salmo" v-if="salmi[numeroSalmo-1]">
        <small class="copyright-sanpaolo">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square-fill" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          <span>Il testo biblico è tratto da <a href="https://www.edizionisanpaolo.it/">LA BIBBIA. Nuova versione dai testi originali</a>, San Paolo Edizioni 2010.</span>
        </small>

      <h1 :title="'Sei sul salmo numero ' + numeroSalmo">
        <span class="gradient">{{ salmi[numeroSalmo - 1].titleWithNumber }}</span>
        <span class="desc" title="Titolo del salmo"
          > &bull; {{ salmi[numeroSalmo - 1].title }}</span
        >
      </h1>

      <div class="psalms-option-menu">
        <button class="small-button" v-on:click="addToFavorites(numeroSalmo)">
          <svg style="margin-top: 2px;" v-if="!salmi[numeroSalmo-1].favorite" xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="bi bi-star" viewBox="0 0 18 18"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg>
          <svg style="margin-top: 2px;" v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFAE42" class="bi bi-star-fill" viewBox="0 0 18 18"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path></svg>
          <span v-if="!salmi[numeroSalmo-1].favorite" >aggiungi ai preferiti</span>
          <span v-else>preferito</span>
        </button>

        <button class="small-button colorfull-red-blue" v-on:click="shareSalmo()">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M14 16V13C10.39 13 7.81 14.43 6 17C6.72 13.33 8.94 9.73 14 9V6L19 11L14 16Z" />
          </svg>
          <span>condividi</span>
        </button>
      </div>

      <details v-if="salmi[numeroSalmo - 1].description">
        <summary>Descrizione</summary>
        <p>{{ salmi[numeroSalmo - 1].description }}</p>
      </details>

      <br>

      <div
        class="prose"
        v-bind:key="key"
        v-for="(item, key) in salmi[numeroSalmo - 1].content"
      >
        <p class="prose-row">
          <span class="prose-number"
            ><span>{{ key + 1 }}</span></span
          >{{ item }}
        </p>
      </div>

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

    shareSalmo: function() {
        let salmoTitle = this.salmi[this.numeroSalmo-1].titleWithNumber + ' • ' + this.salmi[this.numeroSalmo-1].title;
console.log(this.$route.params.number)
if (navigator.share) { // web share api works!
          navigator.share({
            title: salmoTitle,
            text: "“" + this.salmi[this.numeroSalmo-1].content[0] + "”",
            url: this.$route.params.number,
          })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
          // no Web Share APi support, fallback!
        }
    }
  },
};
</script>


<style lang="scss">
</style>