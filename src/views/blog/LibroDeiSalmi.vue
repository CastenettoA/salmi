<template>
  <main>
    <div class="single-salmo">
        <small class="copyright-sanpaolo">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square-fill" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          <span>Il testo biblico è tratto da <a href="https://www.edizionisanpaolo.it/">LA BIBBIA. Nuova versione dai testi originali</a>, San Paolo Edizioni 2010.</span>
        </small>

        <h1>
        <span class="gradient">Cos'è il Libro dei Salmi?</span>
        <!-- <span class="desc"
          > &bull; Il Libro Dei Salmi</span
        > -->
      </h1>

      <p>
        Il Libro dei Salmi è un testo contenuto nella Bibbia che racchiude al
        suo interno 150 Salmi, delle composizioni poetiche sacre scritte da vari
        autori (principalmente dal re Davide).
      </p>
      <p>
        Possiamo dire che contengono un sunto di tutta la dottrina dell'Antico
        Testamento. Sono considerati un manuale di preghiera e meditazione che
        Dio stesso a voluto dare ai suoi figli. 
      </p>

      <p>
        Il salterio è diviso in 5 parti, in analogia con il Pentateuco, e ciascuna parte termina con una benedizione o dossologia
      </p>

      <button v-on:click="goToBook(1)">📕 Libro 1 →</button>
      <button v-on:click="goToBook(2)">📕 Libro 2 →</button>
      <button v-on:click="goToBook(3)">📕 Libro 3 →</button>
      <button v-on:click="goToBook(4)">📕 Libro 4 →</button>
      <button v-on:click="goToBook(5)">📕 Libro 5 →</button>
      <hr>
      <button v-on:click="goToPenitenziali()">📕 I 7 Salmi Penitenziali →</button>
      <button v-on:click="goToWords()">📔 Le parole più ricorrenti nei Salmi →</button>

      <!-- https://www.vatican.va/roman_curia/congregations/cfaith/pcb_documents/rc_con_cfaith_doc_19100501_psalmorum_it.html -->

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