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
      <!-- <button v-on:click="getCasualSalmo()">salmo random</button> -->

      <div class="elencoSalmi">
        <div class="single-salmo" v-bind:key="key" v-for="(salmo, key) in salmi">
          <span class="book-nuber" v-if="key+1 == 1"><h3>Libro 1</h3></span>

          <button>
            <div class="salmo-secondary-info">
              <span class="salmo-number">salmo {{ salmo.titleWithNumber.split('Salmo')[1].trim() }}</span> 
              <div class="star" v-on:click="addToFavorites(key+1)" title="Aggiungi-Rimuovi dai preferiti">
                    <svg v-if="!salmo.favorite" xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="bi bi-star" viewBox="0 0 18 18">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>

                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFAE42" class="bi bi-star-fill" viewBox="0 0 18 18"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path></svg>
                </div>
            </div>
            <b class="salmo-title" v-on:click="goToSalmo(key + 1)">{{ salmo.title }}</b> → 
            <span class="salmo-description" v-on:click="goToSalmo(key + 1)">{{ salmo.description }}</span>
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
    document.title = 'Tutti i Salmi • elenco dei 150 Salmi Biblici';
    document.getElementsByTagName('meta')["description"].content = " I salmi contengono un sunto di tutta la dottrina dell'Antico Testamento. I salmisti non parlano che a Dio o di Dio e delle altre cose solo in relazione con Lui. Possiamo dire che è un manuale di pregriera che Dio stesso ha voluto dare ai suoi figli. Servì di preghiera al Redentore, agli Apostoli, a Maria; manuale di preghiera e meditazione.";
  
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

    getCasualSalmo: function() { // go to a random salmo page
      let randomSalmoNum = Math.floor(Math.random()*149)+1; // todo: check if 150 is shown
      this.$router.push({ name: "salmo", params: { number: randomSalmoNum }});
    },

    addToFavorites: function(psalmNumber) { 
      let favoritePsalms = localStorage.getItem('favoritePsalms'); // [1,2,5]
      if(!favoritePsalms) {
        localStorage.setItem('favoritePsalms', psalmNumber); // add salmo to local storage
        this.salmi[psalmNumber-1].favorite = true; // add favorite to salmi array
      } else {
        if(!favoritePsalms.split(',').includes(psalmNumber.toString())) {
          localStorage.setItem('favoritePsalms', favoritePsalms + ',' + psalmNumber);
          this.salmi[psalmNumber-1].favorite = true;
        } else {
          // current salmo is already favorite. I remove it.
          let fp = favoritePsalms.split(',');  // split the array
          let i = fp.indexOf(psalmNumber.toString()); // find the index of the element to remove
          fp.splice(i, 1); // remove 1 element at index 'i'
          localStorage.setItem('favoritePsalms', fp); // remove psalm from favorite in local storage
          this.salmi[psalmNumber-1].favorite = false; // remove favorite from salmi array 
        }
      }
      // let favoriteWords = localStorage.getItem('favoriteWords');
      // if (!favoriteWords) { // se non ci sono faviriti aggiungo la parola ai favoriti
      //     localStorage.setItem('favoriteWords', word);
      // } else if (!favoriteWords.split(',').includes(word) ) { // se l'elemento non è già nei favoriti, lo aggiungo. Devo fare toString in quanto la local storage lavora in STRINGHE
      //    localStorage.setItem('favoriteWords', favoriteWords + ',' + word);
      // } else if (favoriteWords.split(',').includes(word)) { // se la parola è presente, la rimuovo dai favoriti
      //    let f = favoriteWords.split(',');
      //    f.splice(f.indexOf(word), 1);
      //    localStorage.setItem('favoriteWords', f);
      // }
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