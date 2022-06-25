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

export default {
  data: function () {
    return {
      salmi: salmi.items,
      numeroSalmo: this.$route.params.number,
    };
  },
  created: function(){
    this.scrollToTop();
    
    if(this.salmi[this.numeroSalmo-1]) {
      this.updateDocumentTitleAndMeta(this.numeroSalmo-1);
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
  },
};
</script>


<style lang="scss">
</style>