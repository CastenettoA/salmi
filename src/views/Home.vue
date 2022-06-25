<template>
  <div class="homepage">    
    <div class="title">
      <h1><span class="gradient">Salmi Biblici</span></h1>
      <span class="desc"
        ><i
          >dal greco psalmós, der. di psállō ‘canto con accompagnamento di
          cetra’</i
        ></span
      >
    </div>

    <details>
      <summary>Cos'è il Libro dei Salmi?</summary>
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
    </details>

    <main>
      <h2>Elenco</h2>
      <p style="font-size: 13.6px;">Qui sotto trovi l'elenco ordinato di tutti i 150 Salmi Biblici. Per leggere il singolo Salmo clicca sul numero o sul titolo corrispondente. Se vuoi effettuare una <b>ricerca</b> puoi farlo utilizzando la ricerca del tuo Browser Web ed inserire il numero o il titolo del Salmo. Clicca qui per scoprire le <a v-on:click="goToWords()" style="cursor: pointer;">parole più ricorrenti nei Salmi Biblici.</a></p>


      <div class="elencoSalmi">
        <div class="single-salmo" v-bind:key="key" v-for="(item, key) in salmi">
          <span class="book-nuber" v-if="key+1 == 1"><h3>Libro 1</h3></span>

          <button v-on:click="goToSalmo(key + 1)">
            <span class="salmo-number">salmo {{ item.titleWithNumber.split('Salmo')[1].trim() }}</span> 
            <b class="salmo-titile">{{ item.title }}</b> → 
            <span class="salmo-description">{{ item.description }}</span>
          </button>

          <span v-if="key+1 == 41"><h3>Libro 2</h3></span>
          <span v-if="key+1 == 72"><h3>Libro 3</h3></span>
          <span v-if="key+1 == 89"><h3>Libro 4</h3></span>
          <span v-if="key+1 == 106"><h3>Libro 5</h3></span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
/*

problema: i salmi che iniziano con un nome Lamed -, nella prima riga manca il nome.
*/

// @ is an alias to /src
import salmiListJson from "@/assets/json/salmi.json";

export default {
  name: "Home",
  data: function () {
    return {
      salmi: salmiListJson.items,
    };
  },

  created: function() {
    document.title = 'I Salmi Biblici • elenco dei 150 Salmi';
    document.getElementsByTagName('meta')["description"].content = " I salmi contengono un sunto di tutta la dottrina dell'Antico Testamento. I salmisti non parlano che a Dio o di Dio e delle altre cose solo in relazione con Lui. Possiamo dire che è un manuale di pregriera che Dio stesso ha voluto dare ai suoi figli. Servì di preghiera al Redentore, agli Apostoli, a Maria; manuale di preghiera e meditazione.";
  },

  methods: {
    goToSalmo: function (n) {
      this.$router.push({ name: "salmo", params: { number: n } });
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

  filters: {
    truncateWord: function(text, length, suffix) {
      if(text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    }
  }
};
</script>

<style lang="scss">
</style>