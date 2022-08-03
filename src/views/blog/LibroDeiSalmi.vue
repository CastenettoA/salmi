<template>
  <main>
    <div class="single-salmo">
      <header :class="[{ animationShow_v2: stateManager.animationEnabled}, 'bgSea' ]">
        <h1>Cos'è il Libro dei Salmi?</h1>
          <p>Il Libro dei Salmi è un testo contenuto nella Bibbia che racchiude al
        suo interno 150 Salmi, delle composizioni poetiche sacre scritte da vari
        autori (principalmente dal re Davide).</p>
      </header>

      <p>
        Possiamo dire che contengono un sunto di tutta la dottrina dell'Antico
        Testamento. Sono considerati un manuale di preghiera e meditazione che
        Dio stesso a voluto dare ai suoi figli. 
      </p>

      <p>
        Il salterio è diviso in 5 parti, in analogia con il Pentateuco, e ciascuna parte termina con una benedizione o dossologia
      </p>

      <div class="elencoSalmi">
      <button v-on:click="goToBook(1)" style="cursor: pointer;">📕 Libro 1 →</button>
      <button v-on:click="goToBook(2)" style="cursor: pointer;">📕 Libro 2 →</button>
      <button v-on:click="goToBook(3)" style="cursor: pointer;">📕 Libro 3 →</button>
      <button v-on:click="goToBook(4)" style="cursor: pointer;">📕 Libro 4 →</button>
      <button v-on:click="goToBook(5)" style="cursor: pointer;">📕 Libro 5 →</button>
      <hr>
      <button v-on:click="goToPenitenziali()" style="cursor: pointer;">📕 I 7 Salmi Penitenziali →</button>
      <button v-on:click="goToWords()" style="cursor: pointer;">📔 Le parole più ricorrenti nei Salmi →</button>
      </div>

      <!-- https://www.vatican.va/roman_curia/congregations/cfaith/pcb_documents/rc_con_cfaith_doc_19100501_psalmorum_it.html -->
      <br />
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