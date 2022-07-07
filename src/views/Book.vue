<template>
  <main>
    <div class="single-salmo" v-if="bookNumber >= 1 && bookNumber <= 5">
        <small class="copyright-sanpaolo">
        <svg style="width:19px;height:19px; opacity: .7;" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
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