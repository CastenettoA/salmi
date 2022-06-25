<template>
  <main>
    <div class="single-salmo" v-if="bookNumber >= 1 && bookNumber <= 5">
        <small class="copyright-sanpaolo">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square-fill" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          <span>Il testo biblico è tratto da <a href="https://www.edizionisanpaolo.it/">LA BIBBIA. Nuova versione dai testi originali</a>, San Paolo Edizioni 2010.</span>
        </small>

       <h1>
        <span class="gradient">Salmi</span>
        <span class="desc" title="Titolo del salmo"
          > &bull; Libro {{bookNumber}} </span
        >
      </h1>

      <!-- <div
        class="prose"
        v-bind:key="key"
        v-for="(item, key) in filteredSalmi"
      >
        <p class="prose-row">
          <span class="prose-number"
            ><span>{{ salmi.indexOf(item)+1 }}</span></span
          >{{ item.title }}
        </p>
      </div> -->

      <div class="elencoSalmi">
        <div v-bind:key="key" v-for="(item, key) in filteredSalmi">
          <button v-on:click="goToSalmo(salmi.indexOf(item)+1)">
            <b>{{ item.titleWithNumber.split('Salmo')[1].trim() }}.</b> {{ item.title }} →
          </button>
        </div>
      </div>


      <div class="menu-b">
        <button v-on:click="goBack()" :disabled="bookNumber <= 1">
          Libro Precedente
        </button>
        <button v-on:click="goNext()" :disabled="bookNumber >= 5">
          Libro Successivo
        </button>
      </div>
    </div>

    <div v-else>
          <h1><span class="gradient">404</span> &bull; Libro non trovato 🤔</h1>
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

export default {
  data: function () {
    return {
      salmi: salmi.items,
      bookNumber: this.$route.params.number,
    };
  },
  created: function(){
    this.scrollToTop();
    this.updateDocumentTitleAndMeta(this.bookNumber);
  },
  computed: {
    filteredSalmi: function() {
      if(this.bookNumber == 1) { return this.salmi.slice(0,41); }
      else if (this.bookNumber == 2) { return this.salmi.slice(41, 72); }      
      else if (this.bookNumber == 3) { return this.salmi.slice(72, 89); }      
      else if (this.bookNumber == 4) { return this.salmi.slice(90, 106); }      
      else { return this.salmi.slice(107, 150); }      
    }
  },
  methods: {
    updateDocumentTitleAndMeta: function(n) {
      if(this.bookNumber >= 1 && this.bookNumber <= 5) {
        document.title = 'Libro ' + n + ' • Libro dei Salmi';
        document.getElementsByTagName('meta')["description"].content = 'Elenco di tutti i Salmi Biblici persenti nel libro ' + n + ' del Salterio.';
      } else {
          document.title = 'Libro non trovato.';
          document.getElementsByTagName('meta')["description"].content = 'Nessun Libro trovato';
      }
    },
    scrollToTop() { // needed because the windwos was not to top... try to belive it
        window.scrollTo(0,0);
    },
    goBack: function () {
      this.$router.push({
        name: "book",
        params: { number: --this.bookNumber },
      });

      this.updateDocumentTitleAndMeta(this.bookNumber);
      this.scrollToTop();
    },
    goNext: function () {
      this.$router.push({
        name: "book",
        params: { number: ++this.bookNumber },
      });

      this.updateDocumentTitleAndMeta(this.bookNumber);
      this.scrollToTop();
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
  },
};
</script>


<style lang="scss">
</style>