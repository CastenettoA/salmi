<template>
  <main>
    <div class="single-salmo">
      <header :class="[{ animationShow_v2_fast: stateManager.animationEnabled}, 'bgSea' ]">
        <h1>ChangeLog</h1>

      <p>
        Questo è il centro degli aggiornamenti della nostra applicazione. Un luogo dove vedere gli ultimi 
        aggiornamenti dell'applicazione e il nostro impegno per creare cose straordinarie. <br>
        Vuoi partecipare? Scrivi una email a <a href="mailto:castenetto.andrea@gmail.com">castenetto.andrea@gmail.com</a>
      </p>
      </header>

      <div class="elencoSalmi">
        <div class="single-salmo">
          <button>
            <div class="salmo-secondary-info"></div>
            <b class="salmo-title">3 Agosto, 2022</b> → 
            <span class="salmo-description">&#8226; Aggiunte animazioni a comparsa in homepage e nelle pagine interne.</span>
          </button>

          <button>
            <div class="salmo-secondary-info"></div>
            <b class="salmo-title">1 Agosto, 2022</b> → 
            <span class="salmo-description">&#8226; Aggiunta la funzionalità di ricerca. Ora è possibile cercare nei salmi e nel loro contenuto. &#8226; Miglioramento dell'aspetto estetico della parte alta dell'applicazione. (l'header)</span>
          </button> 

          <button>
            <div class="salmo-secondary-info"></div>
            <b class="salmo-title">Da Luglio 2021</b> → 
            <span class="salmo-description">&#8226; Molti aggiornamenti che non sono stati annunciati pubblicamente.</span>
          </button> 
        </div>
      </div>

    </div>

  </main>
</template>

<script>
import salmi from "@/assets/json/salmi.json";
import {stateManager} from "@/stateManager.js";


export default {
  data: function () {
    return {
      salmi: salmi.items,
      stateManager
    };
  },
  created: function(){
    this.scrollToTop();
    document.title = 'I Salmi Biblici - changelog';
    document.getElementsByTagName('meta')["description"].content = 'Aggiornamenti dalla nostra applicazione';
  },
  computed: {
    filteredSalmi: function() {
      var s = this.salmi.filter(function(item, index, salmiArray) { 
        if([6,32,38,51,102,130,143].includes(salmiArray.indexOf(item)+1)) { // se il salmo è incluso nei salmi penitenziali
          return item;
        }
      }); 
      
      return s;
    }
  },
  methods: {
    scrollToTop() { // needed because the windwos was not to top... try to belive it
        window.scrollTo(0,0);
    },
   
    goHome: function () {
      this.$router.push({ name: "home" });
    },
    goToSalmo: function (n) {
      this.$router.push({
        name: "salmo",
        params: { number: n },
      });
    },

    goToBook: function (n) {
      this.$router.push({ name: "book", params: { number: n } });
    },

    goToPenitenziali: function () {
      this.$router.push({ name: "penitenziali" });
    },

    goToWords: function () {
      this.$router.push({ name: "words" });
    },
  },
};
</script>


<style lang="scss" scoped>
  h2 {
    font-size: 1.2em;
    font-weight: 700;
    opacity: .8;
  }

  .changelogEntry p {
    margin-bottom: 0;
    margin-top: 0.4em;
  }
</style>