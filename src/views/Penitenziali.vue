<template>
  <main>
    <div class="single-salmo">

        <h1>
        <span class="gradient">Salmi</span>
        <span class="desc"
          > &bull; I Sette Salmi Penitenziali</span
        >
      </h1>

      <details>
        <summary>Descrizione</summary>
        <p>Questi sette salmi (Sal 6; Sal 32; Sal 38; Sal 51; Sal 102; Sal 130; Sal 143) furono raccolti da sant’Agostino sotto il nome di “Sette salmi penitenziali”, che vengono recitati la sera, prima di confessarsi e dopo essersi pentiti di un peccato.</p>
      </details>

      <div class="elencoSalmi">
        <div v-bind:key="key" v-for="(item, key) in filteredSalmi">
          <button v-on:click="goToSalmo(salmi.indexOf(item)+1)">
            <b>{{ item.titleWithNumber.split('Salmo')[1].trim() }}.</b> {{ item.title }} →
          </button>
        </div>
      </div>

              <small class="copyright-sanpaolo">
        <svg style="width:19px;height:19px; opacity: .7;" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
          <span>Il testo biblico è tratto da <a href="https://www.edizionisanpaolo.it/">LA BIBBIA. Nuova versione dai testi originali</a>, San Paolo Edizioni 2010.</span>
        </small>

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
    document.title = 'I 7 Salmi Penitenziali - Salterio';
    document.getElementsByTagName('meta')["description"].content = 'Elenco dei 7 salmi penitenziali: 6,32,38,51,102,130 e 143.';
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
  },
};
</script>


<style lang="scss">
</style>