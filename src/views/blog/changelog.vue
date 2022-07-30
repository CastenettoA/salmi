<template>
  <main>
    <div class="single-salmo">
        <h1>
        <span class="gradient">Changelog</span>
        <!-- <span class="desc"
          > &bull; Il Libro Dei Salmi</span
        > -->
      </h1>

      <p>
        Questo è il centro degli aggiornamenti della nostra applicazione così che tu possa vedere gli ultimi 
        aggiornamenti e il nostro impegno per creare cose straordinarie. <br>
        Vuoi partecipare? Scrivi una email a <a href="mailto:castenetto.andrea@gmail.com">castenetto.andrea@gmail.com</a>
      </p>

      <div class="changelogContent">
        <div class="changelogEntry">
          <h2>1 Agosto, 2022</h2>
          <p>&#8226; Aggiunta la funzionalità di ricerca. Ora è possibile cercare nei salmi e nel loro contenuto.</p>
          <p>&#8226; Miglioramento dell'aspetto estetico della parte alta dell'applicazione. (l'header)</p>
        </div>
      
        <div class="changelogEntry">
          <h2>Da Luglio 2021</h2>
          <p>&#8226; Molti aggiornamenti che non sono stati annunciati pubblicamente.</p>
        </div>
      </div>

    </div>

  </main>
</template>

<script>
import salmi from "@/assets/json/salmi.json";

export default {
  data: function () {
    return {
      salmi: salmi.items,
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


<style lang="scss">
</style>